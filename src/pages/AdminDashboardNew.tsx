import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
  Clock
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Total Users", value: "3,124", change: "+8%", icon: Users, color: "text-primary" },
    { title: "System Uptime", value: "99.9%", change: "0%", icon: Server, color: "text-success" },
    { title: "Active Sessions", value: "892", change: "+15%", icon: Activity, color: "text-warning" },
    { title: "Security Alerts", value: "3", change: "-2", icon: Shield, color: "text-red-600" },
  ];

  const userStats = [
    { role: "Students", count: 2847, active: 2645, growth: "+12%" },
    { role: "Mentors", count: 156, active: 142, growth: "+5%" },
    { role: "Recruiters", count: 89, active: 78, growth: "+8%" },
    { role: "Placement Cell", count: 32, active: 28, growth: "+2%" },
  ];

  const systemLogs = [
    { time: "2024-01-20 14:30", type: "Info", message: "User login: john.doe@university.edu", status: "success" },
    { time: "2024-01-20 14:25", type: "Warning", message: "Failed login attempt from IP: 192.168.1.100", status: "warning" },
    { time: "2024-01-20 14:20", type: "Error", message: "Database connection timeout", status: "error" },
    { time: "2024-01-20 14:15", type: "Info", message: "System backup completed successfully", status: "success" },
  ];

  const securityAlerts = [
    { id: 1, type: "Suspicious Activity", message: "Multiple failed login attempts detected", severity: "high", time: "2 hours ago" },
    { id: 2, type: "Data Access", message: "Unusual data export volume detected", severity: "medium", time: "4 hours ago" },
    { id: 3, type: "System Update", message: "Security patch available for deployment", severity: "low", time: "1 day ago" },
  ];

  const systemHealth = [
    { component: "Database", status: "healthy", uptime: "99.9%", lastCheck: "2 min ago" },
    { component: "API Server", status: "healthy", uptime: "99.8%", lastCheck: "1 min ago" },
    { component: "File Storage", status: "warning", uptime: "98.5%", lastCheck: "5 min ago" },
    { component: "Email Service", status: "healthy", uptime: "99.7%", lastCheck: "3 min ago" },
  ];

  const recentUsers = [
    { id: 1, name: "John Doe", email: "john.doe@university.edu", role: "student", status: "active", lastLogin: "5 min ago" },
    { id: 2, name: "Dr. Smith", email: "smith@university.edu", role: "mentor", status: "active", lastLogin: "1 hour ago" },
    { id: 3, name: "Jane Wilson", email: "jane@techcorp.com", role: "recruiter", status: "pending", lastLogin: "Never" },
    { id: 4, name: "Admin User", email: "admin@university.edu", role: "placement_cell", status: "active", lastLogin: "2 hours ago" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">System Administration</h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage users, system health, and security</p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link to="/">
                <Home className="w-5 h-5" />
              </Link>
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </div>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
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
              {/* User Statistics */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    User Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userStats.map((stat, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{stat.role}</h4>
                          <p className="text-sm text-muted-foreground">{stat.active} active of {stat.count} total</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">{stat.growth}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* System Health */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-green-600" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemHealth.map((component, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {component.status === 'healthy' ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : component.status === 'warning' ? (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-600" />
                          )}
                          <div>
                            <h4 className="font-medium">{component.component}</h4>
                            <p className="text-sm text-muted-foreground">Uptime: {component.uptime}</p>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground">{component.lastCheck}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Security Alerts */}
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Security Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {securityAlerts.map((alert) => (
                      <div key={alert.id} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{alert.type}</h4>
                          <Badge 
                            variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'secondary' : 'outline'}
                            className="text-xs"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Performance */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  System Performance
                </CardTitle>
                <CardDescription>Real-time system resource usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">CPU Usage</span>
                    </div>
                    <Progress value={68} className="h-2" />
                    <p className="text-xs text-muted-foreground">68% (4 cores)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MemoryStick className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">Memory</span>
                    </div>
                    <Progress value={72} className="h-2" />
                    <p className="text-xs text-muted-foreground">72% (12GB / 16GB)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">Storage</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-muted-foreground">45% (450GB / 1TB)</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Network className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">Network</span>
                    </div>
                    <Progress value={23} className="h-2" />
                    <p className="text-xs text-muted-foreground">23% (230 Mbps)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Users
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add User
                </Button>
              </div>
            </div>

            {/* User Search and Filters */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Search & Filter Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search users..." className="pl-10" />
                    </div>
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Users Table */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Latest user registrations and activities</CardDescription>
              </CardHeader>
              <CardContent>
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
                    {recentUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={user.status === 'active' ? 'default' : user.status === 'pending' ? 'secondary' : 'destructive'}
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
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

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">System Configuration</h2>
              <p className="text-muted-foreground">System settings and configuration management coming soon...</p>
            </div>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Security Management</h2>
              <p className="text-muted-foreground">Security policies and access control coming soon...</p>
            </div>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  System Logs
                </CardTitle>
                <CardDescription>Recent system activities and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemLogs.map((log, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {log.status === 'success' ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : log.status === 'warning' ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <div>
                          <p className="text-sm">{log.message}</p>
                          <p className="text-xs text-muted-foreground">{log.time}</p>
                        </div>
                      </div>
                      <Badge 
                        variant={log.type === 'Info' ? 'default' : log.type === 'Warning' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {log.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">System Settings</h2>
              <p className="text-muted-foreground">Global system configuration coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;