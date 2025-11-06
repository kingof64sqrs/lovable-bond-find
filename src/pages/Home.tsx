import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Heart, Shield, Users, CheckCircle, Search, MessageCircle, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-couple.jpg";
import trustIcon from "@/assets/trust-icon.png";
import verifiedIcon from "@/assets/verified-icon.png";
import matchIcon from "@/assets/match-icon.png";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Life Partner
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Join India's most trusted matrimony platform. Over 10 lakh+ verified profiles waiting to meet you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/register">
                  <Button size="lg" className="gradient-accent shadow-elegant">
                    Register Free
                  </Button>
                </Link>
                <Link to="/search">
                  <Button size="lg" variant="outline">
                    Browse Profiles
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">10L+</div>
                  <div className="text-sm text-muted-foreground">Active Profiles</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Marriages</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Verified</div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 gradient-accent blur-3xl opacity-20 rounded-full" />
              <img
                src={heroImage}
                alt="Happy Indian couple in traditional wedding attire"
                className="rounded-2xl shadow-elegant relative z-10 w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Lovable?</h2>
            <p className="text-muted-foreground">
              India's most trusted matrimony platform with verified profiles and advanced matching
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="gradient-card border-none shadow-soft hover:shadow-elegant transition-all">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <img src={verifiedIcon} alt="Verified profiles" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold">100% Verified Profiles</h3>
                <p className="text-muted-foreground">
                  Every profile is manually verified by our team for your safety and security
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-none shadow-soft hover:shadow-elegant transition-all">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
                  <img src={matchIcon} alt="Perfect matches" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Advanced algorithm finds your perfect match based on preferences and compatibility
                </p>
              </CardContent>
            </Card>

            <Card className="gradient-card border-none shadow-soft hover:shadow-elegant transition-all">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <img src={trustIcon} alt="Privacy and trust" className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold">Privacy & Trust</h3>
                <p className="text-muted-foreground">
                  Your data is secure with us. Complete privacy control over your profile visibility
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple steps to find your life partner</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Register Free", desc: "Create your profile in minutes" },
              { icon: Search, title: "Search Matches", desc: "Browse verified profiles" },
              { icon: MessageCircle, title: "Connect", desc: "Chat with matches" },
              { icon: Heart, title: "Find Love", desc: "Meet your perfect match" }
            ].map((step, idx) => (
              <div key={idx} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full gradient-accent flex items-center justify-center text-white">
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground">Thousands of happy couples found their match</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Priya & Rahul", location: "Mumbai", quote: "Found my soulmate within 2 months! The platform is amazing." },
              { name: "Ananya & Vikram", location: "Delhi", quote: "Great experience! Profile verification gave us confidence." },
              { name: "Sneha & Arjun", location: "Bangalore", quote: "Best decision to join Lovable. Married for 1 year now!" }
            ].map((testimonial, idx) => (
              <Card key={idx} className="gradient-card border-none shadow-soft">
                <CardContent className="pt-6 space-y-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <Card className="gradient-accent border-none text-white shadow-elegant">
            <CardContent className="py-12 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Find Your Life Partner?</h2>
              <p className="text-white/90 max-w-2xl mx-auto">
                Join thousands of happy couples who found their perfect match on Lovable
              </p>
              <Link to="/register">
                <Button size="lg" variant="secondary" className="shadow-soft">
                  Create Free Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
