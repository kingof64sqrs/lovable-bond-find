import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/AdminLayout";
import { 
  Users, 
  UserCheck, 
  Heart, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/config/api";

const AdminDashboard = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [approvals, setApprovals] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const [membersRes, approvalsRes, matchesRes] = await Promise.all([
        fetch(`${API_BASE_URL}/admin/members`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/admin/approvals`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/admin/matches`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      const [membersData, approvalsData, matchesData] = await Promise.all([
        membersRes.json(),
        approvalsRes.json(),
        matchesRes.json()
      ]);

      if (membersData.success) setMembers(membersData.data || []);
      if (approvalsData.success) setApprovals(approvalsData.data || []);
      if (matchesData.success) setMatches(matchesData.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      title: "Total Users",
      value: members.length.toString(),
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Active Subscriptions",
      value: members.filter((m: any) => m.status === 'active').length.toString(),
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Pending Verifications",
      value: approvals.filter((a: any) => a.status === 'pending').length.toString(),
      change: "-5.1%",
      trend: "down",
      icon: UserCheck,
      color: "text-orange-500"
    },
    {
      title: "Successful Matches",
      value: matches.length.toString(),
      change: "+15.3%",
      trend: "up",
      icon: Heart,
      color: "text-pink-500"
    },
  ];

  const recentUsers = members.slice(0, 4).map((m: any, idx: number) => ({
    id: idx + 1,
    name: m.userName || m.name || 'Unknown',
    email: m.email || 'N/A',
    status: m.status || 'pending',
    joined: m.joinedAt ? new Date(m.joinedAt).toLocaleDateString() : 'N/A'
  }));

  const reportedProfiles = approvals.filter((a: any) => a.type === 'report').slice(0, 3).map((a: any, idx: number) => ({
    id: idx + 1,
    reporter: a.userName || 'Unknown',
    reported: a.details || 'Unknown',
    reason: a.reason || 'No reason provided',
    date: a.submittedAt ? new Date(a.submittedAt).toLocaleDateString() : 'N/A'
  }));

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-8">
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
                {recentUsers.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent users</p>
                ) : (
                  recentUsers.map((user) => (
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
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Reported Profiles */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Activity Overview</CardTitle>
              <CardDescription>Recent platform activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportedProfiles.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No recent reports</p>
                ) : (
                  reportedProfiles.map((report) => (
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
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
