import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Image as ImageIcon } from "lucide-react";

const FaviconLogo = () => {
  const [favicon, setFavicon] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  const handleSave = async () => {
    const formData = new FormData();
    if (favicon) formData.append('favicon', favicon);
    if (logo) formData.append('logo', logo);

    // TODO: Implement API call
    console.log('Saving favicon and logo');
  };

  return (
    <AdminLayout title="Update Favicon & Logo">
      <div className="flex-1 p-8">
        <div className="grid gap-6 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Site Favicon</CardTitle>
                <CardDescription>Upload a favicon for your matrimonial site (16x16 or 32x32 pixels)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="favicon">Choose Favicon File</Label>
                    <Input
                      id="favicon"
                      type="file"
                      accept=".ico,.png"
                      onChange={(e) => setFavicon(e.target.files?.[0] || null)}
                    />
                  </div>
                  {favicon && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <ImageIcon className="h-4 w-4" />
                      {favicon.name}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Site Logo</CardTitle>
                <CardDescription>Upload the main logo for your matrimonial site</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label htmlFor="logo">Choose Logo File</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setLogo(e.target.files?.[0] || null)}
                    />
                  </div>
                  {logo && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <ImageIcon className="h-4 w-4" />
                      {logo.name}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleSave} disabled={!favicon && !logo}>
                <Upload className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
    </AdminLayout>
  );
};

export default FaviconLogo;
