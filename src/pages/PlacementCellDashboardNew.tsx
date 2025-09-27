import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeProvider';
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
  Activity,
  Settings,
  Home,
  ArrowRight,
  ChevronDown,
  LogOut,
  UserCircle,
  Sun,
  Moon,
  Edit,
  Trash2,
  UserCheck,
  UserX,
  AlertCircle,
  Info,
  Send,
  Bell,
  Calendar as CalendarIcon,
  Building,
  Upload,
  X,
  Zap,
  Monitor,
  Database,
  Server,
  Network,
  RefreshCw,
  ExternalLink,
  MessageSquare,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

const PlacementCellDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Comprehensive placement statistics
  const [placementStats, setPlacementStats] = useState({
    totalStudents: 2847,
    placedStudents: 2247,
    unplacedStudents: 423,
    inProgressStudents: 177,
    activeRecruiters: 89,
    activeOpenings: 156,
    interviewsThisWeek: 42,
    placementRate: 87,
    partnerCompanies: 143,
    pendingApplications: 89,
    scheduledInterviews: 42,
    approvedApplications: 234,
    rejectedApplications: 67,
    averageSalary: 6.5,
    highestSalary: 25,
    placementsThisMonth: 45,
    internshipToJobConversion: 78,
    recruiterEngagementScore: 8.4,
    campusExclusivePostings: 23,
    documentsUploaded: 567,
    verificationsPending: 12,
    alumniRecruiters: 34
  });

  // Department-wise placement tracking
  const [departmentStats, setDepartmentStats] = useState([
    { dept: 'CSE', placed: 245, total: 280, percentage: 87.5 },
    { dept: 'IT', placed: 178, total: 220, percentage: 80.9 },
    { dept: 'ECE', placed: 156, total: 240, percentage: 65.0 },
    { dept: 'ME', placed: 134, total: 200, percentage: 67.0 },
    { dept: 'Civil', placed: 89, total: 150, percentage: 59.3 },
    { dept: 'EEE', placed: 145, total: 190, percentage: 76.3 }
  ]);

  // Trending data for analytics
  const [placementTrends, setPlacementTrends] = useState([
    { month: 'Aug', placements: 45, applications: 234 },
    { month: 'Sep', placements: 67, applications: 298 },
    { month: 'Oct', placements: 89, applications: 356 },
    { month: 'Nov', placements: 123, applications: 423 },
    { month: 'Dec', placements: 156, applications: 478 },
    { month: 'Jan', placements: 134, applications: 389 }
  ]);

  // Skill gap analysis
  const [skillGaps, setSkillGaps] = useState([
    { skill: 'React.js', demand: 89, supply: 45, gap: 44 },
    { skill: 'Python', demand: 78, supply: 67, gap: 11 },
    { skill: 'Machine Learning', demand: 67, supply: 23, gap: 44 },
    { skill: 'DevOps', demand: 56, supply: 34, gap: 22 },
    { skill: 'Cloud Computing', demand: 45, supply: 12, gap: 33 }
  ]);

  // Students data
  const [students, setStudents] = useState([
    { id: 1, name: 'Sarah Johnson', dept: 'CSE', cgpa: 8.5, status: 'Placed', company: 'TechCorp Solutions', package: '8.5 LPA' },
    { id: 2, name: 'Alex Kumar', dept: 'IT', cgpa: 8.2, status: 'Interview Scheduled', company: 'InnovateLabs', package: '-' },
    { id: 3, name: 'Maria Garcia', dept: 'ECE', cgpa: 9.1, status: 'Applied', company: 'CloudTech Systems', package: '-' },
    { id: 4, name: 'James Wilson', dept: 'ME', cgpa: 7.8, status: 'Placed', company: 'AI Innovations', package: '7.2 LPA' },
    { id: 5, name: 'Emily Brown', dept: 'Civil', cgpa: 8.0, status: 'Shortlisted', company: 'StartupHub', package: '-' }
  ]);

  // Companies data
  const [companies, setCompanies] = useState([
    { id: 1, name: 'TechCorp Solutions', type: 'IT Services', positions: 25, package: '6-12 LPA', status: 'Active', applications: 89 },
    { id: 2, name: 'InnovateLabs', type: 'Product', positions: 15, package: '8-15 LPA', status: 'Active', applications: 67 },
    { id: 3, name: 'CloudTech Systems', type: 'Cloud Solutions', positions: 20, package: '7-14 LPA', status: 'Active', applications: 45 },
    { id: 4, name: 'AI Innovations', type: 'AI/ML', positions: 10, package: '10-18 LPA', status: 'Closed', applications: 34 },
    { id: 5, name: 'StartupHub', type: 'Startup', positions: 8, package: '5-10 LPA', status: 'Active', applications: 23 }
  ]);

  // Recent activities
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'Application', message: 'Sarah Johnson applied to TechCorp Solutions', time: '2 hours ago', status: 'success' },
    { id: 2, type: 'Interview', message: 'Interview scheduled for Alex Kumar at InnovateLabs', time: '4 hours ago', status: 'info' },
    { id: 3, type: 'Placement', message: 'Maria Garcia placed at CloudTech Systems', time: '6 hours ago', status: 'success' },
    { id: 4, type: 'Application', message: 'James Wilson\'s application approved', time: '8 hours ago', status: 'success' },
    { id: 5, type: 'Alert', message: 'New company StartupHub registered', time: '1 day ago', status: 'warning' }
  ]);

  // Upcoming interviews
  const [upcomingInterviews, setUpcomingInterviews] = useState([
    { id: 1, student: 'Alex Kumar', company: 'TechCorp Solutions', position: 'Software Engineer', date: '2024-01-20', time: '2:00 PM', type: 'Technical' },
    { id: 2, student: 'Maria Garcia', company: 'InnovateLabs', position: 'Data Scientist', date: '2024-01-21', time: '10:00 AM', type: 'HR' },
    { id: 3, student: 'James Wilson', company: 'CloudTech Systems', position: 'DevOps Engineer', date: '2024-01-22', time: '3:30 PM', type: 'Final' },
    { id: 4, student: 'Emily Brown', company: 'AI Innovations', position: 'ML Engineer', date: '2024-01-23', time: '11:00 AM', type: 'Technical' }
  ]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApproveApplication = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: 'Approved' }
        : student
    ));
    toast({
      title: "Application Approved",
      description: "Student application has been approved successfully.",
    });
  };

  const handleRejectApplication = (studentId: number) => {
    setStudents(students.map(student => 
      student.id === studentId 
        ? { ...student, status: 'Rejected' }
        : student
    ));
    toast({
      title: "Application Rejected",
      description: "Student application has been rejected.",
    });
  };

  const handleScheduleInterview = (studentId: number) => {
    toast({
      title: "Interview Scheduled",
      description: "Interview has been scheduled for the student.",
    });
  };

  // Placement cell stats similar to student/mentor dashboard
  const placementCellStats = [
    { title: "Total Students", value: placementStats.totalStudents.toLocaleString(), icon: GraduationCap, color: "text-blue-600" },
    { title: "Active Opportunities", value: placementStats.activeOpenings.toString(), icon: Briefcase, color: "text-green-600" },
    { title: "Placement Rate", value: `${placementStats.placementRate}%`, icon: TrendingUp, color: "text-orange-600" },
    { title: "Partner Companies", value: placementStats.partnerCompanies.toString(), icon: Building2, color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex h-16 items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                Back to Homepage
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">Placement Cell Dashboard</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Active
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Homepage Button */}
            <Button asChild variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-700">
              <Link to="/">
                <Home className="w-4 h-4" />
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Placement Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="cursor-pointer">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 mr-2" />
                  ) : (
                    <Moon className="w-4 h-4 mr-2" />
                  )}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Bell className="w-4 h-4 mr-2" />
                  Notification Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h2>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {placementCellStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {index === 0 && "+12% from last month"}
                  {index === 1 && "+8% from last month"}
                  {index === 2 && "+5% from last month"}
                  {index === 3 && "+15% from last month"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-8 text-xs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Core Dashboard - Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            {/* Placement Overview - Real-time Stats */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <GraduationCap className="h-5 w-5" />
                    <span>Student Status Overview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{placementStats.placedStudents}</div>
                      <div className="text-xs text-muted-foreground">Placed</div>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="text-xl font-bold text-red-600">{placementStats.unplacedStudents}</div>
                      <div className="text-xs text-muted-foreground">Unplaced</div>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">{placementStats.inProgressStudents}</div>
                      <div className="text-xs text-muted-foreground">In Progress</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Placement Rate</span>
                      <span className="font-semibold text-green-600">{placementStats.placementRate}%</span>
                    </div>
                    <Progress value={placementStats.placementRate} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5" />
                    <span>Active Recruitment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{placementStats.activeRecruiters}</div>
                      <div className="text-sm text-muted-foreground">Active Recruiters</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{placementStats.activeOpenings}</div>
                      <div className="text-sm text-muted-foreground">Open Positions</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Campus Exclusive</span>
                      <Badge variant="outline">{placementStats.campusExclusivePostings}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Interviews This Week</span>
                      <span className="font-semibold">{placementStats.interviewsThisWeek}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-2 border rounded-lg">
                      <span className="text-sm">Avg Package</span>
                      <span className="font-bold text-green-600">{placementStats.averageSalary} LPA</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-lg">
                      <span className="text-sm">Highest Package</span>
                      <span className="font-bold text-green-600">{placementStats.highestSalary} LPA</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-lg">
                      <span className="text-sm">Internship→Job</span>
                      <span className="font-bold text-blue-600">{placementStats.internshipToJobConversion}%</span>
                    </div>
                    <div className="flex justify-between items-center p-2 border rounded-lg">
                      <span className="text-sm">Recruiter Score</span>
                      <Badge variant="default">{placementStats.recruiterEngagementScore}/10</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department-wise Placement Heatmap */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Department-wise Placement Heatmap</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {departmentStats.map((dept, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      dept.percentage >= 80 ? 'bg-green-50 dark:bg-green-900/20 border-green-200' :
                      dept.percentage >= 70 ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200' :
                      'bg-red-50 dark:bg-red-900/20 border-red-200'
                    }`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{dept.dept}</span>
                        <Badge variant={
                          dept.percentage >= 80 ? 'default' :
                          dept.percentage >= 70 ? 'secondary' : 'destructive'
                        }>
                          {dept.percentage}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        {dept.placed}/{dept.total} students
                      </div>
                      <Progress value={dept.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Panel */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Access Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('opportunities')}>
                    <Plus className="h-6 w-6" />
                    <span className="text-sm">Post Job/Internship</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <UserCheck className="h-6 w-6" />
                    <span className="text-sm">Approve Recruiter</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('communication')}>
                    <Bell className="h-6 w-6" />
                    <span className="text-sm">Send Announcement</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('analytics')}>
                    <PieChart className="h-6 w-6" />
                    <span className="text-sm">View Analytics</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Placement Trends Graph */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Placement Trends Over Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm text-muted-foreground mb-4">
                    <span>Monthly Progress</span>
                    <span>Applications vs Placements</span>
                  </div>
                  {placementTrends.map((trend, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium">{trend.month}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Applications: {trend.applications}</span>
                          <span>Placements: {trend.placements}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${(trend.applications / 500) * 100}%` }}
                          ></div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div 
                            className="bg-green-600 h-2 rounded-full" 
                            style={{ width: `${(trend.placements / 200) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunity Management Tab */}
          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Opportunity Management</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload CSV
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Opening
                </Button>
              </div>
            </div>

            {/* Verified Posting Workflow */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Pending Approvals</span>
                  </CardTitle>
                  <CardDescription>Review and approve recruiter submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { company: 'TechCorp Solutions', role: 'Software Engineer', type: 'Full-time', package: '8-12 LPA', status: 'pending' },
                      { company: 'InnovateLabs', role: 'Data Scientist', type: 'Internship', package: '25k/month', status: 'pending' },
                      { company: 'CloudTech', role: 'DevOps Engineer', type: 'Campus Exclusive', package: '10-15 LPA', status: 'review' }
                    ].map((posting, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{posting.role}</p>
                            <p className="text-sm text-muted-foreground">{posting.company}</p>
                          </div>
                          <Badge variant={posting.type === 'Campus Exclusive' ? 'default' : 'outline'}>
                            {posting.type}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">Package: {posting.package}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            Review
                          </Button>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Opportunity Calendar</span>
                  </CardTitle>
                  <CardDescription>Deadlines, tests, and interview schedules</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { date: 'Jan 20', event: 'TechCorp Application Deadline', type: 'deadline', urgent: true },
                      { date: 'Jan 22', event: 'InnovateLabs Online Test', type: 'test', urgent: false },
                      { date: 'Jan 25', event: 'CloudTech Interview Round 1', type: 'interview', urgent: false },
                      { date: 'Jan 28', event: 'AI Innovations Final Results', type: 'result', urgent: false }
                    ].map((event, index) => (
                      <div key={index} className={`p-3 border rounded-lg ${event.urgent ? 'border-red-200 bg-red-50 dark:bg-red-900/10' : ''}`}>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{event.event}</p>
                            <p className="text-sm text-muted-foreground">{event.date}</p>
                          </div>
                          <Badge variant={
                            event.type === 'deadline' ? 'destructive' :
                            event.type === 'test' ? 'secondary' :
                            event.type === 'interview' ? 'default' : 'outline'
                          }>
                            {event.type}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Smart Tagging & Auto-categorization */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Smart Tagging & Auto-categorization</span>
                </CardTitle>
                <CardDescription>AI-powered job posting analysis and tagging</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-medium">Required Skills Auto-detected</h4>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'].map((skill, index) => (
                        <Badge key={index} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Department Mapping</h4>
                    <div className="flex flex-wrap gap-2">
                      {['CSE', 'IT', 'ECE'].map((dept, index) => (
                        <Badge key={index} variant="secondary">{dept}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-medium">Stipend Range Classification</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">5-8 LPA</Badge>
                      <Badge variant="outline">Mid-level</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Upload Interface */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Bulk Job Posting Upload</span>
                </CardTitle>
                <CardDescription>Upload multiple job postings via CSV/Excel</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600 mb-2">Drag and drop your CSV/Excel file here, or click to browse</p>
                  <Button variant="outline">Choose File</Button>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">47</div>
                    <div className="text-sm text-muted-foreground">Successfully Processed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-sm text-muted-foreground">Needs Review</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600">2</div>
                    <div className="text-sm text-muted-foreground">Errors</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button className="flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    Process Upload
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Student Tracking & Support Tab */}
          <TabsContent value="students" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Student Tracking & Support</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>

            {/* Individual Student Tracker */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-lg lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Individual Student Tracker</span>
                  </CardTitle>
                  <CardDescription>Monitor student progress across all placement activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-4 mb-4">
                      <Input placeholder="Search students..." className="flex-1" />
                      <Select>
                        <SelectTrigger className="w-40">
                          <SelectValue placeholder="Department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Departments</SelectItem>
                          <SelectItem value="cse">CSE</SelectItem>
                          <SelectItem value="it">IT</SelectItem>
                          <SelectItem value="ece">ECE</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="placed">Placed</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { 
                          name: 'Priya Sharma', 
                          id: 'CSE2021001', 
                          dept: 'CSE', 
                          cgpa: '8.9', 
                          status: 'Placed',
                          company: 'TechCorp',
                          applications: 8,
                          interviews: 3,
                          offers: 2
                        },
                        { 
                          name: 'Rahul Kumar', 
                          id: 'IT2021045', 
                          dept: 'IT', 
                          cgpa: '8.2', 
                          status: 'Active',
                          company: '-',
                          applications: 12,
                          interviews: 5,
                          offers: 0
                        },
                        { 
                          name: 'Sneha Patel', 
                          id: 'ECE2021078', 
                          dept: 'ECE', 
                          cgpa: '7.8', 
                          status: 'Inactive',
                          company: '-',
                          applications: 3,
                          interviews: 1,
                          offers: 0
                        }
                      ].map((student, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <p className="font-medium">{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.id} • {student.dept} • CGPA: {student.cgpa}</p>
                            </div>
                            <Badge variant={
                              student.status === 'Placed' ? 'default' :
                              student.status === 'Active' ? 'secondary' : 'outline'
                            }>
                              {student.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-4 gap-4 text-sm mb-3">
                            <div>
                              <div className="font-medium">{student.applications}</div>
                              <div className="text-muted-foreground">Applications</div>
                            </div>
                            <div>
                              <div className="font-medium">{student.interviews}</div>
                              <div className="text-muted-foreground">Interviews</div>
                            </div>
                            <div>
                              <div className="font-medium">{student.offers}</div>
                              <div className="text-muted-foreground">Offers</div>
                            </div>
                            <div>
                              <div className="font-medium">{student.company}</div>
                              <div className="text-muted-foreground">Company</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Profile
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="h-4 w-4 mr-1" />
                              Send Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Update Status
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Application Insights</span>
                  </CardTitle>
                  <CardDescription>Student application patterns and success rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Applications per Student</span>
                        <span className="font-medium">7.8</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Interview to Offer Ratio</span>
                        <span className="font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Profile Completion Rate</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <Progress value={89} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Resume Upload Rate</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <h4 className="font-medium mb-3">Top Performing Departments</h4>
                    <div className="space-y-2">
                      {[
                        { dept: 'CSE', rate: '87%', color: 'bg-green-500' },
                        { dept: 'IT', rate: '81%', color: 'bg-blue-500' },
                        { dept: 'ECE', rate: '65%', color: 'bg-orange-500' }
                      ].map((dept, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${dept.color}`}></div>
                          <span className="text-sm flex-1">{dept.dept}</span>
                          <span className="text-sm font-medium">{dept.rate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Mentor Sync & Skill Gap Analysis */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <UserCheck className="h-5 w-5" />
                    <span>Mentor Sync</span>
                  </CardTitle>
                  <CardDescription>Coordinate with mentors for student support</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { mentor: 'Dr. Rajesh Kumar', students: 15, nextSession: 'Jan 22, 2:00 PM', status: 'scheduled' },
                      { mentor: 'Prof. Anita Sharma', students: 12, nextSession: 'Jan 24, 10:00 AM', status: 'scheduled' },
                      { mentor: 'Dr. Vikram Singh', students: 18, nextSession: 'Pending', status: 'pending' }
                    ].map((mentor, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{mentor.mentor}</p>
                            <p className="text-sm text-muted-foreground">{mentor.students} assigned students</p>
                          </div>
                          <Badge variant={mentor.status === 'scheduled' ? 'default' : 'secondary'}>
                            {mentor.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">Next Session: {mentor.nextSession}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            Schedule
                          </Button>
                          <Button size="sm" variant="outline">
                            <Send className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Skill Gap Analysis</span>
                  </CardTitle>
                  <CardDescription>Identify and address skill deficiencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-lg bg-red-50 dark:bg-red-900/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-red-700 dark:text-red-300">Critical Gap</span>
                        <Badge variant="destructive">High Priority</Badge>
                      </div>
                      <p className="text-sm mb-2">React.js: 89 job requirements vs 45 qualified students</p>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Schedule Training
                      </Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg bg-orange-50 dark:bg-orange-900/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-orange-700 dark:text-orange-300">Moderate Gap</span>
                        <Badge variant="secondary">Medium Priority</Badge>
                      </div>
                      <p className="text-sm mb-2">AWS Cloud: 34 requirements vs 21 qualified students</p>
                      <Button size="sm" variant="outline">
                        <Plus className="h-4 w-4 mr-1" />
                        Schedule Training
                      </Button>
                    </div>
                    
                    <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/10">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-green-700 dark:text-green-300">Well Covered</span>
                        <Badge variant="outline">Low Priority</Badge>
                      </div>
                      <p className="text-sm mb-2">Java: 67 requirements vs 78 qualified students</p>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Monitor
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4">
                    <Target className="h-4 w-4 mr-2" />
                    Generate Training Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Interviews Tab (keeping original) */}
          <TabsContent value="students" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Student Management</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Student Directory</CardTitle>
                <CardDescription>Manage student applications and placement status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Search students..." className="max-w-sm" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cse">CSE</SelectItem>
                        <SelectItem value="it">IT</SelectItem>
                        <SelectItem value="ece">ECE</SelectItem>
                        <SelectItem value="me">ME</SelectItem>
                        <SelectItem value="civil">Civil</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="placed">Placed</SelectItem>
                        <SelectItem value="applied">Applied</SelectItem>
                        <SelectItem value="shortlisted">Shortlisted</SelectItem>
                        <SelectItem value="interview">Interview Scheduled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>CGPA</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.dept}</TableCell>
                          <TableCell>{student.cgpa}</TableCell>
                          <TableCell>
                            <Badge variant={
                              student.status === 'Placed' ? 'default' :
                              student.status === 'Interview Scheduled' ? 'secondary' :
                              student.status === 'Shortlisted' ? 'outline' :
                              'secondary'
                            }>
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{student.company}</TableCell>
                          <TableCell>{student.package}</TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              <Button size="sm" variant="outline" onClick={() => handleApproveApplication(student.id)}>
                                <UserCheck className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleRejectApplication(student.id)}>
                                <UserX className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleScheduleInterview(student.id)}>
                                <CalendarIcon className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Company Management</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Companies
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Partner Companies</CardTitle>
                <CardDescription>Manage company partnerships and job opportunities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Positions</TableHead>
                      <TableHead>Package Range</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {companies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell className="font-medium">{company.name}</TableCell>
                        <TableCell>{company.type}</TableCell>
                        <TableCell>{company.positions}</TableCell>
                        <TableCell>{company.package}</TableCell>
                        <TableCell>{company.applications}</TableCell>
                        <TableCell>
                          <Badge variant={company.status === 'Active' ? 'default' : 'secondary'}>
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Interview Management</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Schedule Interview
              </Button>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Manage and track student interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingInterviews.map((interview) => (
                      <TableRow key={interview.id}>
                        <TableCell className="font-medium">{interview.student}</TableCell>
                        <TableCell>{interview.company}</TableCell>
                        <TableCell>{interview.position}</TableCell>
                        <TableCell>{interview.date}</TableCell>
                        <TableCell>{interview.time}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{interview.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Communication Tools Tab */}
          <TabsContent value="communication" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Communication Tools</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </div>
            </div>

            {/* Mass Announcements */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Send className="h-5 w-5" />
                    <span>Mass Announcements</span>
                  </CardTitle>
                  <CardDescription>Send targeted messages to students and recruiters</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Recipient Groups</label>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['All Students', 'CSE Students', 'Final Year', 'Placed Students', 'Active Recruiters', 'Mentors'].map((group, index) => (
                        <Badge key={index} variant="outline" className="cursor-pointer hover:bg-gray-100">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select message type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="announcement">General Announcement</SelectItem>
                        <SelectItem value="opportunity">Job Opportunity</SelectItem>
                        <SelectItem value="deadline">Application Deadline</SelectItem>
                        <SelectItem value="interview">Interview Schedule</SelectItem>
                        <SelectItem value="result">Result Notification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Subject</label>
                    <Input placeholder="Enter message subject..." />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Message Content</label>
                    <Textarea placeholder="Type your message here..." rows={4} />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button className="flex-1">
                      <Send className="h-4 w-4 mr-2" />
                      Send Now
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-5 w-5" />
                    <span>Recent Announcements</span>
                  </CardTitle>
                  <CardDescription>Track sent messages and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        subject: 'TechCorp Interview Schedule Released',
                        recipients: 'CSE Final Year (156 students)',
                        sent: '2 hours ago',
                        opened: '89%',
                        type: 'interview'
                      },
                      { 
                        subject: 'New Internship Opportunities - Apply Now',
                        recipients: 'All Students (847 students)',
                        sent: '1 day ago',
                        opened: '67%',
                        type: 'opportunity'
                      },
                      { 
                        subject: 'Application Deadline Extended',
                        recipients: 'IT Students (234 students)',
                        sent: '2 days ago',
                        opened: '92%',
                        type: 'deadline'
                      }
                    ].map((announcement, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{announcement.subject}</p>
                            <p className="text-sm text-muted-foreground">{announcement.recipients}</p>
                          </div>
                          <Badge variant={
                            announcement.type === 'interview' ? 'default' :
                            announcement.type === 'opportunity' ? 'secondary' :
                            announcement.type === 'deadline' ? 'destructive' : 'outline'
                          }>
                            {announcement.type}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Sent {announcement.sent}</span>
                          <span className="text-sm font-medium text-green-600">{announcement.opened} opened</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Eye className="h-4 w-4 mr-2" />
                    View All Messages
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Automated Reminders & Feedback Collection */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5" />
                    <span>Automated Reminders</span>
                  </CardTitle>
                  <CardDescription>Set up automatic notifications for important events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        title: 'Application Deadline Reminder',
                        trigger: '24 hours before deadline',
                        recipients: 'Eligible students',
                        status: 'active',
                        nextRun: 'Tomorrow 9:00 AM'
                      },
                      { 
                        title: 'Interview Preparation Reminder',
                        trigger: '2 days before interview',
                        recipients: 'Shortlisted students',
                        status: 'active',
                        nextRun: 'Jan 23, 10:00 AM'
                      },
                      { 
                        title: 'Profile Update Reminder',
                        trigger: 'Weekly for incomplete profiles',
                        recipients: 'Students with <80% profile',
                        status: 'paused',
                        nextRun: 'Paused'
                      }
                    ].map((reminder, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{reminder.title}</p>
                            <p className="text-sm text-muted-foreground">Trigger: {reminder.trigger}</p>
                            <p className="text-sm text-muted-foreground">Recipients: {reminder.recipients}</p>
                          </div>
                          <Badge variant={reminder.status === 'active' ? 'default' : 'secondary'}>
                            {reminder.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next run: {reminder.nextRun}</span>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              {reminder.status === 'active' ? 'Pause' : 'Resume'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Reminder
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5" />
                    <span>Feedback Collection</span>
                  </CardTitle>
                  <CardDescription>Gather feedback from students and recruiters</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Post-Interview Feedback</h4>
                        <Badge variant="default">Active</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-2xl font-bold text-blue-600">156</div>
                          <div className="text-sm text-muted-foreground">Responses</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-green-600">4.2/5</div>
                          <div className="text-sm text-muted-foreground">Avg Rating</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        View Responses
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Placement Process Feedback</h4>
                        <Badge variant="secondary">Draft</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-2xl font-bold text-gray-400">-</div>
                          <div className="text-sm text-muted-foreground">Responses</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gray-400">-</div>
                          <div className="text-sm text-muted-foreground">Avg Rating</div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Launch Survey
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Recruiter Experience Survey</h4>
                        <Badge variant="outline">Scheduled</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-2xl font-bold text-orange-600">23</div>
                          <div className="text-sm text-muted-foreground">Pending</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-blue-600">Jan 25</div>
                          <div className="text-sm text-muted-foreground">Launch Date</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Survey
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-2xl font-bold">Placement Analytics</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Department-wise Placement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Computer Science</span>
                      <span className="font-semibold">145/160 (90.6%)</span>
                    </div>
                    <Progress value={90.6} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Information Technology</span>
                      <span className="font-semibold">112/125 (89.6%)</span>
                    </div>
                    <Progress value={89.6} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Electronics</span>
                      <span className="font-semibold">98/120 (81.7%)</span>
                    </div>
                    <Progress value={81.7} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span>Mechanical</span>
                      <span className="font-semibold">87/100 (87.0%)</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Top Recruiting Companies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "TechCorp Solutions", placements: 38, color: "bg-blue-500" },
                      { name: "InnovateLabs", placements: 29, color: "bg-green-500" },
                      { name: "CloudTech Systems", placements: 22, color: "bg-orange-500" },
                      { name: "AI Innovations", placements: 20, color: "bg-purple-500" },
                      { name: "StartupHub", placements: 18, color: "bg-pink-500" }
                    ].map((company, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${company.color}`} />
                        <div className="flex-1 flex justify-between">
                          <span className="text-sm font-medium">{company.name}</span>
                          <span className="text-sm font-semibold">{company.placements}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Salary Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">120</div>
                    <div className="text-sm text-muted-foreground">3-5 LPA</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-green-600">85</div>
                    <div className="text-sm text-muted-foreground">5-8 LPA</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">45</div>
                    <div className="text-sm text-muted-foreground">8-12 LPA</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">20</div>
                    <div className="text-sm text-muted-foreground">12+ LPA</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Administrative Controls Tab */}
          <TabsContent value="admin" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Administrative Controls</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* User Management & RBAC */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>User Management & RBAC</span>
                  </CardTitle>
                  <CardDescription>Manage users and their access permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-4 mb-4">
                      <Input placeholder="Search users..." className="flex-1" />
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="placement_cell">Placement Cell</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Dr. Priya Sharma', email: 'priya.sharma@college.edu', role: 'Admin', status: 'Active', lastLogin: '2 hours ago' },
                        { name: 'Rahul Kumar', email: 'rahul.placement@college.edu', role: 'Placement Cell', status: 'Active', lastLogin: '30 mins ago' },
                        { name: 'Sarah Johnson', email: 'sarah.j@techcorp.com', role: 'Recruiter', status: 'Active', lastLogin: '1 day ago' },
                        { name: 'Prof. Amit Patel', email: 'amit.mentor@college.edu', role: 'Mentor', status: 'Inactive', lastLogin: '1 week ago' }
                      ].map((user, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                                {user.status}
                              </Badge>
                              <Badge variant="outline">{user.role}</Badge>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">Last login: {user.lastLogin}</p>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <Settings className="h-4 w-4 mr-1" />
                              Permissions
                            </Button>
                            <Button size="sm" variant="outline">
                              {user.status === 'Active' ? (
                                <>
                                  <UserX className="h-4 w-4 mr-1" />
                                  Deactivate
                                </>
                              ) : (
                                <>
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  Activate
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Document Management</span>
                  </CardTitle>
                  <CardDescription>Manage placement-related documents and templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">47</div>
                        <div className="text-sm text-muted-foreground">Resume Templates</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">23</div>
                        <div className="text-sm text-muted-foreground">Company Forms</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { name: 'Standard Resume Template', type: 'Template', size: '2.3 MB', downloads: 1247 },
                        { name: 'Company Registration Form', type: 'Form', size: '1.8 MB', downloads: 89 },
                        { name: 'Interview Feedback Form', type: 'Form', size: '1.2 MB', downloads: 156 },
                        { name: 'Placement Guidelines', type: 'Document', size: '3.1 MB', downloads: 2341 }
                      ].map((doc, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                            </div>
                            <Badge variant="outline">{doc.downloads} downloads</Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Interview Coordination & System Logs */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="h-5 w-5" />
                    <span>Interview Coordination</span>
                  </CardTitle>
                  <CardDescription>Manage interview schedules and room bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-blue-600">12</div>
                        <div className="text-sm text-muted-foreground">Today</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-green-600">28</div>
                        <div className="text-sm text-muted-foreground">This Week</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-orange-600">89</div>
                        <div className="text-sm text-muted-foreground">This Month</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { company: 'TechCorp Solutions', time: '10:00 AM - 12:00 PM', room: 'Conference Room A', candidates: 15, status: 'confirmed' },
                        { company: 'InnovateLabs', time: '2:00 PM - 4:00 PM', room: 'Conference Room B', candidates: 8, status: 'pending' },
                        { company: 'CloudTech Inc', time: '4:30 PM - 6:00 PM', room: 'Virtual Room 1', candidates: 12, status: 'confirmed' }
                      ].map((interview, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{interview.company}</p>
                              <p className="text-sm text-muted-foreground">{interview.time} • {interview.room}</p>
                            </div>
                            <Badge variant={interview.status === 'confirmed' ? 'default' : 'secondary'}>
                              {interview.status}
                            </Badge>
                          </div>
                          <p className="text-sm mb-3">{interview.candidates} candidates scheduled</p>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4 mr-1" />
                              Reschedule
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>System Activity Logs</span>
                  </CardTitle>
                  <CardDescription>Monitor system activities and user actions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex space-x-2 mb-4">
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Log Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Logs</SelectItem>
                          <SelectItem value="login">Login</SelectItem>
                          <SelectItem value="placement">Placement</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="error">Errors</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="Time Range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="today">Today</SelectItem>
                          <SelectItem value="week">This Week</SelectItem>
                          <SelectItem value="month">This Month</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {[
                        { time: '14:23', action: 'Student profile updated', user: 'Priya Sharma (CSE2021001)', type: 'info' },
                        { time: '14:20', action: 'New job posting approved', user: 'Rahul Kumar (Placement)', type: 'success' },
                        { time: '14:15', action: 'Interview schedule created', user: 'TechCorp Solutions', type: 'info' },
                        { time: '14:10', action: 'User login', user: 'Dr. Priya Sharma', type: 'info' },
                        { time: '14:05', action: 'Failed login attempt', user: 'unknown@test.com', type: 'warning' },
                        { time: '14:00', action: 'Bulk email sent', user: 'Placement Cell', type: 'success' }
                      ].map((log, index) => (
                        <div key={index} className="p-2 border rounded-lg text-sm">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                log.type === 'success' ? 'bg-green-500' :
                                log.type === 'warning' ? 'bg-orange-500' :
                                log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                              }`}></div>
                              <span className="font-medium">{log.action}</span>
                            </div>
                            <span className="text-muted-foreground">{log.time}</span>
                          </div>
                          <p className="text-muted-foreground ml-4">{log.user}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4">
            <h3 className="text-2xl font-bold">Reports & Documentation</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Generate Reports</CardTitle>
                  <CardDescription>Create detailed placement reports for different periods</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement">Placement Summary</SelectItem>
                      <SelectItem value="company">Company Analysis</SelectItem>
                      <SelectItem value="student">Student Performance</SelectItem>
                      <SelectItem value="salary">Salary Analysis</SelectItem>
                      <SelectItem value="department">Department-wise Report</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Academic Year</SelectItem>
                      <SelectItem value="previous">Previous Academic Year</SelectItem>
                      <SelectItem value="semester">Current Semester</SelectItem>
                      <SelectItem value="monthly">Monthly Report</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Report
                    </Button>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Excel Export
                    </Button>
                  </div>
                  
                  <Button className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Recent Reports</CardTitle>
                  <CardDescription>Previously generated reports and documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Placement Summary 2024", type: "PDF", date: "Jan 15, 2024", size: "2.4 MB" },
                      { name: "Company Analysis Q4", type: "Excel", date: "Jan 10, 2024", size: "1.8 MB" },
                      { name: "Department Report", type: "PDF", date: "Jan 5, 2024", size: "3.2 MB" },
                      { name: "Salary Analysis 2023", type: "Excel", date: "Dec 28, 2023", size: "1.5 MB" }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
                        </div>
                        <div className="flex space-x-1">
                          <Badge variant="outline">{report.type}</Badge>
                          <Button size="sm" variant="outline">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Extra Resources</h3>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </div>

            {/* Training Materials & Industry Connections */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Training Materials & Certifications</span>
                  </CardTitle>
                  <CardDescription>Professional development resources for students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">34</div>
                        <div className="text-sm text-muted-foreground">Training Courses</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-green-600">127</div>
                        <div className="text-sm text-muted-foreground">Certifications</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { 
                          title: 'Full Stack Development Bootcamp',
                          provider: 'TechEd Online',
                          duration: '12 weeks',
                          enrolled: 89,
                          rating: '4.8/5',
                          category: 'Technical'
                        },
                        { 
                          title: 'AWS Cloud Practitioner Certification',
                          provider: 'Amazon Web Services',
                          duration: '6 weeks',
                          enrolled: 156,
                          rating: '4.9/5',
                          category: 'Cloud'
                        },
                        { 
                          title: 'Communication & Soft Skills',
                          provider: 'CareerBooster',
                          duration: '4 weeks',
                          enrolled: 234,
                          rating: '4.6/5',
                          category: 'Soft Skills'
                        }
                      ].map((course, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{course.title}</p>
                              <p className="text-sm text-muted-foreground">{course.provider} • {course.duration}</p>
                            </div>
                            <Badge variant="outline">{course.category}</Badge>
                          </div>
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm">{course.enrolled} students enrolled</span>
                            <span className="text-sm font-medium text-green-600">★ {course.rating}</span>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </Button>
                            <Button size="sm">
                              <Plus className="h-4 w-4 mr-1" />
                              Enroll Students
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-5 w-5" />
                    <span>Industry Connections & Alumni Network</span>
                  </CardTitle>
                  <CardDescription>Leverage professional networks for placements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">78</div>
                        <div className="text-sm text-muted-foreground">Industry Partners</div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">1,247</div>
                        <div className="text-sm text-muted-foreground">Alumni Network</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <Building className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Industry Mentorship Program</p>
                            <p className="text-sm text-muted-foreground">45 active mentors from top companies</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4 mr-1" />
                            View Mentors
                          </Button>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Request Mentor
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <Users className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Alumni Referral Network</p>
                            <p className="text-sm text-muted-foreground">Connect with graduates in target companies</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Search className="h-4 w-4 mr-1" />
                            Search Alumni
                          </Button>
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-1" />
                            Request Introduction
                          </Button>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                            <Target className="h-4 w-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium">Industry Events & Workshops</p>
                            <p className="text-sm text-muted-foreground">Regular networking and skill development events</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CalendarIcon className="h-4 w-4 mr-1" />
                            View Events
                          </Button>
                          <Button size="sm">
                            <Plus className="h-4 w-4 mr-1" />
                            Organize Event
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Knowledge Base & Emergency Support */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Knowledge Base & FAQs</span>
                  </CardTitle>
                  <CardDescription>Comprehensive placement guidance and common queries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-blue-600">156</div>
                        <div className="text-sm text-muted-foreground">Articles</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-green-600">89</div>
                        <div className="text-sm text-muted-foreground">FAQs</div>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <div className="text-xl font-bold text-purple-600">23</div>
                        <div className="text-sm text-muted-foreground">Video Guides</div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {[
                        { title: 'How to prepare for technical interviews?', views: 2341, type: 'Guide' },
                        { title: 'Resume writing best practices', views: 1876, type: 'Article' },
                        { title: 'Common placement process questions', views: 3456, type: 'FAQ' },
                        { title: 'Salary negotiation strategies', views: 987, type: 'Video' }
                      ].map((resource, index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{resource.title}</p>
                              <p className="text-sm text-muted-foreground">{resource.views} views</p>
                            </div>
                            <Badge variant="outline">{resource.type}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Article
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Emergency Support & Crisis Management</span>
                  </CardTitle>
                  <CardDescription>Immediate support for urgent placement issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-red-50 dark:bg-red-900/10">
                      <div className="flex items-center space-x-2 mb-3">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-700 dark:text-red-300">Emergency Hotline</span>
                      </div>
                      <p className="text-sm mb-3">24/7 support for urgent placement issues</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="destructive">
                          <Phone className="h-4 w-4 mr-2" />
                          Call: +91-12345-67890
                        </Button>
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4 mr-2" />
                          Email Support
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-2">Recent Support Tickets</h4>
                        <div className="space-y-2">
                          {[
                            { id: '#2341', issue: 'Interview postponed last minute', status: 'resolved', priority: 'high' },
                            { id: '#2340', issue: 'Resume upload not working', status: 'in-progress', priority: 'medium' },
                            { id: '#2339', issue: 'Cannot access interview link', status: 'resolved', priority: 'high' }
                          ].map((ticket, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                              <div>
                                <span className="font-medium">{ticket.id}</span>
                                <span className="text-muted-foreground ml-2">{ticket.issue}</span>
                              </div>
                              <div className="flex space-x-2">
                                <Badge variant={ticket.priority === 'high' ? 'destructive' : 'secondary'}>
                                  {ticket.priority}
                                </Badge>
                                <Badge variant={ticket.status === 'resolved' ? 'default' : 'outline'}>
                                  {ticket.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 mr-2" />
                        View All Tickets
                      </Button>
                      <Button className="flex-1">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PlacementCellDashboard;