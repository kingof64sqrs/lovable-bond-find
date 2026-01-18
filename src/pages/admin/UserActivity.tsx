import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { Eye } from "lucide-react";

const UserActivity = () => {
  const [activities] = useState([
    { id: 1, userName: "Priya Sharma", action: "Profile View", details: "Viewed 5 profiles", timestamp: "2024-01-15 10:30 AM" },
    { id: 2, userName: "Rahul Kumar", action: "Interest Sent", details: "Sent interest to 2 profiles", timestamp: "2024-01-15 09:15 AM" },
    { id: 3, userName: "Ananya Patel", action: "Profile Update", details: "Updated profile information", timestamp: "2024-01-15 08:45 AM" },
    { id: 4, userName: "Vikram Singh", action: "Login", details: "Logged in successfully", timestamp: "2024-01-15 07:30 AM" },
  ]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">User Activity</h1>
            </div>
          </header>

          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User Name</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead className="text-right">View</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">{activity.userName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{activity.action}</Badge>
                        </TableCell>
                        <TableCell>{activity.details}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{activity.timestamp}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
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

export default UserActivity;
