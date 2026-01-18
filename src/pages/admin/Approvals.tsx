import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { CheckCircle, XCircle } from "lucide-react";

const Approvals = () => {
  const [approvals, setApprovals] = useState([
    { id: 1, userName: "Priya Sharma", type: "Profile", submittedAt: "2024-01-15", status: "pending" },
    { id: 2, userName: "Rahul Kumar", type: "Photo", submittedAt: "2024-02-20", status: "pending" },
    { id: 3, userName: "Ananya Patel", type: "Profile", submittedAt: "2024-01-08", status: "approved" },
  ]);

  const handleApprove = (id: number) => {
    setApprovals(approvals.map(a => 
      a.id === id ? { ...a, status: "approved" } : a
    ));
  };

  const handleReject = (id: number) => {
    setApprovals(approvals.map(a => 
      a.id === id ? { ...a, status: "rejected" } : a
    ));
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Approvals</h1>
            </div>
          </header>

          <div className="p-6">
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
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Approvals;
