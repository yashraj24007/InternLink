import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { PlacementAnalytics } from "@/components/PlacementAnalytics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Filter,
  BarChart3,
  Search,
  FileText,
  Star,
  MapPin,
  Phone,
  Mail,
  Award,
  Target,
  PieChart,
  Activity
} from "lucide-react";

const PlacementCellDashboard = () => {
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

  // Analytics data
  const analyticsData = {
    totalStudents: 2847,
    placedStudents: 2477,
    activeApplications: 156,
    scheduledInterviews: 42,
    averageSalary: 650000,
    topRecruiters: [
      { name: "TechCorp Solutions", placements: 38 },
      { name: "InnovateLabs", placements: 29 },
      { name: "CloudTech Systems", placements: 22 },
      { name: "AI Innovations", placements: 20 },
      { name: "StartupHub", placements: 18 },
    ],
    departmentStats: [
      { department: "CSE", placed: 145, total: 160 },
      { department: "ECE", placed: 98, total: 120 },
      { department: "ME", placed: 87, total: 100 },
      { department: "IT", placed: 112, total: 125 },
      { department: "Civil", placed: 45, total: 65 },
    ],
    weeklyApplications: [
      { week: "Week 1", applications: 45, interviews: 12 },
      { week: "Week 2", applications: 52, interviews: 18 },
      { week: "Week 3", applications: 48, interviews: 15 },
      { week: "Week 4", applications: 61, interviews: 22 },
      { week: "Week 5", applications: 38, interviews: 14 },
    ],
    salaryRanges: [
      { range: "3-5 LPA", count: 120 },
      { range: "5-8 LPA", count: 85 },
      { range: "8-12 LPA", count: 45 },
      { range: "12+ LPA", count: 20 },
    ],
    upcomingInterviews: [
      {
        id: "1",
        student: "Alex Kumar",
        company: "TechCorp Solutions",
        position: "Software Engineer",
        date: "2024-01-20",
        time: "2:00 PM",
        type: "Technical"
      },
      {
        id: "2",
        student: "Maria Garcia", 
        company: "InnovateLabs",
        position: "Data Scientist",
        date: "2024-01-21",
        time: "10:00 AM",
        type: "HR"
      },
      {
        id: "3",
        student: "James Wilson",
        company: "StartupHub", 
        position: "UX Designer",
        date: "2024-01-22",
        time: "3:30 PM",
        type: "Final"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Placement Cell Dashboard</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage student placements and company partnerships</p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link to="/">
                <Building2 className="w-5 h-5" />
              </Link>
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Opportunity
            </Button>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="companies">Companies</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Applications */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Recent Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentApplications.map((app, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{app.student}</h4>
                          <p className="text-sm text-muted-foreground">{app.company} - {app.position}</p>
                          <p className="text-xs text-muted-foreground">Mentor: {app.mentor}</p>
                        </div>
                        <Badge className={app.statusColor}>{app.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Companies */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-green-600" />
                    Top Recruiting Companies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCompanies.map((company, index) => (
                      <div key={index} className="p-3 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{company.name}</h4>
                          <Badge variant="outline">{company.rate}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{company.applications} applications</span>
                          <span>{company.placements} placed</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Interviews */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Upcoming Interviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingInterviews.map((interview, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium">{interview.student}</h4>
                        <p className="text-sm text-muted-foreground">{interview.company}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{interview.type}</Badge>
                          <span className="text-xs text-muted-foreground">{interview.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Placement Trends */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Placement Trends
                </CardTitle>
                <CardDescription>Monthly placement statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-4">
                  {placementTrends.map((trend, index) => (
                    <div key={index} className="flex flex-col items-center gap-2">
                      <div 
                        className="bg-primary rounded-t w-8 transition-all duration-500"
                        style={{ height: `${(trend.placements / 70) * 100}px` }}
                      ></div>
                      <div className="text-xs text-muted-foreground">{trend.month}</div>
                      <div className="text-xs font-medium">{trend.placements}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Average monthly placements: <span className="font-semibold text-foreground">49</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Student Management</h2>
              <p className="text-muted-foreground">Student database and placement tracking coming soon...</p>
            </div>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Company Partnerships</h2>
              <p className="text-muted-foreground">Company relationship management coming soon...</p>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Application Management</h2>
              <p className="text-muted-foreground">Application review and approval workflow coming soon...</p>
            </div>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Interview Coordination</h2>
              <p className="text-muted-foreground">Interview scheduling and management coming soon...</p>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <PlacementAnalytics stats={analyticsData} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlacementCellDashboard;