import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Trash2 } from "lucide-react";

const EmailTemplates = () => {
  const [templates, setTemplates] = useState([
    { id: 1, name: "Welcome Email", subject: "Welcome to Lovable", status: "active" },
    { id: 2, name: "Password Reset", subject: "Reset your password", status: "active" },
    { id: 3, name: "Profile Verified", subject: "Your profile is verified", status: "inactive" },
  ]);

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
  });

  const handleAddTemplate = () => {
    if (newTemplate.name && newTemplate.subject) {
      setTemplates([...templates, { id: templates.length + 1, ...newTemplate, status: "active" }]);
      setNewTemplate({ name: "", subject: "" });
    }
  };

  const handleDelete = (id: number) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Email Templates</h1>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Add New Template
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Template Name</Label>
                  <Input
                    placeholder="e.g., Welcome Email"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email Subject</Label>
                  <Input
                    placeholder="e.g., Welcome to Lovable"
                    value={newTemplate.subject}
                    onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
                  />
                </div>

                <Button onClick={handleAddTemplate} className="w-full">Add Template</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {templates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">{template.name}</TableCell>
                        <TableCell>{template.subject}</TableCell>
                        <TableCell className="capitalize">{template.status}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(template.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default EmailTemplates;
