import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  Clock, 
  FileText,
  TrendingUp,
  Users,
  Award,
  ArrowRight,
  Eye
} from "lucide-react";

const StudentDashboard = () => {
  const stats = [
    { title: "Applications Sent", value: "12", icon: FileText, color: "text-primary" },
    { title: "Interviews Scheduled", value: "3", icon: Calendar, color: "text-warning" },
    { title: "Offers Received", value: "2", icon: CheckCircle, color: "text-success" },
    { title: "Profile Completion", value: "85%", icon: TrendingUp, color: "text-accent" },
  ];

  const recentApplications = [
    {
      company: "TechCorp Solutions",
      position: "Software Engineer Intern", 
      status: "Interview Scheduled",
      statusColor: "bg-warning/20 text-warning-foreground",
      date: "2024-01-15",
      type: "Internship"
    },
    {
      company: "InnovateLabs",
      position: "Data Science Trainee",
      status: "Under Review", 
      statusColor: "bg-status-applied/20 text-yellow-800",
      date: "2024-01-12",
      type: "Training"
    },
    {
      company: "StartupHub",
      position: "Full Stack Developer",
      status: "Offer Received",
      statusColor: "bg-success/20 text-success-foreground", 
      date: "2024-01-10",
      type: "Placement"
    },
  ];

  const recommendedOpportunities = [
    {
      company: "CloudTech",
      position: "Backend Developer Intern",
      skills: ["Node.js", "MongoDB", "REST APIs"],
      deadline: "2024-02-01",
      type: "Internship",
      stipend: "₹15,000/month"
    },
    {
      company: "AI Innovations",
      position: "Machine Learning Trainee", 
      skills: ["Python", "TensorFlow", "Data Analysis"],
      deadline: "2024-01-30",
      type: "Training",
      stipend: "₹20,000/month"
    },
  ];

  const upcomingEvents = [
    { title: "Technical Interview - TechCorp", date: "Tomorrow, 2:00 PM", type: "Interview" },
    { title: "Career Guidance Session", date: "Jan 20, 4:00 PM", type: "Workshop" },
    { title: "Application Deadline - AI Innovations", date: "Jan 30", type: "Deadline" },
  ];

  return (
    <DashboardLayout role="student" title="Welcome back, Alex!">
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Profile Completion Alert */}
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-warning">Complete Your Profile</CardTitle>
                <CardDescription>
                  Add skills and certifications to get better recommendations
                </CardDescription>
              </div>
              <Button variant="warning" size="sm">
                Complete Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={85} className="w-full" />
            <p className="text-sm text-muted-foreground mt-2">85% complete</p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Recent Applications
              </CardTitle>
              <CardDescription>Track your application status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/50 border">
                  <div className="flex-1">
                    <h4 className="font-semibold">{app.position}</h4>
                    <p className="text-sm text-muted-foreground">{app.company}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {app.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">Applied {app.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={app.statusColor}>
                      {app.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Applications
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Don't miss important dates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-background/50 border">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Opportunities */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Recommended for You
            </CardTitle>
            <CardDescription>Opportunities matching your profile and skills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedOpportunities.map((opp, index) => (
                <div key={index} className="p-4 rounded-lg border bg-background/30 hover:bg-background/60 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{opp.position}</h4>
                      <p className="text-sm text-muted-foreground">{opp.company}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {opp.type}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex flex-wrap gap-1">
                      {opp.skills.map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Stipend: {opp.stipend}</span>
                      <span className="text-muted-foreground">Deadline: {opp.deadline}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Apply Now
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Browse All Opportunities
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;