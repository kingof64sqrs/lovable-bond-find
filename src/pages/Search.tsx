import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, MapPin, Briefcase, GraduationCap, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);

  // Mock profile data
  const profiles = [
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
    }
  ];

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
          <div className="mb-6 text-sm text-muted-foreground">
            Showing {profiles.length} profiles
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
                      <Button className="flex-1 gradient-accent">Connect</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" size="lg">Load More Profiles</Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Search;
