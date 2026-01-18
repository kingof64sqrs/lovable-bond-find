import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

const BasicConfig = () => {
  const [timezone, setTimezone] = useState("Asia/Kolkata");
  const [currency, setCurrency] = useState("INR");
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY");
  const [allowRegistration, setAllowRegistration] = useState(true);
  const [emailVerification, setEmailVerification] = useState(true);
  const [phoneVerification, setPhoneVerification] = useState(false);
  const [maxProfilePhotos, setMaxProfilePhotos] = useState("5");
  const [minAge, setMinAge] = useState("18");
  const [maxAge, setMaxAge] = useState("60");

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving basic site config');
  };

  return (
    <AdminLayout title="Update Basic Site Config">
      <div className="flex-1 p-8">
        <div className="grid gap-6 max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  General Configuration
                </CardTitle>
                <CardDescription>Configure basic site settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Input
                      id="timezone"
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Input
                      id="dateFormat"
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Registration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="allowRegistration">Allow New Registration</Label>
                  <Switch
                    id="allowRegistration"
                    checked={allowRegistration}
                    onCheckedChange={setAllowRegistration}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="emailVerification">Email Verification Required</Label>
                  <Switch
                    id="emailVerification"
                    checked={emailVerification}
                    onCheckedChange={setEmailVerification}
                  />
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <Label htmlFor="phoneVerification">Phone Verification Required</Label>
                  <Switch
                    id="phoneVerification"
                    checked={phoneVerification}
                    onCheckedChange={setPhoneVerification}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="maxPhotos">Max Profile Photos</Label>
                    <Input
                      id="maxPhotos"
                      type="number"
                      value={maxProfilePhotos}
                      onChange={(e) => setMaxProfilePhotos(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="minAge">Minimum Age</Label>
                    <Input
                      id="minAge"
                      type="number"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="maxAge">Maximum Age</Label>
                    <Input
                      id="maxAge"
                      type="number"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline">Reset to Default</Button>
              <Button onClick={handleSave}>Save Configuration</Button>
            </div>
          </div>
        </div>
    </AdminLayout>
  );
};

export default BasicConfig;
