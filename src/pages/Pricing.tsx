import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "Forever",
      description: "Perfect to start your journey",
      features: [
        "Create profile",
        "View 10 profiles daily",
        "Send 5 interests",
        "Basic filters",
        "Profile visibility"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Gold",
      price: "₹2,999",
      period: "3 Months",
      description: "Most popular choice",
      features: [
        "Everything in Free",
        "Unlimited profile views",
        "50 interests per month",
        "Advanced filters",
        "Chat with matches",
        "Profile highlighting",
        "Priority support"
      ],
      cta: "Go Premium",
      popular: true
    },
    {
      name: "Diamond",
      price: "₹7,999",
      period: "12 Months",
      description: "Best value for serious seekers",
      features: [
        "Everything in Gold",
        "Unlimited interests",
        "Featured profile",
        "Personal matchmaker",
        "Background verification",
        "Premium badge",
        "Exclusive events access",
        "24/7 priority support"
      ],
      cta: "Go Premium",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Perfect Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Find your life partner with plans designed for every need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`relative ${plan.popular ? 'border-primary shadow-elegant gradient-card' : 'shadow-soft'} transition-all hover:shadow-elegant`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="gradient-accent text-white px-4 py-1 rounded-full text-sm font-medium shadow-soft">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{plan.period}</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/register">
                    <Button 
                      className={`w-full ${plan.popular ? 'gradient-accent' : ''}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center text-sm text-muted-foreground">
            <p>All plans include data security and privacy protection</p>
            <p className="mt-2">Need help choosing? <a href="#" className="text-primary hover:underline">Contact our support team</a></p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
