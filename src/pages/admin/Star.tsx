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

interface Star {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Star() {
  const { toast } = useToast();
  const [stars, setStars] = useState<Star[]>([]);
  const [loading, setLoading] = useState(false);
  const [newStar, setNewStar] = useState({ name: '', active: true });

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/stars', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setStars(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch stars', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newStar.name.trim()) {
      toast({ title: 'Validation Error', description: 'Star name is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/stars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newStar)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Star created successfully' });
        setNewStar({ name: '', active: true });
        fetchStars();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create star', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/stars/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Star deleted successfully' });
        fetchStars();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete star', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/stars/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, active: !currentActive })
      });
      fetchStars();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update star', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Star Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Star</CardTitle>
                <CardDescription>Create a new star entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Star Name</Label>
                    <Input id="name" value={newStar.name} onChange={(e) => setNewStar({ ...newStar, name: e.target.value })} placeholder="Enter star name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newStar.active} onCheckedChange={(checked) => setNewStar({ ...newStar, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Star</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stars List ({stars.length})</CardTitle>
                <CardDescription>Manage existing stars</CardDescription>
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
                      {stars.map((star) => (
                        <TableRow key={star._additional?.id}>
                          <TableCell className="font-medium">{star.name}</TableCell>
                          <TableCell><Switch checked={star.active} onCheckedChange={() => handleToggleActive(star._additional?.id || '', star.name, star.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(star._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {stars.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No stars found</TableCell></TableRow>
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
