import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IdCard } from "lucide-react";

const ProfileId = () => {
  const [prefix, setPrefix] = useState("MAT");
  const [startNumber, setStartNumber] = useState("10001");
  const [format, setFormat] = useState("prefix-number");

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving profile ID settings');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1 p-8">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <h1 className="text-3xl font-bold">Update Profile Id</h1>
          </div>

          <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IdCard className="h-5 w-5" />
                Profile ID Configuration
              </CardTitle>
              <CardDescription>Configure how member profile IDs are generated</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="prefix">Profile ID Prefix</Label>
                <Input
                  id="prefix"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="MAT"
                  className="mt-2"
                  maxLength={5}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Example: MAT, BRIDE, GROOM (max 5 characters)
                </p>
              </div>

              <div>
                <Label htmlFor="startNumber">Starting Number</Label>
                <Input
                  id="startNumber"
                  type="number"
                  value={startNumber}
                  onChange={(e) => setStartNumber(e.target.value)}
                  className="mt-2"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Profile IDs will start from this number
                </p>
              </div>

              <div>
                <Label htmlFor="format">ID Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prefix-number">Prefix-Number (e.g., MAT-10001)</SelectItem>
                    <SelectItem value="prefix_number">Prefix_Number (e.g., MAT_10001)</SelectItem>
                    <SelectItem value="prefixnumber">PrefixNumber (e.g., MAT10001)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <Label className="text-sm font-medium">Preview</Label>
                <div className="text-2xl font-bold mt-2">
                  {format === "prefix-number" && `${prefix}-${startNumber}`}
                  {format === "prefix_number" && `${prefix}_${startNumber}`}
                  {format === "prefixnumber" && `${prefix}${startNumber}`}
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleSave}>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProfileId;
