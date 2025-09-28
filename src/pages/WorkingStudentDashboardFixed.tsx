import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeProvider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { generateStudentProfilePDF, generateResumePDF } from '@/utils/pdfUtils';
import { useAIFeatures } from '@/hooks/useAIFeatures';
import { AIResultsDisplay } from '@/components/AIResultsDisplay';
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
  Home
} from 'lucide-react';

const WorkingStudentDashboard = () => {
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@college.edu',
    phone: '+91 98765 43210',
    university: 'XYZ University',
    cgpa: '8.5',
    bio: 'Passionate computer science student with a keen interest in full-stack development and machine learning.',
    visibility: 'Public',
    showEmail: true
  });
  const [editFormData, setEditFormData] = useState({ ...profileData });
  const [appliedOpportunities, setAppliedOpportunities] = useState(new Set());
  const [preparingInterviews, setPreparingInterviews] = useState(new Set());
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [resumeScore, setResumeScore] = useState(78);
  const [skillGapAnalysis, setSkillGapAnalysis] = useState([]);
  const [mockInterviewsCompleted, setMockInterviewsCompleted] = useState(3);
  const [placementReadiness, setPlacementReadiness] = useState(85);
  
  // AI Features State
  const aiFeatures = useAIFeatures();
  const [aiResults, setAiResults] = useState<{
    matching?: string;
    interview?: string;
    resume?: string;
    career?: string;
  }>({});
  const [showAIResults, setShowAIResults] = useState(false);

  const handleSaveProfile = () => {
    // Basic validation
    if (!editFormData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required.",
        variant: "destructive",
      });
      return;
    }
    
    if (!editFormData.email.trim() || !editFormData.email.includes('@')) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (editFormData.cgpa && (parseFloat(editFormData.cgpa) < 0 || parseFloat(editFormData.cgpa) > 10)) {
      toast({
        title: "Validation Error",
        description: "CGPA must be between 0 and 10.",
        variant: "destructive",
      });
      return;
    }

    setProfileData({ ...editFormData });
    setIsEditingProfile(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setEditFormData({ ...profileData });
    setIsEditingProfile(false);
  };

  const handleApplyNow = (opportunityId, companyName, position) => {
    setAppliedOpportunities(prev => new Set([...prev, opportunityId]));
    toast({
      title: "Application Submitted!",
      description: `Your application for ${position} at ${companyName} has been submitted successfully.`,
    });
  };

  const handlePrepareInterview = (interviewId, position, company) => {
    setPreparingInterviews(prev => new Set([...prev, interviewId]));
    toast({
      title: "Interview Preparation Started",
      description: `Preparation materials for ${position} at ${company} have been unlocked. Check your resources tab.`,
    });
  };

  const handleRescheduleInterview = (interviewId, position, company) => {
    toast({
      title: "Reschedule Request Sent",
      description: `Your request to reschedule the ${position} interview at ${company} has been sent to HR. You'll receive confirmation within 24 hours.`,
    });
  };

  const handleDeleteAccount = () => {
    // In a real application, this would make an API call to delete the account
    toast({
      title: "Account Deletion Initiated",
      description: "Your account deletion request has been processed. You will receive a confirmation email shortly.",
      variant: "destructive",
    });
    
    // Simulate redirect to login or home page after account deletion
    setTimeout(() => {
      // In a real app: navigate('/login') or window.location.href = '/'
      console.log("Account deleted - would redirect to login page");
    }, 2000);
  };

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    toast({
      title: "Theme Changed",
      description: `Switched to ${newTheme} mode successfully`,
    });
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast({
      title: "Notifications Updated",
      description: `Notifications ${!notificationsEnabled ? 'enabled' : 'disabled'}`,
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    // In a real app: clear auth tokens and redirect
    setTimeout(() => {
      console.log("Would redirect to login page");
    }, 1500);
  };

  const handleDownloadProfile = () => {
    const studentData = {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      department: 'Computer Science',
      year: '3rd Year',
      cgpa: profileData.cgpa,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
      bio: profileData.bio
    };
    
    generateStudentProfilePDF(studentData);
    toast({
      title: "Profile Downloaded",
      description: "Your student profile has been downloaded as PDF",
    });
  };

  const handleDownloadResume = (templateType: string) => {
    const studentData = {
      name: profileData.name,
      email: profileData.email,
      phone: profileData.phone,
      department: 'Computer Science',
      degree: 'B.Tech Computer Science',
      college: profileData.university,
      year: '2021-2025',
      cgpa: profileData.cgpa,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB']
    };
    
    generateResumePDF(templateType, studentData);
    toast({
      title: "Resume Downloaded",
      description: `${templateType} resume template has been downloaded as PDF`,
    });
  };

  // AI-Powered Features
  const handleAIMatching = async () => {
    const studentProfile = {
      name: profileData.name,
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
      cgpa: profileData.cgpa,
      department: 'Computer Science',
      experience: 'Intermediate',
      interests: ['Web Development', 'Machine Learning', 'Data Science']
    };

    const opportunities = [
      {
        title: 'Frontend Developer Intern',
        company: 'TechCorp',
        requirements: ['React', 'JavaScript', 'CSS']
      },
      {
        title: 'Full Stack Developer',
        company: 'InnovateLabs',
        requirements: ['Node.js', 'MongoDB', 'React']
      },
      {
        title: 'Data Science Intern',
        company: 'DataScience Inc',
        requirements: ['Python', 'Machine Learning', 'Analytics']
      }
    ];

    try {
      const result = await aiFeatures.matchStudentToOpportunities(studentProfile, opportunities);
      setAiResults(prev => ({ ...prev, matching: result }));
      setShowAIResults(true);
    } catch (error) {
      console.error('AI Matching Error:', error);
    }
  };

  const handleGenerateInterviewQuestions = async () => {
    const skills = ['JavaScript', 'React', 'Node.js'];
    const jobRole = 'Full Stack Developer';

    try {
      const result = await aiFeatures.generateInterviewQuestions(jobRole, skills, 'medium');
      setAiResults(prev => ({ ...prev, interview: result }));
      setShowAIResults(true);
    } catch (error) {
      console.error('Interview Questions Error:', error);
    }
  };

  const handleResumeAnalysis = async () => {
    const resumeContent = `
    Name: ${profileData.name}
    Email: ${profileData.email}
    CGPA: ${profileData.cgpa}
    Skills: JavaScript, React, Node.js, Python, MongoDB
    Experience: 2 years of project experience
    Projects: E-commerce website, AI chatbot, Mobile app
    `;

    try {
      const result = await aiFeatures.analyzeResume(resumeContent, 'Software Developer');
      setAiResults(prev => ({ ...prev, resume: result }));
      setShowAIResults(true);
    } catch (error) {
      console.error('Resume Analysis Error:', error);
    }
  };

  const handleCareerGuidance = async () => {
    const studentProfile = {
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      interests: ['Web Development', 'AI/ML', 'Data Science'],
      cgpa: profileData.cgpa,
      year: '3rd Year',
      department: 'Computer Science'
    };

    const industryTrends = {
      techGrowth: '25% increase in demand',
      hotSkills: ['AI/ML', 'Cloud Computing', 'DevOps'],
      salaryTrends: 'Average increase of 12%'
    };

    try {
      const result = await aiFeatures.generateCareerGuidance(studentProfile, industryTrends);
      setAiResults(prev => ({ ...prev, career: result }));
      setShowAIResults(true);
    } catch (error) {
      console.error('Career Guidance Error:', error);
    }
  };

  const handleGoToSettings = () => {
    setActiveTab('settings');
    toast({
      title: "Navigation",
      description: "Switched to Settings tab",
    });
  };

  const handleAccountSettings = () => {
    setActiveTab('settings');
    setShowAccountSettings(true);
    toast({
      title: "Account Settings",
      description: "Navigate to account management section",
    });
    // Scroll to account settings section after navigation
    setTimeout(() => {
      const accountSection = document.getElementById('account-settings-section');
      if (accountSection) {
        accountSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
    // Remove highlight after 3 seconds
    setTimeout(() => {
      setShowAccountSettings(false);
    }, 3000);
  };

  // Mock data  
  const stats = [
    { title: "Applications Sent", value: "12", icon: FileText, color: "text-blue-600" },
    { title: "Interviews Scheduled", value: "3", icon: Calendar, color: "text-orange-600" },
    { title: "Offers Received", value: "2", icon: CheckCircle, color: "text-green-600" },
    { title: "Profile Completion", value: "85%", icon: TrendingUp, color: "text-purple-600" },
  ];

  const applications = [
    { id: 1, company: "TechCorp", position: "Software Engineer Intern", status: "Under Review", appliedDate: "2024-01-15", progress: 60 },
    { id: 2, company: "DataFlow Inc", position: "Data Analyst Trainee", status: "Interview Scheduled", appliedDate: "2024-01-12", progress: 80 },
    { id: 3, company: "StartupHub", position: "Frontend Developer", status: "Application Sent", appliedDate: "2024-01-20", progress: 25 },
  ];

  return (
    <div className="min-h-screen bg-background pt-12">
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
              <Bell className="w-4 h-4 mr-2" />
              <span className="font-semibold">Student Dashboard</span>
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
                <DropdownMenuLabel>Quick Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleGoToSettings} className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleThemeToggle} className="cursor-pointer">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 mr-2" />
                  ) : (
                    <Moon className="w-4 h-4 mr-2" />
                  )}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleNotificationToggle} className="cursor-pointer">
                  <Bell className="w-4 h-4 mr-2" />
                  {notificationsEnabled ? 'Disable' : 'Enable'} Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAccountSettings} className="cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Account Settings
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
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {profileData.name}!</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-11 text-xs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="opportunities">Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="resume">Resume</TabsTrigger>
            <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
            <TabsTrigger value="prep">Prep</TabsTrigger>
            <TabsTrigger value="learn">Learn</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Quick Apply
                  </CardTitle>
                  <CardDescription>Apply to recommended positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Frontend Developer at TechStart</div>
                    <div className="text-xs text-muted-foreground">95% match • ₹30k/month</div>
                    <Button size="sm" className="w-full">
                      Apply Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Interview
                  </CardTitle>
                  <CardDescription>Next scheduled interview</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">Software Engineer at TechCorp</div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Jan 25, 2024
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        2:00 PM
                      </span>
                    </div>
                    <Button size="sm" className="w-full">
                      Prepare
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Profile Card */}
              <Card className="lg:col-span-1">
                <CardHeader className="text-center">
                  <div className="mx-auto w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 relative">
                    <User className="w-12 h-12 text-white" />
                    <Button 
                      size="sm" 
                      className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                      variant="secondary"
                    >
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                  <CardTitle>{profileData.name}</CardTitle>
                  <CardDescription>Computer Science • Final Year</CardDescription>
                  <Badge className="mt-2 bg-green-100 text-green-800">Profile 85% Complete</Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!isEditingProfile ? (
                    <>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{profileData.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span>{profileData.university}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <span>CGPA: {profileData.cgpa}/10</span>
                        </div>
                        {profileData.bio && (
                          <div className="pt-2">
                            <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                          </div>
                        )}
                      </div>
                      <Button className="w-full" onClick={() => setIsEditingProfile(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Name</label>
                          <Input
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Email</label>
                          <Input
                            value={editFormData.email}
                            onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                            placeholder="Enter your email"
                            type="email"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Phone</label>
                          <Input
                            value={editFormData.phone}
                            onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                            placeholder="Enter your phone number"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">University</label>
                          <Input
                            value={editFormData.university}
                            onChange={(e) => setEditFormData({ ...editFormData, university: e.target.value })}
                            placeholder="Enter your university"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">CGPA</label>
                          <Input
                            value={editFormData.cgpa}
                            onChange={(e) => setEditFormData({ ...editFormData, cgpa: e.target.value })}
                            placeholder="Enter your CGPA"
                            type="number"
                            step="0.1"
                            max="10"
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Bio</label>
                          <Textarea
                            value={editFormData.bio}
                            onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                            placeholder="Tell us about yourself..."
                            rows={3}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveProfile} className="flex-1">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={handleCancelEdit} className="flex-1">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Skills and Projects */}
              <div className="lg:col-span-2 space-y-6">
                {/* Skills */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Skills
                      </CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {[
                        { name: "React", level: "Advanced", verified: true },
                        { name: "JavaScript", level: "Advanced", verified: true },
                        { name: "Python", level: "Intermediate", verified: false },
                        { name: "Node.js", level: "Intermediate", verified: false },
                        { name: "SQL", level: "Beginner", verified: false },
                        { name: "AWS", level: "Beginner", verified: false }
                      ].map((skill, index) => (
                        <div key={index} className="p-3 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{skill.name}</span>
                            {skill.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                          </div>
                          <Badge variant="secondary" className="text-xs">{skill.level}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Projects */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Projects
                      </CardTitle>
                      <Button size="sm" variant="outline">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        title: "E-commerce Platform",
                        description: "Full-stack web application with React, Node.js, and MongoDB",
                        technologies: ["React", "Node.js", "MongoDB", "Express"]
                      },
                      {
                        title: "Task Management App",
                        description: "Mobile-responsive task management application with real-time updates",
                        technologies: ["React", "Firebase", "Tailwind CSS"]
                      }
                    ].map((project, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{project.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost">
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">{tech}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Globe className="w-3 h-3 mr-1" />
                            Demo
                          </Button>
                          <Button size="sm" variant="outline">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Code
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input placeholder="Search by company, role, skills, or location..." />
                  </div>
                  <Button>
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[
                {
                  id: 1,
                  company: "InnovateTech",
                  position: "Frontend Developer Intern",
                  location: "Bangalore",
                  type: "Internship",
                  stipend: "₹25,000/month",
                  skills: ["React", "JavaScript", "CSS"],
                  featured: true,
                  matchScore: 92
                },
                {
                  id: 2,
                  company: "DataCorp Analytics",
                  position: "Data Science Trainee",
                  location: "Mumbai",
                  type: "Training Program",
                  stipend: "₹20,000/month",
                  skills: ["Python", "Machine Learning", "SQL"],
                  featured: false,
                  matchScore: 78
                },
                {
                  id: 3,
                  company: "StartupHub",
                  position: "Full Stack Developer",
                  location: "Remote",
                  type: "Full-time",
                  stipend: "₹6-8 LPA",
                  skills: ["React", "Node.js", "MongoDB"],
                  featured: true,
                  matchScore: 85
                }
              ].map((opp) => (
                <Card key={opp.id} className={`hover:shadow-lg transition-all ${opp.featured ? "ring-2 ring-primary" : ""}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <CardTitle className="text-lg">{opp.position}</CardTitle>
                          {opp.featured && <Badge className="bg-primary text-primary-foreground text-xs">Featured</Badge>}
                        </div>
                        <CardDescription className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {opp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {opp.location}
                          </span>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-primary">{opp.matchScore}%</div>
                        <div className="text-xs text-muted-foreground">Match</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{opp.type}</Badge>
                      <span className="flex items-center gap-1 font-medium">
                        <DollarSign className="w-3 h-3" />
                        {opp.stipend}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs text-muted-foreground">Required Skills:</div>
                      <div className="flex flex-wrap gap-1">
                        {opp.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        className="flex-1" 
                        onClick={() => handleApplyNow(opp.id, opp.company, opp.position)}
                        disabled={appliedOpportunities.has(opp.id)}
                      >
                        {appliedOpportunities.has(opp.id) ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Applied
                          </>
                        ) : (
                          'Apply Now'
                        )}
                      </Button>
                      <Button variant="outline" size="sm">
                        <BookOpen className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            {/* Application Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Applied", value: "12", color: "bg-blue-50 text-blue-700", icon: FileText },
                { label: "Under Review", value: "5", color: "bg-yellow-50 text-yellow-700", icon: Clock },
                { label: "Interviews", value: "3", color: "bg-purple-50 text-purple-700", icon: Calendar },
                { label: "Offers", value: "2", color: "bg-green-50 text-green-700", icon: CheckCircle }
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <stat.icon className="h-8 w-8 text-muted-foreground" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Applications List */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Track your application progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{app.position}</h3>
                          <Badge variant="outline">{app.status}</Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {app.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Applied on {app.appliedDate}
                          </span>
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <Progress value={app.progress} className="flex-1" />
                            <span className="text-xs text-muted-foreground">{app.progress}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Interviews</h2>
                <p className="text-muted-foreground">Manage your scheduled interviews</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Schedule Mock Interview
              </Button>
            </div>

            {/* Upcoming Interviews */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>Your scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      company: "TechCorp",
                      position: "Software Engineer Intern",
                      date: "2024-01-25",
                      time: "2:00 PM",
                      type: "Technical Round",
                      mode: "Video Call"
                    },
                    {
                      id: 2,
                      company: "DataFlow Inc",
                      position: "Data Analyst Trainee",
                      date: "2024-01-18",
                      time: "10:00 AM",
                      type: "HR Round",
                      mode: "In-person"
                    }
                  ].map((interview) => (
                    <div key={interview.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{interview.position}</h3>
                          <p className="text-sm text-muted-foreground">{interview.company}</p>
                        </div>
                        <Badge variant="outline">{interview.type}</Badge>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {interview.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {interview.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {interview.mode}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          size="sm"
                          onClick={() => handlePrepareInterview(interview.id, interview.position, interview.company)}
                          disabled={preparingInterviews.has(interview.id)}
                        >
                          {preparingInterviews.has(interview.id) ? (
                            <>
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Preparing
                            </>
                          ) : (
                            'Prepare'
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRescheduleInterview(interview.id, interview.position, interview.company)}
                        >
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Certificates & Achievements</h2>
                <p className="text-muted-foreground">Showcase your certifications and accomplishments</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Certificate
              </Button>
            </div>

            {/* Certificate Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Certificates", value: "8", color: "bg-blue-50 text-blue-700", icon: Award },
                { label: "This Year", value: "3", color: "bg-green-50 text-green-700", icon: Calendar },
                { label: "Verified", value: "6", color: "bg-purple-50 text-purple-700", icon: CheckCircle },
                { label: "In Progress", value: "2", color: "bg-yellow-50 text-yellow-700", icon: Clock }
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <stat.icon className="h-8 w-8 text-muted-foreground" />
                      <div className="ml-4">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resume Builder Tab */}
          <TabsContent value="resume" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">AI Resume Builder</h2>
                <p className="text-muted-foreground">Create professional resumes with AI assistance</p>
              </div>
              <Button>
                <FileEdit className="w-4 h-4 mr-2" />
                New Resume
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Resume Score */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="w-5 h-5" />
                    Resume Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Score</span>
                    <span className="text-2xl font-bold text-green-600">{resumeScore}%</span>
                  </div>
                  <Progress value={resumeScore} className="h-2" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Content Quality</span>
                      <span className="text-green-600">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Format & Structure</span>
                      <span className="text-yellow-600">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Keyword Match</span>
                      <span className="text-green-600">Strong</span>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Brain className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </Button>
                </CardContent>
              </Card>

              {/* Cover Letter Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Cover Letter Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    {['Technical Role', 'HR Position', 'Creative Field', 'Research Internship'].map((template, index) => (
                      <Button key={index} variant="ghost" className="justify-start">
                        <FileText className="w-4 h-4 mr-2" />
                        {template}
                      </Button>
                    ))}
                  </div>
                  <Button className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Custom Template
                  </Button>
                </CardContent>
              </Card>

              {/* Portfolio Showcase */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Portfolio Showcase
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Github className="w-5 h-5" />
                      <Input placeholder="GitHub Profile URL" />
                      <Button size="sm" variant="outline">Link</Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <LinkedinIcon className="w-5 h-5" />
                      <Input placeholder="LinkedIn Profile URL" />
                      <Button size="sm" variant="outline">Link</Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5" />
                      <Input placeholder="Portfolio Website URL" />
                      <Button size="sm" variant="outline">Link</Button>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Project Gallery
                  </Button>
                </CardContent>
              </Card>

              {/* Resume Templates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileEdit className="w-5 h-5" />
                    Resume Templates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {['Professional', 'Creative', 'Technical', 'Academic'].map((template, index) => (
                      <div 
                        key={index} 
                        className="border rounded-lg p-3 hover:bg-accent cursor-pointer"
                        onClick={() => handleDownloadResume(template)}
                      >
                        <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded mb-2"></div>
                        <p className="text-sm font-medium text-center">{template}</p>
                      </div>
                    ))}
                  </div>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={handleDownloadProfile}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Profile PDF
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai-assistant" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* AI Features Cards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    AI-Powered Matching
                  </CardTitle>
                  <CardDescription>
                    Find the perfect opportunities based on your skills and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleAIMatching} 
                    disabled={aiFeatures.loading}
                    className="w-full"
                  >
                    {aiFeatures.loading ? 'Analyzing...' : 'Find My Matches'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500" />
                    Interview Questions
                  </CardTitle>
                  <CardDescription>
                    Generate personalized interview questions for practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleGenerateInterviewQuestions} 
                    disabled={aiFeatures.loading}
                    className="w-full"
                  >
                    {aiFeatures.loading ? 'Generating...' : 'Generate Questions'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-orange-500" />
                    Resume Analysis
                  </CardTitle>
                  <CardDescription>
                    Get AI-powered feedback on your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleResumeAnalysis} 
                    disabled={aiFeatures.loading}
                    className="w-full"
                  >
                    {aiFeatures.loading ? 'Analyzing...' : 'Analyze Resume'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Career Guidance
                  </CardTitle>
                  <CardDescription>
                    Get personalized career path recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleCareerGuidance} 
                    disabled={aiFeatures.loading}
                    className="w-full"
                  >
                    {aiFeatures.loading ? 'Generating...' : 'Get Career Advice'}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* AI Results Display */}
            {showAIResults && (
              <div className="space-y-4">
                {aiResults.matching && (
                  <AIResultsDisplay
                    title="AI-Powered Opportunity Matching"
                    content={aiResults.matching}
                    type="matching"
                    loading={false}
                  />
                )}
                {aiResults.interview && (
                  <AIResultsDisplay
                    title="Interview Questions & Preparation"
                    content={aiResults.interview}
                    type="interview"
                    loading={false}
                  />
                )}
                {aiResults.resume && (
                  <AIResultsDisplay
                    title="Resume Analysis & Recommendations"
                    content={aiResults.resume}
                    type="resume"
                    loading={false}
                  />
                )}
                {aiResults.career && (
                  <AIResultsDisplay
                    title="Career Guidance & Path Recommendations"
                    content={aiResults.career}
                    type="career"
                    loading={false}
                  />
                )}
              </div>
            )}
          </TabsContent>

          {/* Interview Preparation Tab */}
          <TabsContent value="prep" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Interview Preparation</h2>
                <p className="text-muted-foreground">AI-powered mock interviews and practice sessions</p>
              </div>
              <Button>
                <PlayCircle className="w-4 h-4 mr-2" />
                Start Mock Interview
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Mock Interview Platform */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Mock Interview Platform
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Button className="w-full justify-start">
                      <Mic className="w-4 h-4 mr-2" />
                      Technical Interview (AI-Powered)
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      HR Round Practice
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Brain className="w-4 h-4 mr-2" />
                      Case Study Analysis
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm"><strong>Completed:</strong> {mockInterviewsCompleted} sessions</p>
                    <p className="text-sm"><strong>Average Score:</strong> 8.2/10</p>
                  </div>
                </CardContent>
              </Card>

              {/* Question Bank */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Question Bank
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="java">Java Developer</SelectItem>
                      <SelectItem value="python">Python Developer</SelectItem>
                      <SelectItem value="frontend">Frontend Developer</SelectItem>
                      <SelectItem value="electronics">Electronics Engineer</SelectItem>
                      <SelectItem value="hr">HR Questions</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Tell me about yourself?</p>
                      <Badge variant="outline" className="mt-1">HR</Badge>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="font-medium">Explain OOP concepts</p>
                      <Badge variant="outline" className="mt-1">Technical</Badge>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View All Questions
                  </Button>
                </CardContent>
              </Card>

              {/* Interview Scheduling */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5" />
                    Scheduling Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Sync with Google Calendar
                  </Button>
                  <Button className="w-full" variant="outline">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Interview Reminders
                  </Button>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium">Upcoming Interviews</p>
                    <p className="text-sm">TechCorp - Tomorrow 2:00 PM</p>
                    <p className="text-sm">DataFlow - Friday 10:00 AM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Library */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Feedback Library
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm"><strong>Positive:</strong> "Great technical knowledge and clear communication"</p>
                      <p className="text-xs text-muted-foreground mt-1">Software Engineer Role</p>
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-sm"><strong>Improvement:</strong> "Work on explaining complex concepts simply"</p>
                      <p className="text-xs text-muted-foreground mt-1">Technical Interview</p>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View All Feedback
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Learning & Skill Building Tab */}
          <TabsContent value="learn" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Learning & Skill Building</h2>
                <p className="text-muted-foreground">Personalized learning paths and skill development</p>
              </div>
              <Button>
                <BookmarkPlus className="w-4 h-4 mr-2" />
                Add Learning Goal
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Skill Gap Analyzer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Skill Gap Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">React.js</span>
                      <div className="flex items-center gap-2">
                        <Progress value={80} className="w-20 h-2" />
                        <span className="text-sm">80%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Node.js</span>
                      <div className="flex items-center gap-2">
                        <Progress value={60} className="w-20 h-2" />
                        <span className="text-sm">60%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">MongoDB</span>
                      <div className="flex items-center gap-2">
                        <Progress value={40} className="w-20 h-2" />
                        <span className="text-sm">40%</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Get Skill Recommendations
                  </Button>
                </CardContent>
              </Card>

              {/* Resource Hub */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Resource Hub
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-2">
                    <Button variant="ghost" className="justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Resume Building Guide (PDF)
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Interview Etiquette Videos
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <FileText className="w-4 h-4 mr-2" />
                      Email Writing Templates
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      NPTEL Course Links
                    </Button>
                  </div>
                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Browse All Resources
                  </Button>
                </CardContent>
              </Card>

              {/* Practice Tests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Practice Tests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Button className="w-full justify-start">
                      <Brain className="w-4 h-4 mr-2" />
                      Aptitude Test (60 min)
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Code className="w-4 h-4 mr-2" />
                      Coding Challenge
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Zap className="w-4 h-4 mr-2" />
                      Logical Reasoning
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm"><strong>Last Score:</strong> 82/100</p>
                    <p className="text-sm"><strong>Tests Taken:</strong> 15</p>
                  </div>
                </CardContent>
              </Card>

              {/* Peer Learning */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Peer-to-Peer Learning
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full">
                    <Users className="w-4 h-4 mr-2" />
                    Find Interview Buddy
                  </Button>
                  <Button className="w-full" variant="outline">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Join Discussion Forum
                  </Button>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium">Active Discussions</p>
                    <p className="text-sm">• React vs Angular debate</p>
                    <p className="text-sm">• AWS certification tips</p>
                    <p className="text-sm">• Interview experiences</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community & Networking Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Community & Networking</h2>
                <p className="text-muted-foreground">Connect with alumni, peers, and industry professionals</p>
              </div>
              <Button>
                <UserCheck className="w-4 h-4 mr-2" />
                Connect with Alumni
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Alumni Connect */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Alumni Connect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {[
                      { name: 'John Smith', role: 'Software Engineer at Google', year: '2023' },
                      { name: 'Sarah Johnson', role: 'Data Scientist at Microsoft', year: '2022' },
                      { name: 'Mike Chen', role: 'Product Manager at Amazon', year: '2023' }
                    ].map((alumni, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{alumni.name}</p>
                          <p className="text-sm text-muted-foreground">{alumni.role}</p>
                          <p className="text-xs text-muted-foreground">Graduated {alumni.year}</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Success Stories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Success Stories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="font-medium text-sm">From Intern to Full-Time</p>
                      <p className="text-sm text-muted-foreground">"How I converted my summer internship at TechCorp into a full-time offer"</p>
                      <Button size="sm" variant="ghost" className="mt-2 p-0 h-auto">
                        Read More →
                      </Button>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="font-medium text-sm">Career Pivot Success</p>
                      <p className="text-sm text-muted-foreground">"Switching from mechanical to software engineering"</p>
                      <Button size="sm" variant="ghost" className="mt-2 p-0 h-auto">
                        Read More →
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View All Stories
                  </Button>
                </CardContent>
              </Card>

              {/* Company Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Company Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">TechCorp</p>
                        <Badge variant="outline">Tech</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Average selection rate: 15%</p>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="secondary">Technical Focus</Badge>
                        <Badge variant="secondary">2-3 Rounds</Badge>
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">DataFlow Inc</p>
                        <Badge variant="outline">Analytics</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">Average selection rate: 22%</p>
                      <div className="flex gap-2 text-xs">
                        <Badge variant="secondary">Case Studies</Badge>
                        <Badge variant="secondary">HR + Technical</Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full" variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View Company Database
                  </Button>
                </CardContent>
              </Card>

              {/* Student Wellbeing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Student Wellbeing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Smile className="w-4 h-4 mr-2" />
                      Interview Stress Toolkit
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      Breathing Exercises
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Headphones className="w-4 h-4 mr-2" />
                      Book Counselor Session
                    </Button>
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm font-medium">Wellness Tip</p>
                    <p className="text-sm">"Take 5 deep breaths before starting any interview. You've got this! 💪"</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Career Tools Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">Career Tools</h3>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Job Fit Score */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Job Fit Analyzer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Software Engineer - TechCorp</span>
                        <Badge className="bg-green-100 text-green-800">87% Match</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Data Analyst - DataFlow</span>
                        <Badge className="bg-yellow-100 text-yellow-800">72% Match</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Frontend Dev - StartupHub</span>
                        <Badge className="bg-red-100 text-red-800">45% Match</Badge>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Analyze New Job
                    </Button>
                  </CardContent>
                </Card>

                {/* Placement Readiness */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gauge className="w-5 h-5" />
                      Placement Readiness
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">{placementReadiness}%</div>
                      <Progress value={placementReadiness} className="h-3" />
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Resume Strength</span>
                        <span className="text-green-600">92%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Skills Match</span>
                        <span className="text-yellow-600">78%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Interview Prep</span>
                        <span className="text-green-600">85%</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Improve Score
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-muted-foreground">Manage your account preferences</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Account Settings */}
              <Card id="account-settings-section" className={showAccountSettings ? "ring-2 ring-primary ring-opacity-50" : ""}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCircle className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Notification Emails</label>
                      <p className="text-xs text-muted-foreground">Receive updates via email</p>
                    </div>
                    <Switch 
                      checked={notificationsEnabled}
                      onCheckedChange={(checked) => {
                        setNotificationsEnabled(checked);
                        toast({
                          title: "Notifications Updated",
                          description: `Email notifications ${checked ? 'enabled' : 'disabled'}.`,
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">SMS Notifications</label>
                      <p className="text-xs text-muted-foreground">Get SMS updates</p>
                    </div>
                    <Switch 
                      defaultChecked={true}
                      onCheckedChange={(checked) => {
                        toast({
                          title: "SMS Settings Updated",
                          description: `SMS notifications ${checked ? 'enabled' : 'disabled'}.`,
                        });
                      }}
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setActiveTab('profile');
                      toast({
                        title: "Account Management",
                        description: "Navigate to profile tab for account details.",
                      });
                    }}
                  >
                    <UserCircle className="w-4 h-4 mr-2" />
                    Manage Account
                  </Button>
                </CardContent>
              </Card>

              {/* Privacy & Security */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Privacy & Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Profile Visibility</label>
                      <p className="text-xs text-muted-foreground">Who can see your profile</p>
                    </div>
                    <Select
                      value={profileData.visibility}
                      onValueChange={(value) => {
                        setProfileData({ ...profileData, visibility: value });
                        toast({
                          title: "Privacy Updated",
                          description: `Profile visibility changed to ${value}.`,
                        });
                      }}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Recruiters Only">Recruiters Only</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Show Email</label>
                      <p className="text-xs text-muted-foreground">Display email on profile</p>
                    </div>
                    <Switch
                      checked={profileData.showEmail}
                      onCheckedChange={(checked) => {
                        setProfileData({ ...profileData, showEmail: checked });
                        toast({
                          title: "Privacy Updated",
                          description: `Email visibility ${checked ? 'enabled' : 'disabled'}.`,
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Two-Factor Authentication</label>
                      <p className="text-xs text-muted-foreground">Add extra security</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "2FA Setup",
                          description: "Two-factor authentication setup would be initiated here.",
                        });
                      }}
                    >
                      Enable
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      toast({
                        title: "Password Change",
                        description: "Password change form would be displayed here.",
                      });
                    }}
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Change Password
                  </Button>
                </CardContent>
              </Card>

              {/* Theme Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Appearance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Dark Mode</label>
                      <p className="text-xs text-muted-foreground">Toggle dark theme</p>
                    </div>
                    <Switch 
                      checked={theme === 'dark'}
                      onCheckedChange={(checked) => {
                        const newTheme = checked ? 'dark' : 'light';
                        setTheme(newTheme);
                        toast({
                          title: "Theme Updated",
                          description: `Switched to ${newTheme} mode.`,
                        });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium">Compact View</label>
                      <p className="text-xs text-muted-foreground">Reduce spacing</p>
                    </div>
                    <Switch 
                      defaultChecked={false}
                      onCheckedChange={(checked) => {
                        toast({
                          title: "View Updated",
                          description: `${checked ? 'Enabled' : 'Disabled'} compact view mode.`,
                        });
                      }}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data & Export */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Data & Export
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Export Profile Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Resume
                  </Button>
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
                        Delete Account Permanently
                      </CardTitle>
                      <CardDescription className="text-red-600 dark:text-red-400 mt-1">
                        This action is <span className="font-semibold">irreversible</span> and will completely remove your account and all associated data from our systems.
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
                        <span>Profile and personal information</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                        <span>All job applications and communications</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                        <span>Interview schedules and history</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-500 dark:bg-red-400 rounded-full"></div>
                        <span>Certificates and achievements</span>
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
                          Delete My Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-md border-red-200 dark:border-red-800 bg-white dark:bg-gray-950">
                          <AlertDialogHeader className="text-center pb-4">
                            <div className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-100 dark:ring-red-800/50">
                              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <AlertDialogTitle className="text-xl font-bold text-red-800 dark:text-red-200">
                              Delete Account Forever?
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
                                    <span>Your complete profile ({profileData.name})</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                    <span>12 job applications and their progress</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                    <span>3 scheduled interviews</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <X className="w-3 h-3 text-red-500 dark:text-red-400" />
                                    <span>All certificates and achievements</span>
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-xs text-gray-600 dark:text-gray-400">
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WorkingStudentDashboard;