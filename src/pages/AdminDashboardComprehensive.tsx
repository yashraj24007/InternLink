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
  ArrowRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

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
    { id: 3, user: 'jane@example.com', action: 'Document Upload', timestamp: '2024-01-15 08:45:00', ip: '192.168.1.50' }
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
      description: "CSV/Excel bulk upload feature coming soon.",
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
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="font-semibold">System Administration</span>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                Online
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
                <DropdownMenuItem className="cursor-pointer">
                  <UserCircle className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* System Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Users</p>
                      <p className="text-3xl font-bold">{systemStats.totalUsers.toLocaleString()}</p>
                    </div>
                    <Users className="h-12 w-12 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Active Opportunities</p>
                      <p className="text-3xl font-bold">{(systemStats.activeInternships + systemStats.activeJobs).toLocaleString()}</p>
                    </div>
                    <Briefcase className="h-12 w-12 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Pending Approvals</p>
                      <p className="text-3xl font-bold">{systemStats.pendingApprovals}</p>
                    </div>
                    <Clock className="h-12 w-12 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">System Uptime</p>
                      <p className="text-3xl font-bold">{systemStats.systemUptime}</p>
                    </div>
                    <Activity className="h-12 w-12 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Role Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>User Role Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <GraduationCap className="h-4 w-4 text-blue-500" />
                        <span>Students</span>
                      </span>
                      <span className="font-semibold">{systemStats.totalStudents.toLocaleString()}</span>
                    </div>
                    <Progress value={(systemStats.totalStudents / systemStats.totalUsers) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span>Mentors</span>
                      </span>
                      <span className="font-semibold">{systemStats.totalMentors}</span>
                    </div>
                    <Progress value={(systemStats.totalMentors / systemStats.totalUsers) * 100} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center space-x-2">
                        <Building className="h-4 w-4 text-orange-500" />
                        <span>Recruiters</span>
                      </span>
                      <span className="font-semibold">{systemStats.totalRecruiters}</span>
                    </div>
                    <Progress value={(systemStats.totalRecruiters / systemStats.totalUsers) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5" />
                    <span>System Health</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Server Load</span>
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Access Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Quick Access Panel</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <UserPlus className="h-6 w-6" />
                    <span className="text-sm">Add Users</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">Manage Roles</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <FileText className="h-6 w-6" />
                    <span className="text-sm">View Logs</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2">
                    <Settings className="h-6 w-6" />
                    <span className="text-sm">System Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User & Role Management</h2>
              <div className="flex space-x-2">
                <Button onClick={handleBulkUserUpload} variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Bulk Upload
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* User Management Table */}
            <Card>
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

          {/* Content Moderation Tab */}
          <TabsContent value="content" className="space-y-6">
            <h2 className="text-2xl font-bold">System Oversight & Content Moderation</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileCheck className="h-5 w-5" />
                    <span>Content Approval Queue</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Resume Upload - John Doe</p>
                        <p className="text-sm text-gray-500">Uploaded 2 hours ago</p>
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
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Approval Overrides</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Application Conflict</p>
                        <p className="text-sm text-gray-500">Duplicate application detected</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Resolve
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Mentor Approval Override</p>
                        <p className="text-sm text-gray-500">Requires admin intervention</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <h2 className="text-2xl font-bold">Security & Compliance</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Audit Logs</span>
                  </CardTitle>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ShieldCheck className="h-5 w-5" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Multi-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Enforce MFA for all users</p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Password Policy</p>
                      <p className="text-sm text-gray-500">Strong password requirements</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Session Timeout</p>
                      <p className="text-sm text-gray-500">Auto-logout inactive users</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Backup & Restore */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Archive className="h-5 w-5" />
                  <span>Backup & Restore</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium">Last Backup</p>
                    <p className="text-sm text-gray-500">{systemHealth.lastBackup}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium">Backup Status</p>
                    <Badge variant="default" className="bg-green-100 text-green-800">Automated</Badge>
                  </div>
                  <div className="space-y-2">
                    <Button onClick={handleSystemBackup} disabled={isLoading}>
                      {isLoading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <CloudDownload className="h-4 w-4 mr-2" />}
                      Backup Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Analytics & Reporting</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>System-Wide Reports</span>
                  </CardTitle>
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
                    Department-wise Statistics
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Custom Report Generation</span>
                  </CardTitle>
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
                    </SelectContent>
                  </Select>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      PDF Export
                    </Button>
                    <Button variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Excel Export
                    </Button>
                  </div>
                  
                  <Button className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Insights</span>
                </CardTitle>
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
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      <span className="font-medium">Low Engagement</span>
                    </div>
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-sm text-gray-500">Recruiters with no postings</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Skill Gaps</span>
                    </div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-sm text-gray-500">Critical skill areas identified</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Configuration Tab */}
          <TabsContent value="system" className="space-y-6">
            <h2 className="text-2xl font-bold">System Configuration</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Portal Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Application Deadline</label>
                    <Input type="date" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interview Window</label>
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
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-5 w-5" />
                    <span>Integration Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Google Calendar API</label>
                    <Input placeholder="Enter API key" type="password" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Service</label>
                    <Input placeholder="SMTP configuration" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Video Conference</label>
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
                  
                  <Button className="w-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Template Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Template Management</span>
                </CardTitle>
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
          <TabsContent value="resources" className="space-y-6">
            <h2 className="text-2xl font-bold">Resources & Training</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Monitor className="h-5 w-5" />
                    <span>System Health Monitoring</span>
                  </CardTitle>
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
                      <p className="text-sm text-gray-500">Active Users</p>
                      <p className="text-2xl font-bold">{systemHealth.activeUsers}</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-500">Error Rate</p>
                      <p className="text-2xl font-bold text-green-600">{(systemHealth.errorRate * 100).toFixed(2)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Training & Guidelines</span>
                  </CardTitle>
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
                    Security Best Practices
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    System Documentation
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Alumni & Recruiter Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5" />
                  <span>Alumni & Recruiter Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg text-center">
                    <GraduationCap className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                    <p className="font-medium">Alumni Database</p>
                    <p className="text-2xl font-bold">1,245</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <Building className="h-8 w-8 mx-auto mb-2 text-green-500" />
                    <p className="font-medium">Verified Recruiters</p>
                    <p className="text-2xl font-bold">{systemStats.totalRecruiters}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Verify
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg text-center">
                    <Award className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                    <p className="font-medium">Partner Companies</p>
                    <p className="text-2xl font-bold">87</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Track
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bonus Features */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Advanced Features</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">Role Analytics</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Track mentor and recruiter activity levels</p>
                    <Button variant="outline" size="sm">View Analytics</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Bell className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Smart Alerts</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Automated alerts for system anomalies</p>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Palette className="h-5 w-5 text-purple-500" />
                      <span className="font-medium">Custom Widgets</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Personalize dashboard layout</p>
                    <Button variant="outline" size="sm">Customize</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Activity className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Real-time Monitoring</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Live system performance tracking</p>
                    <Button variant="outline" size="sm">Monitor</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;