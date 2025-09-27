import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Building2, 
  Calendar,
  BookmarkPlus,
  ExternalLink,
  Users,
  GraduationCap
} from "lucide-react";

interface Opportunity {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'job' | 'training';
  duration: string;
  stipend: string;
  skills: string[];
  description: string;
  department: string;
  applicants: number;
  deadline: string;
  experience: string;
  companyLogo?: string;
  featured?: boolean;
}

interface OpportunityBoardProps {
  opportunities: Opportunity[];
}

export function OpportunityBoard({ opportunities }: OpportunityBoardProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [minStipend, setMinStipend] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  // Get unique values for filters
  const departments = [...new Set(opportunities.map(opp => opp.department))];
  const allSkills = [...new Set(opportunities.flatMap(opp => opp.skills))];

  // Filter opportunities
  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = opp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opp.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = selectedType === "all" || opp.type === selectedType;
    const matchesDepartment = selectedDepartment === "all" || opp.department === selectedDepartment;
    const matchesStipend = !minStipend || parseInt(opp.stipend.replace(/[^\d]/g, '')) >= parseInt(minStipend);
    const matchesSkills = selectedSkills.length === 0 || 
                         selectedSkills.some(skill => opp.skills.includes(skill));

    return matchesSearch && matchesType && matchesDepartment && matchesStipend && matchesSkills;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'internship': return <GraduationCap className="w-4 h-4" />;
      case 'job': return <Building2 className="w-4 h-4" />;
      case 'training': return <BookmarkPlus className="w-4 h-4" />;
      default: return <Building2 className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'job': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'training': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Find Opportunities
          </CardTitle>
          <CardDescription>
            Search and filter through {opportunities.length} available opportunities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by title, company, or skills..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="internship">Internships</SelectItem>
                  <SelectItem value="job">Full-time Jobs</SelectItem>
                  <SelectItem value="training">Training Programs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="All departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Min Stipend</Label>
              <Input
                type="number"
                placeholder="e.g., 10000"
                value={minStipend}
                onChange={(e) => setMinStipend(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                {allSkills.slice(0, 10).map(skill => (
                  <Badge
                    key={skill}
                    variant={selectedSkills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer text-xs"
                    onClick={() => {
                      setSelectedSkills(prev =>
                        prev.includes(skill)
                          ? prev.filter(s => s !== skill)
                          : [...prev, skill]
                      );
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Filter summary */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Showing {filteredOpportunities.length} of {opportunities.length} opportunities</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedDepartment("all");
                setMinStipend("");
                setSelectedSkills([]);
              }}
            >
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOpportunities.map((opp) => (
          <Card key={opp.id} className={`hover:shadow-lg transition-shadow ${opp.featured ? 'ring-2 ring-primary/20' : ''}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-white font-bold">
                    {opp.company.charAt(0)}
                  </div>
                  <div>
                    <CardTitle className="text-lg leading-tight">{opp.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {opp.company}
                    </CardDescription>
                  </div>
                </div>
                {opp.featured && (
                  <Badge variant="secondary" className="text-xs">
                    Featured
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {opp.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {opp.duration}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge className={getTypeColor(opp.type)}>
                    {getTypeIcon(opp.type)}
                    <span className="ml-1 capitalize">{opp.type}</span>
                  </Badge>
                  <div className="flex items-center gap-1 text-sm font-medium text-green-600">
                    <DollarSign className="w-3 h-3" />
                    {opp.stipend}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {opp.description}
              </p>

              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {opp.skills.slice(0, 3).map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {opp.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{opp.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {opp.applicants} applicants
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Deadline: {new Date(opp.deadline).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex gap-2">
                <Button className="flex-1" size="sm">
                  Apply Now
                </Button>
                <Button variant="outline" size="sm">
                  <BookmarkPlus className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredOpportunities.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No opportunities found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedType("all");
                setSelectedDepartment("all");
                setMinStipend("");
                setSelectedSkills([]);
              }}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}