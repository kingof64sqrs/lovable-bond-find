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

interface Occupation {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Occupation() {
  const { toast } = useToast();
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [loading, setLoading] = useState(false);
  const [newOccupation, setNewOccupation] = useState({ name: '', active: true });

  useEffect(() => {
    fetchOccupations();
  }, []);

  const fetchOccupations = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/occupations', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setOccupations(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch occupations', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newOccupation.name.trim()) {
      toast({ title: 'Validation Error', description: 'Occupation name is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/occupations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newOccupation)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Occupation created successfully' });
        setNewOccupation({ name: '', active: true });
        fetchOccupations();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create occupation', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/occupations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Occupation deleted successfully' });
        fetchOccupations();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete occupation', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/occupations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, active: !currentActive })
      });
      fetchOccupations();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update occupation', variant: 'destructive' });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold">Occupation Management</h1>
              <p className="text-muted-foreground">Add and manage occupations</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Occupation</CardTitle>
                <CardDescription>Create a new occupation entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Occupation Name</Label>
                    <Input id="name" value={newOccupation.name} onChange={(e) => setNewOccupation({ ...newOccupation, name: e.target.value })} placeholder="Enter occupation name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newOccupation.active} onCheckedChange={(checked) => setNewOccupation({ ...newOccupation, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Occupation</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Occupations List ({occupations.length})</CardTitle>
                <CardDescription>Manage existing occupations</CardDescription>
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
                      {occupations.map((occ) => (
                        <TableRow key={occ._additional?.id}>
                          <TableCell className="font-medium">{occ.name}</TableCell>
                          <TableCell><Switch checked={occ.active} onCheckedChange={() => handleToggleActive(occ._additional?.id || '', occ.name, occ.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(occ._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {occupations.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No occupations found</TableCell></TableRow>
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
