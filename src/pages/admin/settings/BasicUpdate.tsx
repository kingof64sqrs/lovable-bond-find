import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Globe } from "lucide-react";

const BasicUpdate = () => {
  const [siteName, setSiteName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving basic site updates');
  };

  return (
    <AdminLayout title="Update Basic Site Update">
      <div className="flex-1 p-8">
        <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Basic Site Information
              </CardTitle>
              <CardDescription>Update basic details about your matrimonial website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="Your Matrimonial Site Name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="tagline">Site Tagline</Label>
                <Input
                  id="tagline"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Find Your Perfect Match"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="description">Site Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of your matrimonial service"
                  className="mt-2"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="keywords">SEO Keywords</Label>
                <Input
                  id="keywords"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="matrimony, marriage, matchmaking, life partner"
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">Comma-separated keywords for SEO</p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="maintenance">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Put site in maintenance mode</p>
                </div>
                <Switch
                  id="maintenance"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </AdminLayout>
  );
};

export default BasicUpdate;
