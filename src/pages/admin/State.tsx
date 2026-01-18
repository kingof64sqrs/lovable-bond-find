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

interface Country { _additional?: { id: string }; name: string; active: boolean; }
interface State { _additional?: { id: string }; name: string; countryId: string; active: boolean; }

export default function State() {
  const { toast } = useToast();
  const [states, setStates] = useState<State[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [newState, setNewState] = useState({ name: '', countryId: '', active: true });

  useEffect(() => { fetchCountries(); fetchStates(); }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reference/countries', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setCountries(result.data.filter((c: Country) => c.active));
    } catch (error) { console.error('Failed to fetch countries', error); }
  };

  const fetchStates = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/states', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setStates(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch states', variant: 'destructive' });
    } finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newState.name.trim() || !newState.countryId) {
      toast({ title: 'Validation Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/states', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newState)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'State created successfully' });
        setNewState({ name: '', countryId: '', active: true });
        fetchStates();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create state', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/states/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'State deleted successfully' });
        fetchStates();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete state', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, countryId: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/states/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, countryId, active: !currentActive })
      });
      fetchStates();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update state', variant: 'destructive' });
    }
  };

  const getCountryName = (countryId: string) => countries.find(c => c._additional?.id === countryId)?.name || 'Unknown';

  return (
    <AdminLayout title="State Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New State</CardTitle>
                <CardDescription>Create a new state entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="country">Country</Label>
                    <Select value={newState.countryId} onValueChange={(value) => setNewState({ ...newState, countryId: value })}>
                      <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                      <SelectContent>
                        {countries.map((country) => (
                          <SelectItem key={country._additional?.id} value={country._additional?.id || ''}>{country.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">State Name</Label>
                    <Input id="name" value={newState.name} onChange={(e) => setNewState({ ...newState, name: e.target.value })} placeholder="Enter state name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newState.active} onCheckedChange={(checked) => setNewState({ ...newState, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add State</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>States List ({states.length})</CardTitle>
                <CardDescription>Manage existing states</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <div>Loading...</div> : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Country</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {states.map((state) => (
                        <TableRow key={state._additional?.id}>
                          <TableCell className="font-medium">{state.name}</TableCell>
                          <TableCell>{getCountryName(state.countryId)}</TableCell>
                          <TableCell><Switch checked={state.active} onCheckedChange={() => handleToggleActive(state._additional?.id || '', state.name, state.countryId, state.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(state._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {states.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No states found</TableCell></TableRow>
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
