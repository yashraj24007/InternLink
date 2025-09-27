import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, Building2, BarChart3, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import campusHero from "@/assets/campus-hero.jpg";
import placementSuccess from "@/assets/placement-success.jpg";
import studentsWorking from "@/assets/students-working.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";

const Landing = () => {
  const roles = [
    {
      title: "Students",
      description: "Create your profile, discover opportunities, and track your placement journey",
      icon: GraduationCap,
      features: ["Digital Portfolio", "One-click Applications", "Real-time Tracking", "Certificate Generation"],
      path: "/student-dashboard",
      image: studentsWorking
    },
    {
      title: "Placement Cell",
      description: "Manage opportunities, track analytics, and streamline the placement process",
      icon: BarChart3,
      features: ["Analytics Dashboard", "Opportunity Management", "Progress Tracking", "Report Generation"],
      path: "/admin-dashboard", 
      image: dashboardPreview
    },
    {
      title: "Faculty Mentors", 
      description: "Guide students, approve applications, and monitor training progress",
      icon: Users,
      features: ["Student Mentoring", "Application Reviews", "Progress Monitoring", "Schedule Management"],
      path: "/mentor-dashboard",
      image: placementSuccess
    },
    {
      title: "Recruiters",
      description: "Post opportunities, review candidates, and find the best talent",
      icon: Building2,
      features: ["Opportunity Posting", "Candidate Review", "Interview Scheduling", "Feedback System"],
      path: "/recruiter-dashboard",
      image: placementSuccess
    }
  ];

  const stats = [
    { number: "2,500+", label: "Active Students" },
    { number: "150+", label: "Partner Companies" },
    { number: "85%", label: "Placement Rate" },
    { number: "120+", label: "Opportunities Monthly" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Internlink</h1>
              <p className="text-sm text-muted-foreground">Placement Management Platform</p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${campusHero})` }}
        ></div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Your Gateway to
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Career Success
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
            Connect students with industry opportunities through our comprehensive placement management platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="text-lg">
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="xl" className="text-lg border-white/30 text-white hover:bg-white/10">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Choose Your Role</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access tailored dashboards and features designed for your specific needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {roles.map((role, index) => (
              <Card key={index} className="group hover:shadow-card-hover transition-all duration-300 overflow-hidden bg-gradient-card border-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={role.image} 
                    alt={role.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <role.icon className="w-8 h-8 text-white mb-2" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    {role.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={role.path} className="block">
                    <Button variant="campus" className="w-full mt-4">
                      Access {role.title} Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Powerful Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage internships, training, and placements effectively
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center bg-gradient-card border-0 shadow-card">
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

            <Card className="text-center bg-gradient-card border-0 shadow-card">
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

            <Card className="text-center bg-gradient-card border-0 shadow-card">
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

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold">Internlink</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2024 Internlink. Empowering careers through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;