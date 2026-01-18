import AdminLayout from '@/components/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Eye, Unlock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { API_BASE_URL } from '@/config/api';

interface BlockedRecord {
  _additional?: { id: string };
  blockerUserId: string;
  blockerUserName: string;
  blockerProfileId: string;
  blockedUserId: string;
  blockedUserName: string;
  blockedProfileId: string;
  reason: string;
  blockedAt: string;
}

export default function BlockedProfile() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [blocks, setBlocks] = useState<BlockedRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlocks();
  }, []);

  const fetchBlocks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/user-activity/blocked-profiles`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setBlocks(result.data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch blocked profiles', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to unblock this user?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/user-activity/blocked-profiles/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Success', description: 'User unblocked successfully' });
        fetchBlocks();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to unblock user', variant: 'destructive' });
    }
  };

  const filteredBlocks = blocks.filter(block =>
    block.blockerUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.blockedUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.blockerProfileId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    block.blockedProfileId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Blocked Profile Records">
      <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Blocked Profile Records</CardTitle>
                <CardDescription>
                  Manage blocked profiles and user restrictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by blocker or blocked profile..."
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
                        <TableHead>Blocker</TableHead>
                        <TableHead>Blocker Profile ID</TableHead>
                        <TableHead>Blocked User</TableHead>
                        <TableHead>Blocked Profile ID</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBlocks.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No blocked profile records found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredBlocks.map((block) => (
                          <TableRow key={block._additional?.id}>
                            <TableCell className="font-medium">{block.blockerUserName}</TableCell>
                            <TableCell>{block.blockerProfileId}</TableCell>
                            <TableCell className="font-medium">{block.blockedUserName}</TableCell>
                            <TableCell>{block.blockedProfileId}</TableCell>
                            <TableCell>{block.reason}</TableCell>
                            <TableCell>{new Date(block.blockedAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  title="Unblock"
                                  onClick={() => handleDelete(block._additional?.id || '')}
                                >
                                  <Unlock className="h-4 w-4 text-green-500" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDelete(block._additional?.id || '')}
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
                  Showing {filteredBlocks.length} of {blocks.length} records
                </div>
              </CardContent>
            </Card>
          </div>
    </AdminLayout>
  );
}
