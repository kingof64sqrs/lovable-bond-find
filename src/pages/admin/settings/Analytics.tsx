import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Code } from "lucide-react";

const Analytics = () => {
  const [googleAnalytics, setGoogleAnalytics] = useState("");
  const [facebookPixel, setFacebookPixel] = useState("");
  const [customCode, setCustomCode] = useState("");

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving analytics code');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-3xl font-bold">Update/Add Analytics Code</h1>
          </div>

          <div className="grid gap-6 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Google Analytics
                </CardTitle>
                <CardDescription>Add your Google Analytics tracking ID</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="ga">Google Analytics ID</Label>
                <Textarea
                  id="ga"
                  value={googleAnalytics}
                  onChange={(e) => setGoogleAnalytics(e.target.value)}
                  placeholder="G-XXXXXXXXXX or UA-XXXXXXXXX-X"
                  className="mt-2 font-mono"
                  rows={3}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facebook Pixel</CardTitle>
                <CardDescription>Add your Facebook Pixel tracking code</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="fb">Facebook Pixel ID</Label>
                <Textarea
                  id="fb"
                  value={facebookPixel}
                  onChange={(e) => setFacebookPixel(e.target.value)}
                  placeholder="Paste your Facebook Pixel code here"
                  className="mt-2 font-mono"
                  rows={5}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Tracking Code</CardTitle>
                <CardDescription>Add any custom analytics or tracking scripts</CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="custom">Custom Code</Label>
                <Textarea
                  id="custom"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="Paste custom tracking scripts here (will be added to <head>)"
                  className="mt-2 font-mono"
                  rows={8}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Clear All</Button>
              <Button onClick={handleSave}>Save Analytics Code</Button>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Analytics;
