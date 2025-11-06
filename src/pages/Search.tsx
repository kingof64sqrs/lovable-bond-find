import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Heart, MapPin, Briefcase, GraduationCap, Filter, Lock, UserPlus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Mock profile data - Extended list for authenticated users
  const allProfiles = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 28,
      location: "Mumbai, Maharashtra",
      education: "MBA",
      profession: "Marketing Manager",
      religion: "Hindu"
    },
    {
      id: 2,
      name: "Ananya Patel",
      age: 26,
      location: "Ahmedabad, Gujarat",
      education: "B.Tech",
      profession: "Software Engineer",
      religion: "Hindu"
    },
    {
      id: 3,
      name: "Sneha Reddy",
      age: 27,
      location: "Hyderabad, Telangana",
      education: "MBBS",
      profession: "Doctor",
      religion: "Hindu"
    },
    {
      id: 4,
      name: "Kavya Iyer",
      age: 25,
      location: "Chennai, Tamil Nadu",
      education: "CA",
      profession: "Chartered Accountant",
      religion: "Hindu"
    },
    // Additional profiles for authenticated users
    {
      id: 5,
      name: "Meera Singh",
      age: 29,
      location: "Delhi, NCR",
      education: "M.Sc",
      profession: "Research Scientist",
      religion: "Hindu"
    },
    {
      id: 6,
      name: "Neha Gupta",
      age: 27,
      location: "Bangalore, Karnataka",
      education: "MBA",
      profession: "Product Manager",
      religion: "Hindu"
    },
    {
      id: 7,
      name: "Riya Verma",
      age: 26,
      location: "Pune, Maharashtra",
      education: "B.Tech",
      profession: "Data Analyst",
      religion: "Hindu"
    },
    {
      id: 8,
      name: "Anjali Rao",
      age: 28,
      location: "Hyderabad, Telangana",
      education: "M.Tech",
      profession: "Software Architect",
      religion: "Hindu"
    },
    {
      id: 9,
      name: "Divya Nair",
      age: 25,
      location: "Kochi, Kerala",
      education: "BDS",
      profession: "Dentist",
      religion: "Hindu"
    },
    {
      id: 10,
      name: "Pooja Desai",
      age: 27,
      location: "Surat, Gujarat",
      education: "CA",
      profession: "Finance Manager",
      religion: "Hindu"
    }
  ];

  // Limit profiles for non-authenticated users
  const profiles = isAuthenticated 
    ? allProfiles.slice(0, visibleCount)
    : allProfiles.slice(0, 4);

  const handleLoadMore = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }

    if (visibleCount < allProfiles.length) {
      setVisibleCount(prev => Math.min(prev + 3, allProfiles.length));
      toast({
        title: "More profiles loaded!",
        description: `Showing ${Math.min(visibleCount + 3, allProfiles.length)} of ${allProfiles.length} profiles`,
      });
    }
  };

  const handleConnect = (profileName: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to connect with profiles",
        variant: "destructive",
      });
      setShowLoginDialog(true);
      return;
    }
    
    toast({
      title: "Interest Sent!",
      description: `Your interest has been sent to ${profileName}.`,
    });
  };

  const hasMoreProfiles = isAuthenticated ? visibleCount < allProfiles.length : true;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-8 border-b bg-muted/30">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Find Your Match</h1>
              <p className="text-muted-foreground">Browse through verified profiles</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>
          </div>
        </div>
      </section>

      {showFilters && (
        <section className="py-6 border-b bg-background">
          <div className="container">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Age Range</Label>
                <div className="flex gap-2">
                  <Input type="number" placeholder="Min" />
                  <Input type="number" placeholder="Max" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Religion</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hindu">Hindu</SelectItem>
                    <SelectItem value="muslim">Muslim</SelectItem>
                    <SelectItem value="christian">Christian</SelectItem>
                    <SelectItem value="sikh">Sikh</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Community</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="brahmin">Brahmin</SelectItem>
                    <SelectItem value="kshatriya">Kshatriya</SelectItem>
                    <SelectItem value="vaishya">Vaishya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="City or State" />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <Button className="gradient-accent">Apply Filters</Button>
            </div>
          </div>
        </section>
      )}

      <section className="py-8 flex-1">
        <div className="container">
          {!isAuthenticated && (
            <Alert className="mb-6 border-primary/20 bg-primary/5">
              <Lock className="h-4 w-4" />
              <AlertTitle>Limited Preview</AlertTitle>
              <AlertDescription>
                You're viewing a limited set of profiles. Login to see more verified profiles and connect with matches!
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {profiles.length} {isAuthenticated ? `of ${allProfiles.length}` : ''} profiles
              {isAuthenticated && (
                <span className="ml-2 text-primary font-medium">
                  ✓ Viewing all profiles
                </span>
              )}
            </div>
            {!isAuthenticated && (
              <Link to="/register">
                <Button variant="outline" size="sm" className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  Register to See More
                </Button>
              </Link>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Card key={profile.id} className="shadow-soft hover:shadow-elegant transition-all">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-1">{profile.name}</h3>
                        <p className="text-sm text-muted-foreground">{profile.age} years</p>
                      </div>
                      <Button size="icon" variant="ghost" className="text-primary">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        <span>{profile.education}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="h-4 w-4" />
                        <span>{profile.profession}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link to={`/profile/${profile.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">View Profile</Button>
                      </Link>
                      <Button 
                        className="flex-1 gradient-accent"
                        onClick={() => handleConnect(profile.name)}
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {hasMoreProfiles && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleLoadMore}
                className={!isAuthenticated ? "gap-2" : ""}
              >
                {!isAuthenticated && <Lock className="h-4 w-4" />}
                {isAuthenticated ? "Load More Profiles" : "Login to See More Profiles"}
              </Button>
              {!isAuthenticated && (
                <p className="text-sm text-muted-foreground mt-3">
                  Register for free to view {allProfiles.length - 4}+ more verified profiles
                </p>
              )}
            </div>
          )}
          
          {isAuthenticated && !hasMoreProfiles && (
            <div className="mt-8 text-center text-muted-foreground">
              <p>You've viewed all available profiles</p>
              <p className="text-sm mt-2">Check back later for new matches!</p>
            </div>
          )}
        </div>
      </section>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full gradient-accent flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <DialogTitle className="text-center text-2xl">Login Required</DialogTitle>
            <DialogDescription className="text-center">
              Create a free account or login to view more profiles and connect with potential matches.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <Heart className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">View Unlimited Profiles</p>
                  <p className="text-xs text-muted-foreground">Access all verified profiles</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Connect with Matches</p>
                  <p className="text-xs text-muted-foreground">Send interests to connect</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <GraduationCap className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Advanced Filters</p>
                  <p className="text-xs text-muted-foreground">Find matches by preferences</p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-col gap-2">
            <Button 
              className="w-full gradient-accent"
              onClick={() => {
                setShowLoginDialog(false);
                navigate("/register");
              }}
            >
              Register Free
            </Button>
            <Button 
              variant="outline"
              className="w-full"
              onClick={() => {
                setShowLoginDialog(false);
                navigate("/login");
              }}
            >
              Already have an account? Login
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Search;
