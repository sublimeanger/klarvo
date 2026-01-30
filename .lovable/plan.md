
# World-Class Design Upgrade & Marketing Pages Plan

## Executive Summary
A comprehensive design system overhaul and complete marketing site build for Klarvo - the EU AI Act Compliance Hub. This plan delivers a pixel-perfect, world-class experience across desktop and mobile, with all necessary marketing, legal, and product pages.

---

## Part 1: Design System Upgrade

### 1.1 Enhanced Color System
Expand the current design tokens for richer visual hierarchy:

- **Extended Primary Palette**: Add primary-50 through primary-950 shades
- **Surface Colors**: Multiple background layers (surface-0, surface-1, surface-2)
- **Gradient System**: Branded gradients for hero sections and CTAs
- **Dark Mode Polish**: Refined dark theme with proper contrast ratios

### 1.2 Typography Enhancements
- Add display font sizes for marketing headlines (5xl, 6xl, 7xl)
- Introduce font-weight variations (light through black)
- Letter-spacing and line-height fine-tuning per heading level
- Add Inter font weights 200 and 800 for more range

### 1.3 Animation Library Expansion
Add keyframes and animation utilities:

```text
New Animations:
- float (subtle y-axis movement)
- pulse-glow (soft glow effect)  
- slide-up-fade (content reveal)
- scale-fade-in (modal/card entrances)
- shimmer (loading states)
- gradient-shift (animated gradients)
- stagger-children (sequential animations)
```

### 1.4 Component Enhancements

| Component | Upgrades |
|-----------|----------|
| Button | Add `size="xl"`, gradient variant, icon-only circle style |
| Card | Add glass morphism, elevated shadow states, gradient borders |
| Badge | Add shimmer animation, outline variants |
| Input | Add floating labels, enhanced focus states |
| Sections | Container variants (narrow/wide/full) |

### 1.5 New Utility Classes
```text
.glass-card - Frosted glass effect
.gradient-border - Animated gradient borders  
.text-gradient - Multi-color text gradients
.shadow-glow - Colored glow shadows
.hover-lift - 3D lift on hover
.pattern-dots - Subtle dot pattern backgrounds
.pattern-grid - Subtle grid pattern backgrounds
```

---

## Part 2: Marketing Layout Components

### 2.1 MarketingLayout Component
Shared wrapper for all public pages:
- Responsive navigation header with transparent/solid scroll state
- Mega-menu for product features
- Mobile drawer navigation with smooth animations
- Announcement bar slot (for promotions/updates)
- Sticky CTA bar on mobile

### 2.2 Footer Component
Full-featured footer with:
- 4-column link grid (Product, Resources, Company, Legal)
- Newsletter signup
- Social links
- Trust badges (EU flag, security certifications)
- Language/region selector placeholder
- Copyright with dynamic year

### 2.3 Reusable Section Components
```text
- HeroSection (multiple variants: centered, split, video)
- FeatureGrid (icon + text cards)
- FeatureShowcase (alternating image/text sections)
- TestimonialSection (carousel + static grid variants)
- LogoCloud (customer/partner logos)
- CTASection (banner style, card style)
- FAQSection (accordion-based)
- ComparisonTable (feature matrix)
- TimelineSection (for EU AI Act dates)
- StatsSection (animated counters)
```

---

## Part 3: Marketing Pages

### 3.1 Landing Page (`/` for logged-out users)
**Route**: `/` (conditional: show landing if not logged in, dashboard if logged in)

Sections:
1. **Hero**: Full-width with animated gradient background
   - H1: "EU AI Act Compliance — Simple, Evidence-Based, Audit-Ready"
   - Subheadline + dual CTAs (Start Free / Book Demo)
   - Social proof badges (trust signals)
   
2. **Logo Cloud**: "Trusted by compliance teams at..."

3. **Problem/Solution**: 3-column grid showing pain points → solutions

4. **Feature Showcase**: 4-6 alternating sections with screenshots:
   - AI System Inventory
   - Classification Engine
   - Evidence Vault
   - Export Packs
   - Control Library
   - Training Tracking

5. **EU AI Act Timeline**: Visual timeline with key dates

6. **How It Works**: 3-step process diagram

7. **Testimonials**: Quote cards with photos

8. **Pricing Preview**: Compact tier comparison → link to /pricing

9. **Final CTA**: Full-width gradient section

### 3.2 Features Page (`/features`)
Deep-dive into platform capabilities with:
- Hero with product screenshot
- Tabbed feature sections (Inventory, Classification, Evidence, etc.)
- Interactive demo previews (animated GIFs/videos)
- Comparison with alternatives

### 3.3 Use Cases Page (`/use-cases`)
Audience-specific pages:
- `/use-cases/sme` - SME compliance
- `/use-cases/enterprise` - Large organization
- `/use-cases/hr` - HR/recruiting AI
- `/use-cases/fintech` - Financial services
- `/use-cases/healthcare` - Healthcare AI

### 3.4 About Page (`/about`)
Company information:
- Mission and vision
- Team section (optional placeholder)
- Company values
- Contact information

### 3.5 Contact Page (`/contact`)
- Contact form (name, email, company, message)
- Sales inquiry option
- Support links
- Office address placeholder

### 3.6 Book Demo Page (`/demo`)
- Calendly-style embed placeholder
- Demo request form
- What to expect section

### 3.7 Blog/Resources Landing (`/resources`)
- Resource hub with categories
- Featured articles placeholder
- EU AI Act guides section
- Webinars/events placeholder

### 3.8 Documentation Page (`/docs`)
- Getting started guide placeholder
- Link structure for future docs

---

## Part 4: Legal & Compliance Pages

### 4.1 Terms of Service (`/terms`)
Full legal page with:
- Table of contents
- Standard SaaS terms sections
- Data processing information
- Usage restrictions
- Liability limitations

### 4.2 Privacy Policy (`/privacy`)
GDPR-compliant privacy policy:
- Data collection practices
- Cookie policy
- Third-party services
- Data retention
- User rights
- Contact for privacy inquiries

### 4.3 Cookie Policy (`/cookies`)
- Types of cookies used
- Cookie preferences explanation
- Third-party cookies
- How to manage cookies

### 4.4 Acceptable Use Policy (`/aup`)
- Permitted uses
- Prohibited activities
- Enforcement actions

### 4.5 Data Processing Agreement (`/dpa`)
- GDPR DPA template
- Sub-processor list
- Security measures

### 4.6 Security Page (`/security`)
- Security practices overview
- Compliance certifications (placeholder)
- Data encryption details
- Infrastructure overview
- Responsible disclosure policy

### 4.7 GDPR Compliance (`/gdpr`)
- How the platform supports GDPR
- Data subject rights
- DPO contact information

---

## Part 5: Additional Pages

### 5.1 Enhanced 404 Page
- Branded illustration
- Search functionality
- Popular links
- Back to home button

### 5.2 Status Page (`/status`)
- System status indicators (placeholder)
- Uptime history placeholder

### 5.3 Changelog (`/changelog`)
- Version history format
- Feature announcements

### 5.4 Integrations Page (`/integrations`)
- Available integrations (Jira, Asana, etc.)
- Coming soon integrations

### 5.5 Partners Page (`/partners`)
- Partner program overview
- Benefits of partnership
- Application form

### 5.6 Press Kit (`/press`)
- Brand assets download
- Logo guidelines
- Boilerplate text

### 5.7 Careers Page (`/careers`)
- Company culture section
- Benefits overview
- Job listings placeholder

---

## Part 6: Mobile Optimization

### 6.1 Responsive Breakpoints
```text
Mobile: 320px - 639px
Tablet: 640px - 1023px  
Desktop: 1024px - 1279px
Large: 1280px+
```

### 6.2 Mobile-Specific Enhancements
- Touch-optimized tap targets (min 44px)
- Swipe gestures for carousels
- Bottom sheet patterns for mobile forms
- Fixed mobile CTA bar on marketing pages
- Hamburger menu with full-screen overlay
- Optimized form layouts (stacked inputs)

### 6.3 Mobile Navigation Pattern
- Sticky header that hides on scroll down, shows on scroll up
- Mobile menu with smooth slide-in animation
- Nested accordion for submenu items
- Quick action buttons (Login, Start Free)

---

## Part 7: App Dashboard Polish

### 7.1 Dashboard Improvements
- Skeleton loading states for all cards
- Empty state illustrations
- Micro-interactions on hover
- Animated number counters

### 7.2 Sidebar Refinements
- Smooth collapse/expand transitions
- Tooltip labels when collapsed
- Active state animations
- Mobile: slide-out drawer pattern

### 7.3 Form and Wizard Polish
- Progress indicators with animations
- Step transitions with slide effects
- Inline validation with smooth reveals
- Success state celebrations

---

## Part 8: Performance & Polish

### 8.1 Image Optimization
- Lazy loading for below-fold images
- Responsive image sizes
- WebP format support
- Blur placeholder loading

### 8.2 Animation Performance
- GPU-accelerated transforms
- Reduced motion media query support
- Intersection Observer for scroll-triggered animations

### 8.3 Accessibility
- Focus visible styles
- Skip to content link
- ARIA labels for all interactive elements
- Color contrast verification

---

## Technical Implementation Structure

### New Files to Create

**Layout Components:**
```text
src/components/marketing/MarketingLayout.tsx
src/components/marketing/MarketingHeader.tsx
src/components/marketing/MarketingFooter.tsx
src/components/marketing/MobileNav.tsx
```

**Section Components:**
```text
src/components/marketing/HeroSection.tsx
src/components/marketing/FeatureGrid.tsx
src/components/marketing/FeatureShowcase.tsx
src/components/marketing/TestimonialSection.tsx
src/components/marketing/LogoCloud.tsx
src/components/marketing/CTASection.tsx
src/components/marketing/TimelineSection.tsx
src/components/marketing/StatsSection.tsx
src/components/marketing/ComparisonTable.tsx
```

**Marketing Pages:**
```text
src/pages/marketing/LandingPage.tsx
src/pages/marketing/Features.tsx
src/pages/marketing/About.tsx
src/pages/marketing/Contact.tsx
src/pages/marketing/Demo.tsx
src/pages/marketing/Resources.tsx
src/pages/marketing/Integrations.tsx
src/pages/marketing/Partners.tsx
src/pages/marketing/Careers.tsx
src/pages/marketing/Press.tsx
src/pages/marketing/Status.tsx
src/pages/marketing/Changelog.tsx
```

**Use Case Pages:**
```text
src/pages/use-cases/SME.tsx
src/pages/use-cases/Enterprise.tsx
src/pages/use-cases/HR.tsx
src/pages/use-cases/Fintech.tsx
src/pages/use-cases/Healthcare.tsx
```

**Legal Pages:**
```text
src/pages/legal/Terms.tsx
src/pages/legal/Privacy.tsx
src/pages/legal/Cookies.tsx
src/pages/legal/AUP.tsx
src/pages/legal/DPA.tsx
src/pages/legal/Security.tsx
src/pages/legal/GDPR.tsx
```

**Design System Updates:**
```text
src/index.css (enhanced)
tailwind.config.ts (enhanced)
src/lib/animations.ts (new)
```

---

## Route Structure Summary

| Route | Page | Type |
|-------|------|------|
| `/` | Landing (logged out) / Dashboard (logged in) | Marketing/App |
| `/features` | Features | Marketing |
| `/pricing` | Pricing (exists, enhance) | Marketing |
| `/about` | About Us | Marketing |
| `/contact` | Contact | Marketing |
| `/demo` | Book Demo | Marketing |
| `/resources` | Resources Hub | Marketing |
| `/integrations` | Integrations | Marketing |
| `/partners` | Partner Program | Marketing |
| `/careers` | Careers | Marketing |
| `/press` | Press Kit | Marketing |
| `/status` | System Status | Marketing |
| `/changelog` | Changelog | Marketing |
| `/use-cases/*` | Use Case Pages | Marketing |
| `/terms` | Terms of Service | Legal |
| `/privacy` | Privacy Policy | Legal |
| `/cookies` | Cookie Policy | Legal |
| `/aup` | Acceptable Use Policy | Legal |
| `/dpa` | Data Processing Agreement | Legal |
| `/security` | Security | Legal |
| `/gdpr` | GDPR Compliance | Legal |

---

## Implementation Phases

**Phase 1: Design System Foundation**
- Enhanced CSS variables and Tailwind config
- Animation library
- New utility classes

**Phase 2: Marketing Layout & Core Components**
- MarketingLayout, Header, Footer
- Section components (Hero, Features, CTA, etc.)

**Phase 3: Primary Marketing Pages**
- Landing page
- Features page
- Enhanced Pricing page

**Phase 4: Legal Pages**
- Terms, Privacy, Cookies, Security, DPA, AUP, GDPR

**Phase 5: Secondary Marketing Pages**
- About, Contact, Demo, Resources
- Use case pages

**Phase 6: Additional Pages**
- Integrations, Partners, Careers, Press, Status, Changelog

**Phase 7: App Dashboard Polish**
- Enhanced sidebar
- Improved forms and wizards
- Mobile app experience

**Phase 8: Final Polish**
- Cross-browser testing
- Performance optimization
- Accessibility audit
