import { useState } from 'react';
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
  Share2
} from "lucide-react";

const RecruiterDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showJobForm, setShowJobForm] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+91 98765 43210',
    company: 'TechCorp Solutions',
    position: 'Senior Talent Acquisition Manager',
    experience: '7 years',
    location: 'Bangalore, India',
    specialization: 'Software Engineering, Data Science, Product Management',
    bio: 'Experienced talent acquisition professional with expertise in identifying and recruiting top-tier technical talent for fast-growing technology companies.',
    companySize: '500-1000 employees',
    industry: 'Technology Services'
  });

  // Enhanced Statistics
  const stats = [
    { title: "Active Opportunities", value: "12", icon: Briefcase, color: "text-blue-600", change: "+3 this week" },
    { title: "Total Applications", value: "387", icon: Users, color: "text-green-600", change: "+45 today" },
    { title: "Interviews Scheduled", value: "28", icon: Calendar, color: "text-purple-600", change: "15 this week" },
    { title: "Successful Hires", value: "23", icon: TrendingUp, color: "text-orange-600", change: "+5 this month" },
  ];

  // Comprehensive Job Opportunities Data
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

  // Comprehensive Candidate Data
  const candidateApplications = [
    {
      id: 1,
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      position: 'Senior Software Engineer',
      experience: '4 years',
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
      status: 'Interview Scheduled',
      appliedDate: '2024-01-15',
      resume: 'rahul_kumar_resume.pdf',
      rating: 4.5,
      stage: 'Technical Interview',
      expectedSalary: '20 LPA',
      location: 'Bangalore',
      university: 'IIT Delhi',
      graduation: '2020'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.sharma@email.com',
      position: 'Data Science Intern',
      experience: '1 year',
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
      status: 'Under Review',
      appliedDate: '2024-01-12',
      resume: 'priya_sharma_resume.pdf',
      rating: 4.2,
      stage: 'Resume Review',
      expectedSalary: '30k/month',
      location: 'Mumbai',
      university: 'NIT Trichy',
      graduation: '2023'
    },
    {
      id: 3,
      name: 'Amit Singh',
      email: 'amit.singh@email.com',
      position: 'DevOps Engineer',
      experience: '3 years',
      skills: ['Kubernetes', 'Jenkins', 'Terraform', 'AWS'],
      status: 'Shortlisted',
      appliedDate: '2024-01-18',
      resume: 'amit_singh_resume.pdf',
      rating: 4.7,
      stage: 'HR Round',
      expectedSalary: '16 LPA',
      location: 'Hyderabad',
      university: 'BITS Pilani',
      graduation: '2021'
    }
  ];

  const interviewSchedule = [
    {
      id: 1,
      candidateName: 'Rahul Kumar',
      position: 'Senior Software Engineer',
      type: 'Technical Interview',
      date: '2024-01-25',
      time: '10:00 AM',
      interviewer: 'Tech Lead',
      mode: 'Video Call',
      duration: '60 mins'
    },
    {
      id: 2,
      candidateName: 'Amit Singh',
      position: 'DevOps Engineer',
      type: 'HR Round',
      date: '2024-01-26',
      time: '2:00 PM',
      interviewer: 'HR Manager',
      mode: 'In-Person',
      duration: '45 mins'
    }
  ];

  const recruitmentAnalytics = {
    conversionRates: {
      applicationToInterview: 15,
      interviewToOffer: 45,
      offerToHire: 78
    },
    sourceAnalytics: [
      { source: 'Campus Recruitment', applications: 156, hires: 12 },
      { source: 'Job Portals', applications: 89, hires: 7 },
      { source: 'Employee Referrals', applications: 67, hires: 8 },
      { source: 'Social Media', applications: 45, hires: 3 }
    ],
    timeToHire: 23, // days
    costPerHire: 45000 // INR
  };

  // Handler Functions
  const handleSignOut = () => {
    logout();
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const handleCandidateAction = (candidateId: number, action: string) => {
    toast({
      title: `Candidate ${action}`,
      description: `Action performed successfully on candidate.`,
    });
  };

  const handleBulkAction = (action: string) => {
    toast({
      title: `Bulk ${action}`,
      description: `${action} applied to ${selectedCandidates.length} candidates.`,
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
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-slate-100 dark:bg-slate-700`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
                <Card key={index} className="bg-gradient-card border-0 shadow-card hover:shadow-card-hover transition-all">
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
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Applications */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Recent Applications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {candidateApplications.slice(0, 3).map((candidate) => (
                    <div key={candidate.id} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">{candidate.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{candidate.position}</p>
                        <Badge variant="outline" className="text-xs mt-1">{candidate.status}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
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
                <CardContent className="space-y-4">
                  {myOpportunities.filter(job => job.status === 'Active').slice(0, 3).map((job) => (
                    <div key={job.id} className="p-3 rounded-lg border">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                        <Badge className={job.statusColor}>{job.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{job.applications} applications</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                        <Clock className="w-3 h-3 ml-2" />
                        Due: {job.deadline}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-orange-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" onClick={() => setShowJobForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('candidates')}>
                    <Users className="w-4 h-4 mr-2" />
                    Review Applications
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('interviews')}>
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Interview
                  </Button>
                  <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('analytics')}>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Hiring Funnel Overview */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Hiring Funnel Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">387</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Applications</div>
                    <Progress value={100} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">58</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Shortlisted</div>
                    <Progress value={15} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">26</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Interviewed</div>
                    <Progress value={45} className="mt-2" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">Hired</div>
                    <Progress value={46} className="mt-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
    </TabsContent>

    {/* Candidates Tab */}
    <TabsContent value="candidates" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Candidate Applications</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleBulkAction('Shortlist')}>
            <UserCheck className="w-4 h-4 mr-2" />
            Bulk Shortlist
          </Button>
          <Button variant="outline" onClick={() => handleBulkAction('Reject')}>
            <X className="w-4 h-4 mr-2" />
            Bulk Reject
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {candidateApplications.map((candidate) => (
          <Card key={candidate.id} className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {candidate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{candidate.name}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{candidate.position}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                      <span>{candidate.experience} experience</span>
                      <span>{candidate.university}</span>
                      <span>Applied: {candidate.appliedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{candidate.stage}</Badge>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm">{candidate.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {candidate.skills.slice(0, 3).map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.skills.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{candidate.skills.length - 3} more
                    </Badge>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleCandidateAction(candidate.id, 'Interview')}>
                    <Calendar className="w-4 h-4 mr-1" />
                    Interview
                  </Button>
                  <Button size="sm" onClick={() => handleCandidateAction(candidate.id, 'Shortlist')}>
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Shortlist
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleCandidateAction(candidate.id, 'Reject')}>
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>

    {/* Job Postings Tab */}
    <TabsContent value="jobs" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Job Postings</h2>
        <Button onClick={() => setShowJobForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Post New Job
        </Button>
      </div>

      <div className="grid gap-4">
        {myOpportunities.map((job) => (
          <Card key={job.id} className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{job.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{job.type} • {job.location}</p>
                  <p className="text-sm text-slate-500 mt-1">
                    Posted on {job.postedDate} • {job.experience} • {job.salary}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={job.statusColor}>{job.status}</Badge>
                  <Badge variant="outline" className={`${job.priority === 'High' ? 'border-red-200 text-red-700' : job.priority === 'Medium' ? 'border-yellow-200 text-yellow-700' : 'border-gray-200 text-gray-700'}`}>
                    {job.priority}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{job.applications}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Applications</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{job.shortlisted}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Shortlisted</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{job.interviewed}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Interviewed</div>
                </div>
                <div className="text-center p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="text-lg font-bold text-slate-900 dark:text-white">{job.deadline}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Deadline</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {job.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>

    {/* Interviews Tab */}
    <TabsContent value="interviews" className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Interview Schedule</h2>
        <Button onClick={handleScheduleInterview}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Interview
        </Button>
      </div>

      <div className="grid gap-4">
        {interviewSchedule.map((interview) => (
          <Card key={interview.id} className="border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center text-center">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">{interview.date.split('-')[2]}</span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">Jan</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{interview.type}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{interview.candidateName} • {interview.position}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-slate-500">{interview.time}</span>
                      <span className="text-sm text-slate-500">{interview.duration}</span>
                      <Badge variant="outline">{interview.mode}</Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm">
                    <Video className="w-4 h-4 mr-1" />
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>

    {/* Analytics Tab */}
    <TabsContent value="analytics" className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Recruitment Analytics</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Time to Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">{recruitmentAnalytics.timeToHire} days</span>
                <Badge variant="default" className="text-green-600 bg-green-100">-3 days</Badge>
              </div>
              <Progress value={70} className="h-2" />
              <p className="text-xs text-slate-500">Better than industry average</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Cost per Hire</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{recruitmentAnalytics.costPerHire.toLocaleString()}</span>
                <Badge variant="default" className="text-green-600 bg-green-100">-12%</Badge>
              </div>
              <Progress value={65} className="h-2" />
              <p className="text-xs text-slate-500">Cost optimization successful</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Application to Hire Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">3.2%</span>
                <Badge variant="default" className="text-green-600 bg-green-100">+0.8%</Badge>
              </div>
              <Progress value={85} className="h-2" />
              <p className="text-xs text-slate-500">Excellent conversion rate</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Source Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recruitmentAnalytics.sourceAnalytics.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-900 dark:text-white">{source.source}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {source.applications} applications • {source.hires} hires
                  </span>
                </div>
                <Progress value={(source.hires / source.applications) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TabsContent>

    {/* Profile Tab */}
    <TabsContent value="profile" className="space-y-6">
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

      {/* Account Actions */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions for your account</CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                  Yes, delete my account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
      </div>
    </div>
  );
};

export default RecruiterDashboard;