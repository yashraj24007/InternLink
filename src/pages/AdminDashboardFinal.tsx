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
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeProvider';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { generateAdminReportPDF } from '@/utils/pdfUtils';
import { useAIFeatures } from '@/hooks/useAIFeatures';
import { AIResultsDisplay } from '@/components/AIResultsDisplay';
import { 
  Users, 
  Shield, 
  Database, 
  Server,
  Settings,
  Activity,
  AlertTriangle,
  UserCheck,
  UserX,
  Lock,
  Unlock,
  Eye,
  Download,
  Upload,
  BarChart3,
  FileText,
  Bell,
  Mail,
  Globe,
  Trash2,
  Edit,
  Plus,
  Search,
  Filter,
  Home,
  Monitor,
  HardDrive,
  Cpu,
  MemoryStick,
  Network,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  LogOut,
  ChevronDown,
  UserCircle,
  Building,
  GraduationCap,
  Briefcase,
  Target,
  Award,
  Star,
  MessageSquare,
  Phone,
  ExternalLink,
  Copy,
  RefreshCw,
  Save,
  X,
  Check,
  AlertCircle,
  Info,
  Zap,
  Key,
  ShieldCheck,
  UserPlus,
  UserMinus,
  FileCheck,
  FileMinus,
  BookOpen,
  PieChart,
  LineChart,
  Archive,
  CloudUpload,
  CloudDownload,
  Palette,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Power,
  PowerOff,
  ArrowRight,
  Brain
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [showSecuritySettings, setShowSecuritySettings] = useState(false);
  
  // AI Features State
  const aiFeatures = useAIFeatures();
  const [aiAnalytics, setAiAnalytics] = useState<string>('');
  const [showAIAnalytics, setShowAIAnalytics] = useState(false);

  // Account settings form state
  const [accountForm, setAccountForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    department: 'Computer Science',
    employeeId: 'ADM001',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Delete account form state
  const [deleteForm, setDeleteForm] = useState({
    confirmPassword: '',
    confirmText: '',
    reason: ''
  });

  // Security settings form state
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    emailNotifications: true,
    loginAlerts: true,
    sessionTimeout: '30',
    passwordExpiry: '90',
    allowMultipleSessions: false,
    ipWhitelist: '',
    backupCodes: ['ABC123', 'DEF456', 'GHI789', 'JKL012'],
    trustedDevices: [
      { id: 1, device: 'Windows 11 - Chrome', lastUsed: '2024-01-15 10:30', location: 'New York, US', current: true },
      { id: 2, device: 'iPhone 14 - Safari', lastUsed: '2024-01-14 15:20', location: 'New York, US', current: false },
      { id: 3, device: 'MacBook Pro - Chrome', lastUsed: '2024-01-12 09:45', location: 'New York, US', current: false }
    ],
    loginHistory: [
      { id: 1, timestamp: '2024-01-15 10:30:00', ip: '192.168.1.100', location: 'New York, US', device: 'Windows 11 - Chrome', status: 'Success' },
      { id: 2, timestamp: '2024-01-14 15:20:15', ip: '192.168.1.105', location: 'New York, US', device: 'iPhone 14 - Safari', status: 'Success' },
      { id: 3, timestamp: '2024-01-14 08:15:30', ip: '192.168.1.110', location: 'Unknown Location', device: 'Unknown Device', status: 'Failed' },
      { id: 4, timestamp: '2024-01-13 16:45:20', ip: '192.168.1.100', location: 'New York, US', device: 'Windows 11 - Chrome', status: 'Success' }
    ]
  });

  // System stats state
  const [systemStats, setSystemStats] = useState({
    totalUsers: 3124,
    totalStudents: 2456,
    totalMentors: 234,
    totalRecruiters: 189,
    placementStaff: 15,
    activeInternships: 456,
    activeJobs: 234,
    pendingApplications: 123,
    pendingApprovals: 67,
    systemUptime: '99.8%',
    serverLoad: 45,
    diskUsage: 78,
    memoryUsage: 62
  });

  // User management state
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', lastLogin: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'mentor', status: 'active', lastLogin: '2024-01-14' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'recruiter', status: 'inactive', lastLogin: '2024-01-10' },
    { id: 4, name: 'Alice Johnson', email: 'alice@example.com', role: 'placement_cell', status: 'active', lastLogin: '2024-01-15' }
  ]);

  // Audit logs state
  const [auditLogs, setAuditLogs] = useState([
    { id: 1, user: 'john@example.com', action: 'Login', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.100' },
    { id: 2, user: 'admin@example.com', action: 'User Role Changed', timestamp: '2024-01-15 09:15:00', ip: '192.168.1.1' },
    { id: 3, user: 'jane@example.com', action: 'Document Upload', timestamp: '2024-01-15 08:45:00', ip: '192.168.1.50' },
    { id: 4, user: 'bob@example.com', action: 'Application Approved', timestamp: '2024-01-15 07:20:00', ip: '192.168.1.75' },
    { id: 5, user: 'alice@example.com', action: 'Bulk User Import', timestamp: '2024-01-14 16:45:00', ip: '192.168.1.25' }
  ]);

  // System health monitoring
  const [systemHealth, setSystemHealth] = useState({
    apiResponseTime: 125,
    databaseConnections: 45,
    activeUsers: 234,
    errorRate: 0.02,
    lastBackup: '2024-01-14 23:00:00'
  });

  const handleUserStatusToggle = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
    toast({
      title: "User Status Updated",
      description: "User status has been successfully changed.",
    });
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, role: newRole }
        : user
    ));
    toast({
      title: "Role Updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleBulkUserUpload = () => {
    toast({
      title: "Bulk Upload",
      description: "Feature available in full version. Contact admin for bulk operations.",
    });
  };

  const handleSystemBackup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Backup Initiated",
        description: "System backup has been started successfully.",
      });
    }, 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccountSettings = () => {
    setShowAccountSettings(true);
  };

  const handleSaveAccountSettings = () => {
    // Validate passwords if changing
    if (accountForm.newPassword) {
      if (accountForm.newPassword !== accountForm.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "New password and confirm password do not match.",
          variant: "destructive"
        });
        return;
      }
      if (accountForm.newPassword.length < 8) {
        toast({
          title: "Password Too Short",
          description: "Password must be at least 8 characters long.",
          variant: "destructive"
        });
        return;
      }
    }

    // Simulate API call
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowAccountSettings(false);
      toast({
        title: "Account Updated",
        description: "Your account settings have been successfully updated.",
      });
      // Reset password fields
      setAccountForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }, 1500);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDeleteAccount = () => {
    // Validate deletion requirements
    if (!deleteForm.confirmPassword) {
      toast({
        title: "Password Required",
        description: "Please enter your current password to confirm deletion.",
        variant: "destructive"
      });
      return;
    }

    if (deleteForm.confirmText.toLowerCase() !== 'delete my account') {
      toast({
        title: "Confirmation Text Incorrect",
        description: "Please type 'DELETE MY ACCOUNT' exactly as shown.",
        variant: "destructive"
      });
      return;
    }

    if (!deleteForm.reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for account deletion.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call for account deletion
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowDeleteConfirmation(false);
      setShowAccountSettings(false);
      
      toast({
        title: "Account Deletion Request Submitted",
        description: "Your account deletion request has been submitted for admin review. You will be contacted within 24 hours.",
        variant: "destructive"
      });

      // Reset form
      setDeleteForm({
        confirmPassword: '',
        confirmText: '',
        reason: ''
      });

      // In a real app, you might redirect to a confirmation page or logout
      // For demo purposes, we'll just show the toast
    }, 2000);
  };

  const handleSecuritySettings = () => {
    setShowSecuritySettings(true);
  };

  const handleSaveSecuritySettings = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowSecuritySettings(false);
      toast({
        title: "Security Settings Updated",
        description: "Your security preferences have been successfully saved.",
      });
    }, 1500);
  };

  const handleRevokeDevice = (deviceId: number) => {
    setSecuritySettings(prev => ({
      ...prev,
      trustedDevices: prev.trustedDevices.filter(device => device.id !== deviceId)
    }));
    toast({
      title: "Device Revoked",
      description: "The selected device has been removed from trusted devices.",
    });
  };

  const handleGenerateBackupCodes = () => {
    const newCodes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setSecuritySettings(prev => ({
      ...prev,
      backupCodes: newCodes
    }));
    toast({
      title: "Backup Codes Generated",
      description: "New backup codes have been generated. Please save them securely.",
    });
  };

  const handlePDFExport = (reportType: string) => {
    generateAdminReportPDF(reportType, {});
    toast({
      title: "Report Generated",
      description: `${reportType} report has been downloaded as PDF`,
    });
  };

  const handleAIAnalytics = async () => {
    const placementData = {
      totalStudents: systemStats.totalUsers,
      placedStudents: Math.floor(systemStats.totalUsers * 0.75),
      placementRate: 75,
      averagePackage: 6.5,
      topCompanies: ['TCS', 'Infosys', 'Wipro', 'Amazon', 'Microsoft'],
      departmentStats: [
        { dept: 'CSE', placed: 245, total: 280, percentage: 87.5 },
        { dept: 'IT', placed: 178, total: 220, percentage: 80.9 },
        { dept: 'ECE', placed: 156, total: 240, percentage: 65.0 },
      ]
    };

    try {
      const result = await aiFeatures.generatePlacementInsights(placementData);
      setAiAnalytics(result);
      setShowAIAnalytics(true);
    } catch (error) {
      console.error('AI Analytics Error:', error);
    }
  };

  // Admin stats similar to student/mentor dashboard
  const adminStats = [
    { title: "Total Users", value: systemStats.totalUsers.toLocaleString(), icon: Users, color: "text-blue-600" },
    { title: "Active Opportunities", value: (systemStats.activeInternships + systemStats.activeJobs).toLocaleString(), icon: Briefcase, color: "text-green-600" },
    { title: "Pending Approvals", value: systemStats.pendingApprovals.toString(), icon: Clock, color: "text-orange-600" },
    { title: "System Uptime", value: systemStats.systemUptime, icon: Activity, color: "text-green-600" },
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
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">System Administration</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Online
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                    3
                  </Badge>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>System Alerts & Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-start space-x-3 p-3">
                  <AlertTriangle className="h-4 w-4 mt-0.5 text-orange-500" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">System Anomaly Detected</p>
                    <p className="text-xs text-muted-foreground">Server load is above normal - 85%</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-start space-x-3 p-3">
                  <Clock className="h-4 w-4 mt-0.5 text-blue-500" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Approval Deadline Approaching</p>
                    <p className="text-xs text-muted-foreground">23 applications require approval by tomorrow</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-start space-x-3 p-3">
                  <Upload className="h-4 w-4 mt-0.5 text-red-500" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Failed Upload Detected</p>
                    <p className="text-xs text-muted-foreground">Resume upload failed for 3 users</p>
                    <p className="text-xs text-muted-foreground">3 hours ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center p-2">
                  <Button variant="ghost" size="sm" className="w-full">
                    View All Notifications
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
                <DropdownMenuLabel>Admin Settings</DropdownMenuLabel>
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
                <DropdownMenuItem onClick={handleAccountSettings} className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSecuritySettings} className="cursor-pointer">
                  <Shield className="w-4 h-4 mr-2" />
                  Security Settings
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
          {adminStats.map((stat, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {index === 0 && "+8% from last month"}
                  {index === 1 && "+12% from last month"}
                  {index === 2 && "3 urgent (>48h)"}
                  {index === 3 && "Excellent performance"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-7 text-xs">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          {/* Overview Tab - Core Dashboard */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Real-time System Stats */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>Real-time System Stats</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{systemStats.totalStudents.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{systemStats.totalMentors}</div>
                      <div className="text-sm text-muted-foreground">Mentors</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{systemStats.placementStaff}</div>
                      <div className="text-sm text-muted-foreground">Placement Staff</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{systemStats.totalRecruiters}</div>
                      <div className="text-sm text-muted-foreground">Recruiters</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Active Internships</span>
                      <span className="font-semibold">{systemStats.activeInternships}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Jobs</span>
                      <span className="font-semibold">{systemStats.activeJobs}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Applications in Progress</span>
                      <span className="font-semibold">{systemStats.pendingApplications}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Approvals Pending</span>
                      <span className="font-semibold text-orange-600">{systemStats.pendingApprovals}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>API Response</span>
                      <span className="font-semibold">{systemHealth.apiResponseTime}ms</span>
                    </div>
                    <Progress value={systemStats.serverLoad} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Disk Usage</span>
                      <span className="font-semibold">{systemStats.diskUsage}%</span>
                    </div>
                    <Progress value={systemStats.diskUsage} className={`h-2 ${systemStats.diskUsage > 80 ? 'bg-red-200' : ''}`} />
                    
                    <div className="flex items-center justify-between">
                      <span>Memory Usage</span>
                      <span className="font-semibold">{systemStats.memoryUsage}%</span>
                    </div>
                    <Progress value={systemStats.memoryUsage} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span>Active Users</span>
                      <span className="font-semibold">{systemHealth.activeUsers}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Panel */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Access Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('users')}>
                    <UserPlus className="h-6 w-6" />
                    <span className="text-xs">Add/Remove Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('users')}>
                    <Shield className="h-6 w-6" />
                    <span className="text-xs">Manage Roles</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('security')}>
                    <FileText className="h-6 w-6" />
                    <span className="text-xs">Audit Logs</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('system')}>
                    <Settings className="h-6 w-6" />
                    <span className="text-xs">System Settings</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('content')}>
                    <Eye className="h-6 w-6" />
                    <span className="text-xs">Content Moderation</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('analytics')}>
                    <BarChart3 className="h-6 w-6" />
                    <span className="text-xs">Analytics</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('system')}>
                    <Database className="h-6 w-6" />
                    <span className="text-xs">Backup & Restore</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2" onClick={() => setActiveTab('resources')}>
                    <Monitor className="h-6 w-6" />
                    <span className="text-xs">System Health</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">User & Role Management</h3>
              <div className="flex space-x-2">
                <Button onClick={handleBulkUserUpload} variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload CSV/Excel
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* Role Assignment & User Activation */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>Role Assignment</CardTitle>
                  <CardDescription>Assign and change user roles dynamically</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select User" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="john">John Doe</SelectItem>
                          <SelectItem value="jane">Jane Smith</SelectItem>
                          <SelectItem value="bob">Bob Wilson</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="New Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="mentor">Mentor</SelectItem>
                          <SelectItem value="placement_cell">Placement Cell</SelectItem>
                          <SelectItem value="recruiter">Recruiter</SelectItem>
                          <SelectItem value="alumni">Alumni</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" onClick={() => toast.success("Role Assigned!", { description: "User role has been successfully updated." })}>Assign Role</Button>
                    <div className="text-sm text-muted-foreground">
                      • Promote student to alumni<br />
                      • Add new mentor<br />
                      • Change placement cell staff
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>User Activation/Deactivation</CardTitle>
                  <CardDescription>Block/unblock accounts for violations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">John Doe</p>
                        <p className="text-sm text-muted-foreground">Inactive for 30+ days</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Bob Wilson</p>
                        <p className="text-sm text-muted-foreground">Policy violation reported</p>
                      </div>
                      <Switch />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      Find Inactive Users
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>User Directory</CardTitle>
                <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input placeholder="Search users..." className="max-w-sm" />
                    <Select>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="student">Students</SelectItem>
                        <SelectItem value="mentor">Mentors</SelectItem>
                        <SelectItem value="recruiter">Recruiters</SelectItem>
                        <SelectItem value="placement_cell">Placement Cell</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>
                            <Select value={user.role} onValueChange={(value) => handleRoleChange(user.id, value)}>
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="student">Student</SelectItem>
                                <SelectItem value="mentor">Mentor</SelectItem>
                                <SelectItem value="recruiter">Recruiter</SelectItem>
                                <SelectItem value="placement_cell">Placement Cell</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUserStatusToggle(user.id)}
                              >
                                {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
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

          {/* System Oversight - Content Moderation Tab */}
          <TabsContent value="content" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">System Oversight</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Content
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileCheck className="h-5 w-5" />
                    <span>Content Moderation</span>
                  </CardTitle>
                  <CardDescription>Approve or remove inappropriate content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Resume Upload - John Doe</p>
                        <p className="text-sm text-gray-500">Uploaded 2 hours ago</p>
                        <Badge variant="outline" className="mt-1">Pending Review</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Cover Letter - Jane Smith</p>
                        <p className="text-sm text-gray-500">Uploaded 4 hours ago</p>
                        <Badge variant="outline" className="mt-1">Pending Review</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Certificate - Bob Wilson</p>
                        <p className="text-sm text-gray-500">Uploaded 1 day ago</p>
                        <Badge variant="destructive" className="mt-1">Flagged</Badge>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm">
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Approval Control</span>
                  </CardTitle>
                  <CardDescription>Override approvals and resolve conflicts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-orange-50 dark:bg-orange-900/10">
                      <div>
                        <p className="font-medium">Application Conflict</p>
                        <p className="text-sm text-gray-500">Duplicate application detected for Google SDE role</p>
                        <p className="text-xs text-orange-600">Requires admin intervention</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50 dark:bg-red-900/10">
                      <div>
                        <p className="font-medium">Mentor Approval Override</p>
                        <p className="text-sm text-gray-500">Application rejected without proper reason</p>
                        <p className="text-xs text-red-600">Urgent review needed</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Override
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                      <div>
                        <p className="font-medium">Missing Approval</p>
                        <p className="text-sm text-gray-500">Placement cell approval pending for 5 days</p>
                        <p className="text-xs text-yellow-600">Deadline approaching</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Escalate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content Statistics */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Content Moderation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-green-600">487</div>
                    <div className="text-sm text-muted-foreground">Approved Today</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-orange-600">23</div>
                    <div className="text-sm text-muted-foreground">Pending Review</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-red-600">12</div>
                    <div className="text-sm text-muted-foreground">Rejected</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-2xl font-bold text-blue-600">8</div>
                    <div className="text-sm text-muted-foreground">Conflicts Resolved</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security & Compliance Tab */}
          <TabsContent value="security" className="space-y-4">
            <h3 className="text-2xl font-bold">Security & Compliance</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Audit Logs</span>
                  </CardTitle>
                  <CardDescription>Track all system activities for accountability</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{log.action}</p>
                          <p className="text-sm text-gray-500">{log.user} - {log.timestamp}</p>
                        </div>
                        <Badge variant="outline">{log.ip}</Badge>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Export Full Audit Log
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Data Privacy Management</span>
                  </CardTitle>
                  <CardDescription>Enforce role-based access and security policies</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Multi-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Enforce MFA for all users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Strong Password Policy</p>
                      <p className="text-sm text-gray-500">Minimum 8 chars, special characters</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-500">30 minutes of inactivity</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Role-based Access Control</p>
                      <p className="text-sm text-gray-500">Strict permission enforcement</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Backup & Restore */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Archive className="h-5 w-5" />
                  <span>Backup & Restore</span>
                </CardTitle>
                <CardDescription>Periodic database backups with restore options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Last Backup</p>
                    <p className="text-sm text-gray-500">{systemHealth.lastBackup}</p>
                    <Badge variant="default" className="bg-green-100 text-green-800">Automated</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Backup Status</p>
                    <p className="text-sm text-gray-500">Daily at 11:00 PM</p>
                    <Badge variant="default" className="bg-blue-100 text-blue-800">Scheduled</Badge>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleSystemBackup} disabled={isLoading} className="w-full">
                      {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <CloudDownload className="h-4 w-4 mr-2" />}
                      {isLoading ? 'Backing up...' : 'Backup Now'}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <CloudUpload className="h-4 w-4 mr-2" />
                      Restore from Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics & Reporting Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <h3 className="text-2xl font-bold">Analytics & Reporting</h3>
            
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>System-Wide Reports</span>
                  </CardTitle>
                  <CardDescription>Student placement trends and department statistics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Student Placement Trends
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <PieChart className="h-4 w-4 mr-2" />
                    Internship Conversion Rates
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Top Recruiter Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Target className="h-4 w-4 mr-2" />
                    Department-wise KPI Dashboard
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Placement Success Metrics
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Custom Report Generation</span>
                  </CardTitle>
                  <CardDescription>Export data for audits and accreditation (NBA/NAAC)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="placement">Placement Reports</SelectItem>
                      <SelectItem value="user">User Analytics</SelectItem>
                      <SelectItem value="system">System Performance</SelectItem>
                      <SelectItem value="audit">Audit Reports</SelectItem>
                      <SelectItem value="accreditation">Accreditation Data</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      variant="outline"
                      onClick={() => handlePDFExport('User Activity')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Export
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Excel Export
                    </Button>
                  </div>
                  
                  <Button className="w-full">
                    Generate Custom Report
                  </Button>

                  <div className="text-sm text-muted-foreground">
                    • NBA/NAAC compliance reports<br />
                    • Regulatory audit data<br />
                    • Performance analytics
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Insights for Improvements */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Insights for Improvements</span>
                </CardTitle>
                <CardDescription>Detect inactive users and skill gaps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Inactive Mentors</span>
                    </div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-sm text-gray-500">No activity in 30 days</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Send Reminder
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span className="font-medium">Low Engagement Recruiters</span>
                    </div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-gray-500">No job postings in 60 days</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      Contact
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Skill Gaps Identified</span>
                    </div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-gray-500">Critical areas need training</p>
                    <Button size="sm" variant="outline" className="mt-2">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Role Analytics - Bonus Feature */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Role Analytics</span>
                </CardTitle>
                <CardDescription>Track user engagement and role-based activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Most Active Mentors</span>
                      <Badge variant="secondary">Top 5</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Dr. Smith</span>
                        <span className="text-green-600">98% active</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Prof. Johnson</span>
                        <span className="text-green-600">94% active</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Dr. Williams</span>
                        <span className="text-blue-600">87% active</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Recruiter Engagement</span>
                      <Badge variant="secondary">This Month</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>TechCorp Inc.</span>
                        <span className="text-green-600">45 postings</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>StartupXYZ</span>
                        <span className="text-blue-600">23 postings</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>MegaCorp Ltd.</span>
                        <span className="text-orange-600">12 postings</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Student Engagement</span>
                      <Badge variant="secondary">Internships</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>High Engagement</span>
                        <span className="text-green-600">67%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Medium Engagement</span>
                        <span className="text-blue-600">25%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Low Engagement</span>
                        <span className="text-orange-600">8%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Platform Usage</span>
                      <Badge variant="secondary">Weekly</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Daily Active Users</span>
                        <span className="text-green-600">1,234</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Weekly Retention</span>
                        <span className="text-blue-600">78%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Feature Usage</span>
                        <span className="text-purple-600">85%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI-Powered Analytics Card */}
            <Card className="border-none shadow-lg lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-purple-500" />
                  <span>AI-Powered Analytics</span>
                </CardTitle>
                <CardDescription>Get intelligent insights and predictions for placement trends</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleAIAnalytics} 
                  disabled={aiFeatures.loading}
                  className="w-full"
                >
                  {aiFeatures.loading ? 'Generating AI Insights...' : 'Generate AI Analytics'}
                </Button>
                
                {showAIAnalytics && aiAnalytics && (
                  <AIResultsDisplay
                    title="AI-Generated Placement Analytics"
                    content={aiAnalytics}
                    type="analytics"
                    loading={false}
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Configuration Tab */}
          <TabsContent value="system" className="space-y-4">
            <h3 className="text-2xl font-bold">System Configuration</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Portal Settings</span>
                  </CardTitle>
                  <CardDescription>Set global deadlines and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Application Submission Deadline</label>
                    <Input type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interview Schedule Deadline</label>
                    <Input type="date" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-gray-500">Send automated emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">In-App Notifications</p>
                      <p className="text-sm text-gray-500">Push notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Portal Settings
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Integration Settings</span>
                  </CardTitle>
                  <CardDescription>API keys and third-party integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Google Calendar API Key</label>
                    <Input placeholder="Enter API key" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Service (SMTP)</label>
                    <Input placeholder="SMTP configuration" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Conference Integration</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="zoom">Zoom</SelectItem>
                        <SelectItem value="teams">Microsoft Teams</SelectItem>
                        <SelectItem value="meet">Google Meet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">AI Resume Analyzer API</label>
                    <Input placeholder="AI service API key" type="password" />
                  </div>
                  
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Integration Settings
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Template Management */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Template Management</span>
                </CardTitle>
                <CardDescription>Maintain email, feedback, and certificate templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm">Email Templates</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <MessageSquare className="h-6 w-6" />
                    <span className="text-sm">Feedback Templates</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Award className="h-6 w-6" />
                    <span className="text-sm">Certificate Templates</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-4">
            <h3 className="text-2xl font-bold">Extra Resources for Admin</h3>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5" />
                    <span>System Health Monitoring</span>
                  </CardTitle>
                  <CardDescription>Monitor server uptime, API response times, database storage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-500">Server Uptime</p>
                      <p className="text-2xl font-bold text-green-600">{systemStats.systemUptime}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-500">API Response</p>
                      <p className="text-2xl font-bold">{systemHealth.apiResponseTime}ms</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-500">DB Connections</p>
                      <p className="text-2xl font-bold">{systemHealth.databaseConnections}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-500">Error Rate</p>
                      <p className="text-2xl font-bold text-green-600">{(systemHealth.errorRate * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                  <Button className="w-full">
                    <Activity className="h-4 w-4 mr-2" />
                    View Detailed Metrics
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Training & Guidelines</span>
                  </CardTitle>
                  <CardDescription>Internal documentation for all user roles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Mentor Training Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Building className="h-4 w-4 mr-2" />
                    Recruiter Guidelines
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Placement Cell Procedures
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    System Documentation
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Info className="h-4 w-4 mr-2" />
                    User Help Center
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Alumni & Recruiter Management */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>Alumni & Recruiter Management</span>
                </CardTitle>
                <CardDescription>Maintain alumni database and verify recruiter authenticity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">Alumni Database</p>
                    <p className="text-2xl font-bold">1,245</p>
                    <p className="text-sm text-muted-foreground mb-2">Verified alumni</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Alumni
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <Building className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="font-medium">Verified Recruiters</p>
                    <p className="text-2xl font-bold">{systemStats.totalRecruiters}</p>
                    <p className="text-sm text-muted-foreground mb-2">Authenticated companies</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Verify Recruiters
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="font-medium">Recurring Partners</p>
                    <p className="text-2xl font-bold">87</p>
                    <p className="text-sm text-muted-foreground mb-2">Long-term partners</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Track Companies
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Custom Dashboard Widgets */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Custom Dashboard Widgets</span>
                </CardTitle>
                <CardDescription>Customize your admin dashboard layout and KPIs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Available Widgets</h4>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Widget
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-blue-500" />
                        <span className="text-sm">Placement Rate Chart</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span className="text-sm">User Growth</span>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                        <span className="text-sm">Success Metrics</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Activity className="h-4 w-4 text-orange-500" />
                        <span className="text-sm">System Health</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Pending Approvals</span>
                      </div>
                      <Switch />
                    </div>
                    
                    <div className="p-3 border rounded-lg flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <PieChart className="h-4 w-4 text-indigo-500" />
                        <span className="text-sm">Department Stats</span>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Layout
                    </Button>
                    <Button className="flex-1">
                      <Save className="h-4 w-4 mr-2" />
                      Save Layout
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bonus Features */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>⚡ Bonus Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Role Analytics</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Track mentor/recruiter activity and student engagement</p>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Analytics", { description: "Opening role analytics dashboard..." })}>View Analytics</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bell className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Smart Notifications & Alerts</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">System anomalies, failed uploads, missing approvals</p>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Alerts Configured", { description: "Notification alerts have been set up." })}>Configure Alerts</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Palette className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Custom Dashboard Widgets</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Add/remove KPIs or charts dynamically</p>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Layout Customizer", { description: "Opening dashboard layout customization..." })}>Customize Layout</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Real-time System Monitoring</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Live performance tracking and alerts</p>
                    <Button variant="outline" size="sm" onClick={() => toast.success("Monitoring Enabled", { description: "Real-time system monitoring is now active." })}>Enable Monitoring</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Account Settings Dialog */}
      <AlertDialog open={showAccountSettings} onOpenChange={setShowAccountSettings}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2">
              <UserCircle className="h-5 w-5" />
              <span>Account Settings</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Update your personal information and security settings
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <UserCircle className="h-4 w-4" />
                <span>Personal Information</span>
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={accountForm.name}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input
                    type="email"
                    value={accountForm.email}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <Input
                    value={accountForm.phone}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <Select value={accountForm.department} onValueChange={(value) => setAccountForm(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Information Technology">Information Technology</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Mechanical">Mechanical</SelectItem>
                      <SelectItem value="Civil">Civil</SelectItem>
                      <SelectItem value="Administration">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Employee ID</label>
                  <Input
                    value={accountForm.employeeId}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, employeeId: e.target.value }))}
                    placeholder="Enter employee ID"
                  />
                </div>
              </div>
            </div>

            {/* Security Settings */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <Lock className="h-4 w-4" />
                <span>Security Settings</span>
              </h4>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input
                    type="password"
                    value={accountForm.currentPassword}
                    onChange={(e) => setAccountForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">New Password</label>
                    <Input
                      type="password"
                      value={accountForm.newPassword}
                      onChange={(e) => setAccountForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Enter new password"
                    />
                    <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm New Password</label>
                    <Input
                      type="password"
                      value={accountForm.confirmPassword}
                      onChange={(e) => setAccountForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Confirm new password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <Shield className="h-4 w-4" />
                <span>Account Status</span>
              </h4>
              
              <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Account Active</p>
                    <p className="text-sm text-green-600 dark:text-green-300">Your admin account is active and verified</p>
                  </div>
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Last Login</p>
                  <p className="text-muted-foreground">Today at 9:30 AM</p>
                </div>
                <div>
                  <p className="font-medium">Account Created</p>
                  <p className="text-muted-foreground">January 15, 2024</p>
                </div>
                <div>
                  <p className="font-medium">Role</p>
                  <Badge>System Administrator</Badge>
                </div>
                <div>
                  <p className="font-medium">Two-Factor Auth</p>
                  <Badge variant="outline" className="text-green-600">Enabled</Badge>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4 border-t pt-6">
              <h4 className="text-sm font-medium flex items-center space-x-2 text-red-600">
                <AlertTriangle className="h-4 w-4" />
                <span>Danger Zone</span>
              </h4>
              
              <div className="p-4 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/10">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <p className="font-medium text-red-800 dark:text-red-200">Delete Account</p>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      Permanently delete your admin account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleDeleteAccount}
                    className="ml-4"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveAccountSettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirmation} onOpenChange={setShowDeleteConfirmation}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              <span>Delete Account</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is irreversible. Your account and all associated data will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Warning message */}
            <div className="p-3 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/10">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800 dark:text-red-200">
                  <p className="font-medium mb-1">This will permanently:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Delete your admin account</li>
                    <li>Remove all your data and settings</li>
                    <li>Revoke all system access permissions</li>
                    <li>Cancel any pending operations</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Confirmation fields */}
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Current Password</label>
                <Input
                  type="password"
                  value={deleteForm.confirmPassword}
                  onChange={(e) => setDeleteForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  placeholder="Enter your current password"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Type <span className="font-bold text-red-600">"DELETE MY ACCOUNT"</span> to confirm
                </label>
                <Input
                  value={deleteForm.confirmText}
                  onChange={(e) => setDeleteForm(prev => ({ ...prev, confirmText: e.target.value }))}
                  placeholder="DELETE MY ACCOUNT"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Reason for deletion (required)</label>
                <Textarea
                  value={deleteForm.reason}
                  onChange={(e) => setDeleteForm(prev => ({ ...prev, reason: e.target.value }))}
                  placeholder="Please provide a reason for deleting your account..."
                  rows={3}
                />
              </div>
            </div>

            {/* Final warning */}
            <div className="text-xs text-muted-foreground">
              <p className="font-medium">Note:</p>
              <p>Account deletion requests are reviewed by senior administrators. You may be contacted for additional verification before the deletion is processed.</p>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setDeleteForm({ confirmPassword: '', confirmText: '', reason: '' });
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDeleteAccount}
              disabled={isLoading}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Security Settings Dialog */}
      <AlertDialog open={showSecuritySettings} onOpenChange={setShowSecuritySettings}>
        <AlertDialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Security Settings</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Manage your account security, authentication methods, and access controls
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Two-Factor Authentication */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <ShieldCheck className="h-4 w-4" />
                <span>Two-Factor Authentication</span>
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({
                        ...prev,
                        twoFactorAuth: checked
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Get notified of security events</p>
                    </div>
                    <Switch
                      checked={securitySettings.emailNotifications}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({
                        ...prev,
                        emailNotifications: checked
                      }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Login Alerts</p>
                      <p className="text-sm text-muted-foreground">Alert for new device logins</p>
                    </div>
                    <Switch
                      checked={securitySettings.loginAlerts}
                      onCheckedChange={(checked) => setSecuritySettings(prev => ({
                        ...prev,
                        loginAlerts: checked
                      }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-900/10">
                    <div className="flex items-center space-x-2 mb-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-200">2FA Active</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-300 mb-3">
                      Your account is protected with authenticator app
                    </p>
                    <Button variant="outline" size="sm" onClick={handleGenerateBackupCodes}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate Backup Codes
                    </Button>
                  </div>
                  
                  {securitySettings.backupCodes.length > 0 && (
                    <div className="p-4 border rounded-lg">
                      <p className="font-medium mb-2">Backup Codes</p>
                      <p className="text-sm text-muted-foreground mb-3">
                        Use these codes if you lose access to your authenticator
                      </p>
                      <div className="grid grid-cols-2 gap-2 font-mono text-sm">
                        {securitySettings.backupCodes.map((code, index) => (
                          <div key={index} className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-center">
                            {code}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Session Management */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>Session Management</span>
              </h4>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Session Timeout (minutes)</label>
                  <Select 
                    value={securitySettings.sessionTimeout} 
                    onValueChange={(value) => setSecuritySettings(prev => ({
                      ...prev,
                      sessionTimeout: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="0">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password Expiry (days)</label>
                  <Select 
                    value={securitySettings.passwordExpiry} 
                    onValueChange={(value) => setSecuritySettings(prev => ({
                      ...prev,
                      passwordExpiry: value
                    }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="0">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 pt-6">
                  <Switch
                    checked={securitySettings.allowMultipleSessions}
                    onCheckedChange={(checked) => setSecuritySettings(prev => ({
                      ...prev,
                      allowMultipleSessions: checked
                    }))}
                  />
                  <div>
                    <p className="text-sm font-medium">Multiple Sessions</p>
                    <p className="text-xs text-muted-foreground">Allow concurrent logins</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trusted Devices */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <Monitor className="h-4 w-4" />
                <span>Trusted Devices</span>
              </h4>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Device</TableHead>
                      <TableHead>Last Used</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securitySettings.trustedDevices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.device}</TableCell>
                        <TableCell>{device.lastUsed}</TableCell>
                        <TableCell>{device.location}</TableCell>
                        <TableCell>
                          <Badge variant={device.current ? 'default' : 'secondary'}>
                            {device.current ? 'Current' : 'Trusted'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {!device.current && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRevokeDevice(device.id)}
                            >
                              <UserX className="h-4 w-4 mr-1" />
                              Revoke
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Login History */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <Activity className="h-4 w-4" />
                <span>Recent Login Activity</span>
              </h4>
              
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Device</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securitySettings.loginHistory.map((login) => (
                      <TableRow key={login.id}>
                        <TableCell>{login.timestamp}</TableCell>
                        <TableCell className="font-mono text-sm">{login.ip}</TableCell>
                        <TableCell>{login.location}</TableCell>
                        <TableCell>{login.device}</TableCell>
                        <TableCell>
                          <Badge variant={login.status === 'Success' ? 'default' : 'destructive'}>
                            {login.status === 'Success' ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            {login.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* IP Whitelist */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center space-x-2">
                <Network className="h-4 w-4" />
                <span>IP Address Whitelist</span>
              </h4>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Allowed IP Addresses (comma-separated)</label>
                <Textarea
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    ipWhitelist: e.target.value
                  }))}
                  placeholder="192.168.1.0/24, 10.0.0.100, 203.0.113.0/24"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  Leave empty to allow access from any IP address. Use CIDR notation for subnets.
                </p>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSaveSecuritySettings} disabled={isLoading}>
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Security Settings
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;