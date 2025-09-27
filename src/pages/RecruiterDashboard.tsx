import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Users, 
  Calendar, 
  TrendingUp,
  Plus,
  Eye,
  MessageSquare,
  Star,
  Clock,
  CheckCircle,
  Building2
} from "lucide-react";

const RecruiterDashboard = () => {
  const stats = [
    { title: "Active Opportunities", value: "8", icon: Briefcase, color: "text-primary" },
    { title: "Total Applications", value: "156", icon: Users, color: "text-success" },
    { title: "Interviews Scheduled", value: "12", icon: Calendar, color: "text-warning" },
    { title: "Hires This Month", value: "5", icon: TrendingUp, color: "text-accent" },
  ];

  const myOpportunities = [
    {
      title: "Senior Software Engineer",
      type: "Full-time Placement",
      applications: 28,
      deadline: "2024-02-15",
      status: "Active",
      statusColor: "bg-success/20 text-success-foreground",
      location: "Bangalore",
      postedDate: "2024-01-10"
    },
    {
      title: "Data Science Intern",
      type: "Internship", 
      applications: 45,
      deadline: "2024-01-25",
      status: "Active",
      statusColor: "bg-success/20 text-success-foreground",
      location: "Remote",
      postedDate: "2024-01-05"
    },
    {
      title: "Frontend Developer",
      type: "Industrial Training",
      applications: 22,
      deadline: "2024-01-20",
      status: "Expiring Soon",
      statusColor: "bg-warning/20 text-warning-foreground",
      location: "Hyderabad",
      postedDate: "2023-12-28"
    },
  ];

  const topCandidates = [
    {
      name: "Sarah Johnson",
      degree: "B.Tech Computer Science",
      cgpa: "9.2",
      skills: ["React", "Node.js", "Python", "AWS"],
      appliedFor: "Senior Software Engineer",
      rating: 4.8,
      status: "Interview Scheduled",
      statusColor: "bg-warning/20 text-warning-foreground",
      experience: "2 internships"
    },
    {
      name: "Michael Chen",
      degree: "B.Tech Information Technology", 
      cgpa: "8.9",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      appliedFor: "Data Science Intern",
      rating: 4.6,
      status: "Application Reviewed",
      statusColor: "bg-primary/20 text-primary-foreground",
      experience: "1 internship, 2 projects"
    },
    {
      name: "Emily Rodriguez",
      degree: "B.Tech Computer Science",
      cgpa: "9.0",
      skills: ["JavaScript", "React", "Vue.js", "CSS"],
      appliedFor: "Frontend Developer",
      rating: 4.7,
      status: "Pending Review", 
      statusColor: "bg-muted text-muted-foreground",
      experience: "3 projects, 1 internship"
    },
  ];

  const upcomingInterviews = [
    { 
      candidate: "Sarah Johnson", 
      position: "Senior Software Engineer",
      time: "Today, 2:00 PM", 
      type: "Technical",
      interviewer: "John Smith",
      mode: "Video Call"
    },
    { 
      candidate: "Alex Kumar", 
      position: "Data Science Intern",
      time: "Tomorrow, 10:00 AM", 
      type: "HR Round",
      interviewer: "Jane Doe",
      mode: "In-Person"
    },
    { 
      candidate: "Maria Garcia", 
      position: "Frontend Developer",
      time: "Jan 18, 3:30 PM", 
      type: "Final Round",
      interviewer: "Mike Wilson",
      mode: "Video Call"
    },
  ];

  const hiringFunnel = [
    { stage: "Applications", count: 156, percentage: 100 },
    { stage: "Screening", count: 89, percentage: 57 },
    { stage: "Interviews", count: 34, percentage: 22 },
    { stage: "Final Round", count: 12, percentage: 8 },
    { stage: "Offers", count: 5, percentage: 3 },
  ];

  return (
    <DashboardLayout role="recruiter" title="Recruiter Dashboard">
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

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your recruitment process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="campus">
                <Plus className="w-4 h-4 mr-2" />
                Post New Opportunity
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Review Applications
              </Button>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interviews
              </Button>
              <Button variant="outline">
                <Building2 className="w-4 h-4 mr-2" />
                Company Profile
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Opportunities */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                My Opportunities
              </CardTitle>
              <CardDescription>Manage your posted positions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {myOpportunities.map((opportunity, index) => (
                <div key={index} className="p-4 rounded-lg border bg-background/50 hover:bg-background/70 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{opportunity.title}</h4>
                      <p className="text-sm text-muted-foreground">{opportunity.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {opportunity.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {opportunity.applications} applications
                        </span>
                      </div>
                    </div>
                    <Badge className={opportunity.statusColor}>
                      {opportunity.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Posted: {opportunity.postedDate}</span>
                    <span>Deadline: {opportunity.deadline}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View Applications
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Edit Post
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Opportunities
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Interviews */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Upcoming Interviews
              </CardTitle>
              <CardDescription>Scheduled candidate interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="p-3 rounded-lg bg-background/50 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{interview.candidate}</h4>
                    <Badge variant="outline" className="text-xs">
                      {interview.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <p>{interview.position}</p>
                    <p>{interview.time} • {interview.mode}</p>
                    <p>Interviewer: {interview.interviewer}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View Profile
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Send Message
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top Candidates */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Top Candidates
            </CardTitle>
            <CardDescription>Highly rated candidates for your positions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topCandidates.map((candidate, index) => (
                <div key={index} className="p-4 rounded-lg border bg-background/30 hover:bg-background/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-semibold">{candidate.name}</h4>
                      <p className="text-sm text-muted-foreground">{candidate.degree}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-medium">CGPA: {candidate.cgpa}</span>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span className="text-xs">{candidate.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={candidate.statusColor}>
                      {candidate.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-muted-foreground mb-1">Applied for: {candidate.appliedFor}</p>
                    <p className="text-xs text-muted-foreground mb-2">{candidate.experience}</p>
                    <div className="flex flex-wrap gap-1">
                      {candidate.skills.slice(0, 3).map((skill, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {candidate.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{candidate.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      View Profile
                    </Button>
                    <Button size="sm" className="text-xs flex-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      Schedule
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hiring Funnel */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Hiring Funnel
            </CardTitle>
            <CardDescription>Track your recruitment process efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {hiringFunnel.map((stage, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-sm font-medium">{stage.stage}</div>
                  <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${stage.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-16 text-right">
                    <div className="font-semibold">{stage.count}</div>
                    <div className="text-xs text-muted-foreground">{stage.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Conversion rate from application to hire: <span className="font-semibold text-foreground">3.2%</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RecruiterDashboard;