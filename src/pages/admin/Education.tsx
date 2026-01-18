import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Education {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Education() {
  const { toast } = useToast();
  const [educations, setEducations] = useState<Education[]>([]);
  const [loading, setLoading] = useState(false);
  const [newEducation, setNewEducation] = useState({ name: '', active: true });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/educations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setEducations(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch educations', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newEducation.name.trim()) {
      toast({ title: 'Validation Error', description: 'Education name is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/educations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newEducation)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Education created successfully' });
        setNewEducation({ name: '', active: true });
        fetchEducations();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create education', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/educations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Education deleted successfully' });
        fetchEducations();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete education', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/educations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, active: !currentActive })
      });
      fetchEducations();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update education', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Education Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Education</CardTitle>
                <CardDescription>Create a new education entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Education Name</Label>
                    <Input id="name" value={newEducation.name} onChange={(e) => setNewEducation({ ...newEducation, name: e.target.value })} placeholder="Enter education name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newEducation.active} onCheckedChange={(checked) => setNewEducation({ ...newEducation, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Education</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Educations List ({educations.length})</CardTitle>
                <CardDescription>Manage existing educations</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <div>Loading...</div> : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {educations.map((edu) => (
                        <TableRow key={edu._additional?.id}>
                          <TableCell className="font-medium">{edu.name}</TableCell>
                          <TableCell><Switch checked={edu.active} onCheckedChange={() => handleToggleActive(edu._additional?.id || '', edu.name, edu.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(edu._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {educations.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No educations found</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
      </div>
    </AdminLayout>
  );
}
