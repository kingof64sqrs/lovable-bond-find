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
import { API_BASE_URL } from '@/config/api';

interface Country {
  _additional?: { id: string };
  name: string;
  code: string;
  active: boolean;
}

export default function Country() {
  const { toast } = useToast();
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCountry, setNewCountry] = useState({ name: '', code: '', active: true });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/reference/countries`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setCountries(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch countries', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newCountry.name.trim() || !newCountry.code.trim()) {
      toast({ title: 'Validation Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/reference/countries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newCountry)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Country created successfully' });
        setNewCountry({ name: '', code: '', active: true });
        fetchCountries();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create country', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/reference/countries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Country deleted successfully' });
        fetchCountries();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete country', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, code: string, currentActive: boolean) => {
    try {
      await fetch(`${API_BASE_URL}/reference/countries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, code, active: !currentActive })
      });
      fetchCountries();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update country', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Country Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Country</CardTitle>
                <CardDescription>Create a new country entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Country Name</Label>
                    <Input id="name" value={newCountry.name} onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })} placeholder="Enter country name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="code">Country Code</Label>
                    <Input id="code" value={newCountry.code} onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value })} placeholder="Enter country code (e.g., US, IN)" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newCountry.active} onCheckedChange={(checked) => setNewCountry({ ...newCountry, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Country</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Countries List ({countries.length})</CardTitle>
                <CardDescription>Manage existing countries</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <div>Loading...</div> : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Code</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {countries.map((country) => (
                        <TableRow key={country._additional?.id}>
                          <TableCell className="font-medium">{country.name}</TableCell>
                          <TableCell>{country.code}</TableCell>
                          <TableCell><Switch checked={country.active} onCheckedChange={() => handleToggleActive(country._additional?.id || '', country.name, country.code, country.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(country._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {countries.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No countries found</TableCell></TableRow>
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
