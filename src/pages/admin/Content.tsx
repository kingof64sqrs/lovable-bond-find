import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AdminSidebar from "@/components/AdminSidebar";
import { Plus, Trash2 } from "lucide-react";

const ContentManagement = () => {
  const [contents, setContents] = useState([
    { id: 1, title: "How to Create Profile", category: "FAQ", status: "published" },
    { id: 2, title: "Privacy Policy", category: "Legal", status: "published" },
    { id: 3, title: "Terms of Service", category: "Legal", status: "draft" },
  ]);

  const [newContent, setNewContent] = useState({
    title: "",
    category: "",
  });

  const handleAddContent = () => {
    if (newContent.title) {
      setContents([...contents, { id: contents.length + 1, ...newContent, status: "draft" }]);
      setNewContent({ title: "", category: "" });
    }
  };

  const handleDelete = (id: number) => {
    setContents(contents.filter(c => c.id !== id));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Content Management</h1>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" /> Add New Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      placeholder="Content title"
                      value={newContent.title}
                      onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Input
                      placeholder="Category"
                      value={newContent.category}
                      onChange={(e) => setNewContent({ ...newContent, category: e.target.value })}
                    />
                  </div>
                </div>

                <Button onClick={handleAddContent} className="w-full">Add Content</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Contents</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contents.map((content) => (
                      <TableRow key={content.id}>
                        <TableCell className="font-medium">{content.title}</TableCell>
                        <TableCell>{content.category}</TableCell>
                        <TableCell className="capitalize">{content.status}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDelete(content.id)}
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

export default ContentManagement;
