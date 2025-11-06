import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import AdminSidebar from "@/components/AdminSidebar";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminVerifications = () => {
  const { toast } = useToast();

  const pendingVerifications = [
    {
      id: 1,
      name: "Kavya Iyer",
      email: "kavya@example.com",
      submitted: "2 hours ago",
      documents: ["ID Proof", "Address Proof"],
      status: "pending"
    },
    {
      id: 2,
      name: "Rohit Malhotra",
      email: "rohit@example.com",
      submitted: "5 hours ago",
      documents: ["ID Proof", "Education Certificate"],
      status: "pending"
    },
    {
      id: 3,
      name: "Divya Nair",
      email: "divya@example.com",
      submitted: "1 day ago",
      documents: ["ID Proof"],
      status: "under_review"
    },
  ];

  const handleApprove = (name: string) => {
    toast({
      title: "Profile Verified",
      description: `${name}'s profile has been verified successfully.`,
    });
  };

  const handleReject = (name: string) => {
    toast({
      title: "Profile Rejected",
      description: `${name}'s verification request has been rejected.`,
      variant: "destructive",
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-2xl font-bold">Profile Verifications</h1>
            </div>
          </header>

          <div className="container py-6 space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending</p>
                      <p className="text-2xl font-bold">145</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Verified Today</p>
                      <p className="text-2xl font-bold">23</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Rejected Today</p>
                      <p className="text-2xl font-bold">7</p>
                    </div>
                    <XCircle className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Pending Verifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingVerifications.map((verification) => (
                  <Card key={verification.id} className="border shadow-none">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between">
                        <div className="space-y-3 flex-1">
                          <div>
                            <h3 className="font-semibold text-lg">{verification.name}</h3>
                            <p className="text-sm text-muted-foreground">{verification.email}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{verification.status === "pending" ? "New Request" : "Under Review"}</Badge>
                            <span className="text-xs text-muted-foreground">
                              Submitted {verification.submitted}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium mb-2">Documents Submitted:</p>
                            <div className="flex flex-wrap gap-2">
                              {verification.documents.map((doc, idx) => (
                                <Badge key={idx} variant="secondary">
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReject(verification.name)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            className="gradient-accent"
                            onClick={() => handleApprove(verification.name)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminVerifications;
