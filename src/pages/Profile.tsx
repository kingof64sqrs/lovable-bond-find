import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  MessageCircle,
  Share2,
  MapPin,
  Briefcase,
  GraduationCap,
  Users,
  Home,
  Book,
  Music,
  Camera,
  ArrowLeft,
  Phone,
  Mail,
  CheckCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Mock profile data - in real app, fetch based on id
  const profile = {
    id: id || "1",
    name: "Priya Sharma",
    age: 28,
    profilePhoto: null,
    verified: true,
    religion: "Hindu",
    caste: "Brahmin",
    location: "Mumbai, Maharashtra",
    height: "5'5\"",
    maritalStatus: "Never Married",
    motherTongue: "Hindi",
    education: "MBA in Finance",
    college: "IIM Ahmedabad",
    occupation: "Marketing Manager",
    company: "Tech Corp India",
    employedIn: "Private Company",
    annualIncome: "₹12-15 Lakhs",
    familyType: "Nuclear Family",
    fatherOccupation: "Business",
    motherOccupation: "Homemaker",
    siblings: "1 Brother",
    about: "I'm a passionate professional who loves my work and values family traditions. Looking for a life partner who understands the importance of both career and family.",
    hobbies: ["Reading", "Traveling", "Cooking", "Yoga"],
    createdOn: "2 months ago",
    lastActive: "2 hours ago"
  };

  const handleConnect = () => {
    toast({
      title: "Interest Sent!",
      description: `Your interest has been sent to ${profile.name}.`,
    });
  };

  const handleMessage = () => {
    toast({
      title: "Premium Feature",
      description: "Upgrade to premium to send messages.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Profile Link Copied!",
      description: "Share this profile with your family and friends.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-muted/30">
        <div className="container py-8">
          <Link to="/search" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
            <ArrowLeft className="h-4 w-4" />
            Back to Search
          </Link>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="shadow-soft">
                <CardContent className="pt-6 text-center space-y-4">
                  <Avatar className="w-32 h-32 mx-auto">
                    <AvatarImage src={profile.profilePhoto || ""} />
                    <AvatarFallback className="text-3xl gradient-accent text-white">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center justify-center gap-2">
                      <h2 className="text-2xl font-bold">{profile.name}</h2>
                      {profile.verified && (
                        <CheckCircle className="h-5 w-5 text-primary fill-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {profile.age} years • {profile.height}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Profile ID: LV{profile.id}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 pt-2">
                    <Button className="w-full gradient-accent gap-2" onClick={handleConnect}>
                      <Heart className="h-4 w-4" />
                      Send Interest
                    </Button>
                    <Button variant="outline" className="w-full gap-2" onClick={handleMessage}>
                      <MessageCircle className="h-4 w-4" />
                      Send Message
                    </Button>
                    <Button variant="ghost" className="w-full gap-2" onClick={handleShare}>
                      <Share2 className="h-4 w-4" />
                      Share Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{profile.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Religion</p>
                      <p className="text-muted-foreground">{profile.religion}, {profile.caste}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Education</p>
                      <p className="text-muted-foreground">{profile.education}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Briefcase className="h-4 w-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Occupation</p>
                      <p className="text-muted-foreground">{profile.occupation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="pt-6 space-y-2 text-sm text-muted-foreground">
                  <p>Last Active: {profile.lastActive}</p>
                  <p>Profile Created: {profile.createdOn}</p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>About {profile.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.about}
                  </p>
                </CardContent>
              </Card>

              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="professional">Professional</TabsTrigger>
                  <TabsTrigger value="family">Family</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="mt-6">
                  <Card className="shadow-soft">
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p className="font-medium">{profile.age} years</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Height</p>
                          <p className="font-medium">{profile.height}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Marital Status</p>
                          <p className="font-medium">{profile.maritalStatus}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Mother Tongue</p>
                          <p className="font-medium">{profile.motherTongue}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Religion</p>
                          <p className="font-medium">{profile.religion}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Caste</p>
                          <p className="font-medium">{profile.caste}</p>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Hobbies & Interests</p>
                        <div className="flex flex-wrap gap-2">
                          {profile.hobbies.map((hobby, index) => (
                            <Badge key={index} variant="secondary">
                              {hobby}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="professional" className="mt-6">
                  <Card className="shadow-soft">
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Highest Education</p>
                          <p className="font-medium">{profile.education}</p>
                          <p className="text-sm text-muted-foreground mt-1">{profile.college}</p>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm text-muted-foreground">Occupation</p>
                          <p className="font-medium">{profile.occupation}</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Company</p>
                          <p className="font-medium">{profile.company}</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Employed In</p>
                          <p className="font-medium">{profile.employedIn}</p>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground">Annual Income</p>
                          <p className="font-medium">{profile.annualIncome}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="family" className="mt-6">
                  <Card className="shadow-soft">
                    <CardContent className="pt-6 space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Family Type</p>
                        <p className="font-medium">{profile.familyType}</p>
                      </div>

                      <Separator />

                      <div>
                        <p className="text-sm text-muted-foreground">Father's Occupation</p>
                        <p className="font-medium">{profile.fatherOccupation}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Mother's Occupation</p>
                        <p className="font-medium">{profile.motherOccupation}</p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Siblings</p>
                        <p className="font-medium">{profile.siblings}</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <Card className="shadow-soft border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">Get Contact Details</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Upgrade to premium to view phone number and email address
                      </p>
                      <Button className="gradient-accent">
                        Upgrade to Premium
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
