
# Comprehensive System Fixes Plan

## Executive Summary
After thorough analysis of the codebase, I have identified **critical auth/account management issues** and **numerous broken UI elements** that prevent proper system functionality. This plan addresses all issues to make the system fully functional.

---

## Critical Issues Identified

### 1. Authentication & Account Management (HIGH PRIORITY)
| Issue | Location | Impact |
|-------|----------|--------|
| Desktop logout button doesn't work | `AppSidebar.tsx:283-286` | Users cannot log out on desktop |
| User name/role hardcoded to "John Doe" | `AppSidebar.tsx:259-266` | Shows wrong user info |
| Mobile role hardcoded to "Compliance Manager" | `MobileNav.tsx:82` | Shows generic role |
| No Password Reset page | Missing `/auth/reset-password` route | Password recovery flow broken |
| No Account/Profile settings tab | `Settings/General.tsx` | No way to update profile or change password |
| Profile/Settings dropdown items non-functional | `AppSidebar.tsx:274-281` | Dead-end clicks |

### 2. Broken Dropdown Menu Items
| Page | Item | Issue |
|------|------|-------|
| AI Systems | "Start Classification" | No handler |
| Vendors | "Edit Vendor" | No handler |
| Vendors | "Upload Documents" | No handler |
| Tasks | "Edit Task" | No handler |

---

## Implementation Plan

### Sprint 1: Fix Critical Auth Issues

#### 1.1 Create Reset Password Page
Create `src/pages/auth/ResetPassword.tsx` that:
- Handles the redirect from email reset link
- Uses `supabase.auth.updateUser({ password })` to update password
- Shows success message and redirects to login

#### 1.2 Add Route for Reset Password
Update `src/App.tsx`:
```typescript
import ResetPassword from "@/pages/auth/ResetPassword";
// Add route:
<Route path="/auth/reset-password" element={<ResetPassword />} />
```

#### 1.3 Fix Desktop Sidebar User Menu
Update `src/components/layout/AppSidebar.tsx`:
- Import `useAuth` context
- Use real user profile data for name/role display
- Add `onClick` handlers for Profile and Settings
- Add `signOut` handler for logout button
- Show dynamic initials from user's name

```text
Before:
- Avatar: "JD" (hardcoded)
- Name: "John Doe" (hardcoded)
- Role: "Admin" (hardcoded)
- Profile/Settings: no handlers
- Log out: no handler

After:
- Avatar: dynamic initials from profile.full_name
- Name: profile.full_name || user.email
- Role: userRole?.role (formatted)
- Profile: navigate to /settings (account tab)
- Settings: navigate to /settings
- Log out: calls signOut() and navigates to /auth/login
```

#### 1.4 Fix Mobile Navigation Role Display
Update `src/components/layout/MobileNav.tsx`:
- Use `userRole?.role` instead of hardcoded "Compliance Manager"
- Format role label from ROLES array

### Sprint 2: Add Account Settings Tab

#### 2.1 Add Account/Profile Tab to Settings
Update `src/pages/Settings/General.tsx`:
- Add new "Account" tab with User icon
- Profile section: update full name
- Security section: change password form
- Danger zone: delete account (optional, can skip for MVP)

The Account tab will include:
```text
┌─────────────────────────────────────┐
│ Account Settings                    │
├─────────────────────────────────────┤
│ Profile                             │
│ ┌─────────────────────────────────┐ │
│ │ Full Name: [____________]       │ │
│ │ Email: user@email.com (read)    │ │
│ │ [Save Profile]                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Security                            │
│ ┌─────────────────────────────────┐ │
│ │ Current Password: [_________]   │ │
│ │ New Password: [_________]       │ │
│ │ Confirm Password: [_________]   │ │
│ │ [Update Password]               │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Sign Out                            │
│ ┌─────────────────────────────────┐ │
│ │ [Sign out from this device]     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Sprint 3: Fix Broken Dropdown Actions

#### 3.1 AI Systems - Start Classification
Update `src/pages/AISystems.tsx:320`:
```typescript
<DropdownMenuItem asChild>
  <Link to={`/ai-systems/${system.id}/classify`}>
    Start Classification
  </Link>
</DropdownMenuItem>
```

#### 3.2 Tasks - Edit Task
Update `src/pages/Tasks.tsx:485`:
- Add state for `editTask` and `showEditDialog`
- Create edit dialog similar to add dialog
- Populate form with existing task data
- Call update mutation on save

#### 3.3 Vendors - Edit Vendor & Upload Documents
Update `src/pages/Vendors.tsx:537-538`:
- "Edit Vendor" → Opens inline edit or navigates to vendor detail with edit mode
- "Upload Documents" → Navigates to `/vendors/${vendor.id}#documents`

### Sprint 4: UI Polish & Cohesion

#### 4.1 Add Missing Navigation Links
- Sidebar "Profile" → `/settings` (account tab)
- Sidebar "Settings" → `/settings`

#### 4.2 Fix Console Warnings
- Fix the Select component ref warning in GeneralSettings
- Wrap Select with proper forwardRef handling

#### 4.3 Add Sign Out Confirmation (optional)
- Add confirmation dialog before signing out
- Clear any cached data on sign out

---

## Technical Implementation Details

### Reset Password Page Structure
```typescript
// src/pages/auth/ResetPassword.tsx
export default function ResetPassword() {
  // 1. Check for access_token in URL hash (Supabase redirects with hash)
  // 2. If token exists, show password form
  // 3. On submit: supabase.auth.updateUser({ password: newPassword })
  // 4. Show success and redirect to login
}
```

### Updated AppSidebar User Menu
```typescript
// Key changes to AppSidebar.tsx
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

// Inside component:
const { profile, userRole, signOut } = useAuth();
const navigate = useNavigate();

const initials = profile?.full_name
  ?.split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase()
  .slice(0, 2) || "U";

const displayName = profile?.full_name || "User";
const displayRole = userRole?.role 
  ? userRole.role.replace("_", " ").replace(/^\w/, c => c.toUpperCase())
  : "Member";

const handleSignOut = async () => {
  await signOut();
  navigate("/auth/login", { replace: true });
};

// In JSX:
<AvatarFallback>{initials}</AvatarFallback>
<p className="text-sm font-medium">{displayName}</p>
<p className="text-xs text-muted-foreground">{displayRole}</p>

<DropdownMenuItem onClick={() => navigate("/settings")}>
  <User /> Profile
</DropdownMenuItem>
<DropdownMenuItem onClick={() => navigate("/settings")}>
  <Settings /> Settings
</DropdownMenuItem>
<DropdownMenuItem onClick={handleSignOut} className="text-destructive">
  <LogOut /> Log out
</DropdownMenuItem>
```

### Account Settings Form
```typescript
// Add to Settings/General.tsx
const handlePasswordChange = async (data: { 
  currentPassword: string; 
  newPassword: string; 
}) => {
  // First verify current password by attempting sign-in
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user?.email || "",
    password: data.currentPassword,
  });
  
  if (signInError) {
    toast.error("Current password is incorrect");
    return;
  }
  
  // Update to new password
  const { error } = await supabase.auth.updateUser({
    password: data.newPassword,
  });
  
  if (error) throw error;
  toast.success("Password updated successfully");
};
```

---

## Files to Create
1. `src/pages/auth/ResetPassword.tsx` - Password reset completion page

## Files to Modify
1. `src/App.tsx` - Add reset-password route
2. `src/components/layout/AppSidebar.tsx` - Fix user menu with real data + handlers
3. `src/components/layout/MobileNav.tsx` - Fix role display
4. `src/pages/Settings/General.tsx` - Add Account tab with profile/password forms
5. `src/pages/AISystems.tsx` - Fix "Start Classification" action
6. `src/pages/Tasks.tsx` - Add Edit Task functionality
7. `src/pages/Vendors.tsx` - Fix Edit/Upload actions

---

## Testing Checklist

After implementation, verify:
- [ ] Can log out from desktop sidebar
- [ ] Can log out from mobile menu
- [ ] User name shows correctly (not "John Doe")
- [ ] User role shows correctly (not hardcoded)
- [ ] Can navigate to Settings from dropdown
- [ ] Can update profile name
- [ ] Can change password from settings
- [ ] Password reset email flow works end-to-end
- [ ] "Start Classification" works in AI Systems table
- [ ] "Edit Task" opens edit dialog
- [ ] "Edit Vendor" works in Vendors table
- [ ] All navigation links work correctly
