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

interface Dosh {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Dosh() {
  const { toast } = useToast();
  const [doshs, setDoshs] = useState<Dosh[]>([]);
  const [loading, setLoading] = useState(false);
  const [newDosh, setNewDosh] = useState({ name: '', active: true });

  useEffect(() => {
    fetchDoshs();
  }, []);

  const fetchDoshs = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/doshs', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setDoshs(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch doshs', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newDosh.name.trim()) {
      toast({ title: 'Validation Error', description: 'Dosh name is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/doshs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newDosh)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Dosh created successfully' });
        setNewDosh({ name: '', active: true });
        fetchDoshs();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create dosh', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/doshs/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Dosh deleted successfully' });
        fetchDoshs();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete dosh', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/doshs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, active: !currentActive })
      });
      fetchDoshs();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update dosh', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Dosh Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Dosh</CardTitle>
                <CardDescription>Create a new dosh entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Dosh Name</Label>
                    <Input id="name" value={newDosh.name} onChange={(e) => setNewDosh({ ...newDosh, name: e.target.value })} placeholder="Enter dosh name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newDosh.active} onCheckedChange={(checked) => setNewDosh({ ...newDosh, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Dosh</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Doshs List ({doshs.length})</CardTitle>
                <CardDescription>Manage existing doshs</CardDescription>
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
                      {doshs.map((dosh) => (
                        <TableRow key={dosh._additional?.id}>
                          <TableCell className="font-medium">{dosh.name}</TableCell>
                          <TableCell><Switch checked={dosh.active} onCheckedChange={() => handleToggleActive(dosh._additional?.id || '', dosh.name, dosh.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(dosh._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {doshs.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No doshs found</TableCell></TableRow>
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
