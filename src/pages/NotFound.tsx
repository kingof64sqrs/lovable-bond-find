import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, Search, Heart, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex items-center justify-center p-4 gradient-card">
        <Card className="w-full max-w-lg shadow-elegant text-center">
          <CardContent className="pt-12 pb-12 space-y-6">
            <div className="mx-auto w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-12 h-12 text-primary" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-6xl font-bold text-primary">404</h1>
              <h2 className="text-2xl font-semibold">Page Not Found</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Oops! The page you're looking for doesn't exist. But don't worry, your perfect match is still out there!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <Link to="/">
                <Button className="gradient-accent gap-2 w-full sm:w-auto">
                  <Home className="h-4 w-4" />
                  Go to Home
                </Button>
              </Link>
              <Link to="/search">
                <Button variant="outline" className="gap-2 w-full sm:w-auto">
                  <Search className="h-4 w-4" />
                  Find Matches
                </Button>
              </Link>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">Quick Links</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <Link to="/login" className="text-primary hover:underline">
                  Login
                </Link>
                <Link to="/register" className="text-primary hover:underline">
                  Register
                </Link>
                <Link to="/about" className="text-primary hover:underline">
                  About Us
                </Link>
                <Link to="/pricing" className="text-primary hover:underline">
                  Pricing
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default NotFound;
