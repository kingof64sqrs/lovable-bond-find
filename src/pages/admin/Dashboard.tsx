import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { 
  Users, 
  UserCheck, 
  Heart, 
  TrendingUp,
  DollarSign,
  Flag,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "10,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Subscriptions",
      value: "3,456",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Pending Verifications",
      value: "145",
      change: "-5.1%",
      trend: "down",
      icon: UserCheck,
      color: "text-orange-500"
    },
    {
      title: "Successful Matches",
      value: "5,234",
      change: "+15.3%",
      trend: "up",
      icon: Heart,
      color: "text-pink-500"
    },
  ];

  const recentUsers = [
    { id: 1, name: "Priya Sharma", email: "priya@example.com", status: "pending", joined: "2 hours ago" },
    { id: 2, name: "Rahul Kumar", email: "rahul@example.com", status: "verified", joined: "5 hours ago" },
    { id: 3, name: "Ananya Patel", email: "ananya@example.com", status: "pending", joined: "1 day ago" },
    { id: 4, name: "Vikram Singh", email: "vikram@example.com", status: "verified", joined: "1 day ago" },
  ];

  const reportedProfiles = [
    { id: 1, reporter: "User #2341", reported: "User #5678", reason: "Inappropriate content", date: "1 hour ago" },
    { id: 2, reporter: "User #4523", reported: "User #8934", reason: "Fake profile", date: "3 hours ago" },
    { id: 3, reporter: "User #7821", reported: "User #2456", reason: "Spam", date: "5 hours ago" },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center gap-4">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              </div>
              <Link to="/">
                <Button variant="outline">View Site</Button>
              </Link>
            </div>
          </header>

          <div className="container py-6 space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.title} className="shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      {stat.trend === "up" ? (
                        <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                      )}
                      <span className={stat.trend === "up" ? "text-green-500" : "text-red-500"}>
                        {stat.change}
                      </span>
                      <span className="ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* Recent Users */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                  <CardDescription>Latest user registrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              user.status === "verified"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {user.status}
                          </span>
                          <span className="text-xs text-muted-foreground">{user.joined}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/admin/users">
                    <Button variant="outline" className="w-full mt-4">
                      View All Users
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Reported Profiles */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="h-4 w-4 text-red-500" />
                    Reported Profiles
                  </CardTitle>
                  <CardDescription>Profiles requiring attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportedProfiles.map((report) => (
                      <div key={report.id} className="space-y-2 pb-4 border-b last:border-0">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">{report.reason}</p>
                            <p className="text-xs text-muted-foreground">
                              {report.reporter} reported {report.reported}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">{report.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Link to="/admin/reports">
                    <Button variant="outline" className="w-full mt-4">
                      View All Reports
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="shadow-soft gradient-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-4">
                <Link to="/admin/verifications">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <UserCheck className="h-4 w-4" />
                    Review Profiles
                  </Button>
                </Link>
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <Users className="h-4 w-4" />
                    Manage Users
                  </Button>
                </Link>
                <Link to="/admin/analytics">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <TrendingUp className="h-4 w-4" />
                    View Analytics
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Platform Settings
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
