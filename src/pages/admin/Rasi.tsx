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

interface Rasi {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Rasi() {
  const { toast } = useToast();
  const [rasis, setRasis] = useState<Rasi[]>([]);
  const [loading, setLoading] = useState(false);
  const [newRasi, setNewRasi] = useState({ name: '', active: true });

  useEffect(() => {
    fetchRasis();
  }, []);

  const fetchRasis = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/rasis', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setRasis(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch rasis', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newRasi.name.trim()) {
      toast({ title: 'Validation Error', description: 'Rasi name is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/rasis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newRasi)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Rasi created successfully' });
        setNewRasi({ name: '', active: true });
        fetchRasis();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create rasi', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/rasis/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Rasi deleted successfully' });
        fetchRasis();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete rasi', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/rasis/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, active: !currentActive })
      });
      fetchRasis();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update rasi', variant: 'destructive' });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold">Rasi Management</h1>
              <p className="text-muted-foreground">Add and manage rasis (moon signs)</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Add New Rasi</CardTitle>
                <CardDescription>Create a new rasi entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Rasi Name</Label>
                    <Input id="name" value={newRasi.name} onChange={(e) => setNewRasi({ ...newRasi, name: e.target.value })} placeholder="Enter rasi name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newRasi.active} onCheckedChange={(checked) => setNewRasi({ ...newRasi, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Rasi</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rasis List ({rasis.length})</CardTitle>
                <CardDescription>Manage existing rasis</CardDescription>
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
                      {rasis.map((rasi) => (
                        <TableRow key={rasi._additional?.id}>
                          <TableCell className="font-medium">{rasi.name}</TableCell>
                          <TableCell><Switch checked={rasi.active} onCheckedChange={() => handleToggleActive(rasi._additional?.id || '', rasi.name, rasi.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(rasi._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {rasis.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No rasis found</TableCell></TableRow>
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
