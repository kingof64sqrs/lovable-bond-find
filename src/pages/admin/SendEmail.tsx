import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

const SendEmail = () => {
  const [email, setEmail] = useState({
    recipients: "",
    subject: "",
    message: "",
    template: "none",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmail(prev => ({ ...prev, [name]: value }));
  };

  const handleSend = () => {
    console.log("Email sending:", email);
    alert("Email sent successfully!");
    setEmail({ recipients: "", subject: "", message: "", template: "none" });
  };

  return (
    <AdminLayout title="Send Email">
      <div className="p-6 max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Compose Email</CardTitle>
                <CardDescription>Send emails to your members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients (comma separated emails)</Label>
                  <textarea
                    id="recipients"
                    name="recipients"
                    value={email.recipients}
                    onChange={handleChange}
                    placeholder="email1@example.com, email2@example.com"
                    className="w-full p-3 border rounded-md min-h-20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="template">Email Template</Label>
                  <select
                    id="template"
                    name="template"
                    value={email.template}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="none">No Template</option>
                    <option value="welcome">Welcome Email</option>
                    <option value="newsletter">Newsletter</option>
                    <option value="promotion">Promotion</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={email.subject}
                    onChange={handleChange}
                    placeholder="Email subject"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={email.message}
                    onChange={handleChange}
                    placeholder="Email message content"
                    className="w-full p-3 border rounded-md min-h-40"
                  />
                </div>

                <Button onClick={handleSend} className="w-full">
                  <Send className="h-4 w-4 mr-2" /> Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
    </AdminLayout>
  );
};

export default SendEmail;
