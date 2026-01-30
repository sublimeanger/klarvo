import { useState, useEffect } from "react";
import { Bell, Mail, Loader2, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface NotificationPreferences {
  email_notifications_enabled: boolean;
  notification_frequency: string;
}

export function NotificationSettings() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingTest, setIsSendingTest] = useState(false);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    email_notifications_enabled: true,
    notification_frequency: "daily",
  });

  useEffect(() => {
    if (user?.id) {
      loadPreferences();
    }
  }, [user?.id]);

  const loadPreferences = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email_notifications_enabled, notification_frequency")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
      
      setPreferences({
        email_notifications_enabled: data.email_notifications_enabled ?? true,
        notification_frequency: data.notification_frequency ?? "daily",
      });
    } catch (error) {
      console.error("Failed to load notification preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreferences = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          email_notifications_enabled: preferences.email_notifications_enabled,
          notification_frequency: preferences.notification_frequency,
        })
        .eq("id", user?.id);

      if (error) throw error;
      toast.success("Notification preferences saved");
    } catch (error) {
      console.error("Failed to save notification preferences:", error);
      toast.error("Failed to save preferences");
    } finally {
      setIsSaving(false);
    }
  };

  const sendTestDigest = async () => {
    setIsSendingTest(true);
    try {
      const { error } = await supabase.functions.invoke("send-compliance-digest", {
        body: { userId: user?.id, forceRefresh: true },
      });

      if (error) throw error;
      toast.success("Test digest sent! Check your email.");
    } catch (error) {
      console.error("Failed to send test digest:", error);
      toast.error("Failed to send test digest");
    } finally {
      setIsSendingTest(false);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Email Notifications
        </CardTitle>
        <CardDescription>
          Configure how and when you receive compliance digest emails
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="notifications-enabled" className="text-base">
              Enable email notifications
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive digest emails about overdue tasks and expiring items
            </p>
          </div>
          <Switch
            id="notifications-enabled"
            checked={preferences.email_notifications_enabled}
            onCheckedChange={(checked) =>
              setPreferences((prev) => ({
                ...prev,
                email_notifications_enabled: checked,
              }))
            }
          />
        </div>

        {preferences.email_notifications_enabled && (
          <div className="space-y-2">
            <Label htmlFor="frequency">Notification frequency</Label>
            <Select
              value={preferences.notification_frequency}
              onValueChange={(value) =>
                setPreferences((prev) => ({
                  ...prev,
                  notification_frequency: value,
                }))
              }
            >
              <SelectTrigger id="frequency" className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily digest</SelectItem>
                <SelectItem value="weekly">Weekly digest</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              {preferences.notification_frequency === "daily"
                ? "Receive a summary every day with items needing attention"
                : "Receive a weekly summary every Monday"}
            </p>
          </div>
        )}

        <div className="flex items-center gap-3 pt-4 border-t">
          <Button onClick={savePreferences} disabled={isSaving}>
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Preferences
          </Button>
          
          {preferences.email_notifications_enabled && (
            <Button
              variant="outline"
              onClick={sendTestDigest}
              disabled={isSendingTest}
            >
              {isSendingTest ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Send className="mr-2 h-4 w-4" />
              )}
              Send Test Digest
            </Button>
          )}
        </div>

        <div className="rounded-lg bg-muted/50 p-4 mt-4">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">What's included in digests?</p>
              <ul className="mt-1 text-muted-foreground space-y-1">
                <li>• Overdue tasks requiring immediate attention</li>
                <li>• Evidence files expiring in the next 30 days</li>
                <li>• Vendor attestations nearing expiration</li>
                <li>• Controls due for review</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
