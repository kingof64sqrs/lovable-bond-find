import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, Shield, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Lovable</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              India's most trusted matrimony platform, dedicated to helping millions find their perfect life partner with trust, security, and personalized matchmaking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-muted-foreground">
                Founded with a vision to revolutionize Indian matrimony, Lovable has been bringing hearts together since 2020. We understand the importance of finding the right life partner and the role family plays in this journey.
              </p>
              <p className="text-muted-foreground">
                With over 10 lakh verified profiles and 5000+ successful marriages, we've built a platform that combines traditional values with modern technology to create meaningful connections.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-soft">
                <CardContent className="pt-6 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">10L+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">5000+</div>
                  <div className="text-sm text-muted-foreground">Success Stories</div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">100%</div>
                  <div className="text-sm text-muted-foreground">Verified Profiles</div>
                </CardContent>
              </Card>
              <Card className="shadow-soft">
                <CardContent className="pt-6 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">4.8/5</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-12">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground">
                To create a safe, trusted, and efficient platform that respects Indian traditions while embracing modern matchmaking techniques, helping individuals and families find perfect life partners.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="gradient-card shadow-soft">
                <CardContent className="pt-6 text-center space-y-3">
                  <Shield className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="font-semibold text-lg">Trust & Safety</h3>
                  <p className="text-sm text-muted-foreground">
                    Every profile is manually verified to ensure authenticity and safety for our users
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card shadow-soft">
                <CardContent className="pt-6 text-center space-y-3">
                  <Heart className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="font-semibold text-lg">Quality Matches</h3>
                  <p className="text-sm text-muted-foreground">
                    Advanced algorithms and personal matchmakers ensure the best possible matches
                  </p>
                </CardContent>
              </Card>
              <Card className="gradient-card shadow-soft">
                <CardContent className="pt-6 text-center space-y-3">
                  <Users className="h-10 w-10 mx-auto text-primary" />
                  <h3 className="font-semibold text-lg">Privacy First</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete control over your profile visibility and personal information
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
