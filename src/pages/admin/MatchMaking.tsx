import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { CheckCircle, XCircle } from "lucide-react";

const MatchMaking = () => {
  const [matches] = useState([
    { id: 1, user1: "Priya Sharma", user2: "Rahul Kumar", matchScore: "92%", matchedAt: "2024-01-15", status: "active" },
    { id: 2, user1: "Ananya Patel", user2: "Vikram Singh", matchScore: "88%", matchedAt: "2024-02-20", status: "active" },
    { id: 3, user1: "Sneha Reddy", user2: "Arjun Mehta", matchScore: "78%", matchedAt: "2024-01-08", status: "inactive" },
    { id: 4, user1: "Neha Singh", user2: "Deepak Kumar", matchScore: "85%", matchedAt: "2024-02-10", status: "active" },
  ]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
            <div className="flex items-center gap-4 p-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Match Making</h1>
            </div>
          </header>

          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle>All Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User 1</TableHead>
                      <TableHead>User 2</TableHead>
                      <TableHead>Match Score</TableHead>
                      <TableHead>Matched At</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map((match) => (
                      <TableRow key={match.id}>
                        <TableCell className="font-medium">{match.user1}</TableCell>
                        <TableCell>{match.user2}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{match.matchScore}</Badge>
                        </TableCell>
                        <TableCell>{match.matchedAt}</TableCell>
                        <TableCell>
                          <Badge variant={match.status === "active" ? "default" : "secondary"}>
                            {match.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="sm">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          </Button>
                          <Button variant="ghost" size="sm">
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

export default MatchMaking;
