import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Briefcase, Calendar, Star, Settings, Award } from 'lucide-react';

const SimpleStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Student Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your internship journey overview.</p>
          </div>
          <Link to="/">
            <Button variant="outline">
              ← Back to Homepage
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Applications Sent", value: "12", icon: Briefcase },
                { title: "Interviews Scheduled", value: "3", icon: Calendar },
                { title: "Offers Received", value: "2", icon: Star },
                { title: "Profile Completion", value: "85%", icon: User }
              ].map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest application updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { company: "TechCorp", position: "Software Engineer Intern", status: "Interview Scheduled" },
                    { company: "DataFlow", position: "Data Analyst Trainee", status: "Under Review" },
                    { company: "StartupHub", position: "Full Stack Developer", status: "Offer Received" }
                  ].map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{app.position}</p>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                      </div>
                      <Badge variant="outline">{app.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  My Profile
                </CardTitle>
                <CardDescription>Manage your profile information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">John Doe</h3>
                      <p className="text-muted-foreground">Computer Science • Final Year</p>
                      <Badge className="mt-1">Profile 85% Complete</Badge>
                    </div>
                  </div>
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Opportunities</CardTitle>
                <CardDescription>Discover internships and jobs matching your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { company: "InnovateTech", position: "Frontend Developer Intern", location: "Bangalore", salary: "₹25,000/month" },
                    { company: "DataCorp", position: "Data Science Trainee", location: "Mumbai", salary: "₹20,000/month" }
                  ].map((opp, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg">{opp.position}</CardTitle>
                        <CardDescription>{opp.company} • {opp.location}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="font-medium">{opp.salary}</p>
                          <Button className="w-full">Apply Now</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  My Applications
                </CardTitle>
                <CardDescription>Track all your applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { company: "TechCorp", position: "Software Engineer Intern", status: "Interview Scheduled", date: "2024-01-10" },
                    { company: "DataFlow", position: "Data Analyst Trainee", status: "Under Review", date: "2024-01-08" },
                    { company: "StartupHub", position: "Full Stack Developer", status: "Offer Received", date: "2024-01-05" }
                  ].map((app, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{app.position}</h3>
                        <Badge variant="outline">{app.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                      <p className="text-xs text-muted-foreground">Applied: {app.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Interviews
                </CardTitle>
                <CardDescription>Your scheduled interviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { company: "TechCorp", position: "Software Engineer Intern", date: "Jan 15, 2024", time: "2:00 PM" },
                    { company: "DataFlow", position: "Data Analyst Trainee", date: "Jan 18, 2024", time: "10:00 AM" }
                  ].map((interview, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <h3 className="font-medium">{interview.position}</h3>
                      <p className="text-sm text-muted-foreground">{interview.company}</p>
                      <p className="text-sm">{interview.date} at {interview.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  My Certificates
                </CardTitle>
                <CardDescription>Your achievements and certifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "AWS Certified Developer", organization: "Amazon Web Services", date: "Aug 2024" },
                    { name: "React Professional Certificate", organization: "Meta", date: "Jun 2024" },
                    { name: "Google Analytics Certified", organization: "Google", date: "May 2024" }
                  ].map((cert, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Award className="w-5 h-5" />
                          {cert.name}
                        </CardTitle>
                        <CardDescription>{cert.organization}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Earned: {cert.date}</p>
                        <Button size="sm" variant="outline" className="mt-2">View Certificate</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Profile Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Profile Visibility</span>
                        <Badge variant="outline">Public</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email Notifications</span>
                        <Badge variant="outline">Enabled</Badge>
                      </div>
                    </div>
                  </div>
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SimpleStudentDashboard;