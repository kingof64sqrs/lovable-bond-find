import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Eye, 
  Settings, 
  User, 
  LogOut,
  CheckCircle,
  Clock,
  Star,
  Loader2
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { userAPI } from "@/lib/userAPI";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({
    name: user?.name || "User",
    profileCompletion: 0,
    profileViews: 0,
    interests: 0,
    matches: 0
  });
  const [matches, setMatches] = useState<any[]>([]);
  const [recentVisitors, setRecentVisitors] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch stats
      const statsResponse = await userAPI.dashboardAPI.getStats();
      if (statsResponse.success && statsResponse.data) {
        setUserStats(prev => ({
          ...prev,
          profileViews: statsResponse.data.profileViews || 0,
          interests: statsResponse.data.interests || 0,
          matches: statsResponse.data.matches || 0
        }));
      }

      // Fetch matches
      const matchesResponse = await userAPI.searchAPI.getMatches();
      if (matchesResponse.success) {
        setMatches(matchesResponse.data.slice(0, 3));
      }

      // Fetch recent visitors
      const visitorsResponse = await userAPI.activityAPI.getProfileViewers();
      if (visitorsResponse.success) {
        setRecentVisitors(visitorsResponse.data.slice(0, 3));
      }
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-muted/30">
        {loading ? (
          <div className="container py-20">
            <div className="flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-lg">Loading dashboard...</span>
            </div>
          </div>
        ) : (
          <div className="container py-8">
            <div className="grid md:grid-cols-4 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1 space-y-4">
              <Card className="shadow-soft">
                <CardContent className="pt-6 text-center space-y-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-2xl gradient-accent text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{userStats.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: LV12345</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Profile Completion</span>
                      <span className="font-semibold">{userStats.profileCompletion}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="gradient-accent h-2 rounded-full" 
                        style={{ width: `${userStats.profileCompletion}%` }}
                      />
                    </div>
                  </div>
                  <Link to="/profile/edit" className="block">
                    <Button variant="outline" className="w-full gap-2">
                      <Settings className="h-4 w-4" />
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="pt-6 space-y-3">
                  <Link to="/dashboard" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors">
                    <User className="h-5 w-5 text-primary" />
                    <span className="font-medium">My Profile</span>
                  </Link>
                  <Link to="/matches" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="font-medium">Matches</span>
                  </Link>
                  <Link to="/settings" className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors">
                    <Settings className="h-5 w-5 text-primary" />
                    <span className="font-medium">Settings</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 p-2 hover:bg-muted rounded-lg transition-colors w-full text-left text-destructive"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="md:col-span-3 space-y-6">
              {/* Stats Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Profile Views</p>
                        <p className="text-2xl font-bold">{userStats.profileViews}</p>
                      </div>
                      <Eye className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Interests</p>
                        <p className="text-2xl font-bold">{userStats.interests}</p>
                      </div>
                      <Heart className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Matches</p>
                        <p className="text-2xl font-bold">{userStats.matches}</p>
                      </div>
                      <Star className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Tabs */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Your Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="matches" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="matches">Top Matches</TabsTrigger>
                      <TabsTrigger value="visitors">Recent Visitors</TabsTrigger>
                      <TabsTrigger value="interests">Interests Sent</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="matches" className="space-y-4 mt-4">
                      {matches.map((match) => (
                        <div key={match.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="gradient-accent text-white">
                                {match.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{match.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {match.age} yrs, {match.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className="gradient-accent">
                              {match.match}% Match
                            </Badge>
                            <Link to={`/profile/${match.id}`}>
                              <Button size="sm" variant="outline">View</Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                      <Link to="/search" className="block">
                        <Button className="w-full gradient-accent">View All Matches</Button>
                      </Link>
                    </TabsContent>

                    <TabsContent value="visitors" className="space-y-4 mt-4">
                      {recentVisitors.map((visitor) => (
                        <div key={visitor.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="gradient-accent text-white">
                                {visitor.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{visitor.name}</h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {visitor.time}
                              </p>
                            </div>
                          </div>
                          <Link to={`/profile/${visitor.id}`}>
                            <Button size="sm" variant="outline">View Profile</Button>
                          </Link>
                        </div>
                      ))}
                    </TabsContent>

                    <TabsContent value="interests" className="mt-4">
                      <div className="text-center py-8 text-muted-foreground">
                        <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>You haven't sent any interests yet</p>
                        <Link to="/search">
                          <Button className="mt-4 gradient-accent">Find Matches</Button>
                        </Link>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Profile Completion Tips */}
              {userStats.profileCompletion < 100 && (
                <Card className="shadow-soft border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary" />
                      Complete Your Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Profiles with 100% completion get 3x more responses!
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        Add profile photo
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        Complete education & career details
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        Add family information
                      </li>
                    </ul>
                    <Link to="/profile/edit">
                      <Button className="w-full mt-4 gradient-accent">Complete Now</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
