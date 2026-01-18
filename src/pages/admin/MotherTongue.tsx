import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MotherTongue {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function MotherTongue() {
  const { toast } = useToast();
  const [motherTongues, setMotherTongues] = useState<MotherTongue[]>([]);
  const [loading, setLoading] = useState(false);
  const [newMotherTongue, setNewMotherTongue] = useState({ name: '', active: true });

  useEffect(() => {
    fetchMotherTongues();
  }, []);

  const fetchMotherTongues = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/mother-tongues', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setMotherTongues(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch mother tongues', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newMotherTongue.name.trim()) {
      toast({ title: 'Validation Error', description: 'Mother Tongue name is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/mother-tongues', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newMotherTongue)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Mother Tongue created successfully' });
        setNewMotherTongue({ name: '', active: true });
        fetchMotherTongues();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create mother tongue', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/mother-tongues/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Mother Tongue deleted successfully' });
        fetchMotherTongues();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete mother tongue', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/mother-tongues/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, active: !currentActive })
      });
      fetchMotherTongues();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update mother tongue', variant: 'destructive' });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold">Mother Tongue Management</h1>
              <p className="text-muted-foreground">Add and manage mother tongues</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Mother Tongue</CardTitle>
                <CardDescription>Create a new mother tongue entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Mother Tongue Name</Label>
                    <Input id="name" value={newMotherTongue.name} onChange={(e) => setNewMotherTongue({ ...newMotherTongue, name: e.target.value })} placeholder="Enter mother tongue name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newMotherTongue.active} onCheckedChange={(checked) => setNewMotherTongue({ ...newMotherTongue, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Mother Tongue</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mother Tongues List ({motherTongues.length})</CardTitle>
                <CardDescription>Manage existing mother tongues</CardDescription>
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
                      {motherTongues.map((mt) => (
                        <TableRow key={mt._additional?.id}>
                          <TableCell className="font-medium">{mt.name}</TableCell>
                          <TableCell><Switch checked={mt.active} onCheckedChange={() => handleToggleActive(mt._additional?.id || '', mt.name, mt.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(mt._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {motherTongues.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No mother tongues found</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
