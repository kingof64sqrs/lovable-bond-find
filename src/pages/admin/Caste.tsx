import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config/api';

interface Religion {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

interface Caste {
  _additional?: { id: string };
  name: string;
  religionId: string;
  active: boolean;
}

export default function Caste() {
  const { toast } = useToast();
  const [castes, setCastes] = useState<Caste[]>([]);
  const [religions, setReligions] = useState<Religion[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCaste, setNewCaste] = useState({ name: '', religionId: '', active: true });

  useEffect(() => {
    fetchReligions();
    fetchCastes();
  }, []);

  const fetchReligions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reference/religions`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setReligions(result.data.filter((r: Religion) => r.active));
      }
    } catch (error) {
      console.error('Failed to fetch religions', error);
    }
  };

  const fetchCastes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/reference/castes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const result = await response.json();
      if (result.success) {
        setCastes(result.data);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch castes',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCaste.name.trim() || !newCaste.religionId) {
      toast({
        title: 'Validation Error',
        description: 'All fields are required',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reference/castes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newCaste)
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Caste created successfully'
        });
        setNewCaste({ name: '', religionId: '', active: true });
        fetchCastes();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create caste',
        variant: 'destructive'
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this caste?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/reference/castes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const result = await response.json();
      if (result.success) {
        toast({
          title: 'Success',
          description: 'Caste deleted successfully'
        });
        fetchCastes();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete caste',
        variant: 'destructive'
      });
    }
  };

  const handleToggleActive = async (id: string, name: string, religionId: string, currentActive: boolean) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reference/castes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name, religionId, active: !currentActive })
      });

      const result = await response.json();
      if (result.success) {
        fetchCastes();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update caste',
        variant: 'destructive'
      });
    }
  };

  const getReligionName = (religionId: string) => {
    const religion = religions.find(r => r._additional?.id === religionId);
    return religion?.name || 'Unknown';
  };

  return (
    <AdminLayout title="Caste Management">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Caste</CardTitle>
            <CardDescription>Create a new caste entry</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="religion">Religion</Label>
                <Select
                  value={newCaste.religionId}
                  onValueChange={(value) => setNewCaste({ ...newCaste, religionId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select religion" />
                  </SelectTrigger>
                  <SelectContent>
                    {religions.map((religion) => (
                      <SelectItem key={religion._additional?.id} value={religion._additional?.id || ''}>
                        {religion.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name">Caste Name</Label>
                <Input
                  id="name"
                  value={newCaste.name}
                  onChange={(e) => setNewCaste({ ...newCaste, name: e.target.value })}
                  placeholder="Enter caste name"
                />
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  checked={newCaste.active}
                  onCheckedChange={(checked) => setNewCaste({ ...newCaste, active: checked })}
                />
                <Label>Active</Label>
              </div>
              <Button onClick={handleCreate} className="w-fit">
                <Plus className="mr-2 h-4 w-4" />
                Add Caste
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Castes List ({castes.length})</CardTitle>
            <CardDescription>Manage existing castes</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Religion</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {castes.map((caste) => (
                    <TableRow key={caste._additional?.id}>
                      <TableCell className="font-medium">{caste.name}</TableCell>
                      <TableCell>{getReligionName(caste.religionId)}</TableCell>
                      <TableCell>
                        <Switch
                          checked={caste.active}
                          onCheckedChange={() =>
                            handleToggleActive(
                              caste._additional?.id || '',
                              caste.name,
                              caste.religionId,
                              caste.active
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(caste._additional?.id || '')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {castes.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-muted-foreground">
                        No castes found
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
