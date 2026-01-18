import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Eye, StarOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config/api';

interface ShortlistRecord {
  _additional?: { id: string };
  userId: string;
  userName: string;
  userProfileId: string;
  shortlistedUserId: string;
  shortlistedUserName: string;
  shortlistedProfileId: string;
  shortlistedAt: string;
}

export default function ShortlistedProfile() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [shortlists, setShortlists] = useState<ShortlistRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchShortlists();
  }, []);

  const fetchShortlists = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/user-activity/shortlisted-profiles`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setShortlists(result.data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch shortlisted profiles', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/user-activity/shortlisted-profiles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Success', description: 'Shortlist removed successfully' });
        fetchShortlists();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to remove shortlist', variant: 'destructive' });
    }
  };

  const filteredShortlists = shortlists.filter(shortlist =>
    shortlist.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shortlist.shortlistedUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shortlist.userProfileId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shortlist.shortlistedProfileId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Shortlisted Profile Records">
      <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Shortlisted Profile Records</CardTitle>
                <CardDescription>
                  View and manage user shortlists and favorites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by user or shortlisted profile..."
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
                        <TableHead>User</TableHead>
                        <TableHead>User Profile ID</TableHead>
                        <TableHead>Shortlisted Profile</TableHead>
                        <TableHead>Shortlisted Profile ID</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredShortlists.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                            No shortlisted profile records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredShortlists.map((shortlist) => (
                          <TableRow key={shortlist._additional?.id}>
                            <TableCell className="font-medium">{shortlist.userName}</TableCell>
                            <TableCell>{shortlist.userProfileId}</TableCell>
                            <TableCell className="font-medium">{shortlist.shortlistedUserName}</TableCell>
                            <TableCell>{shortlist.shortlistedProfileId}</TableCell>
                            <TableCell>{new Date(shortlist.shortlistedAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  title="Remove from shortlist"
                                  onClick={() => handleDelete(shortlist._additional?.id || '')}
                                >
                                  <StarOff className="h-4 w-4 text-orange-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDelete(shortlist._additional?.id || '')}
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
                  Showing {filteredShortlists.length} of {shortlists.length} records
                </div>
              </CardContent>
            </Card>
          </div>
    </AdminLayout>
  );
}
