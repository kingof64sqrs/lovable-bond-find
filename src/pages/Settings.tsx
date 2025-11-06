import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Bell,
  Lock,
  Eye,
  Shield,
  Trash2,
  Save,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Settings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Notification Settings
  const [notifications, setNotifications] = useState({
    newMatches: true,
    profileViews: true,
    interests: true,
    email: true,
    sms: false
  });

  // Privacy Settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "all",
    photoVisibility: "premium",
    phoneVisibility: "premium",
    lastSeen: true
  });

  // Password
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  const handleSaveNotifications = () => {
    toast({
      title: "Settings Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleSavePrivacy = () => {
    toast({
      title: "Settings Saved",
      description: "Your privacy settings have been updated.",
    });
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleDeactivateAccount = () => {
    if (confirm("Are you sure you want to deactivate your account? This can be reversed.")) {
      toast({
        title: "Account Deactivated",
        description: "Your account has been temporarily deactivated.",
      });
      logout();
      navigate("/");
    }
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone!")) {
      toast({
        title: "Account Deleted",
        description: "Your account and all data have been permanently deleted.",
        variant: "destructive",
      });
      logout();
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container py-8 max-w-4xl">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="notifications">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy">
                <Eye className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="security">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="account">
                <Shield className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="space-y-4 mt-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>
                    Choose what notifications you want to receive
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Matches</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when you have new matches
                      </p>
                    </div>
                    <Switch
                      checked={notifications.newMatches}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, newMatches: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Profile Views</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone views your profile
                      </p>
                    </div>
                    <Switch
                      checked={notifications.profileViews}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, profileViews: checked })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Interests Received</Label>
                      <p className="text-sm text-muted-foreground">
                        Get notified when someone sends you an interest
                      </p>
                    </div>
                    <Switch
                      checked={notifications.interests}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, interests: checked })
                      }
                    />
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Delivery Methods</h4>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="space-y-0.5">
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, email: checked })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via SMS
                        </p>
                      </div>
                      <Switch
                        checked={notifications.sms}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, sms: checked })
                        }
                      />
                    </div>
                  </div>

                  <Button className="gradient-accent gap-2" onClick={handleSaveNotifications}>
                    <Save className="h-4 w-4" />
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="space-y-4 mt-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>
                    Control who can see your profile information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Profile Visibility</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) =>
                        setPrivacy({ ...privacy, profileVisibility: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Visible to All</SelectItem>
                        <SelectItem value="premium">Premium Members Only</SelectItem>
                        <SelectItem value="matches">My Matches Only</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Choose who can view your full profile
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Photo Visibility</Label>
                    <Select
                      value={privacy.photoVisibility}
                      onValueChange={(value) =>
                        setPrivacy({ ...privacy, photoVisibility: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Visible to All</SelectItem>
                        <SelectItem value="premium">Premium Members Only</SelectItem>
                        <SelectItem value="matches">My Matches Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your photos
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Phone Number Visibility</Label>
                    <Select
                      value={privacy.phoneVisibility}
                      onValueChange={(value) =>
                        setPrivacy({ ...privacy, phoneVisibility: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Hidden from All</SelectItem>
                        <SelectItem value="premium">Premium Members Only</SelectItem>
                        <SelectItem value="matches">My Matches Only</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Control who can see your phone number
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Last Seen</Label>
                      <p className="text-sm text-muted-foreground">
                        Let others see when you were last active
                      </p>
                    </div>
                    <Switch
                      checked={privacy.lastSeen}
                      onCheckedChange={(checked) =>
                        setPrivacy({ ...privacy, lastSeen: checked })
                      }
                    />
                  </div>

                  <Button className="gradient-accent gap-2" onClick={handleSavePrivacy}>
                    <Save className="h-4 w-4" />
                    Save Privacy Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-4 mt-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current">Current Password</Label>
                    <Input
                      id="current"
                      type="password"
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords({ ...passwords, current: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new">New Password</Label>
                    <Input
                      id="new"
                      type="password"
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm">Confirm New Password</Label>
                    <Input
                      id="confirm"
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                    />
                  </div>

                  <Button className="gradient-accent gap-2" onClick={handleChangePassword}>
                    <Lock className="h-4 w-4" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription>
                      Two-factor authentication is currently disabled. Enable it to secure your account with an additional verification step.
                    </AlertDescription>
                  </Alert>
                  <Button className="mt-4" variant="outline">
                    Enable 2FA
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account" className="space-y-4 mt-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>
                    View your account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-muted-foreground">Name</Label>
                      <p className="font-medium">{user?.name}</p>
                    </div>
                    <div>
                      <Label className="text-muted-foreground">Email</Label>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Status</Label>
                    <p className="font-medium text-green-600">Active</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-orange-200 dark:border-orange-900">
                <CardHeader>
                  <CardTitle className="text-orange-600 dark:text-orange-400">
                    Deactivate Account
                  </CardTitle>
                  <CardDescription>
                    Temporarily disable your account. You can reactivate it anytime.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="text-orange-600 border-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950" onClick={handleDeactivateAccount}>
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Deactivate Account
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-soft border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">Delete Account</CardTitle>
                  <CardDescription>
                    Permanently delete your account and all data. This action cannot be undone.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Warning: This will permanently delete your account, profile, and all associated data.
                    </AlertDescription>
                  </Alert>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account Permanently
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Settings;
