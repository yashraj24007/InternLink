import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, AlertCircle, TrendingUp } from "lucide-react";

interface ProfileCompletionProps {
  completion: number;
  user: {
    name: string;
    email: string;
    phone?: string;
    resume?: boolean;
    skills?: string[];
    experience?: boolean;
    projects?: number;
    certifications?: number;
  };
}

export function ProfileCompletion({ completion, user }: ProfileCompletionProps) {
  const getCompletionItems = () => {
    const items = [
      { label: "Basic Info", completed: !!(user.name && user.email), weight: 20 },
      { label: "Contact Details", completed: !!user.phone, weight: 10 },
      { label: "Resume Upload", completed: !!user.resume, weight: 25 },
      { label: "Skills Added", completed: !!(user.skills && user.skills.length > 0), weight: 20 },
      { label: "Experience Details", completed: !!user.experience, weight: 15 },
      { label: "Projects Showcase", completed: !!(user.projects && user.projects > 0), weight: 10 },
    ];

    return items;
  };

  const items = getCompletionItems();
  const completedItems = items.filter(item => item.completed);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Profile Completion
            </CardTitle>
            <CardDescription>
              Complete your profile to increase visibility to recruiters
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{completion}%</div>
            <div className="text-xs text-muted-foreground">
              {completedItems.length} of {items.length} completed
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Progress value={completion} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Getting Started</span>
            <span>Profile Complete</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-2">
                {item.completed ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-orange-500" />
                )}
                <span className="text-sm">{item.label}</span>
              </div>
              <Badge variant={item.completed ? "default" : "secondary"} className="text-xs">
                {item.weight}%
              </Badge>
            </div>
          ))}
        </div>
        
        {completion < 100 && (
          <div className="pt-4">
            <Button className="w-full" size="sm">
              Complete Missing Items
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}