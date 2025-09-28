import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  User, 
  Briefcase, 
  Calendar, 
  Star, 
  Settings, 
  Award,
  Brain,
  Target,
  Users,
  BookOpen,
  TrendingUp,
  MessageCircle,
  Video,
  CheckCircle,
  Clock,
  Play,
  Trophy,
  Zap,
  Network,
  UserPlus,
  MapPin,
  Building2,
  Lightbulb,
  BarChart3,
  Search
} from 'lucide-react';

const SimpleStudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background p-6 pt-18">
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
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-10">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="interviews">Interviews</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="career">Career</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
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

          {/* Skills Assessment Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skill Assessment Center */}
              <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-b border-blue-100 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-lg">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-bold">
                        Skill Assessment Center
                      </CardTitle>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        Test your skills and get certified
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">7</p>
                            <p className="text-sm text-green-700 dark:text-green-300">Completed</p>
                          </div>
                          <Trophy className="w-8 h-8 text-green-500" />
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">In Progress</p>
                          </div>
                          <Clock className="w-8 h-8 text-blue-500" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-gray-900 dark:text-white">Available Assessments</h4>
                      {[
                        { skill: "JavaScript Fundamentals", difficulty: "Beginner", duration: "30 min", status: "available", icon: "💻" },
                        { skill: "React Development", difficulty: "Intermediate", duration: "45 min", status: "in-progress", icon: "⚛️" },
                        { skill: "Data Structures & Algorithms", difficulty: "Advanced", duration: "60 min", status: "completed", icon: "🧮" },
                        { skill: "Python Programming", difficulty: "Intermediate", duration: "40 min", status: "available", icon: "🐍" }
                      ].map((assessment, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{assessment.icon}</span>
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-white">{assessment.skill}</h5>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Badge variant={assessment.difficulty === 'Beginner' ? 'secondary' : assessment.difficulty === 'Intermediate' ? 'default' : 'destructive'} className="text-xs">
                                    {assessment.difficulty}
                                  </Badge>
                                  <span>•</span>
                                  <span>{assessment.duration}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge variant={
                                assessment.status === 'completed' ? 'default' : 
                                assessment.status === 'in-progress' ? 'secondary' : 
                                'outline'
                              } className={
                                assessment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                assessment.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'border-blue-200 text-blue-800 dark:border-blue-800 dark:text-blue-200'
                              }>
                                {assessment.status === 'completed' ? <CheckCircle className="w-3 h-3 mr-1" /> : 
                                 assessment.status === 'in-progress' ? <Clock className="w-3 h-3 mr-1" /> : 
                                 <Play className="w-3 h-3 mr-1" />}
                                {assessment.status === 'completed' ? 'Completed' : 
                                 assessment.status === 'in-progress' ? 'Continue' : 
                                 'Start Test'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <Brain className="w-4 h-4 mr-2" />
                      Browse All Assessments
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Skill Analytics */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      Skill Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { skill: "Frontend Development", level: 85, color: "bg-blue-500" },
                        { skill: "Backend Development", level: 70, color: "bg-green-500" },
                        { skill: "Data Science", level: 60, color: "bg-purple-500" },
                        { skill: "Mobile Development", level: 45, color: "bg-orange-500" }
                      ].map((skill, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{skill.skill}</span>
                            <span className="text-sm text-gray-500">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-yellow-600" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "JavaScript Expert", date: "2 days ago", icon: "🏆" },
                        { title: "Problem Solver", date: "1 week ago", icon: "🧩" },
                        { title: "Team Player", date: "2 weeks ago", icon: "👥" }
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{achievement.title}</p>
                            <p className="text-sm text-gray-500">{achievement.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Career Guidance Tab */}
          <TabsContent value="career" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Career Path Recommendations */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 border-b border-green-100 dark:border-green-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent font-bold">
                          Personalized Career Path
                        </CardTitle>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          AI-powered recommendations based on your skills and interests
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      {[
                        {
                          title: "Full Stack Developer",
                          match: 92,
                          description: "Build end-to-end web applications using modern technologies",
                          skills: ["React", "Node.js", "MongoDB", "AWS"],
                          companies: ["Google", "Microsoft", "Spotify"],
                          salary: "₹12-18 LPA"
                        },
                        {
                          title: "Frontend Engineer",
                          match: 88,
                          description: "Create beautiful and responsive user interfaces",
                          skills: ["React", "TypeScript", "CSS", "Figma"],
                          companies: ["Netflix", "Airbnb", "Uber"],
                          salary: "₹10-15 LPA"
                        },
                        {
                          title: "Data Scientist",
                          match: 75,
                          description: "Extract insights from data to drive business decisions",
                          skills: ["Python", "Machine Learning", "SQL", "Tableau"],
                          companies: ["Amazon", "IBM", "Accenture"],
                          salary: "₹15-25 LPA"
                        }
                      ].map((path, index) => (
                        <div key={index} className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{path.title}</h3>
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                  {path.match}% Match
                                </Badge>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-3">{path.description}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  <span>{path.companies.join(", ")}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-4 h-4" />
                                  <span>{path.salary}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {path.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <Button size="sm" className="ml-4">
                              <Target className="w-4 h-4 mr-1" />
                              Explore Path
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Resources */}
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      Recommended Learning Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Advanced React Patterns", type: "Course", duration: "6 hours", provider: "Coursera", rating: 4.8 },
                        { title: "System Design Interview", type: "Book", pages: "350 pages", provider: "O'Reilly", rating: 4.9 },
                        { title: "AWS Cloud Practitioner", type: "Certification", duration: "40 hours", provider: "AWS", rating: 4.7 },
                        { title: "JavaScript Algorithms", type: "Practice", problems: "150+ problems", provider: "LeetCode", rating: 4.6 }
                      ].map((resource, index) => (
                        <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-all">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 dark:text-white mb-1">{resource.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                                <span>•</span>
                                <span>{resource.duration || resource.pages || resource.problems}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="text-gray-600 dark:text-gray-400">{resource.provider}</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-gray-600">{resource.rating}</span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              Start
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Career Mentor & Tools */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-purple-600" />
                      Career Mentor
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <Avatar className="w-16 h-16 mx-auto">
                        <AvatarImage src="/api/placeholder/64/64" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Sarah Mitchell</h4>
                        <p className="text-sm text-gray-500">Senior Software Engineer at Google</p>
                        <Badge variant="secondary" className="mt-1">Your Mentor</Badge>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full" size="sm">
                          <Video className="w-4 h-4 mr-2" />
                          Schedule 1:1 Call
                        </Button>
                        <Button variant="outline" className="w-full" size="sm">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-600" />
                      Career Tools
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Target className="w-4 h-4 mr-2" />
                        Career Assessment
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Salary Calculator
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Interview Prep
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Award className="w-4 h-4 mr-2" />
                        Resume Builder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Peer Networking Tab */}
          <TabsContent value="network" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Networking Hub */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-b border-purple-100 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-500 rounded-lg">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                            Student Network
                          </CardTitle>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Connect with peers and build your professional network
                          </p>
                        </div>
                      </div>
                      <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Find Peers
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          {
                            name: "Alex Chen",
                            role: "CS Final Year",
                            university: "IIT Delhi",
                            interests: ["React", "AI/ML", "Startup"],
                            connections: 45,
                            isOnline: true
                          },
                          {
                            name: "Priya Sharma",
                            role: "ECE 3rd Year",
                            university: "BITS Pilani",
                            interests: ["IoT", "Embedded Systems", "Hardware"],
                            connections: 32,
                            isOnline: false
                          },
                          {
                            name: "Rahul Gupta",
                            role: "IT Graduate",
                            university: "NIT Warangal",
                            interests: ["DevOps", "Cloud", "Backend"],
                            connections: 67,
                            isOnline: true
                          },
                          {
                            name: "Maya Patel",
                            role: "CS 2nd Year",
                            university: "IIIT Hyderabad",
                            interests: ["Data Science", "Python", "Research"],
                            connections: 28,
                            isOnline: true
                          }
                        ].map((peer, index) => (
                          <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-lg transition-all">
                            <div className="flex items-start gap-3">
                              <div className="relative">
                                <Avatar className="w-12 h-12">
                                  <AvatarImage src={`/api/placeholder/48/48`} />
                                  <AvatarFallback>{peer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                {peer.isOnline && (
                                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-gray-900 dark:text-white">{peer.name}</h4>
                                  {peer.isOnline && <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">Online</Badge>}
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{peer.role}</p>
                                <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
                                  <MapPin className="w-3 h-3" />
                                  <span>{peer.university}</span>
                                </div>
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {peer.interests.slice(0, 2).map((interest, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {interest}
                                    </Badge>
                                  ))}
                                  {peer.interests.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{peer.interests.length - 2}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">{peer.connections} connections</span>
                                  <div className="flex gap-1">
                                    <Button size="sm" variant="outline" className="h-7 px-2">
                                      <MessageCircle className="w-3 h-3" />
                                    </Button>
                                    <Button size="sm" className="h-7 px-3">
                                      <UserPlus className="w-3 h-3 mr-1" />
                                      Connect
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Study Groups & Communities</h4>
                        <div className="space-y-3">
                          {[
                            { name: "React Developers Circle", members: 234, category: "Frontend", isJoined: true },
                            { name: "Data Science Study Group", members: 156, category: "Data Science", isJoined: false },
                            { name: "Competitive Programming", members: 189, category: "Algorithms", isJoined: true },
                            { name: "Startup Enthusiasts", members: 78, category: "Entrepreneurship", isJoined: false }
                          ].map((group, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                  <Users className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-900 dark:text-white">{group.name}</h5>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{group.members} members</span>
                                    <span>•</span>
                                    <Badge variant="outline" className="text-xs">{group.category}</Badge>
                                  </div>
                                </div>
                              </div>
                              <Button size="sm" variant={group.isJoined ? "outline" : "default"}>
                                {group.isJoined ? "Joined" : "Join"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Networking Stats & Quick Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="w-5 h-5 text-blue-600" />
                      Your Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">42</p>
                            <p className="text-sm text-blue-700 dark:text-blue-300">Connections</p>
                          </div>
                          <Users className="w-8 h-8 text-blue-500" />
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">7</p>
                            <p className="text-sm text-green-700 dark:text-green-300">Groups Joined</p>
                          </div>
                          <Network className="w-8 h-8 text-green-500" />
                        </div>
                      </div>
                      <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">23</p>
                            <p className="text-sm text-purple-700 dark:text-purple-300">Messages</p>
                          </div>
                          <MessageCircle className="w-8 h-8 text-purple-500" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button className="w-full" size="sm">
                        <Search className="w-4 h-4 mr-2" />
                        Find People
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        Events Near You
                      </Button>
                      <Button variant="outline" className="w-full" size="sm">
                        <Zap className="w-4 h-4 mr-2" />
                        Create Study Group
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      Trending Topics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        { topic: "Web3 Development", posts: 45 },
                        { topic: "AI/ML Jobs", posts: 38 },
                        { topic: "Remote Internships", posts: 29 },
                        { topic: "System Design", posts: 24 },
                        { topic: "Startup Funding", posts: 19 }
                      ].map((trend, index) => (
                        <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg cursor-pointer">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">#{trend.topic}</span>
                          <span className="text-xs text-gray-500">{trend.posts} posts</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
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