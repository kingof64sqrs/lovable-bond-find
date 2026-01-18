import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Smartphone } from "lucide-react";

const AppBanner = () => {
  const [enabled, setEnabled] = useState(true);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [title, setTitle] = useState("Download Our Mobile App");
  const [description, setDescription] = useState("Get the best matrimonial experience on your mobile");
  const [playStoreUrl, setPlayStoreUrl] = useState("");
  const [appStoreUrl, setAppStoreUrl] = useState("");

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving app banner settings');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-3xl font-bold">Android App Banner Setting</h1>
          </div>

          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile App Download Banner
              </CardTitle>
              <CardDescription>Configure the app download banner shown to mobile users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="enabled">Show App Banner</Label>
                  <p className="text-sm text-muted-foreground">Display banner to promote mobile app</p>
                </div>
                <Switch
                  id="enabled"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                />
              </div>

              {enabled && (
                <>
                  <div>
                    <Label htmlFor="bannerImage">Banner Image</Label>
                    <Input
                      id="bannerImage"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setBannerImage(e.target.files?.[0] || null)}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">Recommended size: 1200x300 pixels</p>
                  </div>

                  <div>
                    <Label htmlFor="title">Banner Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Banner Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="mt-2"
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="playStore">Google Play Store URL</Label>
                      <Input
                        id="playStore"
                        value={playStoreUrl}
                        onChange={(e) => setPlayStoreUrl(e.target.value)}
                        placeholder="https://play.google.com/store/apps/details?id=..."
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="appStore">Apple App Store URL</Label>
                      <Input
                        id="appStore"
                        value={appStoreUrl}
                        onChange={(e) => setAppStoreUrl(e.target.value)}
                        placeholder="https://apps.apple.com/app/..."
                        className="mt-2"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave}>Save Banner Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppBanner;
