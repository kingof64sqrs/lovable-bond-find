import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Approvals = () => {
  const { toast } = useToast();
  const [approvals, setApprovals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchApprovals();
  }, []);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/admin/approvals', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });
      const result = await response.json();
      if (result.success) {
        setApprovals(result.data);
      }
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch approvals', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = (id: string) => {
    setApprovals(approvals.map(a => 
      a._additional?.id === id ? { ...a, status: "approved" } : a
    ));
    toast({ title: 'Success', description: 'Approval status updated' });
  };

  const handleReject = (id: string) => {
    setApprovals(approvals.map(a => 
      a._additional?.id === id ? { ...a, status: "rejected" } : a
    ));
    toast({ title: 'Success', description: 'Approval rejected' });
  };

  return (
    <AdminLayout title="Approvals">
      <Card>
              <CardHeader>
                <CardTitle>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Submitted At</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvals.map((approval) => (
                      <TableRow key={approval.id}>
                        <TableCell className="font-medium">{approval.userName}</TableCell>
                        <TableCell>{approval.type}</TableCell>
                        <TableCell>{approval.submittedAt}</TableCell>
                        <TableCell>
                          <Badge variant={approval.status === "pending" ? "secondary" : approval.status === "approved" ? "default" : "destructive"}>
                            {approval.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(approval.id)}
                            disabled={approval.status !== "pending"}
                          >
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleReject(approval.id)}
                            disabled={approval.status !== "pending"}
                          >
                            <XCircle className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
    </AdminLayout>
  );
};

export default Approvals;
