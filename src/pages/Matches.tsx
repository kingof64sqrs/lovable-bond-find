import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MapPin,
  Briefcase,
  GraduationCap,
  Filter,
  Star,
  ArrowLeft,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { userAPI } from "@/lib/userAPI";

const Matches = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const [matchesRes, recsRes] = await Promise.all([
        userAPI.searchAPI.getMatches(),
        userAPI.searchAPI.getRecommendations()
      ]);
      
      const allMatches = [
        ...(matchesRes.data || []),
        ...(recsRes.data || [])
      ];
      
      setMatches(allMatches);
    } catch (error: any) {
      console.error('Failed to fetch matches:', error);
      toast({
        title: "Error",
        description: "Failed to load matches",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendInterest = async (profileId: number, name: string) => {
    try {
      await userAPI.interestAPI.sendInterest({ profileId });
      toast({
        title: "Interest Sent!",
        description: `Your interest has been sent to ${name}.`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send interest",
        variant: "destructive"
      });
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 90) return "text-green-600 dark:text-green-400";
    if (score >= 80) return "text-blue-600 dark:text-blue-400";
    return "text-orange-600 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 bg-muted/30">
        <div className="container py-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
            <p className="text-muted-foreground">
              Profiles matched based on your preferences
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4 mb-6">
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">{matches.length}</p>
                  <p className="text-sm text-muted-foreground mt-1">Total Matches</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {matches.filter(m => m.type === "new").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">New Today</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {matches.filter(m => m.type === "premium").length}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Premium Matches</p>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary">
                    {Math.round(matches.reduce((acc, m) => acc + m.matchScore, 0) / matches.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Avg Match Score</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-soft mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filter Matches</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {showFilters ? "Hide" : "Show"} Filters
                </Button>
              </div>

              {showFilters && (
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Age Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="21-25">21-25 years</SelectItem>
                        <SelectItem value="26-30">26-30 years</SelectItem>
                        <SelectItem value="31-35">31-35 years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's</SelectItem>
                        <SelectItem value="masters">Master's</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Input placeholder="Location" />
                  </div>
                  <div className="space-y-2">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Match Score" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="90+">90% and above</SelectItem>
                        <SelectItem value="80+">80% and above</SelectItem>
                        <SelectItem value="70+">70% and above</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tabs */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-3 text-lg">Loading matches...</span>
            </div>
          ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">All Matches</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map((match) => (
                  <Card key={match.id} className="shadow-soft hover:shadow-elegant transition-all">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3 flex-1">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-lg gradient-accent text-white">
                                {match.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{match.name}</h3>
                                {match.type === "premium" && (
                                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{match.age} years</p>
                              <Badge 
                                variant="secondary" 
                                className={`mt-1 ${getMatchColor(match.matchScore)}`}
                              >
                                {match.matchScore}% Match
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{match.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCap className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{match.education}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{match.profession}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Link to={`/profile/${match.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              View Profile
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className="flex-1 gradient-accent gap-1"
                            onClick={() => handleSendInterest(match.name)}
                          >
                            <Heart className="h-3 w-3" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="premium" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.filter(m => m.type === "premium").map((match) => (
                  <Card key={match.id} className="shadow-soft hover:shadow-elegant transition-all border-primary/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3 flex-1">
                            <Avatar className="h-16 w-16">
                              <AvatarFallback className="text-lg gradient-accent text-white">
                                {match.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold">{match.name}</h3>
                                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                              </div>
                              <p className="text-sm text-muted-foreground">{match.age} years</p>
                              <Badge 
                                variant="secondary" 
                                className={`mt-1 ${getMatchColor(match.matchScore)}`}
                              >
                                {match.matchScore}% Match
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{match.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <GraduationCap className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{match.education}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Briefcase className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{match.profession}</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Link to={`/profile/${match.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              View Profile
                            </Button>
                          </Link>
                          <Button
                            size="sm"
                            className="flex-1 gradient-accent gap-1"
                            onClick={() => handleSendInterest(match.name)}
                          >
                            <Heart className="h-3 w-3" />
                            Connect
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.filter(m => m.type === "new").length > 0 ? (
                  matches.filter(m => m.type === "new").map((match) => (
                    <Card key={match.id} className="shadow-soft hover:shadow-elegant transition-all">
                      <CardContent className="pt-6">
                        <Badge className="mb-3" variant="secondary">New Today</Badge>
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3 flex-1">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg gradient-accent text-white">
                                  {match.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold">{match.name}</h3>
                                <p className="text-sm text-muted-foreground">{match.age} years</p>
                                <Badge 
                                  variant="secondary" 
                                  className={`mt-1 ${getMatchColor(match.matchScore)}`}
                                >
                                  {match.matchScore}% Match
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{match.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <GraduationCap className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{match.education}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Briefcase className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{match.profession}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Link to={`/profile/${match.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                View Profile
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="flex-1 gradient-accent gap-1"
                              onClick={() => handleSendInterest(match.name)}
                            >
                              <Heart className="h-3 w-3" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No new matches today. Check back tomorrow!</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recommended" className="mt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.filter(m => m.type === "recommended").length > 0 ? (
                  matches.filter(m => m.type === "recommended").map((match) => (
                    <Card key={match.id} className="shadow-soft hover:shadow-elegant transition-all">
                      <CardContent className="pt-6">
                        <Badge className="mb-3 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                          Recommended
                        </Badge>
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <div className="flex gap-3 flex-1">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="text-lg gradient-accent text-white">
                                  {match.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h3 className="font-semibold">{match.name}</h3>
                                <p className="text-sm text-muted-foreground">{match.age} years</p>
                                <Badge 
                                  variant="secondary" 
                                  className={`mt-1 ${getMatchColor(match.matchScore)}`}
                                >
                                  {match.matchScore}% Match
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{match.location}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <GraduationCap className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{match.education}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Briefcase className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{match.profession}</span>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2">
                            <Link to={`/profile/${match.id}`} className="flex-1">
                              <Button variant="outline" size="sm" className="w-full">
                                View Profile
                              </Button>
                            </Link>
                            <Button
                              size="sm"
                              className="flex-1 gradient-accent gap-1"
                              onClick={() => handleSendInterest(match.name)}
                            >
                              <Heart className="h-3 w-3" />
                              Connect
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-muted-foreground">
                    <p>No recommended matches at this time.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Matches;
