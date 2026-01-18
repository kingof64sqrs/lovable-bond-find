import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MembershipPlan = () => {
  const { toast } = useToast();
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/membership-plans', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setPlans(result.data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch plans', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const [newPlan, setNewPlan] = useState({
    name: "",
    price: "",
    features: "",
  });

  const handleAddPlan = async () => {
    if (!newPlan.name || !newPlan.price) {
      toast({ title: 'Validation Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/admin/membership-plans', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newPlan.name,
          price: newPlan.price,
          features: newPlan.features.split(",").map(f => f.trim())
        })
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Plan created successfully' });
        fetchPlans();
        setNewPlan({ name: "", price: "", features: "" });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create plan', variant: 'destructive' });
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
            {loading ? (
              <div className="text-center py-8">Loading plans...</div>
            ) : plans.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No membership plans found</div>
            ) : (
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
            )}

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
