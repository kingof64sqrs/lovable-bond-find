import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { Download } from "lucide-react";

const MemberReport = () => {
  const [reports] = useState([
    { id: 1, memberName: "Priya Sharma", joinDate: "2024-01-15", plan: "Gold", status: "active", revenue: "₹2,999" },
    { id: 2, memberName: "Rahul Kumar", joinDate: "2024-02-20", plan: "Free", status: "active", revenue: "₹0" },
    { id: 3, memberName: "Ananya Patel", joinDate: "2024-01-08", plan: "Diamond", status: "inactive", revenue: "₹5,999" },
    { id: 4, memberName: "Vikram Singh", joinDate: "2024-02-10", plan: "Gold", status: "active", revenue: "₹2,999" },
  ]);

  const totalMembers = reports.length;
  const activeMembers = reports.filter(r => r.status === "active").length;
  const totalRevenue = reports.reduce((sum, r) => {
    const amount = parseInt(r.revenue.replace("₹", "").replace(",", "")) || 0;
    return sum + amount;
  }, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Member Report</h1>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Export Report
              </Button>
            </div>
          </header>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Members</p>
                    <p className="text-3xl font-bold">{totalMembers}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Active Members</p>
                    <p className="text-3xl font-bold">{activeMembers}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-3xl font-bold">₹{totalRevenue.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Member Details Report</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member Name</TableHead>
                      <TableHead>Join Date</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.memberName}</TableCell>
                        <TableCell>{report.joinDate}</TableCell>
                        <TableCell>{report.plan}</TableCell>
                        <TableCell>
                          <Badge variant={report.status === "active" ? "default" : "secondary"}>
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">{report.revenue}</TableCell>
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

export default MemberReport;
