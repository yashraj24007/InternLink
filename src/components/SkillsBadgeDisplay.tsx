import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  TrendingUp, 
  Award, 
  Target, 
  Plus,
  X,
  Edit
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  proficiency: number; // 0-100
  category: 'technical' | 'soft' | 'language' | 'tool';
  verified?: boolean;
  endorsements?: number;
  yearsOfExperience?: number;
}

interface SkillsBadgeDisplayProps {
  skills: Skill[];
  editable?: boolean;
  showProficiency?: boolean;
  maxDisplay?: number;
  onSkillAdd?: () => void;
  onSkillEdit?: (skill: Skill) => void;
  onSkillRemove?: (skillId: string) => void;
}

export function SkillsBadgeDisplay({ 
  skills, 
  editable = false, 
  showProficiency = false,
  maxDisplay,
  onSkillAdd,
  onSkillEdit,
  onSkillRemove
}: SkillsBadgeDisplayProps) {
  
  const getSkillColor = (category: string, level: string) => {
    const colors = {
      technical: {
        beginner: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
        intermediate: 'bg-blue-200 text-blue-900 dark:bg-blue-800 dark:text-blue-100',
        advanced: 'bg-blue-300 text-blue-900 dark:bg-blue-700 dark:text-blue-100',
        expert: 'bg-blue-500 text-white dark:bg-blue-600'
      },
      soft: {
        beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        intermediate: 'bg-green-200 text-green-900 dark:bg-green-800 dark:text-green-100',
        advanced: 'bg-green-300 text-green-900 dark:bg-green-700 dark:text-green-100',
        expert: 'bg-green-500 text-white dark:bg-green-600'
      },
      language: {
        beginner: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
        intermediate: 'bg-purple-200 text-purple-900 dark:bg-purple-800 dark:text-purple-100',
        advanced: 'bg-purple-300 text-purple-900 dark:bg-purple-700 dark:text-purple-100',
        expert: 'bg-purple-500 text-white dark:bg-purple-600'
      },
      tool: {
        beginner: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
        intermediate: 'bg-orange-200 text-orange-900 dark:bg-orange-800 dark:text-orange-100',
        advanced: 'bg-orange-300 text-orange-900 dark:bg-orange-700 dark:text-orange-100',
        expert: 'bg-orange-500 text-white dark:bg-orange-600'
      }
    };
    
    return colors[category as keyof typeof colors]?.[level as keyof typeof colors.technical] || 
           'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'expert': return <Star className="w-3 h-3 fill-current" />;
      case 'advanced': return <TrendingUp className="w-3 h-3" />;
      case 'intermediate': return <Target className="w-3 h-3" />;
      default: return null;
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const displaySkills = maxDisplay ? skills.slice(0, maxDisplay) : skills;
  const remainingCount = maxDisplay && skills.length > maxDisplay ? skills.length - maxDisplay : 0;

  if (!showProficiency && !editable) {
    // Simple badge display
    return (
      <div className="flex flex-wrap gap-2">
        {displaySkills.map((skill) => (
          <Badge
            key={skill.id}
            className={`${getSkillColor(skill.category, skill.level)} relative`}
          >
            <div className="flex items-center gap-1">
              {getLevelIcon(skill.level)}
              <span>{skill.name}</span>
              {skill.verified && <Award className="w-3 h-3 text-yellow-500" />}
              {editable && onSkillRemove && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => onSkillRemove(skill.id)}
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </Badge>
        ))}
        
        {remainingCount > 0 && (
          <Badge variant="outline">
            +{remainingCount} more
          </Badge>
        )}
        
        {editable && onSkillAdd && (
          <Button
            variant="outline"
            size="sm"
            onClick={onSkillAdd}
            className="h-6 text-xs"
          >
            <Plus className="w-3 h-3 mr-1" />
            Add Skill
          </Button>
        )}
      </div>
    );
  }

  // Detailed skills display with proficiency
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Skills & Expertise
            </CardTitle>
            <CardDescription>
              {skills.length} skills across {Object.keys(groupedSkills).length} categories
            </CardDescription>
          </div>
          {editable && onSkillAdd && (
            <Button variant="outline" size="sm" onClick={onSkillAdd}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="space-y-3">
            <div className="flex items-center gap-2">
              <h4 className="font-medium capitalize">{category} Skills</h4>
              <Badge variant="outline" className="text-xs">
                {categorySkills.length}
              </Badge>
            </div>
            
            <div className="space-y-3">
              {categorySkills.map((skill) => (
                <div key={skill.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className={getSkillColor(skill.category, skill.level)}>
                        <div className="flex items-center gap-1">
                          {getLevelIcon(skill.level)}
                          <span>{skill.name}</span>
                          {skill.verified && <Award className="w-3 h-3 text-yellow-500" />}
                        </div>
                      </Badge>
                      
                      {skill.endorsements && skill.endorsements > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {skill.endorsements} endorsements
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{skill.proficiency}%</span>
                      {editable && onSkillEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSkillEdit(skill)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      )}
                      {editable && onSkillRemove && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onSkillRemove(skill.id)}
                          className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {showProficiency && (
                    <div className="space-y-1">
                      <Progress value={skill.proficiency} className="h-2" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span className="capitalize">{skill.level}</span>
                        {skill.yearsOfExperience && (
                          <span>{skill.yearsOfExperience} years experience</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {category !== Object.keys(groupedSkills)[Object.keys(groupedSkills).length - 1] && (
              <Separator />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}