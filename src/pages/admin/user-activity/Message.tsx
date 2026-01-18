import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AdminSidebar from '@/components/AdminSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Trash2, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface MessageRecord {
  _additional?: { id: string };
  fromUserId: string;
  fromUserName: string;
  fromProfileId: string;
  toUserId: string;
  toUserName: string;
  toProfileId: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  readAt?: string;
}

export default function Message() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState<MessageRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/user-activity/messages', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setMessages(result.data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch messages', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/user-activity/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      
      if (result.success) {
        toast({ title: 'Success', description: 'Message deleted successfully' });
        fetchMessages();
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete message', variant: 'destructive' });
    }
  };

  const filteredMessages = messages.filter(message =>
    message.fromUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.toUserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset className="flex-1">
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Records</CardTitle>
                <CardDescription>
                  View and manage all messages exchanged between members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by sender, receiver or subject..."
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
                            <TableHead>From</TableHead>
                            <TableHead>Profile ID</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Profile ID</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredMessages.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                                No message records found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredMessages.map((message) => (
                              <TableRow key={message._additional?.id}>
                                <TableCell className="font-medium">{message.fromUserName}</TableCell>
                                <TableCell>{message.fromProfileId}</TableCell>
                                <TableCell className="font-medium">{message.toUserName}</TableCell>
                                <TableCell>{message.toProfileId}</TableCell>
                                <TableCell>{message.subject}</TableCell>
                                <TableCell>{new Date(message.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                  <span className={message.isRead ? 'text-muted-foreground' : 'font-semibold'}>
                                    {message.isRead ? 'Read' : 'Unread'}
                                  </span>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleDelete(message._additional?.id || '')}
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
                  </>
                )}

                <div className="mt-4 text-sm text-muted-foreground">
                  Showing {filteredMessages.length} of {messages.length} records
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
