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

interface AnnualIncome {
  _additional?: { id: string };
  range: string;
  active: boolean;
}

export default function AnnualIncome() {
  const { toast } = useToast();
  const [annualIncomes, setAnnualIncomes] = useState<AnnualIncome[]>([]);
  const [loading, setLoading] = useState(false);
  const [newAnnualIncome, setNewAnnualIncome] = useState({ range: '', active: true });

  useEffect(() => {
    fetchAnnualIncomes();
  }, []);

  const fetchAnnualIncomes = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/reference/annual-incomes`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) setAnnualIncomes(result.data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch annual incomes', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    if (!newAnnualIncome.range.trim()) {
      toast({ title: 'Validation Error', description: 'Income range is required', variant: 'destructive' });
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/reference/annual-incomes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify(newAnnualIncome)
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Annual income range created successfully' });
        setNewAnnualIncome({ range: '', active: true });
        fetchAnnualIncomes();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create annual income', variant: 'destructive' });
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/reference/annual-incomes/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        toast({ title: 'Success', description: 'Annual income deleted successfully' });
        fetchAnnualIncomes();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete annual income', variant: 'destructive' });
    }
  };

  const handleToggleActive = async (id: string, range: string, currentActive: boolean) => {
    try {
      await fetch(`${API_BASE_URL}/reference/annual-incomes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        body: JSON.stringify({ range, active: !currentActive })
      });
      fetchAnnualIncomes();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update annual income', variant: 'destructive' });
    }
  };

  return (
    <AdminLayout title="Annual Income Management">
      <div className="flex flex-col gap-6">
        <Card>
              <CardHeader>
                <CardTitle>Add New Income Range</CardTitle>
                <CardDescription>Create a new annual income range</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="range">Income Range</Label>
                    <Input id="range" value={newAnnualIncome.range} onChange={(e) => setNewAnnualIncome({ ...newAnnualIncome, range: e.target.value })} placeholder="e.g., 5-10 Lakhs, 10-20 Lakhs" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch checked={newAnnualIncome.active} onCheckedChange={(checked) => setNewAnnualIncome({ ...newAnnualIncome, active: checked })} />
                    <Label>Active</Label>
                  </div>
                  <Button onClick={handleCreate} className="w-fit"><Plus className="mr-2 h-4 w-4" />Add Income Range</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Income Ranges List ({annualIncomes.length})</CardTitle>
                <CardDescription>Manage existing income ranges</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? <div>Loading...</div> : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Range</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {annualIncomes.map((income) => (
                        <TableRow key={income._additional?.id}>
                          <TableCell className="font-medium">{income.range}</TableCell>
                          <TableCell><Switch checked={income.active} onCheckedChange={() => handleToggleActive(income._additional?.id || '', income.range, income.active)} /></TableCell>
                          <TableCell className="text-right"><Button variant="destructive" size="sm" onClick={() => handleDelete(income._additional?.id || '')}><Trash2 className="h-4 w-4" /></Button></TableCell>
                        </TableRow>
                      ))}
                      {annualIncomes.length === 0 && (
                        <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No income ranges found</TableCell></TableRow>
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
