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

interface Caste {
  _additional?: { id: string };
  name: string;
  active: boolean;
}

interface SubCaste {
  _additional?: { id: string };
  name: string;
  casteId: string;
  active: boolean;
}

export default function SubCaste() {
  const { toast } = useToast();
  const [subCastes, setSubCastes] = useState<SubCaste[]>([]);
  const [castes, setCastes] = useState<Caste[]>([]);
  const [loading, setLoading] = useState(false);
  const [newSubCaste, setNewSubCaste] = useState({ name: '', casteId: '', active: true });

  useEffect(() => {
    fetchCastes();
    fetchSubCastes();
  }, []);

  const fetchCastes = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reference/castes', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setCastes(result.data.filter((c: Caste) => c.active));
      }
    } catch (error) {
      console.error('Failed to fetch castes', error);
    }
  };

  const fetchSubCastes = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/sub-castes', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setSubCastes(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch sub-castes', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newSubCaste.name.trim() || !newSubCaste.casteId) {
      toast({ title: 'Validation Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/sub-castes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newSubCaste)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Sub-caste created successfully' });
        setNewSubCaste({ name: '', casteId: '', active: true });
        fetchSubCastes();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create sub-caste', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/sub-castes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Sub-caste deleted successfully' });
        fetchSubCastes();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete sub-caste', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, casteId: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/sub-castes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, casteId, active: !currentActive })
      });
      fetchSubCastes();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update sub-caste', variant: 'destructive' });
    }
  };

  const getCasteName = (casteId: string) => {
    const caste = castes.find(c => c._additional?.id === casteId);
    return caste?.name || 'Unknown';
  };

  return (
    <AdminLayout title="Sub Caste Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Sub Caste</CardTitle>
                <CardDescription>Create a new sub-caste entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="caste">Caste</Label>
                    <Select value={newSubCaste.casteId} onValueChange={(value) => setNewSubCaste({ ...newSubCaste, casteId: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select caste" />
                      </SelectTrigger>
                      <SelectContent>
                        {castes.map((caste) => (
                          <SelectItem key={caste._additional?.id} value={caste._additional?.id || ''}>
                            {caste.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Sub Caste Name</Label>
                    <Input id="name" value={newSubCaste.name} onChange={(e) => setNewSubCaste({ ...newSubCaste, name: e.target.value })} placeholder="Enter sub-caste name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newSubCaste.active} onCheckedChange={(checked) => setNewSubCaste({ ...newSubCaste, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Sub Caste</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sub Castes List ({subCastes.length})</CardTitle>
                <CardDescription>Manage existing sub-castes</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <div>Loading...</div> : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Caste</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subCastes.map((subCaste) => (
                        <TableRow key={subCaste._additional?.id}>
                          <TableCell className="font-medium">{subCaste.name}</TableCell>
                          <TableCell>{getCasteName(subCaste.casteId)}</TableCell>
                          <TableCell><Switch checked={subCaste.active} onCheckedChange={() => handleToggleActive(subCaste._additional?.id || '', subCaste.name, subCaste.casteId, subCaste.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(subCaste._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {subCastes.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No sub-castes found</TableCell></TableRow>
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
