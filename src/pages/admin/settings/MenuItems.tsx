import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Menu } from "lucide-react";

const menuItems = [
  { id: "home", name: "Home", required: true },
  { id: "search", name: "Search", required: true },
  { id: "matches", name: "Matches", required: true },
  { id: "messages", name: "Messages", required: true },
  { id: "about", name: "About Us", required: false },
  { id: "pricing", name: "Pricing", required: false },
  { id: "success", name: "Success Stories", required: false },
  { id: "blog", name: "Blog", required: false },
  { id: "help", name: "Help & Support", required: false },
  { id: "contact", name: "Contact Us", required: false },
  { id: "privacy", name: "Privacy Policy", required: false },
  { id: "terms", name: "Terms & Conditions", required: false },
];

const MenuItems = () => {
  const [items, setItems] = useState(
    menuItems.reduce((acc, item) => ({ ...acc, [item.id]: true }), {})
  );

  const handleToggle = (itemId: string) => {
    setItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleSave = async () => {
    // TODO: Implement API call
    console.log('Saving menu settings', items);
  };

  return (
    <AdminLayout title="Enable / Disable Menu Items">
      <div className="flex-1 p-8">
        <Card className="max-w-4xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Menu className="h-5 w-5" />
                Navigation Menu Configuration
              </CardTitle>
              <CardDescription>Control which menu items appear on the site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Label htmlFor={item.id} className="cursor-pointer">
                      {item.name}
                      {item.required && <span className="text-red-500 ml-1">*</span>}
                    </Label>
                  </div>
                  <Switch
                    id={item.id}
                    checked={items[item.id]}
                    onCheckedChange={() => handleToggle(item.id)}
                    disabled={item.required}
                  />
                </div>
              ))}

              <div className="flex justify-end gap-4 mt-6">
                <Button variant="outline">Reset to Default</Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </div>
    </AdminLayout>
  );
};

export default MenuItems;
