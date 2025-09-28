import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Users,
  BrainCircuit,
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  BookOpen,
  Building,
  Building2,
  Trophy,
  TrendingUp,
  UserCheck,
  Briefcase,
  Calendar,
  Mail,
  Heart,
  ExternalLink,
  Shield,
  Award,
  Eye,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  MessageCircle,
  BarChart3,
  User,
  Info,
  Play,
  ChevronRight,
  MapPin,
  Clock,
  Facebook,
  Phone,
  AlertTriangle,
  ArrowDown,
  FileSpreadsheet,
  TrendingDown,
  LogOut
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { Fade, Slide } from "react-awesome-reveal";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { testSupabaseConnection, initializeSupabaseSchema } from "@/lib/supabase-test";
import campusHero from "@/assets/campus-hero.jpg";
import placementSuccess from "@/assets/placement-success.jpg";
import studentsWorking from "@/assets/students-working.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

import { useEffect, useState } from "react";

const Landing = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);



  const handleRestrictedFeature = (featureName: string) => {
    if (user) {
      toast.success(`Opening ${featureName}...`, {
        description: "Redirecting to your dashboard"
      });
      // Add actual navigation logic here
      setTimeout(() => {
        const dashboard = getRoleDashboard(user.role);
        window.location.href = dashboard.path;
      }, 1000);
    } else {
      toast.warning(`Please sign in to access ${featureName}`, {
        description: "This feature requires authentication",
        action: {
          label: "Sign In",
          onClick: () => window.location.href = "/login"
        }
      });
    }
  };

  const handlePublicFeature = (featureName: string) => {
    toast.info(`Opening ${featureName}...`, {
      description: "Loading public information"
    });
    // Add actual functionality here
  };

  const handleContactSupport = () => {
    toast.success("Contact form opened!", {
      description: "We'll get back to you within 24 hours"
    });
    // Open contact modal or redirect to contact page
  };

  const handleNewsletterSignup = (email: string) => {
    if (email) {
      toast.success("Thank you for subscribing!", {
        description: "You'll receive updates about new features and opportunities"
      });
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  const handleSocialClick = (platform: string) => {
    toast.info(`Opening ${platform}...`, {
      description: "Redirecting to our social media page"
    });
  };

  const handleDemoClick = () => {
    toast.info("Quick Demo", {
      description: "Use demo accounts from login page to explore all features!"
    });
  };

  const testSupabase = async () => {
    toast.info("Testing Supabase connection...", {
      description: "Checking database connectivity"
    });
    
    try {
      const connectionTest = await testSupabaseConnection();
      const schemaTest = await initializeSupabaseSchema();
      
      if (connectionTest.success && schemaTest.success) {
        toast.success("Supabase is working perfectly!", {
          description: "Database connection and schema verified"
        });
      } else if (connectionTest.success && schemaTest.needsSetup) {
        toast.warning("Supabase connected but needs schema setup", {
          description: "Database tables need to be created"
        });
      } else {
        toast.error("Supabase connection issues", {
          description: connectionTest.error || schemaTest.error || "Unknown error"
        });
      }
    } catch (error) {
      toast.error("Supabase test failed", {
        description: "Unable to connect to database"
      });
    }
  };

  // Function to check if user can access a specific role dashboard
  const canAccessRole = (roleType: string) => {
    if (!user) return false;
    
    // Map role types to user roles
    const roleMapping: { [key: string]: string } = {
      'Students': 'student',
      'Faculty Mentors': 'mentor',
      'Recruiters': 'recruiter',
      'Placement Cell': 'placement_cell'
    };
    
    return roleMapping[roleType] === user.role;
  };

  // Get role-specific dashboard path and label
  const getRoleDashboard = (role: string) => {
    const dashboardConfig = {
      'admin': { path: '/admin', label: 'Admin Dashboard' },
      'student': { path: '/student', label: 'Student Dashboard' },
      'mentor': { path: '/mentor', label: 'Mentor Dashboard' },
      'recruiter': { path: '/recruiter', label: 'Recruiter Dashboard' },
      'placement_cell': { path: '/placement', label: 'Placement Dashboard' }
    };    return dashboardConfig[role as keyof typeof dashboardConfig] || { path: '/', label: 'Dashboard' };
  };

  const roles = [
    {
      title: "Students",
      description: "Create your profile, discover opportunities, and track your career journey",
      icon: GraduationCap,
      features: ["Digital Portfolio", "One-click Applications", "Real-time Tracking", "Certificate Generation"],
      path: "/student",
      image: studentsWorking
    },
    {
      title: "Faculty Mentors", 
      description: "Guide students, approve applications, and monitor training progress",
      icon: Users,
      features: ["Student Mentoring", "Application Reviews", "Progress Monitoring", "Schedule Management"],
      path: "/mentor",
      image: placementSuccess
    },
    {
      title: "Recruiters",
      description: "Post opportunities, review candidates, and find the best talent",
      icon: Building2,
      features: ["Opportunity Posting", "Candidate Review", "Interview Scheduling", "Feedback System"],
      path: "/recruiter",
      image: placementSuccess
    },
    {
      title: "Placement Cell",
      description: "Manage campus placements, coordinate with companies, and track student progress",
      icon: Briefcase,
      features: ["Opportunity Management", "Student Tracking", "Company Relations", "Analytics & Reports"],
      path: "/placement",
      image: campusHero
    }
  ];

  const stats = [
    { number: "70%", label: "Time Saved", subtitle: "Automated workflows" },
    { number: "80%", label: "Less Admin Work", subtitle: "Manual tasks eliminated" },
    { number: "65%", label: "Better Matching", subtitle: "AI-powered recommendations" },
    { number: "40%", label: "More Placements", subtitle: "Increased conversion rate" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-lg sticky top-12 z-40 shadow-md transition-all duration-300">
  <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
              <GraduationCap className="w-6 h-6 text-primary-foreground animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-foreground tracking-tight drop-shadow-sm transition-colors duration-300 hover:text-primary">InternLink</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Supabase Test Button (Development Only) */}
            {process.env.NODE_ENV === 'development' && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={testSupabase}
                className="text-xs"
              >
                Test DB
              </Button>
            )}
            <ThemeSwitch />
            
            {user ? (
              /* Show role-specific dashboard button for authenticated users */
              <div className="flex items-center gap-3">
                {/* User Profile Indicator */}
                <div className="flex items-center gap-2 bg-muted/60 rounded-full px-3 py-1 shadow transition-all duration-300 hover:bg-muted/80 hover:shadow-lg">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center animate-bounce">
                    {user.role === 'admin' && <BarChart3 className="w-3 h-3 text-primary-foreground" />}
                    {user.role === 'student' && <GraduationCap className="w-3 h-3 text-primary-foreground" />}
                    {user.role === 'mentor' && <User className="w-3 h-3 text-primary-foreground" />}
                    {user.role === 'recruiter' && <Users className="w-3 h-3 text-primary-foreground" />}
                    {user.role === 'placement_cell' && <Briefcase className="w-3 h-3 text-primary-foreground" />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">Welcome back</span>
                    <span className="text-sm font-semibold capitalize text-foreground tracking-wide">{user.role}</span>
                  </div>
                </div>
                {/* Role-specific Dashboard Button */}
                <Button variant="default" size="sm" asChild className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <Link to={getRoleDashboard(user.role).path}>
                    {getRoleDashboard(user.role).label}
                  </Link>
                </Button>
                {/* Logout Button */}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => {
                    logout();
                    toast.success("Logged out successfully!");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              // Show only Login button for guests
              <div className="flex items-center gap-2">
                <Button variant="default" size="sm" asChild className="transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
  </header>

      {/* Hero Section */}
  <Fade triggerOnce>
  <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-slate-900 min-h-screen flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url(${campusHero})` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-black/50"></div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white z-10" data-aos="fade-up">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            End the Chaos of
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Campus Placements
            </span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Replace scattered WhatsApp groups, endless emails, and manual spreadsheets with one intelligent platform for internships and placements
          </motion.p>
          {!user ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }}>
                <Button 
                  variant="hero" 
                  size="xl" 
                  className="text-lg shadow-2xl hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105 animate-bounce"
                  onClick={() => {
                    toast.success("Redirecting to Sign Up!", {
                      description: "Create your account and start your journey"
                    });
                    setTimeout(() => {
                      window.location.href = "/signup";
                    }, 1000);
                  }}
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 animate-spin" />
                </Button>
              </motion.div>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6, delay: 0.9 }}>
                <Button 
                  variant="outline" 
                  size="xl" 
                  className="text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
                  onClick={handleDemoClick}
                >
                  <Play className="w-5 h-5 mr-2 animate-pulse" />
                  Watch Demo
                </Button>
              </motion.div>
              {/* Removed duplicate sign in button from hero */}
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="hero" 
                size="xl" 
                className="text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link to={getRoleDashboard(user.role).path}>
                  Go to {getRoleDashboard(user.role).label}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="text-lg border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105"
                onClick={() => {
                  toast.info("Platform overview", {
                    description: "Explore all features available on InternLink"
                  });
                }}
              >
                <Info className="w-5 h-5 mr-2" />
                Explore Platform
              </Button>
            </div>
          )}
        </div>
      </section>
    </Fade>

      {/* Problem Statement Section */}
      <Slide direction="up" triggerOnce>
        <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <AlertTriangle className="w-4 h-4" />
                Current Campus Reality
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                The Placement Process is 
                <span className="block text-red-600 dark:text-red-400">Broken</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Every year, thousands of students struggle through a chaotic maze of disconnected systems
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: MessageCircle,
                  title: "Scattered Communications",
                  description: "Internship notices buried in WhatsApp groups, students miss critical deadlines",
                  color: "text-red-500"
                },
                {
                  icon: Mail,
                  title: "Email Chaos",
                  description: "Resumes lost in email chains, no tracking of application status",
                  color: "text-orange-500"
                },
                {
                  icon: Building,
                  title: "Multiple Office Visits",
                  description: "Students waste time chasing approvals across different departments",
                  color: "text-yellow-500"
                },
                {
                  icon: FileSpreadsheet,
                  title: "Manual Spreadsheets",
                  description: "Placement cells drowning in manual status updates instead of coaching",
                  color: "text-blue-500"
                },
                {
                  icon: Users,
                  title: "Lost Mentors",
                  description: "Faculty mentors lose track of who applied where and when",
                  color: "text-purple-500"
                },
                {
                  icon: TrendingDown,
                  title: "Missed Opportunities",
                  description: "Students unaware of suitable openings, companies can't find right talent",
                  color: "text-green-500"
                }
              ].map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-red-200 dark:border-l-red-800">
                    <problem.icon className={`w-12 h-12 ${problem.color} mb-4`} />
                    <h3 className="text-xl font-semibold mb-3">{problem.title}</h3>
                    <p className="text-muted-foreground">{problem.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-lg font-semibold">
                <ArrowDown className="w-5 h-5" />
                But there's a better way...
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Stats Section */}
      <Slide direction="up" triggerOnce>
        <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} className="text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-foreground font-semibold mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.subtitle}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </Slide>

      {/* Solution Section */}
      <Slide direction="up" triggerOnce>
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4" />
                InternLink Solution
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                One Platform.
                <span className="block text-green-600 dark:text-green-400">All Solutions.</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Transform chaos into clarity with our intelligent, automated platform
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Target,
                  title: "Single Source of Truth",
                  description: "All internship & placement activities centralized in one intelligent platform",
                  color: "text-blue-500",
                  bgColor: "bg-blue-50 dark:bg-blue-950/20"
                },
                {
                  icon: BrainCircuit,
                  title: "AI-Powered Matching",
                  description: "Smart recommendations match students with perfect opportunities automatically",
                  color: "text-purple-500",
                  bgColor: "bg-purple-50 dark:bg-purple-950/20"
                },
                {
                  icon: CheckCircle,
                  title: "One-Click Applications",
                  description: "Students apply to multiple opportunities without repetitive form filling",
                  color: "text-green-500",
                  bgColor: "bg-green-50 dark:bg-green-950/20"
                },
                {
                  icon: Calendar,
                  title: "Automated Workflows",
                  description: "Digital approvals, interview scheduling, and progress tracking",
                  color: "text-orange-500",
                  bgColor: "bg-orange-50 dark:bg-orange-950/20"
                },
                {
                  icon: BarChart3,
                  title: "Real-Time Analytics",
                  description: "Live dashboards show placement status, interview schedules, and trends",
                  color: "text-red-500",
                  bgColor: "bg-red-50 dark:bg-red-950/20"
                },
                {
                  icon: Award,
                  title: "Automated Certificates",
                  description: "Supervisor feedback triggers instant certificate generation and records",
                  color: "text-yellow-500",
                  bgColor: "bg-yellow-50 dark:bg-yellow-950/20"
                }
              ].map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-200 dark:border-l-green-800 ${solution.bgColor}`}>
                    <solution.icon className={`w-12 h-12 ${solution.color} mb-4`} />
                    <h3 className="text-xl font-semibold mb-3">{solution.title}</h3>
                    <p className="text-muted-foreground">{solution.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
                <Trophy className="w-5 h-5" />
                Result: 70% faster placement process
              </div>
            </div>
          </div>
        </section>
      </Slide>

      {/* Dynamic Content Based on User Status */}
      {user ? (
        /* Authenticated User Dashboard Preview */
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <CheckCircle className="w-4 h-4" />
                Welcome Back!
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Your {getRoleDashboard(user.role).label}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Access your personalized dashboard and explore all available features for your role.
              </p>
            </div>

            {/* Current User's Dashboard Highlight */}
            <div className="max-w-4xl mx-auto mb-16">
              <Card className="group hover:shadow-card-hover transition-all duration-500 overflow-hidden bg-gradient-card border-0 hover:scale-[1.02]">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={roles.find(r => r.path === getRoleDashboard(user.role).path)?.image || dashboardPreview} 
                    alt={getRoleDashboard(user.role).label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary/90 backdrop-blur-sm rounded-full px-4 py-2">
                      <span className="text-primary-foreground font-medium">Your Dashboard</span>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      {user.role === 'admin' && <BarChart3 className="w-8 h-8 text-white" />}
                      {user.role === 'student' && <GraduationCap className="w-8 h-8 text-white" />}
                      {user.role === 'mentor' && <Users className="w-8 h-8 text-white" />}
                      {user.role === 'recruiter' && <Building2 className="w-8 h-8 text-white" />}
                      {user.role === 'placement_cell' && <Briefcase className="w-8 h-8 text-white" />}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl capitalize">{user.role} Dashboard</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">Active</Badge>
                  </div>
                  <CardDescription className="text-lg leading-relaxed">
                    {roles.find(r => r.path === getRoleDashboard(user.role).path)?.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    {roles.find(r => r.path === getRoleDashboard(user.role).path)?.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 text-sm bg-muted/50 rounded-lg p-3 hover:bg-muted transition-colors">
                        <div className="bg-success/10 rounded-full p-1">
                          <CheckCircle className="w-4 h-4 text-success" />
                        </div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      size="lg"
                      asChild
                    >
                      <Link to={getRoleDashboard(user.role).path}>
                        Access Dashboard
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline"
                      size="lg"
                      onClick={() => {
                        toast.info("Feature tour", {
                          description: "Interactive tour of your dashboard features"
                        });
                      }}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Tour
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Other Available Dashboards Preview */}
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Explore Other Platform Features</h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See what other roles can do on the InternLink platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {roles.filter(role => role.path !== getRoleDashboard(user.role).path).map((role, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-card/50 backdrop-blur-sm border hover:scale-[1.02]">
                  <div className="relative h-40 overflow-hidden">
                    <img 
                      src={role.image} 
                      alt={role.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 right-3">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <role.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-muted/80 text-foreground px-2 py-1 rounded-full text-xs font-medium">
                        Preview Only
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{role.title}</CardTitle>
                    <CardDescription className="text-sm">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {role.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-success" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {role.features.length > 2 && (
                        <div className="text-xs text-muted-foreground">+{role.features.length - 2} more features</div>
                      )}
                    </div>
                    <Button 
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        toast.info(`${role.title} Dashboard`, {
                          description: "This dashboard is available for users with the appropriate role"
                        });
                      }}
                    >
                      View Features
                      <Eye className="w-3 h-3 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Role Selection Guidance */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
                <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Complete Your Profile</h3>
                <p className="text-muted-foreground mb-6">
                  Choose the role that best describes you and complete your profile to access specialized features and connect with your community.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {[
                    { icon: GraduationCap, label: "Students", desc: "Find opportunities" },
                    { icon: Building2, label: "Placement Cell", desc: "Manage placements" },
                    { icon: User, label: "Faculty Mentors", desc: "Guide students" },
                    { icon: Users, label: "Recruiters", desc: "Find talent" }
                  ].map((item, index) => (
                    <div key={index} className="text-center p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* Platform Overview for Visitors */
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Users className="w-4 h-4" />
                Platform Overview
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
                Designed for Every Role
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Our platform serves different user types with specialized tools and features. Sign up to get assigned your appropriate role.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {roles.map((role, index) => (
                <Card key={index} className="group hover:shadow-card-hover transition-all duration-500 overflow-hidden bg-gradient-card border-0 hover:scale-[1.02]">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={role.image} 
                      alt={role.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                        <role.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                        Role {index + 1} of {roles.length}
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl">{role.title}</CardTitle>
                      <Star className="w-5 h-5 text-warning fill-warning" />
                    </div>
                    <CardDescription className="text-base leading-relaxed">{role.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-3">
                      {role.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm bg-muted/50 rounded-lg p-3 hover:bg-muted transition-colors">
                          <div className="bg-success/10 rounded-full p-1">
                            <CheckCircle className="w-4 h-4 text-success" />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          toast.warning(`Sign up to access ${role.title} features`, {
                            description: "Role assignment happens during registration",
                            action: {
                              label: "Sign Up",
                              onClick: () => window.location.href = "/signup"
                            }
                          });
                        }}
                        variant="outline"
                        className="flex-1 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        size="lg"
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="lg" 
                        onClick={handleDemoClick}
                        className="px-4"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Call to Action for Visitors */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-muted-foreground mb-6">
                  Sign up now and we'll assign you the appropriate role based on your profile and needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary-light">
                    <Link to="/signup">
                      Create Account
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  {/* Removed duplicate sign in button from signup section */}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
  <Fade triggerOnce>
  <Fade triggerOnce>
  <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage internships, training, and placements effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Cards with scroll and hover animation */}
            <Card className="text-center bg-gradient-card border-0 shadow-card transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" data-aos="zoom-in" data-aos-delay="100">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Real-time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track placement rates, interview schedules, and performance metrics with comprehensive dashboards
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-0 shadow-card transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" data-aos="zoom-in" data-aos-delay="200">
              <CardHeader>
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>
                <CardTitle>Streamlined Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  One-click applications, automated approvals, and seamless communication between all stakeholders
                </p>
              </CardContent>
            </Card>

            <Card className="text-center bg-gradient-card border-0 shadow-card transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl" data-aos="zoom-in" data-aos-delay="300">
              <CardHeader>
                <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-warning" />
                </div>
                <CardTitle>Collaborative Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect students, mentors, recruiters, and placement cells in one unified platform
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
  </section>
  </Fade>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Award className="w-4 h-4" />
              Join Thousands of Successful Users
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-light to-primary bg-clip-text text-transparent">
              Ready to Transform Your Career Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of students, mentors, and recruiters who are already using InternLink to achieve their career goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button 
                size="xl" 
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link to="/signup">
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                className="text-lg px-8 py-4 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                onClick={handleDemoClick}
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              {[
                { value: "2,500+", label: "Active Students" },
                { value: "150+", label: "Partner Companies" },
                { value: "95%", label: "Success Rate" },
                { value: "24/7", label: "Support Available" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
  </section>
  </Fade>

      {/* Newsletter Section removed to avoid duplication. Only footer version remains. */}

      {/* Minimal Footer */}
      <footer className="bg-background border-t">
        <div className="container mx-auto px-4 py-4">
            {/* Brand and Essential Links Only */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">InternLink</h3>
                <p className="text-xs text-muted-foreground">Placement Management</p>
              </div>
            </div>

            {/* Essential Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
              <button 
                onClick={() => handlePublicFeature('Help Center')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Help
              </button>
            </div>

            {/* Copyright & Status */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>© 2025 InternLink</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-green-600">Online</span>
              </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;