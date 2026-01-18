import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Plus, Trash2, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Religion {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

export default function Religion() {
  const { toast } = useToast();
  const [religions, setReligions] = useState<Religion[]>([]);
  const [loading, setLoading] = useState(false);
  const [newReligion, setNewReligion] = useState({ name: '', active: true });

  useEffect(() => {
    fetchReligions();
  }, []);

  const fetchReligions = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/religions', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setReligions(result.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch religions',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newReligion.name.trim()) {
      toast({
        title: 'Validation Error',
        description: 'Religion name is required',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reference/religions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newReligion)
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Religion created successfully'
        });
        setNewReligion({ name: '', active: true });
        fetchReligions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create religion',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this religion?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/reference/religions/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Religion deleted successfully'
        });
        fetchReligions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete religion',
        variant: 'destructive'
      });
    }
  };

  const handleToggleActive = async (id: string, name: string, currentActive: boolean) => {
    try {
      const response = await fetch(`http://localhost:3000/api/reference/religions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, active: !currentActive })
      });

      const result = await response.json();
      if (result.success) {
        fetchReligions();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update religion',
        variant: 'destructive'
      });
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold">Religion Management</h1>
              <p className="text-muted-foreground">Add and manage religions</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Add New Religion</CardTitle>
                <CardDescription>Create a new religion entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Religion Name</Label>
                    <Input
                      id="name"
                      value={newReligion.name}
                      onChange={(e) => setNewReligion({ ...newReligion, name: e.target.value })}
                      placeholder="Enter religion name"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={newReligion.active}
                      onCheckedChange={(checked) => setNewReligion({ ...newReligion, active: checked })}
                    />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Religion
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Religions List ({religions.length})</CardTitle>
                <CardDescription>Manage existing religions</CardDescription>
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
                      {religions.map((religion) => (
                        <TableRow key={religion._additional?.id}>
                          <TableCell className="font-medium">{religion.name}</TableCell>
                          <TableCell>
                            <Switch
                              checked={religion.active}
                              onCheckedChange={() =>
                                handleToggleActive(
                                  religion._additional?.id || '',
                                  religion.name,
                                  religion.active
                                )
                              }
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(religion._additional?.id || '')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      {religions.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center text-muted-foreground">
                            No religions found
                          </TableCell>
                        </TableRow>
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
