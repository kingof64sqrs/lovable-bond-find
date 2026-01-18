import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config/api';

interface InterestRecord {
  _additional?: { id: string };
  fromUserId: string;
  fromUserName: string;
  fromProfileId: string;
  toUserId: string;
  toUserName: string;
  toProfileId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  respondedAt?: string;
}

export default function ExpressInterest() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [interests, setInterests] = useState<InterestRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInterests();
  }, []);

  const fetchInterests = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/user-activity/express-interests`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setInterests(result.data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch express interests', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/user-activity/express-interests/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Success', description: 'Express interest deleted successfully' });
        fetchInterests();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete express interest', variant: 'destructive' });
    }
  };
  
  const filteredInterests = interests.filter(interest =>
    interest.fromUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interest.toUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interest.fromProfileId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    interest.toProfileId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout title="Express Interest Records">
      <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Express Interest Records</CardTitle>
                <CardDescription>
                  View and manage all express interest activities between members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or profile ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-8">Loading...</div>
                ) : (
                  <>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>From Member</TableHead>
                            <TableHead>From Profile ID</TableHead>
                            <TableHead>To Member</TableHead>
                            <TableHead>To Profile ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredInterests.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                                No express interest records found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredInterests.map((interest) => (
                              <TableRow key={interest._additional?.id}>
                                <TableCell className="font-medium">{interest.fromUserName}</TableCell>
                                <TableCell>{interest.fromProfileId}</TableCell>
                                <TableCell className="font-medium">{interest.toUserName}</TableCell>
                                <TableCell>{interest.toProfileId}</TableCell>
                                <TableCell>{getStatusBadge(interest.status)}</TableCell>
                                <TableCell>{new Date(interest.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDelete(interest._additional?.id || '')}
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
                      Showing {filteredInterests.length} of {interests.length} records
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
    </AdminLayout>
  );
}
