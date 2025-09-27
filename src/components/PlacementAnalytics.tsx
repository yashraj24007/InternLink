import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  TrendingUp, 
  Users, 
  Building2, 
  Calendar, 
  Award, 
  Target,
  ArrowUp,
  ArrowDown,
  Minus
} from "lucide-react";

interface PlacementStats {
  totalStudents: number;
  placedStudents: number;
  activeApplications: number;
  scheduledInterviews: number;
  averageSalary: number;
  topRecruiters: Array<{ name: string; placements: number }>;
  departmentStats: Array<{ department: string; placed: number; total: number }>;
  weeklyApplications: Array<{ week: string; applications: number; interviews: number }>;
  salaryRanges: Array<{ range: string; count: number }>;
  upcomingInterviews: Array<{
    id: string;
    student: string;
    company: string;
    position: string;
    date: string;
    time: string;
    type: string;
  }>;
}

interface PlacementAnalyticsProps {
  stats: PlacementStats;
}

export function PlacementAnalytics({ stats }: PlacementAnalyticsProps) {
  const placementRate = Math.round((stats.placedStudents / stats.totalStudents) * 100);
  
  const pieData = [
    { name: 'Placed', value: stats.placedStudents, color: '#22c55e' },
    { name: 'Unplaced', value: stats.totalStudents - stats.placedStudents, color: '#ef4444' },
  ];

  const COLORS = ['#22c55e', '#ef4444'];

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    trend, 
    trendValue 
  }: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: any;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
  }) => (
    <Card>
      <CardContent className="flex items-center p-6">
        <div className="flex items-center space-x-4 w-full">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 text-sm ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {trend === 'up' && <ArrowUp className="w-4 h-4" />}
              {trend === 'down' && <ArrowDown className="w-4 h-4" />}
              {trend === 'neutral' && <Minus className="w-4 h-4" />}
              {trendValue}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Students"
          value={stats.totalStudents}
          subtitle="Registered for placement"
          icon={Users}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Placement Rate"
          value={`${placementRate}%`}
          subtitle={`${stats.placedStudents} of ${stats.totalStudents} placed`}
          icon={Target}
          trend="up"
          trendValue="+5%"
        />
        <StatCard
          title="Active Applications"
          value={stats.activeApplications}
          subtitle="Pending responses"
          icon={Building2}
          trend="neutral"
          trendValue="±0%"
        />
        <StatCard
          title="Average Salary"
          value={`₹${(stats.averageSalary / 100000).toFixed(1)}L`}
          subtitle="Annual package"
          icon={Award}
          trend="up"
          trendValue="+8%"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Placement Rate Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Placement Status</CardTitle>
            <CardDescription>Overall placement statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm">Placed ({stats.placedStudents})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-sm">Unplaced ({stats.totalStudents - stats.placedStudents})</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Department-wise Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Department-wise Placements</CardTitle>
            <CardDescription>Placement rates by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.departmentStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="department" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="placed" fill="#22c55e" name="Placed" />
                  <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Application Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Application & Interview Trends</CardTitle>
          <CardDescription>Weekly application and interview statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.weeklyApplications}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="#3b82f6" 
                  name="Applications"
                  strokeWidth={3}
                />
                <Line 
                  type="monotone" 
                  dataKey="interviews" 
                  stroke="#f59e0b" 
                  name="Interviews"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Recruiters */}
        <Card>
          <CardHeader>
            <CardTitle>Top Recruiters</CardTitle>
            <CardDescription>Companies with most placements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topRecruiters.map((recruiter, index) => (
                <div key={recruiter.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{recruiter.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {recruiter.placements} placement{recruiter.placements !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{recruiter.placements}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Interviews This Week */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Interviews</CardTitle>
                <CardDescription>This week's scheduled interviews</CardDescription>
              </div>
              <Badge variant="outline">{stats.upcomingInterviews.length} scheduled</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {stats.upcomingInterviews.map((interview) => (
                <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">{interview.student}</p>
                    <p className="text-sm text-muted-foreground">
                      {interview.company} • {interview.position}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(interview.date).toLocaleDateString()}
                      </div>
                      <span>{interview.time}</span>
                      <Badge variant="outline" className="text-xs">
                        {interview.type}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
              
              {stats.upcomingInterviews.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No interviews scheduled this week</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}