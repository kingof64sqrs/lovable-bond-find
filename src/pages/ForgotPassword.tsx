import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
      setEmailSent(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 gradient-card">
        <Card className="w-full max-w-md shadow-elegant">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-full gradient-accent flex items-center justify-center">
              {emailSent ? (
                <CheckCircle className="w-6 h-6 text-white" />
              ) : (
                <Heart className="w-6 h-6 text-white fill-white" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {emailSent ? "Check Your Email" : "Forgot Password?"}
            </CardTitle>
            <CardDescription>
              {emailSent
                ? "We've sent you instructions to reset your password"
                : "Enter your email address and we'll send you a reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full gradient-accent" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg text-sm text-center">
                  <p className="mb-2">
                    We've sent a password reset link to:
                  </p>
                  <p className="font-semibold text-primary">{email}</p>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setEmailSent(false)}
                >
                  Try Different Email
                </Button>
              </div>
            )}

            <div className="mt-6 flex items-center justify-center">
              <Link 
                to="/login" 
                className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
