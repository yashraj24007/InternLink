import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Calendar as UICalendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
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
  Building2,
  Home,
  Settings,
  LogOut,
  Bell,
  User,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Send,
  Phone,
  Mail,
  MapPin,
  Award,
  Target,
  BarChart3,
  PieChart,
  Activity,
  FileText,
  Video,
  Calendar as CalendarIcon,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  Zap,
  Brain,
  GitBranch,
  Database,
  Shield,
  Globe,
  Lightbulb,
  Rocket,
  Heart,
  Coffee,
  Megaphone,
  UserCheck,
  ClipboardList,
  X,
  AlertCircle,
  Copy,
  ExternalLink,
  Share2,
  AlertTriangle
} from 'lucide-react';

const RecruiterDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // State Management
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterSkills, setFilterSkills] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [interviewSlots, setInterviewSlots] = useState<any[]>([]);
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [currentJobId, setCurrentJobId] = useState<number | null>(null);

  // Profile Data
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Sarah Johnson',
    position: 'Senior Recruiter',
    email: user?.email || 'recruiter@demo.com',
    phone: '+1 (555) 123-4567',
    company: 'TechCorp Solutions',
    logo: '/api/placeholder/100/100',
    website: 'https://techcorp.com',
    verified: true,
    description: 'Leading technology solutions company specializing in innovative software development and digital transformation.',
    location: 'San Francisco, CA',
    experience: '8+ years',
    specialization: 'Technical Recruitment & Talent Acquisition',
    bio: 'Experienced recruiter specializing in technical roles with a passion for connecting top talent with innovative companies.'
  });

  // Dashboard Statistics
  const stats = [
    { title: "Active Job Postings", value: "12", icon: Briefcase, color: "text-blue-600", change: "+3 this week" },
    { title: "Total Applications", value: "387", icon: Users, color: "text-green-600", change: "+45 today" },
    { title: "Interviews Scheduled", value: "28", icon: Calendar, color: "text-purple-600", change: "15 this week" },
    { title: "Successful Hires", value: "23", icon: TrendingUp, color: "text-orange-600", change: "+5 this month" },
  ];

  // Job Opportunities Data
  const myOpportunities = [
    {
      id: 1,
      title: "Senior Software Engineer",
      type: "Full-time Placement",
      applications: 28,
      deadline: "2024-02-15",
      status: "Active",
      statusColor: "bg-success/20 text-success-foreground",
      location: "Bangalore",
      postedDate: "2024-01-10",
      experience: "3-5 years",
      salary: "₹12-18 LPA",
      priority: "High",
      shortlisted: 8,
      interviewed: 5,
      skills: ["React", "Node.js", "AWS", "Docker"]
    },
    {
      id: 2,
      title: "Data Science Intern",
      type: "Internship", 
      applications: 45,
      deadline: "2024-01-25",
      status: "Active",
      statusColor: "bg-success/20 text-success-foreground",
      location: "Remote",
      postedDate: "2024-01-05",
      experience: "0-1 year",
      salary: "₹25,000/month",
      priority: "Medium",
      shortlisted: 12,
      interviewed: 8,
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"]
    },
    {
      id: 3,
      title: "Frontend Developer",
      type: "Industrial Training",
      applications: 22,
      deadline: "2024-01-20",
      status: "Expiring Soon",
      statusColor: "bg-warning/20 text-warning-foreground",
      location: "Hyderabad",
      postedDate: "2023-12-28",
      experience: "1-3 years",
      salary: "₹8-12 LPA",
      priority: "Low",
      shortlisted: 6,
      interviewed: 3,
      skills: ["JavaScript", "React", "CSS", "Vue.js"]
    },
  ];

  // Candidate Data
  const candidateApplications = [
    {
      id: 1,
      name: "Rahul Kumar",
      position: "Senior Software Engineer",
      email: "rahul.kumar@email.com",
      phone: "+91 9876543210",
      experience: "4 years",
      university: "IIT Delhi",
      appliedDate: "2024-01-15",
      stage: "Interview Scheduled",
      rating: 4.8,
      skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes"],
    },
    {
      id: 2,
      name: "Priya Sharma",
      position: "Data Science Intern",
      email: "priya.sharma@email.com",
      phone: "+91 9876543211",
      experience: "1 year",
      university: "NIT Trichy",
      appliedDate: "2024-01-12",
      stage: "Under Review",
      rating: 4.6,
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow", "Pandas"],
    },
    {
      id: 3,
      name: "Amit Singh",
      position: "Frontend Developer",
      email: "amit.singh@email.com",
      phone: "+91 9876543212",
      experience: "2 years",
      university: "VIT Vellore",
      appliedDate: "2024-01-10",
      stage: "Shortlisted",
      rating: 4.9,
      skills: ["JavaScript", "React", "CSS", "Vue.js", "TypeScript"],
    }
  ];

  // Interview Schedule
  const interviewSchedule = [
    {
      id: 1,
      candidateName: "Rahul Kumar",
      position: "Senior Software Engineer",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "1 hour",
      type: "Technical Round",
      mode: "Video Call",
      interviewer: "John Doe"
    },
    {
      id: 2,
      candidateName: "Priya Sharma",
      position: "Data Science Intern",
      date: "2024-01-22",
      time: "2:00 PM",
      duration: "45 minutes",
      type: "Initial Screening",
      mode: "Phone Call",
      interviewer: "Jane Smith"
    }
  ];

  // Analytics Data
  const recruitmentAnalytics = {
    timeToHire: 28,
    costPerHire: 45000,
    sourceAnalytics: [
      { source: "LinkedIn", applications: 156, hires: 12 },
      { source: "Company Website", applications: 89, hires: 8 },
      { source: "Job Boards", applications: 67, hires: 3 },
      { source: "Referrals", applications: 45, hires: 15 },
    ]
  };

  const hiringFunnel = [
    { stage: "Applications", count: 156, percentage: 100 },
    { stage: "Screening", count: 89, percentage: 57 },
    { stage: "Interviews", count: 34, percentage: 22 },
    { stage: "Final Round", count: 12, percentage: 8 },
    { stage: "Offers", count: 5, percentage: 3 },
  ];

  // Event Handlers
  const handleCandidateAction = (candidateId: number, action: string) => {
    toast({
      title: `Candidate ${action}`,
      description: `Action performed successfully on candidate.`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${action} applied to selected candidates.`,
    });
    setSelectedCandidates([]);
  };

  const handleScheduleInterview = () => {
    toast({
      title: "Interview Scheduled",
      description: "Interview has been scheduled successfully.",
    });
  };

  const handlePostJob = () => {
    setShowJobForm(false);
    toast({
      title: "Job Posted",
      description: "Your job posting has been published successfully.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real application, this would make an API call to delete the account
    toast({
      title: "Account Deletion Initiated",
      description: "Your recruiter account deletion request has been processed. You will receive a confirmation email shortly.",
      variant: "destructive",
    });
    
    // Simulate redirect to login or home page after account deletion
    setTimeout(() => {
      logout();
      navigate('/');
      console.log("Recruiter account deleted - redirected to homepage");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {profileData.name}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage your recruitment activities and find top talent</p>
          </div>
          
          {/* Settings Dropdown */}
          <div className="flex items-center gap-4">
            {/* Homepage Button */}
            <Button asChild variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-700">
              <Link to="/">
                <Home className="w-5 h-5" />
              </Link>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-700">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>

            {/* Settings Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-700">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center justify-between w-full">
                    <span className="flex items-center">
                      <span className="mr-2">🌙</span>
                      Dark Mode
                    </span>
                    <ThemeSwitch />
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate('/'); }}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="candidates">Candidates</TabsTrigger>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
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

            {/* Company Profile Overview */}
            <Card className="border-none shadow-lg mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Company Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-10 h-10 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold">{profileData.company}</h3>
                      {profileData.verified && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">{profileData.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <a href={profileData.website} className="text-primary hover:underline">
                          {profileData.website}
                        </a>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{profileData.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Overview Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Applications */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Recent Applications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {candidateApplications.slice(0, 3).map((candidate) => (
                      <div key={candidate.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                            {candidate.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="font-medium">{candidate.name}</h4>
                            <p className="text-sm text-muted-foreground">{candidate.position}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{candidate.stage}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Active Job Postings */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-green-600" />
                    Active Job Postings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myOpportunities.slice(0, 3).map((job) => (
                      <div key={job.id} className="p-3 rounded-lg border">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">{job.title}</h4>
                            <p className="text-sm text-muted-foreground">{job.type}</p>
                          </div>
                          <Badge className={job.statusColor}>{job.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span>{job.applications} applications</span>
                          <span>Due: {job.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full justify-start" onClick={() => setActiveTab('jobs')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Post New Job
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('candidates')}>
                      <Search className="w-4 h-4 mr-2" />
                      Review Applications
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('interviews')}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Interview
                    </Button>
                    <Button variant="outline" className="w-full justify-start" onClick={() => setActiveTab('analytics')}>
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hiring Funnel */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Hiring Funnel Overview
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
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Candidate Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setBulkActionMode(!bulkActionMode)}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  {bulkActionMode ? 'Exit Bulk Mode' : 'Bulk Actions'}
                </Button>
                <Button variant="outline" onClick={() => toast({title: "Export", description: "Candidate data exported successfully!"})}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            {/* Advanced Filters */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-primary" />
                  Advanced Filters & Search
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="search">Search Candidates</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Name, email, skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="cse">Computer Science</SelectItem>
                        <SelectItem value="ece">Electronics & Comm.</SelectItem>
                        <SelectItem value="it">Information Technology</SelectItem>
                        <SelectItem value="me">Mechanical Engineering</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="skills">Skills</Label>
                    <Select value={filterSkills} onValueChange={setFilterSkills}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Skills" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Skills</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="aws">AWS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="rating">Minimum Rating</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="4.5">4.5+ Stars</SelectItem>
                        <SelectItem value="4.0">4.0+ Stars</SelectItem>
                        <SelectItem value="3.5">3.5+ Stars</SelectItem>
                        <SelectItem value="3.0">3.0+ Stars</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Quick Filter Pills */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    ⭐ Top Rated (4.5+)
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    🎯 Shortlisted
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    📅 Interview Scheduled
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    🆕 New Applications
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                    👨‍🎓 Fresh Graduates
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Bulk Actions Bar */}
            {bulkActionMode && (
              <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/20">
                <CardContent className="py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">
                        {selectedCandidates.length} candidate(s) selected
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleBulkAction('Shortlist')}>
                          <UserCheck className="w-4 h-4 mr-2" />
                          Shortlist Selected
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleBulkAction('Email')}>
                          <Mail className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleBulkAction('Schedule')}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Interviews
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleBulkAction('Reject')}>
                          <X className="w-4 h-4 mr-2" />
                          Reject Selected
                        </Button>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedCandidates([])}>
                      Clear Selection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Privacy & Security Notice */}
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20">
              <CardContent className="py-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-200">Privacy Protection Active</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      You can only access candidate information for your posted job openings. Student personal details are protected by role-based access controls and all actions are logged for audit purposes.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4">
              {candidateApplications.map((candidate) => (
                <Card key={candidate.id} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        {bulkActionMode && (
                          <Checkbox
                            checked={selectedCandidates.includes(candidate.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCandidates([...selectedCandidates, candidate.id]);
                              } else {
                                setSelectedCandidates(selectedCandidates.filter(id => id !== candidate.id));
                              }
                            }}
                          />
                        )}
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{candidate.name}</h3>
                            <Badge variant="outline" className="text-xs">{candidate.stage}</Badge>
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mb-2">{candidate.position}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Award className="w-3 h-3" />
                              <span>{candidate.experience} experience</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3 h-3" />
                              <span>{candidate.university}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              <span>{candidate.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              <span>{candidate.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>Applied: {candidate.appliedDate}</span>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{candidate.rating} rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => toast({title: "Notes", description: "Private notes feature coming soon!"})}>
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {
                          setSelectedCandidates(selectedCandidates.includes(candidate.id) ? [] : [candidate.id]);
                          toast({title: candidate.name, description: `${selectedCandidates.includes(candidate.id) ? 'Removed from' : 'Added to'} favorites`});
                        }}>
                          <Star className={`w-4 h-4 ${selectedCandidates.includes(candidate.id) ? 'text-yellow-400 fill-current' : ''}`} />
                        </Button>
                      </div>
                    </div>

                    {/* Skills & Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {candidate.skills.slice(0, 4).map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 4 && (
                          <Badge variant="secondary" className="text-xs">
                            +{candidate.skills.length - 4} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          CGPA: {(Math.random() * 2 + 7).toFixed(1)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Mentor Recommended
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => toast({title: "Resume", description: "Opening candidate resume..."})}>
                          <Download className="w-4 h-4 mr-1" />
                          Resume
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toast({title: "Profile", description: "Viewing detailed candidate profile..."})}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Profile
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleCandidateAction(candidate.id, 'Interview')}>
                          <Calendar className="w-4 h-4 mr-1" />
                          Interview
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => handleCandidateAction(candidate.id, 'Shortlist')}>
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Shortlist
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleCandidateAction(candidate.id, 'Reject')}>
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>

                    {/* Quick Notes Section */}
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Private Notes:</span>
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Edit className="w-3 h-3 mr-1" />
                          Add Note
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Strong technical background, excellent communication skills during phone screening.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Candidate Insights */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Candidate Pool Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Application Trends</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Today</span>
                        <span className="font-medium">12 new applications</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>This Week</span>
                        <span className="font-medium">45 applications</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Response Rate</span>
                        <span className="font-medium text-green-600">68%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Top Universities</h4>
                    <div className="space-y-2">
                      {['IIT Delhi (28)', 'NIT Trichy (22)', 'VIT Vellore (19)', 'BITS Pilani (15)'].map((uni, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{uni.split('(')[0]}</span>
                          <Badge variant="secondary" className="text-xs">{uni.split('(')[1].replace(')', '')}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">Auto-Match Suggestions</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 dark:bg-green-950/30 rounded text-sm">
                        <div className="font-medium text-green-800 dark:text-green-200">85% Match</div>
                        <div className="text-green-600 dark:text-green-400">Rahul Kumar - Senior SWE</div>
                      </div>
                      <div className="p-2 bg-blue-50 dark:bg-blue-950/30 rounded text-sm">
                        <div className="font-medium text-blue-800 dark:text-blue-200">82% Match</div>
                        <div className="text-blue-600 dark:text-blue-400">Priya Sharma - Data Science</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Job Postings Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job & Internship Postings</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast({title: "Bulk Upload", description: "CSV/Excel bulk upload feature coming soon!"})}>
                  <Upload className="w-4 h-4 mr-2" />
                  Bulk Upload
                </Button>
                <Button onClick={() => setShowJobForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Posting
                </Button>
              </div>
            </div>

            {/* Job Creation Form Modal */}
            {showJobForm && (
              <Card className="border-none shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Create New Job/Internship Posting</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => setShowJobForm(false)}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <Label htmlFor="jobTitle">Job Title *</Label>
                      <Input id="jobTitle" placeholder="e.g., Senior Software Engineer" />
                    </div>
                    <div>
                      <Label htmlFor="jobType">Position Type *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fulltime">Full-time Placement</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                          <SelectItem value="training">Industrial Training</SelectItem>
                          <SelectItem value="contract">Contract Role</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">Department Eligibility *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select departments" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cse">Computer Science</SelectItem>
                          <SelectItem value="ece">Electronics & Communication</SelectItem>
                          <SelectItem value="ee">Electrical Engineering</SelectItem>
                          <SelectItem value="me">Mechanical Engineering</SelectItem>
                          <SelectItem value="all">All Branches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="salary">Stipend/Salary *</Label>
                      <Input id="salary" placeholder="e.g., ₹12-18 LPA or ₹25,000/month" />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="e.g., 6 months, Permanent" />
                    </div>
                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <Input id="location" placeholder="e.g., Bangalore, Remote, Hybrid" />
                    </div>
                    <div>
                      <Label htmlFor="deadline">Application Deadline *</Label>
                      <Input id="deadline" type="date" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="skills">Required Skills *</Label>
                      <Input id="skills" placeholder="e.g., React, Node.js, Python, AWS (comma separated)" />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience Required</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fresher">Fresher (0 years)</SelectItem>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="1-3">1-3 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="5+">5+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="conversion">Placement Conversion Probability</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select probability" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High (70%+)</SelectItem>
                          <SelectItem value="medium">Medium (40-70%)</SelectItem>
                          <SelectItem value="low">Low (10-40%)</SelectItem>
                          <SelectItem value="none">No Conversion</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="description">Job Description *</Label>
                      <Textarea id="description" rows={4} placeholder="Detailed job description, responsibilities, and requirements..." />
                    </div>
                    <div className="md:col-span-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="campusExclusive" />
                        <Label htmlFor="campusExclusive">Campus Exclusive (only for current institution)</Label>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowJobForm(false)}>Cancel</Button>
                    <Button onClick={handlePostJob}>
                      <Send className="w-4 h-4 mr-2" />
                      Post Job
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Job Postings */}
            <div className="grid gap-6">
              {myOpportunities.map((job) => (
                <Card key={job.id} className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                          <Badge className={job.statusColor}>{job.status}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {job.priority} Priority
                          </Badge>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 mb-3">{job.type} • {job.location} • {job.salary}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Job Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{job.applications}</div>
                        <div className="text-xs text-blue-600">Applications</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{job.shortlisted}</div>
                        <div className="text-xs text-green-600">Shortlisted</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{job.interviewed}</div>
                        <div className="text-xs text-purple-600">Interviewed</div>
                      </div>
                      <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/30 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {Math.round((job.interviewed / job.applications) * 100)}%
                        </div>
                        <div className="text-xs text-orange-600">Conversion</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" onClick={() => setActiveTab('candidates')}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Applications ({job.applications})
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Interviews
                      </Button>
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Analytics
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                      <div className="ml-auto flex gap-2">
                        <p className="text-xs text-muted-foreground self-center">
                          Posted: {job.postedDate} • Deadline: {job.deadline}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Smart Tagging & Matching Insights */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  Smart Matching Insights
                </CardTitle>
                <CardDescription>AI-powered recommendations for better candidate matching</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Top Skills in Student Pool</h4>
                    <div className="space-y-2">
                      {['JavaScript (156 students)', 'Python (134 students)', 'React (98 students)', 'Java (87 students)', 'Node.js (76 students)'].map((skill, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{skill}</span>
                          <Badge variant="secondary" className="text-xs">Available</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Department-wise Applications</h4>
                    <div className="space-y-2">
                      {[
                        { dept: 'Computer Science', count: 198, percentage: 45 },
                        { dept: 'Electronics & Comm.', count: 89, percentage: 20 },
                        { dept: 'Information Technology', count: 67, percentage: 15 },
                        { dept: 'Mechanical Eng.', count: 43, percentage: 10 },
                        { dept: 'Others', count: 43, percentage: 10 }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{item.dept}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">{item.count} students</span>
                            <Badge variant="secondary" className="text-xs">{item.percentage}%</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interview Scheduling Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Interview Scheduling & Management</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast({title: "Bulk Scheduling", description: "Generate calendar for multiple candidates automatically!"})}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Bulk Schedule
                </Button>
                <Button onClick={handleScheduleInterview}>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
              </div>
            </div>

            {/* Interview Calendar View */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Calendar Component */}
              <Card className="lg:col-span-2 border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    Interview Calendar
                  </CardTitle>
                  <CardDescription>Manage your interview schedule and sync with external calendars</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mini Calendar */}
                    <div className="flex justify-center">
                      <UICalendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border"
                      />
                    </div>
                    
                    {/* Today's Schedule */}
                    <div className="mt-6">
                      <h4 className="font-medium mb-3">
                        Schedule for {selectedDate?.toLocaleDateString() || new Date().toLocaleDateString()}
                      </h4>
                      <div className="space-y-3">
                        {interviewSchedule.map((interview) => (
                          <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <h5 className="font-medium">{interview.candidateName}</h5>
                              <p className="text-sm text-muted-foreground">
                                {interview.position} • {interview.type}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                                <span>⏰ {interview.time}</span>
                                <span>📹 {interview.mode}</span>
                                <span>👤 {interview.interviewer}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Video className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {interviewSchedule.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>No interviews scheduled for this date</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions & Stats */}
              <div className="space-y-6">
                {/* Interview Stats */}
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">This Week</span>
                      <span className="font-semibold">15 interviews</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Pending Scheduling</span>
                      <span className="font-semibold text-orange-600">8 candidates</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Completed</span>
                      <span className="font-semibold text-green-600">23 interviews</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Success Rate</span>
                      <span className="font-semibold text-primary">68%</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Schedule */}
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Next Available Slot
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Group Interview
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="w-4 h-4 mr-2" />
                      Video Interview
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Screening
                    </Button>
                  </CardContent>
                </Card>

                {/* Interview Templates */}
                <Card className="border-none shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Interview Templates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      📋 Technical Assessment
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      💼 Behavioral Interview
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      🎯 Culture Fit Interview
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-sm">
                      📞 Phone Screening
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Pending Interview Requests */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Pending Interview Scheduling
                </CardTitle>
                <CardDescription>Candidates waiting for interview scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {candidateApplications.filter(c => c.stage === 'Interview Scheduled' || c.stage === 'Shortlisted').map((candidate) => (
                    <div key={candidate.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{candidate.name}</h4>
                          <p className="text-sm text-muted-foreground">{candidate.position}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">{candidate.stage}</Badge>
                            <span className="text-xs text-muted-foreground">Applied: {candidate.appliedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interview Feedback & Evaluation */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  Recent Interview Feedback
                </CardTitle>
                <CardDescription>Submit evaluations and track interview outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {interviewSchedule.map((interview) => (
                    <div key={interview.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{interview.candidateName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {interview.position} • {interview.date} {interview.time}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">Completed</Badge>
                          <span className="text-xs text-muted-foreground">Interviewer: {interview.interviewer}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Add Feedback
                        </Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Select
                        </Button>
                        <Button variant="destructive" size="sm">
                          <ThumbsDown className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recruitment Analytics & Insights</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => toast({title: "Export Report", description: "Analytics report exported successfully!"})}>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </Button>
              </div>
            </div>

            {/* Key Metrics Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Time to Hire</p>
                      <p className="text-3xl font-bold text-primary">{recruitmentAnalytics.timeToHire} days</p>
                      <p className="text-xs text-green-600 mt-1">↓ 12% from last month</p>
                    </div>
                    <Clock className="w-8 h-8 text-primary opacity-80" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Cost Per Hire</p>
                      <p className="text-3xl font-bold text-green-600">₹{recruitmentAnalytics.costPerHire.toLocaleString()}</p>
                      <p className="text-xs text-green-600 mt-1">↓ 8% from last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Offer Acceptance Rate</p>
                      <p className="text-3xl font-bold text-orange-600">87%</p>
                      <p className="text-xs text-orange-600 mt-1">↑ 5% from last month</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-orange-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Quality of Hire Score</p>
                      <p className="text-3xl font-bold text-purple-600">4.6/5</p>
                      <p className="text-xs text-purple-600 mt-1">↑ 0.3 from last month</p>
                    </div>
                    <Star className="w-8 h-8 text-purple-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Hiring Funnel & Source Analytics */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Enhanced Hiring Funnel */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Recruitment Funnel Analysis
                  </CardTitle>
                  <CardDescription>Track conversion rates across your recruitment process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {hiringFunnel.map((stage, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{stage.stage}</span>
                          <div className="text-right">
                            <div className="font-semibold">{stage.count}</div>
                            <div className="text-xs text-muted-foreground">{stage.percentage}%</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                index === 0 ? 'bg-blue-500' :
                                index === 1 ? 'bg-green-500' :
                                index === 2 ? 'bg-yellow-500' :
                                index === 3 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${stage.percentage}%` }}
                            ></div>
                          </div>
                          {index < hiringFunnel.length - 1 && (
                            <div className="text-xs text-muted-foreground">
                              {Math.round((hiringFunnel[index + 1].count / stage.count) * 100)}% conversion
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Overall Conversion Rate:</span>
                      <span className="font-bold text-primary">3.2%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm mt-1">
                      <span>Industry Average:</span>
                      <span className="text-muted-foreground">2.8%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Source Analytics */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    Candidate Source Analysis
                  </CardTitle>
                  <CardDescription>Performance of different recruitment channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recruitmentAnalytics.sourceAnalytics.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{source.source}</span>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{source.hires} hires</div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round((source.hires / source.applications) * 100)}% success rate
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-muted rounded-full h-2">
                            <div 
                              className="h-full bg-green-500 rounded-full transition-all duration-500"
                              style={{ width: `${(source.applications / 200) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-muted-foreground w-16">
                            {source.applications} apps
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                    <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Top Performing Channel</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Referrals have the highest success rate at 33.3% with 15 hires from 45 applications
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department-wise Performance & Skills Analysis */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Department Performance */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    Department-wise Hiring Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { dept: 'Computer Science', applications: 198, hires: 15, avgSalary: '₹14.2L' },
                      { dept: 'Electronics & Comm.', applications: 89, hires: 8, avgSalary: '₹12.8L' },
                      { dept: 'Information Technology', applications: 67, hires: 6, avgSalary: '₹13.5L' },
                      { dept: 'Mechanical Engineering', applications: 43, hires: 3, avgSalary: '₹11.5L' }
                    ].map((item, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{item.dept}</h4>
                          <Badge variant="secondary">{item.hires} hires</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div>
                            <span className="block font-medium text-foreground">{item.applications}</span>
                            <span>Applications</span>
                          </div>
                          <div>
                            <span className="block font-medium text-foreground">
                              {Math.round((item.hires / item.applications) * 100)}%
                            </span>
                            <span>Success Rate</span>
                          </div>
                          <div>
                            <span className="block font-medium text-foreground">{item.avgSalary}</span>
                            <span>Avg. Package</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills Demand Analysis */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Skills Demand & Supply Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { skill: 'React', demand: 85, supply: 98, gap: -13, trend: 'surplus' },
                      { skill: 'Python', demand: 92, supply: 134, gap: -42, trend: 'surplus' },
                      { skill: 'AWS', demand: 67, supply: 45, gap: 22, trend: 'shortage' },
                      { skill: 'Machine Learning', demand: 54, supply: 76, gap: -22, trend: 'surplus' },
                      { skill: 'DevOps', demand: 38, supply: 23, gap: 15, trend: 'shortage' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">{item.skill}</span>
                            <Badge 
                              variant={item.trend === 'shortage' ? 'destructive' : 'secondary'}
                              className="text-xs"
                            >
                              {item.trend === 'shortage' ? 'High Demand' : 'Good Supply'}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                            <div>
                              <span className="block font-medium text-foreground">{item.demand}</span>
                              <span>Jobs Posted</span>
                            </div>
                            <div>
                              <span className="block font-medium text-foreground">{item.supply}</span>
                              <span>Candidates</span>
                            </div>
                            <div>
                              <span className={`block font-medium ${
                                item.gap > 0 ? 'text-red-600' : 'text-green-600'
                              }`}>
                                {item.gap > 0 ? '+' : ''}{item.gap}
                              </span>
                              <span>Gap</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Time-based Analytics & Predictions */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Recruitment Trends & Predictions
                </CardTitle>
                <CardDescription>Historical performance and future hiring forecasts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Monthly Hiring Trends</h4>
                    <div className="space-y-2">
                      {['Jan: 12 hires', 'Feb: 18 hires', 'Mar: 15 hires', 'Apr: 23 hires (current)'].map((month, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{month.split(':')[0]}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted h-2 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${(parseInt(month.split(':')[1]) / 25) * 100}%` }}
                              ></div>
                            </div>
                            <span className="font-medium">{month.split(':')[1].trim()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Performance Indicators</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/30 rounded">
                        <span className="text-sm">Interview Show Rate</span>
                        <span className="font-semibold text-green-600">92%</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-blue-50 dark:bg-blue-950/30 rounded">
                        <span className="text-sm">Candidate Satisfaction</span>
                        <span className="font-semibold text-blue-600">4.7/5</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-purple-50 dark:bg-purple-950/30 rounded">
                        <span className="text-sm">Time to First Response</span>
                        <span className="font-semibold text-purple-600">2.3 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium">Hiring Forecast</h4>
                    <div className="space-y-2">
                      <div className="p-3 border rounded-lg">
                        <div className="text-sm text-muted-foreground">Next Month Prediction</div>
                        <div className="text-2xl font-bold text-primary">28 hires</div>
                        <div className="text-xs text-green-600">↑ 22% increase expected</div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Based on current application trends and seasonal patterns
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benchmarking & Recommendations */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-orange-600" />
                  Performance Benchmarking & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-4">Industry Comparison</h4>
                    <div className="space-y-3">
                      {[
                        { metric: 'Time to Hire', yours: '28 days', industry: '35 days', status: 'better' },
                        { metric: 'Cost per Hire', yours: '₹45k', industry: '₹52k', status: 'better' },
                        { metric: 'Offer Acceptance', yours: '87%', industry: '82%', status: 'better' },
                        { metric: 'Interview Show Rate', yours: '92%', industry: '78%', status: 'better' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{item.metric}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.yours}</span>
                            <span className="text-xs text-muted-foreground">vs {item.industry}</span>
                            <Badge variant={item.status === 'better' ? 'default' : 'secondary'} className="text-xs">
                              {item.status === 'better' ? '✓ Above Avg' : 'Below Avg'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-4">AI Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">Optimize Interview Process</div>
                            <div className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                              Consider phone screenings before technical rounds to reduce time-to-hire by 15%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-start gap-2">
                          <Rocket className="w-4 h-4 text-green-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-green-800 dark:text-green-200">Expand Referral Program</div>
                            <div className="text-xs text-green-700 dark:text-green-300 mt-1">
                              Referrals show 33% success rate. Increase referral incentives to boost quality hires
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="flex items-start gap-2">
                          <Brain className="w-4 h-4 text-purple-600 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium text-purple-800 dark:text-purple-200">Focus on AWS Skills</div>
                            <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                              High demand for AWS with limited supply. Consider training programs or adjusted requirements
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Information */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>Manage your recruiter profile and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                {!isEditingProfile ? (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-semibold">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{profileData.name}</h2>
                        <p className="text-slate-600 dark:text-slate-400">{profileData.position}</p>
                        <p className="text-slate-500">{profileData.company}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Email</Label>
                        <p className="text-slate-900 dark:text-white">{profileData.email}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Phone</Label>
                        <p className="text-slate-900 dark:text-white">{profileData.phone}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Location</Label>
                        <p className="text-slate-900 dark:text-white">{profileData.location}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Experience</Label>
                        <p className="text-slate-900 dark:text-white">{profileData.experience}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Specialization</Label>
                        <p className="text-slate-900 dark:text-white">{profileData.specialization}</p>
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-slate-600 dark:text-slate-400">Bio</Label>
                        <p className="text-slate-900 dark:text-white">{profileData.bio}</p>
                      </div>
                    </div>

                    <Button onClick={() => setIsEditingProfile(true)}>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="position">Position</Label>
                        <Input
                          id="position"
                          value={profileData.position}
                          onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                          id="specialization"
                          value={profileData.specialization}
                          onChange={(e) => setProfileData({...profileData, specialization: e.target.value})}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          rows={4}
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditingProfile(false)}>
                        Cancel
                      </Button>
                      <Button onClick={() => {
                        setIsEditingProfile(false);
                        toast({
                          title: 'Profile Updated',
                          description: 'Your profile has been successfully updated.',
                        });
                      }}>
                        Save Changes
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Delete Account */}
            <Card className="border-2 border-red-200 dark:border-red-800 shadow-lg bg-white dark:bg-gray-950/50">
              <CardHeader>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/50 rounded-lg">
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg font-bold text-red-800 dark:text-red-200">
                      Delete Recruiter Account Permanently
                    </CardTitle>
                    <CardDescription className="text-red-600 dark:text-red-400 mt-1">
                      This action is <span className="font-semibold">irreversible</span> and will completely remove your recruiter account and all associated data from our systems.
                    </CardDescription>
                  </div>
                  <AlertTriangle className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-red-800 dark:text-red-300 uppercase tracking-wide">What will be deleted:</p>
                  <div className="grid grid-cols-1 gap-1 text-sm text-red-700 dark:text-red-300">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Recruiter profile and personal information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>All job postings and recruitment campaigns</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Candidate applications and interview records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Recruitment analytics and performance reports</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Communication history with candidates</span>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-red-200 dark:border-red-700">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="destructive" 
                        className="w-full bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 shadow-lg hover:shadow-xl transition-all duration-200 font-semibold"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete My Recruiter Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md border-red-200 dark:border-red-800 bg-white dark:bg-gray-950">
                        <AlertDialogHeader className="text-center pb-4">
                          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-100 dark:ring-red-800/50">
                            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                          </div>
                          <AlertDialogTitle className="text-xl font-bold text-red-800 dark:text-red-200">
                            Delete Recruiter Account Forever?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-center space-y-3">
                            <p className="text-red-700 dark:text-red-300 font-medium">
                              This action is <span className="font-bold text-red-800 dark:text-red-200">permanent and irreversible</span>.
                            </p>
                            
                            <div className="bg-red-50 dark:bg-red-950/50 p-4 rounded-lg border border-red-200 dark:border-red-800">
                              <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">All of this will be permanently deleted:</p>
                              <div className="text-xs text-red-700 dark:text-red-300 space-y-1 text-left">
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>Your complete recruiter profile ({profileData.name})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>12 active job postings and recruitment data</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>387 candidate applications and interviews</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>All recruitment analytics and reports</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>Communication history and feedback</span>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-red-600 dark:text-red-400 text-sm font-medium">
                              We won't be able to recover your data once deleted.
                            </p>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex gap-3 pt-4">
                          <AlertDialogCancel className="flex-1 font-medium border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                            Keep My Account
                          </AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={handleDeleteAccount}
                            className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 font-semibold shadow-lg ring-2 ring-red-500/20 dark:ring-red-400/30"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Forever
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RecruiterDashboard;