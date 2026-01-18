import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Heart, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { userAPI } from "@/lib/userAPI";

const CreateProfile = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Details
    height: "",
    weight: "",
    maritalStatus: "",
    motherTongue: "",
    religion: "",
    caste: "",
    // Education & Career
    education: "",
    educationDetails: "",
    occupation: "",
    employedIn: "",
    annualIncome: "",
    // Family Details
    familyType: "",
    fatherOccupation: "",
    motherOccupation: "",
    siblings: "",
    // About
    about: "",
    hobbies: "",
    // Location
    country: "",
    state: "",
    city: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await userAPI.profileAPI.createProfile(formData);
      
      if (response.success) {
        toast({
          title: "Profile created successfully!",
          description: "Your profile is now live. Start finding matches!",
        });
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create profile",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 gradient-card">
        <Card className="w-full max-w-2xl shadow-elegant">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Step {step} of {totalSteps}
            </CardDescription>
            <Progress value={progress} className="h-2" />
          </CardHeader>
          <CardContent>
            {/* Step 1: Personal Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Personal Details</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height</Label>
                    <Select
                      value={formData.height}
                      onValueChange={(value) => updateFormData("height", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select height" />
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
                      placeholder="Enter weight"
                      value={formData.weight}
                      onChange={(e) => updateFormData("weight", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) => updateFormData("maritalStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
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
                  <Label htmlFor="motherTongue">Mother Tongue</Label>
                  <Select
                    value={formData.motherTongue}
                    onValueChange={(value) => updateFormData("motherTongue", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="tamil">Tamil</SelectItem>
                      <SelectItem value="telugu">Telugu</SelectItem>
                      <SelectItem value="marathi">Marathi</SelectItem>
                      <SelectItem value="gujarati">Gujarati</SelectItem>
                      <SelectItem value="kannada">Kannada</SelectItem>
                      <SelectItem value="malayalam">Malayalam</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="religion">Religion</Label>
                    <Select
                      value={formData.religion}
                      onValueChange={(value) => updateFormData("religion", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select religion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hindu">Hindu</SelectItem>
                        <SelectItem value="muslim">Muslim</SelectItem>
                        <SelectItem value="christian">Christian</SelectItem>
                        <SelectItem value="sikh">Sikh</SelectItem>
                        <SelectItem value="jain">Jain</SelectItem>
                        <SelectItem value="buddhist">Buddhist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="caste">Caste/Community</Label>
                    <Input
                      id="caste"
                      placeholder="Enter caste"
                      value={formData.caste}
                      onChange={(e) => updateFormData("caste", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education & Career */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Education & Career</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="education">Highest Education</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => updateFormData("education", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select education" />
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
                  <Label htmlFor="educationDetails">Education Details</Label>
                  <Input
                    id="educationDetails"
                    placeholder="e.g., B.Tech in Computer Science"
                    value={formData.educationDetails}
                    onChange={(e) => updateFormData("educationDetails", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g., Software Engineer"
                    value={formData.occupation}
                    onChange={(e) => updateFormData("occupation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employedIn">Employed In</Label>
                  <Select
                    value={formData.employedIn}
                    onValueChange={(value) => updateFormData("employedIn", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment type" />
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
                  <Label htmlFor="annualIncome">Annual Income</Label>
                  <Select
                    value={formData.annualIncome}
                    onValueChange={(value) => updateFormData("annualIncome", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select income range" />
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
              </div>
            )}

            {/* Step 3: Family Details */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Family Details</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="familyType">Family Type</Label>
                  <Select
                    value={formData.familyType}
                    onValueChange={(value) => updateFormData("familyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select family type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuclear">Nuclear Family</SelectItem>
                      <SelectItem value="joint">Joint Family</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                  <Input
                    id="fatherOccupation"
                    placeholder="Enter father's occupation"
                    value={formData.fatherOccupation}
                    onChange={(e) => updateFormData("fatherOccupation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                  <Input
                    id="motherOccupation"
                    placeholder="Enter mother's occupation"
                    value={formData.motherOccupation}
                    onChange={(e) => updateFormData("motherOccupation", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="siblings">Number of Siblings</Label>
                  <Select
                    value={formData.siblings}
                    onValueChange={(value) => updateFormData("siblings", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
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
              </div>
            )}

            {/* Step 4: About & Location */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">About You & Location</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="about">About Yourself</Label>
                  <Textarea
                    id="about"
                    placeholder="Write a brief description about yourself..."
                    value={formData.about}
                    onChange={(e) => updateFormData("about", e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hobbies">Hobbies & Interests</Label>
                  <Input
                    id="hobbies"
                    placeholder="e.g., Reading, Traveling, Music"
                    value={formData.hobbies}
                    onChange={(e) => updateFormData("hobbies", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) => updateFormData("country", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      placeholder="Enter state"
                      value={formData.state}
                      onChange={(e) => updateFormData("state", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={(e) => updateFormData("city", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-6 border-t">
              {step > 1 && (
                <Button variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext} 
                className="gradient-accent ml-auto gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  <>
                    {step === totalSteps ? "Complete Profile" : "Next"}
                    {step < totalSteps && <ArrowRight className="h-4 w-4" />}
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProfile;
