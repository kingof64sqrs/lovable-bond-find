import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProfileEdit = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    // Personal
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    dateOfBirth: "",
    height: "5.5",
    weight: "65",
    maritalStatus: "never-married",
    motherTongue: "hindi",
    religion: "hindu",
    caste: "",
    // Education & Career
    education: "bachelors",
    educationDetails: "",
    college: "",
    occupation: "",
    company: "",
    employedIn: "private",
    annualIncome: "5-7",
    // Family
    familyType: "nuclear",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    siblings: "0",
    // About
    about: "",
    hobbies: "",
    // Location
    country: "india",
    state: "",
    city: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });
      setIsLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 bg-muted/30">
        <div className="container py-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="grid lg:grid-cols-4 gap-6">
            {/* Profile Photo Section */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Profile Photo</CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-3xl gradient-accent text-white">
                        {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full gradient-accent"
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload a clear photo for better matches
                  </p>
                  <Button variant="outline" className="w-full">
                    Upload Photo
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Form Section */}
            <div className="lg:col-span-3">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Edit Your Profile</CardTitle>
                  <CardDescription>
                    Update your information to help us find better matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="career">Career</TabsTrigger>
                      <TabsTrigger value="family">Family</TabsTrigger>
                      <TabsTrigger value="about">About</TabsTrigger>
                    </TabsList>

                    {/* Personal Tab */}
                    <TabsContent value="personal" className="space-y-4 mt-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateFormData("name", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+91"
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            id="dob"
                            type="date"
                            value={formData.dateOfBirth}
                            onChange={(e) => updateFormData("dateOfBirth", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="height">Height</Label>
                          <Select
                            value={formData.height}
                            onValueChange={(value) => updateFormData("height", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="4.5">4'5" - 4'8"</SelectItem>
                              <SelectItem value="4.9">4'9" - 5'0"</SelectItem>
                              <SelectItem value="5.1">5'1" - 5'4"</SelectItem>
                              <SelectItem value="5.5">5'5" - 5'8"</SelectItem>
                              <SelectItem value="5.9">5'9" - 6'0"</SelectItem>
                              <SelectItem value="6.1">6'1" - 6'4"</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="weight">Weight (kg)</Label>
                          <Input
                            id="weight"
                            type="number"
                            value={formData.weight}
                            onChange={(e) => updateFormData("weight", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Marital Status</Label>
                          <Select
                            value={formData.maritalStatus}
                            onValueChange={(value) => updateFormData("maritalStatus", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="never-married">Never Married</SelectItem>
                              <SelectItem value="divorced">Divorced</SelectItem>
                              <SelectItem value="widowed">Widowed</SelectItem>
                              <SelectItem value="awaiting-divorce">Awaiting Divorce</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Mother Tongue</Label>
                          <Select
                            value={formData.motherTongue}
                            onValueChange={(value) => updateFormData("motherTongue", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hindi">Hindi</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="tamil">Tamil</SelectItem>
                              <SelectItem value="telugu">Telugu</SelectItem>
                              <SelectItem value="marathi">Marathi</SelectItem>
                              <SelectItem value="gujarati">Gujarati</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Religion</Label>
                          <Select
                            value={formData.religion}
                            onValueChange={(value) => updateFormData("religion", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
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
                          <Label>Caste</Label>
                          <Input
                            value={formData.caste}
                            onChange={(e) => updateFormData("caste", e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>

                    {/* Career Tab */}
                    <TabsContent value="career" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label>Highest Education</Label>
                        <Select
                          value={formData.education}
                          onValueChange={(value) => updateFormData("education", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high-school">High School</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                            <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                            <SelectItem value="masters">Master's Degree</SelectItem>
                            <SelectItem value="doctorate">Doctorate/PhD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Education Details</Label>
                        <Input
                          placeholder="e.g., B.Tech in Computer Science"
                          value={formData.educationDetails}
                          onChange={(e) => updateFormData("educationDetails", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>College/University</Label>
                        <Input
                          value={formData.college}
                          onChange={(e) => updateFormData("college", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Occupation</Label>
                        <Input
                          placeholder="e.g., Software Engineer"
                          value={formData.occupation}
                          onChange={(e) => updateFormData("occupation", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={formData.company}
                          onChange={(e) => updateFormData("company", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Employed In</Label>
                        <Select
                          value={formData.employedIn}
                          onValueChange={(value) => updateFormData("employedIn", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="private">Private Company</SelectItem>
                            <SelectItem value="government">Government/PSU</SelectItem>
                            <SelectItem value="business">Business/Self Employed</SelectItem>
                            <SelectItem value="not-working">Not Working</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Annual Income</Label>
                        <Select
                          value={formData.annualIncome}
                          onValueChange={(value) => updateFormData("annualIncome", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-3">₹0 - ₹3 Lakhs</SelectItem>
                            <SelectItem value="3-5">₹3 - ₹5 Lakhs</SelectItem>
                            <SelectItem value="5-7">₹5 - ₹7 Lakhs</SelectItem>
                            <SelectItem value="7-10">₹7 - ₹10 Lakhs</SelectItem>
                            <SelectItem value="10-15">₹10 - ₹15 Lakhs</SelectItem>
                            <SelectItem value="15-20">₹15 - ₹20 Lakhs</SelectItem>
                            <SelectItem value="20+">₹20+ Lakhs</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    {/* Family Tab */}
                    <TabsContent value="family" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label>Family Type</Label>
                        <Select
                          value={formData.familyType}
                          onValueChange={(value) => updateFormData("familyType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nuclear">Nuclear Family</SelectItem>
                            <SelectItem value="joint">Joint Family</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Father's Name</Label>
                          <Input
                            value={formData.fatherName}
                            onChange={(e) => updateFormData("fatherName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Father's Occupation</Label>
                          <Input
                            value={formData.fatherOccupation}
                            onChange={(e) => updateFormData("fatherOccupation", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Mother's Name</Label>
                          <Input
                            value={formData.motherName}
                            onChange={(e) => updateFormData("motherName", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Mother's Occupation</Label>
                          <Input
                            value={formData.motherOccupation}
                            onChange={(e) => updateFormData("motherOccupation", e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Number of Siblings</Label>
                        <Select
                          value={formData.siblings}
                          onValueChange={(value) => updateFormData("siblings", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">No Siblings</SelectItem>
                            <SelectItem value="1">1 Sibling</SelectItem>
                            <SelectItem value="2">2 Siblings</SelectItem>
                            <SelectItem value="3">3 Siblings</SelectItem>
                            <SelectItem value="4+">4+ Siblings</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TabsContent>

                    {/* About Tab */}
                    <TabsContent value="about" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label>About Yourself</Label>
                        <Textarea
                          placeholder="Write a brief description about yourself..."
                          value={formData.about}
                          onChange={(e) => updateFormData("about", e.target.value)}
                          rows={5}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Hobbies & Interests</Label>
                        <Input
                          placeholder="e.g., Reading, Traveling, Music"
                          value={formData.hobbies}
                          onChange={(e) => updateFormData("hobbies", e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Country</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => updateFormData("country", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="usa">USA</SelectItem>
                            <SelectItem value="uk">UK</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>State</Label>
                          <Input
                            value={formData.state}
                            onChange={(e) => updateFormData("state", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>City</Label>
                          <Input
                            value={formData.city}
                            onChange={(e) => updateFormData("city", e.target.value)}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex justify-end gap-3 mt-6 pt-6 border-t">
                    <Button
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="gradient-accent gap-2"
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      <Save className="h-4 w-4" />
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
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

export default ProfileEdit;
