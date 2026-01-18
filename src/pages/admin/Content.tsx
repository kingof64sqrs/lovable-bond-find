import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContentManagement = () => {
  const { toast } = useToast();
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchContents();
  }, []);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/content', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setContents(result.data || []);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch content', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const [newContent, setNewContent] = useState({
    title: "",
    category: "",
  });

  const handleAddContent = async () => {
    if (!newContent.title || !newContent.category) {
      toast({ title: 'Validation Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/admin/content', {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...newContent, status: 'draft' })
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Content created successfully' });
        fetchContents();
        setNewContent({ title: "", category: "" });
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create content', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/admin/Content/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Content deleted successfully' });
        fetchContents();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete content', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Content Management">
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
    </AdminLayout>
  );
};

export default ContentManagement;
