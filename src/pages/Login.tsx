import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";
import { Eye, EyeOff, ArrowLeft, GraduationCap } from "lucide-react";
import { ThemeSwitch } from "@/components/ui/theme-switch";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login logic - In real app, this would call an API
      if (email && password) {
        // Determine role based on email domain or predefined accounts
        let role = 'student'; // default
        if (email.includes('admin')) role = 'admin';
        else if (email.includes('placement')) role = 'placement_cell';
        else if (email.includes('mentor')) role = 'mentor';
        else if (email.includes('recruiter')) role = 'recruiter';

        console.log('Attempting login with:', { email, role });

        // Call the login function with the correct parameters
        await login(email, password, role as 'student' | 'admin' | 'mentor' | 'recruiter' | 'placement_cell');
        
        console.log('Login successful, redirecting to:', role);

        toast({
          title: "Login Successful",
          description: `Welcome back! Redirecting to your ${role} dashboard...`,
        });

        // Redirect based on role
        setTimeout(() => {
          switch (role) {
            case 'admin':
              navigate('/admin');
              break;
            case 'placement_cell':
              navigate('/placement');
              break;
            case 'mentor':
              navigate('/mentor');
              break;
            case 'recruiter':
              navigate('/recruiter');
              break;
            default:
              navigate('/student');
          }
        }, 1500);
      } else {
        toast({
          title: "Login Failed",
          description: "Please enter both email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      <div className="absolute top-4 right-4">
        <ThemeSwitch />
      </div>

      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
            <span className="text-2xl font-bold">InternLink</span>
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6">
            <div className="text-center text-sm text-slate-600 dark:text-slate-400 mb-4">
              Demo Accounts (Email / Any Password):
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                <strong>Student:</strong><br />
                student@demo.com
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                <strong>Mentor:</strong><br />
                mentor@demo.com
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                <strong>Admin:</strong><br />
                admin@demo.com
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                <strong>Recruiter:</strong><br />
                recruiter@demo.com
              </div>
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded">
                <strong>Placement Cell:</strong><br />
                placement@demo.com
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;