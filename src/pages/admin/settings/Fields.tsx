import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToggleLeft } from "lucide-react";

const profileFields = [
  { id: "religion", name: "Religion", required: true },
  { id: "caste", name: "Caste", required: true },
  { id: "motherTongue", name: "Mother Tongue", required: true },
  { id: "maritalStatus", name: "Marital Status", required: true },
  { id: "height", name: "Height", required: true },
  { id: "education", name: "Education", required: true },
  { id: "occupation", name: "Occupation", required: true },
  { id: "income", name: "Annual Income", required: false },
  { id: "familyType", name: "Family Type", required: false },
  { id: "familyStatus", name: "Family Status", required: false },
  { id: "horoscope", name: "Horoscope Details", required: false },
  { id: "birthTime", name: "Birth Time", required: false },
  { id: "birthPlace", name: "Birth Place", required: false },
  { id: "aboutFamily", name: "About Family", required: false },
  { id: "expectations", name: "Partner Expectations", required: false },
];

const Fields = () => {
  const [fields, setFields] = useState(
    profileFields.reduce((acc, field) => ({ ...acc, [field.id]: true }), {})
  );

  const handleToggle = (fieldId: string) => {
    setFields(prev => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving field settings', fields);
  };

  return (
    <AdminLayout title="Enable / Disable Fields">
      <div className="flex-1 p-8">
        <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ToggleLeft className="h-5 w-5" />
                Profile Field Configuration
              </CardTitle>
              <CardDescription>Control which fields appear in member profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {profileFields.map((field) => (
                <div key={field.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Label htmlFor={field.id} className="cursor-pointer">
                      {field.name}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  </div>
                  <Switch
                    id={field.id}
                    checked={fields[field.id]}
                    onCheckedChange={() => handleToggle(field.id)}
                    disabled={field.required}
                  />
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline">Reset to Default</Button>
                <Button onClick={handleSave}>Save Configuration</Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </AdminLayout>
  );
};

export default Fields;
