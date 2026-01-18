import { useState, useEffect } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface State { _additional?: { id: string }; name: string; active: boolean; }
interface City { _additional?: { id: string }; name: string; stateId: string; active: boolean; }

export default function City() {
  const { toast } = useToast();
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<State[]>([]);
  const [loading, setLoading] = useState(false);
  const [newCity, setNewCity] = useState({ name: '', stateId: '', active: true });

  useEffect(() => { fetchStates(); fetchCities(); }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/reference/states', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setStates(result.data.filter((s: State) => s.active));
    } catch (error) { console.error('Failed to fetch states', error); }
  };

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/reference/cities', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setCities(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch cities', variant: 'destructive' });
    } finally { setLoading(false); }
  };

  const handleCreate = async () => {
    if (!newCity.name.trim() || !newCity.stateId) {
      toast({ title: 'Validation Error', description: 'All fields are required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/api/reference/cities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newCity)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'City created successfully' });
        setNewCity({ name: '', stateId: '', active: true });
        fetchCities();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create city', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`http://localhost:3000/api/reference/cities/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'City deleted successfully' });
        fetchCities();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete city', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, name: string, stateId: string, currentActive: boolean) => {
    try {
      await fetch(`http://localhost:3000/api/reference/cities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ name, stateId, active: !currentActive })
      });
      fetchCities();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update city', variant: 'destructive' });
    }
  };

  const getStateName = (stateId: string) => states.find(s => s._additional?.id === stateId)?.name || 'Unknown';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="flex flex-col gap-6 p-6">
            <div>
              <h1 className="text-3xl font-bold">City Management</h1>
              <p className="text-muted-foreground">Add and manage cities</p>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Add New City</CardTitle>
                <CardDescription>Create a new city entry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Select value={newCity.stateId} onValueChange={(value) => setNewCity({ ...newCity, stateId: value })}>
                      <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {states.map((state) => (
                          <SelectItem key={state._additional?.id} value={state._additional?.id || ''}>{state.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">City Name</Label>
                    <Input id="name" value={newCity.name} onChange={(e) => setNewCity({ ...newCity, name: e.target.value })} placeholder="Enter city name" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newCity.active} onCheckedChange={(checked) => setNewCity({ ...newCity, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add City</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cities List ({cities.length})</CardTitle>
                <CardDescription>Manage existing cities</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <div>Loading...</div> : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>State</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cities.map((city) => (
                        <TableRow key={city._additional?.id}>
                          <TableCell className="font-medium">{city.name}</TableCell>
                          <TableCell>{getStateName(city.stateId)}</TableCell>
                          <TableCell><Switch checked={city.active} onCheckedChange={() => handleToggleActive(city._additional?.id || '', city.name, city.stateId, city.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(city._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {cities.length === 0 && (
                        <TableRow><TableCell colSpan={4} className="text-center text-muted-foreground">No cities found</TableCell></TableRow>
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
