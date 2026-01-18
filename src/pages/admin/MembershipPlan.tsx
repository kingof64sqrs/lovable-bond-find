import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus } from "lucide-react";

const MembershipPlan = () => {
  const [plans, setPlans] = useState([
    { id: 1, name: "Free", price: "₹0", features: ["Create Profile", "View 10 Profiles"] },
    { id: 2, name: "Gold", price: "₹2,999", features: ["Unlimited Views", "50 Interests/month"] },
    { id: 3, name: "Diamond", price: "₹5,999", features: ["Everything + Premium Chat"] },
  ]);

  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    features: "",
  });

  const handleAddPlan = () => {
    if (newPlan.name && newPlan.price) {
      setPlans([...plans, {
        id: plans.length + 1,
        name: newPlan.name,
        price: newPlan.price,
        features: newPlan.features.split(",").map(f => f.trim()),
      }]);
      setNewPlan({ name: "", price: "", features: "" });
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Membership Plans</h1>
            </div>
          </header>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {plans.map(plan => (
                <Card key={plan.id}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">{plan.price}</div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground">✓ {feature}</li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full">Edit Plan</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Add New Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="planName">Plan Name</Label>
                    <Input
                      id="planName"
                      value={newPlan.name}
                      onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                      placeholder="e.g., Silver"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="planPrice">Price</Label>
                    <Input
                      id="planPrice"
                      value={newPlan.price}
                      onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                      placeholder="e.g., ₹1,999"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="planFeatures">Features (comma separated)</Label>
                  <textarea
                    id="planFeatures"
                    value={newPlan.features}
                    onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                    placeholder="Feature 1, Feature 2, Feature 3"
                    className="w-full p-3 border rounded-md min-h-24"
                  />
                </div>

                <Button onClick={handleAddPlan} className="w-full">Add Plan</Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MembershipPlan;
