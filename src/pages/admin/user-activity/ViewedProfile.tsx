import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ViewRecord {
  _additional?: { id: string };
  viewerUserId: string;
  viewerUserName: string;
  viewerProfileId: string;
  viewedUserId: string;
  viewedUserName: string;
  viewedProfileId: string;
  viewedAt: string;
  viewTime: string;
}

export default function ViewedProfile() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [views, setViews] = useState<ViewRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchViews();
  }, []);

  const fetchViews = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/user-activity/viewed-profiles', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setViews(result.data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch viewed profiles', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/user-activity/viewed-profiles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Success', description: 'Record deleted successfully' });
        fetchViews();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete record', variant: 'destructive' });
    }
  };

  const filteredViews = views.filter(view =>
    view.viewerUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.viewedUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.viewerProfileId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    view.viewedProfileId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Viewed Profile Records">
      <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Viewed Profile Records</CardTitle>
                <CardDescription>
                  Track all profile view activities between members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by viewer or viewed profile..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Viewer</TableHead>
                        <TableHead>Viewer Profile ID</TableHead>
                        <TableHead>Viewed Profile</TableHead>
                        <TableHead>Viewed Profile ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredViews.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No viewed profile records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredViews.map((view) => (
                          <TableRow key={view._additional?.id}>
                            <TableCell className="font-medium">{view.viewerUserName}</TableCell>
                            <TableCell>{view.viewerProfileId}</TableCell>
                            <TableCell className="font-medium">{view.viewedUserName}</TableCell>
                            <TableCell>{view.viewedProfileId}</TableCell>
                            <TableCell>{new Date(view.viewedAt).toLocaleDateString()}</TableCell>
                            <TableCell>{view.viewTime}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDelete(view._additional?.id || '')}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredViews.length} of {views.length} records
                </div>
              </CardContent>
            </Card>
          </div>
    </AdminLayout>
  );
}
