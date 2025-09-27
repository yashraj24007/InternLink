import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  Calendar,
  FileText,
  TrendingUp,
  UserCheck,
  MessageSquare,
  Eye,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

const MentorDashboard = () => {
  const stats = [
    { title: "Assigned Students", value: "24", icon: Users, color: "text-primary" },
    { title: "Pending Approvals", value: "8", icon: Clock, color: "text-warning" },
    { title: "Approved This Month", value: "15", icon: CheckCircle, color: "text-success" },
    { title: "Upcoming Interviews", value: "6", icon: Calendar, color: "text-accent" },
  ];

  const pendingApprovals = [
    {
      student: "Sarah Johnson",
      company: "TechCorp Solutions",
      position: "Software Engineer Intern",
      appliedDate: "2024-01-15",
      cgpa: "8.5",
      skills: ["React", "Node.js", "Python"],
      type: "Internship"
    },
    {
      student: "Michael Chen", 
      company: "InnovateLabs",
      position: "Data Science Trainee",
      appliedDate: "2024-01-14",
      cgpa: "9.1",
      skills: ["Python", "Machine Learning", "SQL"],
      type: "Training"
    },
    {
      student: "Emily Rodriguez",
      company: "StartupHub",
      position: "UX Designer",
      appliedDate: "2024-01-13", 
      cgpa: "8.8",
      skills: ["Figma", "User Research", "Prototyping"],
      type: "Placement"
    },
  ];

  const myStudents = [
    {
      name: "Alex Kumar",
      department: "Computer Science",
      cgpa: "8.7",
      status: "Interview Scheduled",
      statusColor: "bg-warning/20 text-warning-foreground",
      company: "TechCorp",
      lastActivity: "Applied to new role"
    },
    {
      name: "Maria Garcia",
      department: "Information Technology", 
      cgpa: "9.0",
      status: "Offer Received",
      statusColor: "bg-success/20 text-success-foreground",
      company: "InnovateLabs",
      lastActivity: "Received job offer"
    },
    {
      name: "James Wilson",
      department: "Electronics",
      cgpa: "8.3",
      status: "Training In Progress",
      statusColor: "bg-primary/20 text-primary-foreground",
      company: "StartupHub", 
      lastActivity: "Week 3 of training"
    },
    {
      name: "Lisa Zhang",
      department: "Computer Science",
      cgpa: "8.9",
      status: "Profile Update Needed",
      statusColor: "bg-destructive/20 text-destructive-foreground",
      company: "-",
      lastActivity: "Profile incomplete"
    },
  ];

  const upcomingInterviews = [
    { student: "Alex Kumar", company: "TechCorp", time: "Today, 2:00 PM", type: "Technical", room: "Lab 101" },
    { student: "Sarah Johnson", company: "TechCorp", time: "Tomorrow, 10:00 AM", type: "HR", room: "Conference Room A" },
    { student: "James Wilson", company: "StartupHub", time: "Jan 18, 3:30 PM", type: "Final", room: "Virtual" },
  ];

  const recentActivity = [
    { student: "Maria Garcia", action: "Completed internship training", time: "2 hours ago", type: "completion" },
    { student: "Alex Kumar", action: "Interview feedback submitted", time: "1 day ago", type: "feedback" },
    { student: "Lisa Zhang", action: "Profile updated with new skills", time: "2 days ago", type: "profile" },
    { student: "Sarah Johnson", action: "Application approved", time: "3 days ago", type: "approval" },
  ];

  return (
    <DashboardLayout role="mentor" title="Faculty Mentor Dashboard">
      <div className="space-y-6">
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
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pending Approvals */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-warning" />
              Pending Approvals
            </CardTitle>
            <CardDescription>Student applications requiring your approval</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApprovals.map((approval, index) => (
              <div key={index} className="p-4 rounded-lg border bg-background/50 hover:bg-background/70 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{approval.student}</h4>
                    <p className="text-muted-foreground">{approval.position} at {approval.company}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span>CGPA: {approval.cgpa}</span>
                      <span>Applied: {approval.appliedDate}</span>
                    </div>
                  </div>
                  <Badge variant="outline">
                    {approval.type}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {approval.skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    Review Details
                  </Button>
                  <Button size="sm" variant="success">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button size="sm" variant="destructive">
                    <ThumbsDown className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Students */}
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                My Students
              </CardTitle>
              <CardDescription>Students under your mentorship</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {myStudents.map((student, index) => (
                <div key={index} className="p-3 rounded-lg bg-background/50 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{student.name}</h4>
                    <Badge className={student.statusColor}>
                      {student.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    <p>{student.department} • CGPA: {student.cgpa}</p>
                    {student.company !== "-" && <p>Current: {student.company}</p>}
                  </div>
                  <p className="text-xs text-muted-foreground italic">{student.lastActivity}</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Message
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="w-3 h-3 mr-1" />
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Students
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
              <CardDescription>Monitor your students' interviews</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingInterviews.map((interview, index) => (
                <div key={index} className="p-3 rounded-lg bg-background/50 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{interview.student}</h4>
                    <Badge variant="outline" className="text-xs">
                      {interview.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>{interview.company}</p>
                    <p>{interview.time}</p>
                    <p>Location: {interview.room}</p>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="text-xs">
                      <Calendar className="w-3 h-3 mr-1" />
                      Add to Calendar
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

        {/* Recent Activity */}
        <Card className="bg-gradient-card border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates from your students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-background/30 border">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'completion' ? 'bg-success' :
                    activity.type === 'feedback' ? 'bg-primary' :
                    activity.type === 'profile' ? 'bg-warning' :
                    'bg-accent'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.student}</span> {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MentorDashboard;