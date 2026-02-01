import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Loader2, CheckCircle2, XCircle, Building2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useValidateInvite, useAcceptInvite } from "@/hooks/useTeamInvites";
import klarvoLogo from "@/assets/klarvo-logo-horizontal.svg";

export default function AcceptInvite() {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { user, profile, isLoading: authLoading } = useAuth();
  const { data: inviteData, isLoading: validating, error: validateError } = useValidateInvite(token || null);
  const { mutate: acceptInvite, isPending: accepting } = useAcceptInvite();
  const [accepted, setAccepted] = useState(false);

  // If user is already in an organization, show error
  const alreadyInOrg = profile?.organization_id !== null;

  const handleAccept = () => {
    if (!token) return;
    
    acceptInvite(token, {
      onSuccess: () => {
        setAccepted(true);
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      },
    });
  };

  // Show loading while checking auth state
  if (authLoading || validating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Validating invitation...</p>
        </div>
      </div>
    );
  }

  // Invalid or expired invite
  if (!inviteData?.valid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={klarvoLogo} alt="Klarvo" className="h-8 mx-auto mb-4" />
            <div className="mx-auto mb-4 rounded-full bg-destructive/10 p-3 w-fit">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Invalid Invitation</CardTitle>
            <CardDescription>
              This invitation link is invalid or has expired. Please ask your
              team admin to send a new invitation.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="outline">
              <Link to="/">Go to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User needs to sign up or log in first
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={klarvoLogo} alt="Klarvo" className="h-8 mx-auto mb-4" />
            <div className="mx-auto mb-4 rounded-full bg-primary/10 p-3 w-fit">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>You're Invited!</CardTitle>
            <CardDescription>
              You've been invited to join{" "}
              <strong>{inviteData.organization_name}</strong> on Klarvo.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg bg-muted p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Invitation for</p>
              <p className="font-medium">{inviteData.email}</p>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Create an account or sign in to accept this invitation.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link to={`/auth/signup?invite=${token}&email=${encodeURIComponent(inviteData.email || "")}`}>
                  Create Account
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to={`/auth/login?invite=${token}`}>
                  Sign In
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User already belongs to an organization
  if (alreadyInOrg) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={klarvoLogo} alt="Klarvo" className="h-8 mx-auto mb-4" />
            <div className="mx-auto mb-4 rounded-full bg-amber-500/10 p-3 w-fit">
              <Shield className="h-8 w-8 text-amber-500" />
            </div>
            <CardTitle>Already in an Organization</CardTitle>
            <CardDescription>
              You're already a member of an organization. You'll need to leave
              your current organization before joining a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Accepted successfully
  if (accepted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <img src={klarvoLogo} alt="Klarvo" className="h-8 mx-auto mb-4" />
            <div className="mx-auto mb-4 rounded-full bg-emerald-500/10 p-3 w-fit">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <CardTitle>Welcome to the Team!</CardTitle>
            <CardDescription>
              You've successfully joined{" "}
              <strong>{inviteData.organization_name}</strong>. Redirecting to
              your dashboard...
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="h-5 w-5 animate-spin text-primary mx-auto" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Ready to accept
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img src={klarvoLogo} alt="Klarvo" className="h-8 mx-auto mb-4" />
          <div className="mx-auto mb-4 rounded-full bg-primary/10 p-3 w-fit">
            <Building2 className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Join {inviteData.organization_name}</CardTitle>
          <CardDescription>
            You've been invited to join this organization on Klarvo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-muted p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Invitation for</p>
            <p className="font-medium">{inviteData.email}</p>
          </div>
          <Button
            onClick={handleAccept}
            disabled={accepting}
            className="w-full"
          >
            {accepting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Accept Invitation"
            )}
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link to="/">Cancel</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
