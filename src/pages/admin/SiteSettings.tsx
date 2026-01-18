import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Save } from "lucide-react";

const SiteSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Lovable Matrimony",
    siteEmail: "admin@lovable.com",
    sitePhone: "+91-1234567890",
    supportEmail: "support@lovable.com",
    maintenanceMode: false,
    maxProfileViews: "100",
    maxInterestsSent: "50",
    minAge: "18",
    maxAge: "60",
    verificationRequired: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Site Settings</h1>
              </div>
            </div>
          </header>

          <div className="p-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>Configure your site settings and preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siteEmail">Site Email</Label>
                  <Input
                    id="siteEmail"
                    name="siteEmail"
                    type="email"
                    value={settings.siteEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sitePhone">Site Phone</Label>
                  <Input
                    id="sitePhone"
                    name="sitePhone"
                    value={settings.sitePhone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input
                    id="supportEmail"
                    name="supportEmail"
                    type="email"
                    value={settings.supportEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Feature Limits</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxProfileViews">Max Profile Views Per Day</Label>
                    <Input
                      id="maxProfileViews"
                      name="maxProfileViews"
                      type="number"
                      value={settings.maxProfileViews}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxInterestsSent">Max Interests Sent Per Month</Label>
                    <Input
                      id="maxInterestsSent"
                      name="maxInterestsSent"
                      type="number"
                      value={settings.maxInterestsSent}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Age Restrictions</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="minAge">Minimum Age</Label>
                      <Input
                        id="minAge"
                        name="minAge"
                        type="number"
                        value={settings.minAge}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxAge">Maximum Age</Label>
                      <Input
                        id="maxAge"
                        name="maxAge"
                        type="number"
                        value={settings.maxAge}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <input
                    id="verificationRequired"
                    name="verificationRequired"
                    type="checkbox"
                    checked={settings.verificationRequired}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="verificationRequired" className="cursor-pointer">Email Verification Required</Label>
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <input
                    id="maintenanceMode"
                    name="maintenanceMode"
                    type="checkbox"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <Label htmlFor="maintenanceMode" className="cursor-pointer">Maintenance Mode</Label>
                </div>

                <Button onClick={handleSave} className="w-full mt-6">
                  <Save className="h-4 w-4 mr-2" /> Save Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SiteSettings;
