import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  User, 
  GraduationCap, 
  Award, 
  Upload, 
  Download, 
  Plus, 
  X, 
  Star,
  FileText,
  Briefcase,
  CheckCircle
} from 'lucide-react';
import { SKILL_LEVELS, getSkillLevelColor, SkillLevel } from '@/utils/roleUtils';

interface StudentProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  studentId: string;
  department: string;
  yearOfStudy: string;
  cgpa: string;
  courses: string[];
  certifications: string[];
  skills: { name: string; level: SkillLevel; verified: boolean }[];
  resume: { name: string; version: number; uploadDate: string }[];
  coverLetter: string;
  completionPercentage: number;
}

const ProfileBuilder: React.FC = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState<StudentProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    studentId: '',
    department: '',
    yearOfStudy: '',
    cgpa: '',
    courses: [],
    certifications: [],
    skills: [],
    resume: [],
    coverLetter: '',
    completionPercentage: 0
  });
  
  const [newSkill, setNewSkill] = useState({ name: '', level: SKILL_LEVELS.BEGINNER as SkillLevel });
  const [newCourse, setNewCourse] = useState('');
  const [newCertification, setNewCertification] = useState('');

  const departments = [
    'Computer Science', 'Information Technology', 'Electronics', 'Mechanical', 
    'Civil', 'Chemical', 'Electrical', 'Biotechnology', 'MBA', 'Other'
  ];

  const yearOptions = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Final Year'];

  const calculateCompletion = () => {
    const fields = [
      profile.name, profile.email, profile.phone, profile.studentId,
      profile.department, profile.yearOfStudy, profile.cgpa
    ];
    const filledFields = fields.filter(field => field && field.trim() !== '').length;
    const skillsScore = profile.skills.length > 0 ? 1 : 0;
    const resumeScore = profile.resume.length > 0 ? 1 : 0;
    const coursesScore = profile.courses.length > 0 ? 1 : 0;
    
    const totalScore = filledFields + skillsScore + resumeScore + coursesScore;
    return Math.round((totalScore / 10) * 100);
  };

  const updateProfile = (field: keyof StudentProfile, value: any) => {
    const updated = { ...profile, [field]: value };
    updated.completionPercentage = calculateCompletion();
    setProfile(updated);
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      const skills = [...profile.skills, { ...newSkill, verified: false }];
      updateProfile('skills', skills);
      setNewSkill({ name: '', level: SKILL_LEVELS.BEGINNER });
      toast({
        title: "Skill Added",
        description: "Skill added to your profile. Request mentor verification."
      });
    }
  };

  const removeSkill = (index: number) => {
    const skills = profile.skills.filter((_, i) => i !== index);
    updateProfile('skills', skills);
  };

  const addCourse = () => {
    if (newCourse.trim()) {
      const courses = [...profile.courses, newCourse.trim()];
      updateProfile('courses', courses);
      setNewCourse('');
    }
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      const certifications = [...profile.certifications, newCertification.trim()];
      updateProfile('certifications', certifications);
      setNewCertification('');
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newResume = {
        name: file.name,
        version: profile.resume.length + 1,
        uploadDate: new Date().toLocaleDateString()
      };
      const resume = [...profile.resume, newResume];
      updateProfile('resume', resume);
      toast({
        title: "Resume Uploaded",
        description: `Version ${newResume.version} uploaded successfully`
      });
    }
  };

  const saveProfile = () => {
    toast({
      title: "Profile Saved",
      description: "Your profile has been updated successfully"
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Completion Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Builder
              </CardTitle>
              <CardDescription>
                Complete your profile to get better internship recommendations
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {calculateCompletion()}%
              </div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>
          <Progress value={calculateCompletion()} className="mt-4" />
        </CardHeader>
      </Card>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="academic">Academic</TabsTrigger>
          <TabsTrigger value="skills">Skills & Certs</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => updateProfile('name', e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => updateProfile('email', e.target.value)}
                    placeholder="your.email@college.edu"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => updateProfile('phone', e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input
                    id="dob"
                    type="date"
                    value={profile.dateOfBirth}
                    onChange={(e) => updateProfile('dateOfBirth', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => updateProfile('address', e.target.value)}
                  placeholder="Enter your complete address"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academic Details Tab */}
        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5" />
                Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID *</Label>
                  <Input
                    id="studentId"
                    value={profile.studentId}
                    onChange={(e) => updateProfile('studentId', e.target.value)}
                    placeholder="e.g., CS2021001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department *</Label>
                  <Select value={profile.department} onValueChange={(value) => updateProfile('department', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year of Study *</Label>
                  <Select value={profile.yearOfStudy} onValueChange={(value) => updateProfile('yearOfStudy', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cgpa">CGPA *</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={profile.cgpa}
                    onChange={(e) => updateProfile('cgpa', e.target.value)}
                    placeholder="e.g., 8.5"
                  />
                </div>
              </div>

              {/* Courses */}
              <div className="space-y-3">
                <Label>Relevant Courses</Label>
                <div className="flex gap-2">
                  <Input
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    placeholder="e.g., Data Structures, Web Development"
                    onKeyPress={(e) => e.key === 'Enter' && addCourse()}
                  />
                  <Button onClick={addCourse} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.courses.map((course, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-1">
                      {course}
                      <X 
                        className="w-3 h-3 cursor-pointer" 
                        onClick={() => {
                          const courses = profile.courses.filter((_, i) => i !== index);
                          updateProfile('courses', courses);
                        }}
                      />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills & Certifications Tab */}
        <TabsContent value="skills">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Skills
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    placeholder="e.g., Java, React, Python"
                  />
                  <Select 
                    value={newSkill.level} 
                    onValueChange={(value: SkillLevel) => setNewSkill({ ...newSkill, level: value })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={SKILL_LEVELS.BEGINNER}>Beginner</SelectItem>
                      <SelectItem value={SKILL_LEVELS.INTERMEDIATE}>Intermediate</SelectItem>
                      <SelectItem value={SKILL_LEVELS.ADVANCED}>Advanced</SelectItem>
                      <SelectItem value={SKILL_LEVELS.EXPERT}>Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {profile.skills.map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{skill.name}</span>
                        <Badge className={getSkillLevelColor(skill.level)}>
                          {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                        </Badge>
                        {skill.verified && (
                          <Badge variant="default" className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeSkill(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="e.g., AWS Certified Developer"
                    onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                  />
                  <Button onClick={addCertification} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span>{cert}</span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          const certifications = profile.certifications.filter((_, i) => i !== index);
                          updateProfile('certifications', certifications);
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Resume Upload */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Resume
                </CardTitle>
                <CardDescription>
                  Upload multiple versions to track improvements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Drop your resume here or click to browse</p>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <Button asChild variant="outline" size="sm">
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        Choose File
                      </label>
                    </Button>
                  </div>
                </div>
                
                {/* Resume History */}
                <div className="space-y-2">
                  <Label>Version History</Label>
                  {profile.resume.map((resume, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Version {resume.version}</p>
                        <p className="text-sm text-muted-foreground">
                          {resume.name} • {resume.uploadDate}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cover Letter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Cover Letter Template
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={profile.coverLetter}
                  onChange={(e) => updateProfile('coverLetter', e.target.value)}
                  placeholder="Write a generic cover letter template that can be customized for each application..."
                  rows={10}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveProfile} className="px-8">
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileBuilder;