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

interface Gotra {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Gotra() {
  const { toast } = useToast();
  const [gotras, setGotras] = useState<Gotra[]>([]);
  const [loading, setLoading] = useState(false);
  const [newGotra, setNewGotra] = useState({ name: '', active: true });

  useEffect(() => {
    fetchGotras();
  }, []);

  const fetchGotras = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/gotras', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setGotras(result.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch gotras',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newGotra.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Gotra name is required',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reference/gotras', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newGotra)
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Gotra created successfully'
        });
        setNewGotra({ name: '', active: true });
        fetchGotras();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create gotra',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gotra?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/reference/gotras/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Gotra deleted successfully'
        });
        fetchGotras();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete gotra',
        variant: 'destructive'
      });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reference/gotras/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, active: !currentActive })
      });

      const result = await response.json();
      if (result.success) {
        fetchGotras();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update gotra',
        variant: 'destructive'
      });
    }
  };

  return (
    <AdminLayout title="Gotra Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Gotra</CardTitle>
                <CardDescription>Create a new gotra entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Gotra Name</Label>
                    <Input
                      id="name"
                      value={newGotra.name}
                      onChange={(e) => setNewGotra({ ...newGotra, name: e.target.value })}
                      placeholder="Enter gotra name"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newGotra.active}
                      onCheckedChange={(checked) => setNewGotra({ ...newGotra, active: checked })}
                    />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Gotra
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gotras List ({gotras.length})</CardTitle>
                <CardDescription>Manage existing gotras</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {gotras.map((gotra) => (
                        <TableRow key={gotra._additional?.id}>
                          <TableCell className="font-medium">{gotra.name}</TableCell>
                          <TableCell>
                            <Switch
                              checked={gotra.active}
                              onCheckedChange={() =>
                                handleToggleActive(
                                  gotra._additional?.id || '',
                                  gotra.name,
                                  gotra.active
                                )
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(gotra._additional?.id || '')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {gotras.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No gotras found
                          </TableCell>
                        </TableRow>
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
