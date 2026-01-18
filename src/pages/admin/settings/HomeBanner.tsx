import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

const HomeBanner = () => {
  const [banner, setBanner] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");

  const handleSave = async () => {
    const formData = new FormData();
    if (banner) formData.append('banner', banner);
    formData.append('title', title);
    formData.append('subtitle', subtitle);

    // TODO: Implement API call
    console.log('Saving home banner');
  };

  return (
    <AdminLayout title="Update Home Page Banner">
      <div className="flex-1 p-8">
        <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle>Homepage Banner Settings</CardTitle>
              <CardDescription>Customize the main banner for your matrimonial site homepage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="banner">Banner Image</Label>
                <Input
                  id="banner"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setBanner(e.target.files?.[0] || null)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">Recommended size: 1920x600 pixels</p>
              </div>

              <div>
                <Label htmlFor="title">Banner Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Find Your Perfect Life Partner"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="subtitle">Banner Subtitle</Label>
                <Textarea
                  id="subtitle"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="Join thousands of members finding their soulmates"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave}>
                  <Upload className="h-4 w-4 mr-2" />
                  Save Banner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </AdminLayout>
  );
};

export default HomeBanner;
