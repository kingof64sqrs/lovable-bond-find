import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Droplet } from "lucide-react";

const Watermark = () => {
  const [enabled, setEnabled] = useState(true);
  const [watermarkImage, setWatermarkImage] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [position, setPosition] = useState("bottom-right");
  const [opacity, setOpacity] = useState("50");

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving watermark settings');
  };

  return (
    <AdminLayout title="Update Watermark">
      <div className="flex-1 p-8">
        <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5" />
                Photo Watermark Settings
              </CardTitle>
              <CardDescription>Add watermark to protect member profile photos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="enabled">Enable Watermark</Label>
                <Switch
                  id="enabled"
                  checked={enabled}
                  onCheckedChange={setEnabled}
                />
              </div>

              {enabled && (
                <>
                  <div>
                    <Label htmlFor="watermark">Watermark Image (Optional)</Label>
                    <Input
                      id="watermark"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setWatermarkImage(e.target.files?.[0] || null)}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="text">Watermark Text</Label>
                    <Input
                      id="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="© Your Matrimonial Site"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="position">Position</Label>
                    <Select value={position} onValueChange={setPosition}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="top-left">Top Left</SelectItem>
                        <SelectItem value="top-right">Top Right</SelectItem>
                        <SelectItem value="bottom-left">Bottom Left</SelectItem>
                        <SelectItem value="bottom-right">Bottom Right</SelectItem>
                        <SelectItem value="center">Center</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="opacity">Opacity (%)</Label>
                    <Input
                      id="opacity"
                      type="number"
                      min="0"
                      max="100"
                      value={opacity}
                      onChange={(e) => setOpacity(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </>
              )}

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

export default Watermark;
