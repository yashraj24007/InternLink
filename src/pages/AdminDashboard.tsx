import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Calendar,
  GraduationCap,
  Building2,
  CheckCircle,
  Clock,
  Plus,
  Eye,
  Download,
  Filter
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Students", value: "2,847", change: "+12%", icon: GraduationCap, color: "text-primary" },
    { title: "Active Opportunities", value: "156", change: "+8%", icon: Briefcase, color: "text-success" },
    { title: "Placement Rate", value: "87%", change: "+5%", icon: TrendingUp, color: "text-warning" },
    { title: "Partner Companies", value: "143", change: "+15%", icon: Building2, color: "text-accent" },
  ];

  const recentApplications = [
    {
      student: "Sarah Johnson",
      company: "TechCorp Solutions",
      position: "Software Engineer",
      status: "Pending Approval",
      statusColor: "bg-warning/20 text-warning-foreground",
      mentor: "Dr. Smith",
      date: "2024-01-15"
    },
    {
      student: "Michael Chen",
      company: "InnovateLabs", 
      position: "Data Scientist",
      status: "Approved",
      statusColor: "bg-success/20 text-success-foreground",
      mentor: "Prof. Davis",
      date: "2024-01-14"
    },
    {
      student: "Emily Rodriguez",
      company: "StartupHub",
      position: "UX Designer",
      status: "Interview Scheduled", 
      statusColor: "bg-primary/20 text-primary-foreground",
      mentor: "Dr. Wilson",
      date: "2024-01-13"
    },
  ];

  const topCompanies = [
    { name: "TechCorp Solutions", applications: 45, placements: 38, rate: "84%" },
    { name: "InnovateLabs", applications: 32, placements: 29, rate: "91%" },
    { name: "CloudTech Systems", applications: 28, placements: 22, rate: "79%" },
    { name: "AI Innovations", applications: 23, placements: 20, rate: "87%" },
  ];

  const upcomingInterviews = [
    { student: "Alex Kumar", company: "TechCorp", time: "Today, 2:00 PM", type: "Technical" },
    { student: "Maria Garcia", company: "InnovateLabs", time: "Tomorrow, 10:00 AM", type: "HR" },
    { student: "James Wilson", company: "StartupHub", time: "Jan 18, 3:30 PM", type: "Final" },
    { student: "Lisa Zhang", company: "CloudTech", time: "Jan 19, 11:00 AM", type: "Technical" },
  ];

  const placementTrends = [
    { month: "Sep", placements: 45 },
    { month: "Oct", placements: 52 },
    { month: "Nov", placements: 48 },
    { month: "Dec", placements: 61 },
    { month: "Jan", placements: 38 },
  ];

  return (
    <DashboardLayout role="admin" title="Placement Cell Dashboard">
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
                <p className="text-xs text-success font-medium">{stat.change} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Commonly used admin functions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="campus">
                <Plus className="w-4 h-4 mr-2" />
                Add Opportunity
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Reports
              </Button>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Students
              </Button>
              <Button variant="outline">
                <Building2 className="w-4 h-4 mr-2" />
                Approve Recruiters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Applications */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    Recent Applications
                  </CardTitle>
                  <CardDescription>Applications requiring attention</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentApplications.map((app, index) => (
                <div key={index} className="p-4 rounded-lg bg-background/50 border hover:bg-background/70 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{app.student}</h4>
                    <Badge className={app.statusColor}>
                      {app.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {app.position} at {app.company}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Mentor: {app.mentor}</span>
                    <span>{app.date}</span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                    {app.status === "Pending Approval" && (
                      <Button size="sm" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Applications
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
              <CardDescription>Schedule and monitor interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-background/50 border">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{interview.student}</h4>
                    <p className="text-xs text-muted-foreground">{interview.company}</p>
                    <p className="text-xs text-muted-foreground">{interview.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {interview.type}
                  </Badge>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View Full Schedule
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Top Companies */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Top Recruiting Companies
            </CardTitle>
            <CardDescription>Companies with highest placement rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCompanies.map((company, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-background/30 border">
                  <div className="flex-1">
                    <h4 className="font-semibold">{company.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {company.applications} applications • {company.placements} placements
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{company.rate}</div>
                    <p className="text-xs text-muted-foreground">Success Rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Placement Trends */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Placement Trends
            </CardTitle>
            <CardDescription>Monthly placement statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {placementTrends.map((trend, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium">{trend.month}</div>
                  <div className="flex-1">
                    <Progress value={(trend.placements / 70) * 100} className="h-2" />
                  </div>
                  <div className="w-16 text-sm font-semibold text-right">{trend.placements}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Average placements per month: <span className="font-semibold text-foreground">49</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;