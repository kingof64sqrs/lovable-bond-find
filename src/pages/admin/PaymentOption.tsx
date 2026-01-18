import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Save } from "lucide-react";

const PaymentOption = () => {
  const [payments, setPayments] = useState({
    stripeKey: "sk_test_xxxxx",
    paypalEmail: "admin@paypal.com",
    razorpayKey: "key_test_xxxxx",
    bankTransfer: true,
    upiEnabled: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPayments(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    console.log("Payment options saved:", payments);
    alert("Payment options saved successfully!");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Payment Options</h1>
            </div>
          </header>

          <div className="p-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Payment Gateway Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stripeKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeKey"
                    name="stripeKey"
                    type="password"
                    value={payments.stripeKey}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paypalEmail">PayPal Email</Label>
                  <Input
                    id="paypalEmail"
                    name="paypalEmail"
                    type="email"
                    value={payments.paypalEmail}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="razorpayKey">Razorpay API Key</Label>
                  <Input
                    id="razorpayKey"
                    name="razorpayKey"
                    type="password"
                    value={payments.razorpayKey}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Payment Methods</h3>
                  
                  <div className="flex gap-2">
                    <input
                      id="bankTransfer"
                      name="bankTransfer"
                      type="checkbox"
                      checked={payments.bankTransfer}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="bankTransfer" className="cursor-pointer">Enable Bank Transfer</Label>
                  </div>

                  <div className="flex gap-2">
                    <input
                      id="upiEnabled"
                      name="upiEnabled"
                      type="checkbox"
                      checked={payments.upiEnabled}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <Label htmlFor="upiEnabled" className="cursor-pointer">Enable UPI</Label>
                  </div>
                </div>

                <Button onClick={handleSave} className="w-full mt-6">
                  <Save className="h-4 w-4 mr-2" /> Save Payment Options
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default PaymentOption;
