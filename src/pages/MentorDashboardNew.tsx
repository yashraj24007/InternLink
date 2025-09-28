import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeProvider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { 
  User, 
  Briefcase, 
  Clock, 
  CheckCircle, 
  Star, 
  BookOpen, 
  Target,
  Calendar,
  TrendingUp,
  Search,
  MessageSquare,
  Settings,
  FileText,
  Eye,
  Download,
  ArrowRight,
  Bell,
  Award,
  MapPin,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Filter,
  ExternalLink,
  Phone,
  Mail,
  Globe,
  Shield,
  Moon,
  Sun,
  Palette,
  Lock,
  UserCircle,
  GraduationCap,
  Building,
  LogOut,
  ChevronDown,
  Camera,
  Upload,
  X,
  AlertTriangle,
  ShieldAlert,
  FileEdit,
  Mic,
  Video,
  Brain,
  Users,
  Network,
  BarChart3,
  Lightbulb,
  Headphones,
  Heart,
  Zap,
  Trophy,
  PlayCircle,
  BookmarkPlus,
  MessageCircle,
  Timer,
  Gauge,
  GitBranch,
  LinkedinIcon,
  Github,
  ExternalLinkIcon,
  CalendarCheck,
  UserCheck,
  Smile,
  Activity,
  Code,
  ThumbsUp,
  ThumbsDown,
  ClipboardCheck,
  PresentationIcon,
  Handshake,
  UserPlus,
  TrendingDown,
  Home,
  Bookmark,
  CalendarDays,
  CalendarX,
  CheckSquare,
  Copy,
  Database,
  FileSpreadsheet,
  Folder,
  History,
  Info,
  Newspaper,
  PieChart,
  RefreshCw,
  Save,
  School,
  Send,
  Sparkles,
  Tag,
  Workflow
} from 'lucide-react';

const MentorDashboard = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [bulkActionMode, setBulkActionMode] = useState(false);
  const [feedbackTemplate, setFeedbackTemplate] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [bulkOperations, setBulkOperations] = useState({ approvedCount: 0, rejectedCount: 0 });
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@company.com',
    phone: '+91 98765 43210',
    company: 'TechCorp Solutions',
    position: 'Senior Software Engineer',
    experience: '8 years',
    specialization: 'Full-Stack Development, AI/ML',
    bio: 'Experienced software engineer passionate about guiding the next generation of developers. Specialized in full-stack development and machine learning.',
    availability: 'Available for mentoring'
  });

  // Handler functions
  const handleAccountSettings = () => {
    setActiveTab('settings');
    toast({
      title: "Navigating to Settings",
      description: "Opening account settings panel.",
    });
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
    toast({
      title: "Signed Out",
      description: "You have been successfully signed out.",
    });
  };

  const handleDeleteAccount = () => {
    // In a real application, this would make an API call to delete the account
    toast({
      title: "Account Deletion Initiated",
      description: "Your mentor account deletion request has been processed. You will receive a confirmation email shortly.",
      variant: "destructive",
    });
    
    // Simulate redirect to login or home page after account deletion
    setTimeout(() => {
      logout();
      navigate('/');
      console.log("Mentor account deleted - redirected to homepage");
    }, 2000);
  };

  // Enhanced mentor stats with comprehensive metrics
  const mentorStats = [
    { 
      title: 'Total Mentees', 
      value: '32', 
      change: '+3 this month',
      changeType: 'positive',
      icon: Users,
      color: 'text-blue-600',
      details: { placed: 18, inProgress: 8, unplaced: 6 }
    },
    { 
      title: 'Pending Approvals', 
      value: '12', 
      change: '3 urgent (>48h)',
      changeType: 'warning',
      icon: Clock,
      color: 'text-orange-600',
      action: 'Review Now'
    },
    { 
      title: 'This Month Placements', 
      value: '7', 
      change: '87% success rate',
      changeType: 'positive',
      icon: Trophy,
      color: 'text-green-600',
      details: { avgStipend: '₹18,500' }
    },
    { 
      title: 'Feedback Pending', 
      value: '5', 
      change: '2 certificates due',
      changeType: 'neutral',
      icon: FileText,
      color: 'text-purple-600',
      action: 'Submit Feedback'
    }
  ];

  // Comprehensive student data with placement tracking
  const assignedStudents = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@college.edu',
      phone: '+91 9876543210',
      cgpa: '8.5',
      year: 'Final Year',
      department: 'Computer Science',
      status: 'Placed',
      placementDetails: {
        company: 'Google',
        position: 'SDE Intern',
        stipend: '₹75,000',
        duration: '6 months',
        startDate: '2024-06-01'
      },
      lastContact: '2 days ago',
      applications: 8,
      interviews: 4,
      pendingApprovals: 0,
      skills: ['Java', 'Python', 'React', 'SQL'],
      skillGaps: ['System Design', 'AWS'],
      profileCompletion: 95,
      mentorNotes: 'Excellent technical skills, needs soft skills development',
      certificates: ['Java Certification'],
      recentActivity: [
        { type: 'placed', company: 'Google', date: '2024-01-15' },
        { type: 'interview', company: 'Microsoft', date: '2024-01-10' }
      ]
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@college.edu',
      phone: '+91 9876543211',
      cgpa: '7.8',
      year: 'Pre-Final Year',
      department: 'Computer Science',
      status: 'In Progress',
      lastContact: '1 day ago',
      applications: 6,
      interviews: 2,
      pendingApprovals: 3,
      skills: ['JavaScript', 'Node.js', 'MongoDB'],
      skillGaps: ['React', 'TypeScript', 'Testing'],
      profileCompletion: 78,
      mentorNotes: 'Strong backend skills, needs frontend improvement',
      certificates: [],
      recentActivity: [
        { type: 'applied', company: 'Flipkart', date: '2024-01-18' },
        { type: 'shortlisted', company: 'Zomato', date: '2024-01-12' }
      ]
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@college.edu',
      phone: '+91 9876543212',
      cgpa: '9.2',
      year: 'Final Year',
      department: 'Data Science',
      status: 'Unplaced',
      lastContact: '5 days ago',
      applications: 12,
      interviews: 6,
      pendingApprovals: 2,
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau'],
      skillGaps: ['Deep Learning', 'MLOps'],
      profileCompletion: 88,
      mentorNotes: 'Brilliant analytical skills, needs interview confidence',
      certificates: ['Data Science Specialization'],
      recentActivity: [
        { type: 'rejected', company: 'Netflix', date: '2024-01-16' },
        { type: 'applied', company: 'Amazon', date: '2024-01-14' }
      ]
    },
    {
      id: 4,
      name: 'Priya Patel',
      email: 'priya.p@college.edu',
      phone: '+91 9876543213',
      cgpa: '8.1',
      year: 'Final Year',
      department: 'Information Technology',
      status: 'In Progress',
      lastContact: '3 days ago',
      applications: 4,
      interviews: 1,
      pendingApprovals: 4,
      skills: ['PHP', 'Laravel', 'MySQL', 'HTML/CSS'],
      skillGaps: ['Modern JS Frameworks', 'Cloud Platforms'],
      profileCompletion: 65,
      mentorNotes: 'Traditional web development background, needs modern stack training',
      certificates: [],
      recentActivity: [
        { type: 'applied', company: 'Infosys', date: '2024-01-17' },
        { type: 'applied', company: 'TCS', date: '2024-01-15' }
      ]
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      student: 'John Doe',
      company: 'Google',
      position: 'Software Engineer Intern',
      appliedDate: '2024-01-15',
      priority: 'High',
      documents: ['Resume', 'Cover Letter', 'Transcript'],
      status: 'Pending Review'
    },
    {
      id: 2,
      student: 'Sarah Johnson',
      company: 'Microsoft',
      position: 'Product Manager Intern',
      appliedDate: '2024-01-14',
      priority: 'Medium',
      documents: ['Resume', 'Portfolio'],
      status: 'Documents Missing'
    }
  ];

  const upcomingMeetings = [
    {
      id: 1,
      student: 'John Doe',
      type: 'Career Guidance',
      date: '2024-01-20',
      time: '10:00 AM',
      duration: '30 mins',
      mode: 'Video Call'
    },
    {
      id: 2,
      student: 'Sarah Johnson',
      type: 'Resume Review',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '45 mins',
      mode: 'In-Person'
    },
    {
      id: 3,
      student: 'Michael Chen',
      type: 'Interview Prep',
      date: '2024-01-21',
      time: '11:00 AM',
      duration: '60 mins',
      mode: 'Video Call'
    }
  ];

  // Additional Comprehensive Data
  const mockAISuggestions = [
    {
      type: 'skill_gap',
      student: 'Rahul Sharma',
      suggestion: 'Consider additional training in React Native for mobile development roles',
      confidence: '92%'
    },
    {
      type: 'opportunity',
      student: 'Priya Patel',
      suggestion: 'Highly suitable for upcoming ML Engineer positions at tech startups',
      confidence: '87%'
    },
    {
      type: 'improvement',
      student: 'Amit Singh',
      suggestion: 'Recommend AWS certification to strengthen cloud engineering profile',
      confidence: '94%'
    }
  ];

  const analyticsData = {
    placementRate: 78,
    averageCTC: '8.5 LPA',
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Accenture'],
    departmentWise: {
      'Computer Science': 85,
      'Information Technology': 82,
      'Electronics': 75,
      'Mechanical': 68
    },
    monthlyTrends: [
      { month: 'Oct', placements: 45, applications: 120 },
      { month: 'Nov', placements: 52, applications: 135 },
      { month: 'Dec', placements: 38, applications: 98 },
      { month: 'Jan', placements: 61, applications: 156 }
    ]
  };

  const feedbackTemplates = [
    {
      id: 1,
      name: 'Interview Performance Review',
      category: 'Interview',
      template: 'Technical skills: [Score], Communication: [Score], Problem-solving: [Score]'
    },
    {
      id: 2,
      name: 'Resume Improvement Suggestions',
      category: 'Resume',
      template: 'Strengths: [List], Areas for improvement: [List], Recommendations: [List]'
    },
    {
      id: 3,
      name: 'Skill Assessment Report',
      category: 'Skills',
      template: 'Current skills: [List], Skill gaps: [List], Learning path: [Suggestions]'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'TCS Campus Drive',
      date: '2024-01-25',
      time: '10:00 AM',
      type: 'Campus Drive',
      studentsRegistered: 45
    },
    {
      id: 2,
      title: 'Resume Review Session',
      date: '2024-01-22',
      time: '2:00 PM',
      type: 'Workshop',
      studentsRegistered: 28
    },
    {
      id: 3,
      title: 'Mock Interview - Google',
      date: '2024-01-24',
      time: '11:00 AM',
      type: 'Mock Interview',
      studentsRegistered: 12
    }
  ];

  // Enhanced Handler Functions
  const handleApproval = (id: number, action: 'approve' | 'reject') => {
    toast({
      title: action === 'approve' ? 'Application Approved' : 'Application Rejected',
      description: `The application has been ${action}d successfully.`,
    });
  };

  const handleScheduleMeeting = (studentId: number) => {
    toast({
      title: 'Meeting Scheduled',
      description: 'Meeting invitation sent to student.',
    });
  };

  const handleBulkApprove = () => {
    setBulkOperations({ approvedCount: 5, rejectedCount: 0 });
    toast({
      title: 'Success',
      description: 'Applications approved successfully',
    });
  };

  const handleBulkReject = () => {
    setBulkOperations({ approvedCount: 0, rejectedCount: 3 });
    toast({
      title: 'Applications Rejected',
      description: 'Selected applications have been rejected',
      variant: 'destructive',
    });
  };

  const generateAISuggestions = () => {
    setShowAISuggestions(true);
    setAiSuggestions(mockAISuggestions);
    toast({
      title: 'AI Suggestions Generated',
      description: 'Smart recommendations are now available',
    });
  };

  const exportAnalytics = () => {
    toast({
      title: 'Export Complete',
      description: 'Analytics report exported successfully',
    });
  };

  const scheduleEvent = () => {
    toast({
      title: 'Event Scheduled',
      description: 'Event scheduled successfully',
    });
  };

  const sendBulkNotification = () => {
    toast({
      title: 'Notifications Sent',
      description: 'Notifications sent to all students',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 pt-12">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, {profileData.name}</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Guide and support your assigned students</p>
          </div>
          
          {/* Settings Dropdown */}
          <div className="flex items-center gap-4">
            {/* Homepage Button */}
            <Button asChild variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-700">
              <Link to="/">
                <Home className="w-5 h-5" />
              </Link>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">New application pending</p>
                    <p className="text-sm text-slate-600">John Doe applied to Google</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Meeting reminder</p>
                    <p className="text-sm text-slate-600">Career guidance session in 1 hour</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="font-medium">Student needs attention</p>
                    <p className="text-sm text-slate-600">Sarah Johnson hasn't applied anywhere</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/" className="flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Go to Homepage
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                  {theme === 'dark' ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleAccountSettings} className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mentorStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className={`text-xs mt-1 ${
                      stat.changeType === 'positive' ? 'text-green-600' : 
                      stat.changeType === 'warning' ? 'text-orange-600' : 'text-slate-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-700 ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="approvals">Approvals</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="guidance">Guidance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: 'Approved application', student: 'John Doe', company: 'Google', time: '2 hours ago', type: 'approval' },
                    { action: 'Scheduled meeting', student: 'Sarah Johnson', subject: 'Resume Review', time: '4 hours ago', type: 'meeting' },
                    { action: 'Provided feedback', student: 'Michael Chen', item: 'Interview preparation', time: '1 day ago', type: 'feedback' },
                    { action: 'Updated profile', item: 'Availability status', time: '2 days ago', type: 'profile' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'approval' ? 'bg-green-100 dark:bg-green-900 text-green-600' :
                        activity.type === 'meeting' ? 'bg-blue-100 dark:bg-blue-900 text-blue-600' :
                        activity.type === 'feedback' ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' :
                        'bg-orange-100 dark:bg-orange-900 text-orange-600'
                      }`}>
                        {activity.type === 'approval' && <CheckCircle className="w-4 h-4" />}
                        {activity.type === 'meeting' && <Calendar className="w-4 h-4" />}
                        {activity.type === 'feedback' && <MessageSquare className="w-4 h-4" />}
                        {activity.type === 'profile' && <User className="w-4 h-4" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900 dark:text-white">
                          {activity.action} {activity.student && `for ${activity.student}`}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {activity.company && `at ${activity.company}`}
                          {activity.item && activity.item}
                          {activity.type && ` • ${activity.time}`}
                        </p>
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
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link to="/">
                      <Globe className="w-4 h-4 mr-2" />
                      Go to Homepage
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    View All Students
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <ClipboardCheck className="w-4 h-4 mr-2" />
                    Review Pending Applications
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule New Meeting
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Create Guidance Document
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Meetings */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-green-600" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingMeetings.slice(0, 3).map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{meeting.time}</span>
                          <span className="text-xs text-slate-500">{meeting.duration}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{meeting.type}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">with {meeting.student}</p>
                          <Badge variant="outline" className="text-xs">
                            {meeting.mode}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <Video className="w-4 h-4 mr-1" />
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Management Tab */}
          <TabsContent value="students" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assigned Students</h2>
              <div className="flex items-center gap-2">
                <Input placeholder="Search students..." className="w-64" />
                <Button variant="outline" size="icon">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {assignedStudents.map((student) => (
                <Card key={student.id} className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{student.name}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{student.email}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-slate-500">CGPA: {student.cgpa}</span>
                            <span className="text-xs text-slate-500">{student.year}</span>
                            <span className="text-xs text-slate-500">{student.department}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant={student.status === 'Active' ? 'default' : student.status === 'Placed' ? 'secondary' : 'destructive'}>
                              {student.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-slate-500">Last contact: {student.lastContact}</p>
                          <p className="text-xs text-slate-500">{student.applications} applications • {student.interviews} interviews</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <ChevronDown className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleScheduleMeeting(student.id)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Schedule Meeting
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="w-4 h-4 mr-2" />
                              View Applications
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Feedback Submission Section */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-orange-600" />
                  Submit Student Feedback
                </CardTitle>
                <CardDescription>
                  Provide feedback on student performance and internship applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="student-select">Select Student</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a student" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignedStudents.map((student) => (
                          <SelectItem key={student.id} value={student.id.toString()}>
                            {student.name} - {student.department}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="feedback-type">Feedback Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select feedback type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="internship">Internship Performance</SelectItem>
                        <SelectItem value="application">Application Review</SelectItem>
                        <SelectItem value="interview">Interview Preparation</SelectItem>
                        <SelectItem value="skills">Skills Assessment</SelectItem>
                        <SelectItem value="career">Career Guidance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="rating">Overall Rating</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Rate performance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">⭐⭐⭐⭐⭐ Excellent</SelectItem>
                        <SelectItem value="4">⭐⭐⭐⭐ Good</SelectItem>
                        <SelectItem value="3">⭐⭐⭐ Average</SelectItem>
                        <SelectItem value="2">⭐⭐ Needs Improvement</SelectItem>
                        <SelectItem value="1">⭐ Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input 
                      id="company" 
                      placeholder="Enter company name (if applicable)" 
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="feedback-text">Detailed Feedback</Label>
                  <Textarea
                    id="feedback-text"
                    placeholder="Provide detailed feedback on student's performance, strengths, areas for improvement, and recommendations..."
                    rows={6}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="strengths">Key Strengths</Label>
                    <Input 
                      id="strengths" 
                      placeholder="Communication, Technical skills, etc." 
                    />
                  </div>
                  <div>
                    <Label htmlFor="improvements">Areas for Improvement</Label>
                    <Input 
                      id="improvements" 
                      placeholder="Time management, Presentation skills, etc." 
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="auto-update" className="rounded" />
                  <Label htmlFor="auto-update" className="text-sm">
                    Auto-update student profile with this feedback
                  </Label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => {
                      toast({
                        title: "Feedback Submitted",
                        description: "Student feedback has been recorded and will be auto-updated to their profile.",
                      });
                    }}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approvals Tab */}
          <TabsContent value="approvals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Pending Approvals</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleBulkApprove}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Bulk Approve
                  </Button>
                  <Button variant="outline" onClick={handleBulkReject}>
                    <X className="w-4 h-4 mr-2" />
                    Bulk Reject
                  </Button>
                  <Button variant="outline" onClick={generateAISuggestions}>
                    <Brain className="w-4 h-4 mr-2" />
                    AI Suggestions
                  </Button>
                </div>
                <Badge variant="destructive" className="text-sm">
                  {pendingApprovals.length} pending
                </Badge>
              </div>
            </div>

            {/* Bulk Operations Summary */}
            {(bulkOperations.approvedCount > 0 || bulkOperations.rejectedCount > 0) && (
              <Card className="border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium">Approved: {bulkOperations.approvedCount}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="w-5 h-5 text-red-600" />
                      <span className="text-sm font-medium">Rejected: {bulkOperations.rejectedCount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* AI Suggestions Panel */}
            {showAISuggestions && (
              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    AI Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockAISuggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {suggestion.type.replace('_', ' ').toUpperCase()}
                            </Badge>
                            <span className="text-sm font-medium">{suggestion.student}</span>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            {suggestion.suggestion}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">Confidence:</span>
                            <Badge variant="secondary" className="text-xs">{suggestion.confidence}</Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {pendingApprovals.map((approval) => (
                <Card key={approval.id} className="border-none shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{approval.student}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Applied to {approval.company} for {approval.position}</p>
                        <p className="text-xs text-slate-500 mt-1">Applied on: {approval.appliedDate}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={approval.priority === 'High' ? 'destructive' : 'secondary'}>
                          {approval.priority} Priority
                        </Badge>
                        <Badge variant="outline">
                          {approval.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Documents:</p>
                        <div className="flex gap-2">
                          {approval.documents.map((doc, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Review
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleApproval(approval.id, 'reject')}
                        >
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleApproval(approval.id, 'approve')}
                        >
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings Tab - Similar to Student Dashboard */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your mentor account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Theme</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Choose your preferred theme</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Palette className="w-4 h-4 mr-2" />
                        {theme === 'dark' ? 'Dark' : 'Light'}
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => setTheme('light')}>
                        <Sun className="w-4 h-4 mr-2" />
                        Light Mode
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setTheme('dark')}>
                        <Moon className="w-4 h-4 mr-2" />
                        Dark Mode
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Email Notifications</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Receive email updates for important activities</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">Meeting Reminders</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Get notified before scheduled meetings</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white">New Application Alerts</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Instant notifications for pending approvals</p>
                  </div>
                  <Switch defaultChecked />
                </div>
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
                      Delete Mentor Account Permanently
                    </CardTitle>
                    <CardDescription className="text-red-600 dark:text-red-400 mt-1">
                      This action is <span className="font-semibold">irreversible</span> and will completely remove your mentor account and all associated data from our systems.
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
                      <span>Mentor profile and personal information</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>All student assignments and mentoring history</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Meeting schedules and guidance records</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Application approvals and feedback</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                      <span>Performance analytics and reports</span>
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
                        Delete My Mentor Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="max-w-md border-red-200 dark:border-red-800 bg-white dark:bg-gray-950">
                        <AlertDialogHeader className="text-center pb-4">
                          <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-100 dark:ring-red-800/50">
                            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                          </div>
                          <AlertDialogTitle className="text-xl font-bold text-red-800 dark:text-red-200">
                            Delete Mentor Account Forever?
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
                                  <span>Your complete mentor profile ({profileData.name})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>24 assigned students and mentoring records</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>All meeting schedules and guidance history</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>Application approvals and feedback records</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                  <span>Performance analytics and achievements</span>
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

          {/* Meetings Tab */}
          <TabsContent value="meetings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Meeting Schedule</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={scheduleEvent}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Sync Calendar
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule New Meeting
                </Button>
              </div>
            </div>

            {/* Upcoming Campus Events */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-blue-600" />
                  Upcoming Campus Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center text-center">
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{event.date.split('-')[2]}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Jan</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{event.title}</h3>
                          <p className="text-slate-600 dark:text-slate-400">{event.time} • {event.type}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Users className="w-4 h-4 text-slate-500" />
                            <span className="text-sm text-slate-500">{event.studentsRegistered} students registered</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* One-on-One Meetings */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-600" />
                  One-on-One Meetings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {upcomingMeetings.map((meeting) => (
                    <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center text-center">
                          <span className="text-lg font-bold text-slate-900 dark:text-white">{meeting.date.split('-')[2]}</span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">Jan</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{meeting.type}</h3>
                          <p className="text-slate-600 dark:text-slate-400">with {meeting.student}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-slate-500">{meeting.time}</span>
                            <span className="text-sm text-slate-500">{meeting.duration}</span>
                            <Badge variant="outline">{meeting.mode}</Badge>
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
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Feedback Templates */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Feedback Templates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {feedbackTemplates.map((template) => (
                    <div key={template.id} className="p-4 rounded-lg border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{template.name}</h3>
                          <Badge variant="outline" className="text-xs mt-1">{template.category}</Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                        {template.template}
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Use Template
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Guidance Tab */}
          <TabsContent value="guidance" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Guidance Resources</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Resource
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Templates & Guides
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Resume Template',
                    'Cover Letter Guide',
                    'Interview Preparation Checklist',
                    'Career Path Planning',
                    'Skill Assessment Framework'
                  ].map((template, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium text-slate-900 dark:text-white">{template}</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-orange-600" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    'Effective Mentoring Techniques',
                    'Student Motivation Strategies',
                    'Industry Trends & Insights',
                    'Feedback & Evaluation Methods',
                    'Professional Development'
                  ].map((practice, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium text-slate-900 dark:text-white">{practice}</span>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Performance Analytics</h2>
              <Button variant="outline" onClick={exportAnalytics}>
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
            
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Overall Placement Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{analyticsData.placementRate}%</span>
                      <Badge variant="default" className="text-green-600 bg-green-100">+5%</Badge>
                    </div>
                    <Progress value={analyticsData.placementRate} className="h-2" />
                    <p className="text-xs text-slate-500">vs. last quarter</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Average CTC</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">{analyticsData.averageCTC}</span>
                      <Badge variant="default" className="text-green-600 bg-green-100">+1.2L</Badge>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-slate-500">Above industry average</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Student Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">4.8/5</span>
                      <Badge variant="default" className="text-green-600 bg-green-100">+0.2</Badge>
                    </div>
                    <Progress value={96} className="h-2" />
                    <p className="text-xs text-slate-500">Based on 45 reviews</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-slate-900 dark:text-white">2.3h</span>
                      <Badge variant="default" className="text-green-600 bg-green-100">-0.5h</Badge>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-slate-500">Faster than average</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Department-wise Performance */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  Department-wise Placement Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(analyticsData.departmentWise).map(([department, rate]) => (
                    <div key={department} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{department}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">{rate}%</span>
                      </div>
                      <Progress value={rate} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Trends */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Monthly Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.monthlyTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">{trend.month} 2024</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {trend.placements} placements from {trend.applications} applications
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-slate-900 dark:text-white">
                          {Math.round((trend.placements / trend.applications) * 100)}%
                        </p>
                        <p className="text-xs text-slate-500">Success Rate</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Recruiters */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-orange-600" />
                  Top Recruiters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analyticsData.topRecruiters.map((recruiter, index) => (
                    <div key={index} className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-700">
                      <p className="font-medium text-slate-900 dark:text-white">{recruiter}</p>
                      <Badge variant="outline" className="mt-2">Top Recruiter</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Learning Resources</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Recommended Reading
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'The Mentor\'s Guide', author: 'Lois J. Zachary', category: 'Mentoring' },
                    { title: 'Industry Trends 2024', author: 'Tech Insights', category: 'Technology' },
                    { title: 'Career Development Strategies', author: 'Career Pro', category: 'Career' }
                  ].map((book, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{book.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{book.author}</p>
                        <Badge variant="outline" className="text-xs mt-1">{book.category}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-purple-600" />
                    Training Videos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: 'Effective Mentoring Techniques', duration: '25 min', views: '2.3k' },
                    { title: 'Student Motivation Strategies', duration: '18 min', views: '1.8k' },
                    { title: 'Career Guidance Best Practices', duration: '32 min', views: '3.1k' }
                  ].map((video, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900 dark:text-white">{video.title}</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400">{video.duration} • {video.views} views</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <PlayCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mentor Profile</h2>
              <Button onClick={() => setIsEditingProfile(!isEditingProfile)}>
                {isEditingProfile ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditingProfile ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                      {isEditingProfile ? (
                        <Input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white font-medium">{profileData.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                      {isEditingProfile ? (
                        <Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                      {isEditingProfile ? (
                        <Input value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
                      {isEditingProfile ? (
                        <Input value={profileData.company} onChange={(e) => setProfileData({...profileData, company: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.company}</p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Position</label>
                      {isEditingProfile ? (
                        <Input value={profileData.position} onChange={(e) => setProfileData({...profileData, position: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.position}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Experience</label>
                      {isEditingProfile ? (
                        <Input value={profileData.experience} onChange={(e) => setProfileData({...profileData, experience: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.experience}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Specialization</label>
                      {isEditingProfile ? (
                        <Input value={profileData.specialization} onChange={(e) => setProfileData({...profileData, specialization: e.target.value})} />
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.specialization}</p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Availability</label>
                      {isEditingProfile ? (
                        <Select value={profileData.availability} onValueChange={(value) => setProfileData({...profileData, availability: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Available for mentoring">Available for mentoring</SelectItem>
                            <SelectItem value="Busy - Limited availability">Busy - Limited availability</SelectItem>
                            <SelectItem value="Unavailable">Unavailable</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-slate-900 dark:text-white">{profileData.availability}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Bio</label>
                  {isEditingProfile ? (
                    <Textarea 
                      value={profileData.bio} 
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      rows={4}
                    />
                  ) : (
                    <p className="text-slate-900 dark:text-white mt-1">{profileData.bio}</p>
                  )}
                </div>
                {isEditingProfile && (
                  <div className="flex justify-end gap-2 mt-6">
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
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Mentor Community</h2>
              <Button onClick={sendBulkNotification}>
                <Send className="w-4 h-4 mr-2" />
                Send Notification
              </Button>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                    Discussion Forum
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { topic: 'Best practices for remote mentoring', replies: 12, author: 'Dr. Smith', time: '2h ago' },
                    { topic: 'Handling difficult students', replies: 8, author: 'Prof. Johnson', time: '5h ago' },
                    { topic: 'Industry updates and trends', replies: 15, author: 'Sarah Wilson', time: '1d ago' }
                  ].map((discussion, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h4 className="font-medium text-slate-900 dark:text-white">{discussion.topic}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-slate-600 dark:text-slate-400">by {discussion.author}</span>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <MessageSquare className="w-4 h-4" />
                          {discussion.replies} replies • {discussion.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Mentor Network
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: 'Dr. Emily Chen', specialization: 'Data Science', students: 18, rating: 4.9 },
                    { name: 'Prof. Michael Brown', specialization: 'Software Engineering', students: 22, rating: 4.8 },
                    { name: 'Sarah Williams', specialization: 'Product Management', students: 15, rating: 4.9 }
                  ].map((mentor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {mentor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">{mentor.name}</h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{mentor.specialization}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-slate-500">{mentor.students} students</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-slate-500">{mentor.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
        </Tabs>
      </div>
    </div>
  );
};

export default MentorDashboard;