import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminLayout from "@/components/AdminLayout";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { API_BASE_URL } from "@/config/api";

const PaymentOption = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState({
    stripeKey: "",
    paypalEmail: "",
    razorpayKey: "",
    bankTransfer: false,
    upiEnabled: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPaymentOptions();
  }, []);

  const fetchPaymentOptions = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/admin/payment-options`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success && result.data && result.data.length > 0) {
        setPayments(result.data[0]);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch payment options', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setPayments(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/payment-options`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payments)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Payment options saved successfully' });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to save payment options', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Payment Options">
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
    </AdminLayout>
  );
};

export default PaymentOption;
