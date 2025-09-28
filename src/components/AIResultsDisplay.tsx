import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Download, Sparkles, Brain, TrendingUp, Users } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AIResultsDisplayProps {
  title: string;
  content: string;
  type: 'matching' | 'analytics' | 'interview' | 'resume' | 'career' | 'application';
  loading?: boolean;
  className?: string;
}

export const AIResultsDisplay: React.FC<AIResultsDisplayProps> = ({
  title,
  content,
  type,
  loading = false,
  className = ''
}) => {
  const getIcon = () => {
    switch (type) {
      case 'matching':
        return <Users className="w-5 h-5" />;
      case 'analytics':
        return <TrendingUp className="w-5 h-5" />;
      case 'interview':
        return <Brain className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'matching':
        return 'bg-blue-500';
      case 'analytics':
        return 'bg-green-500';
      case 'interview':
        return 'bg-purple-500';
      case 'resume':
        return 'bg-orange-500';
      case 'career':
        return 'bg-pink-500';
      case 'application':
        return 'bg-indigo-500';
      default:
        return 'bg-gray-500';
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to Clipboard",
      description: "AI analysis has been copied to your clipboard.",
    });
  };

  const downloadAsText = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download Started",
      description: "AI analysis has been downloaded as a text file.",
    });
  };

  const formatContent = (text: string) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/###\s(.*?)$/gm, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/##\s(.*?)$/gm, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/^\d+\.\s/gm, '<br/>• ')
      .replace(/^-\s/gm, '• ')
      .replace(/📈|📊|🎯|💰|🏢|👨‍💼|📝|🚀|⭐|🔍|💡|📋|🎓|🏆|📈/g, '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join('<br/>');
  };

  if (loading) {
    return (
      <Card className={`w-full ${className}`}>
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getTypeColor()} animate-pulse`}></div>
            <CardTitle className="flex items-center gap-2">
              {getIcon()}
              Generating AI Analysis...
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="h-4 bg-muted animate-pulse rounded"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-3/4"></div>
            <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getTypeColor()}`}></div>
            <CardTitle className="flex items-center gap-2">
              {getIcon()}
              {title}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              AI Generated
            </Badge>
            <Button variant="ghost" size="sm" onClick={copyToClipboard}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={downloadAsText}>
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardDescription>
          Powered by Groq AI • Generated {new Date().toLocaleTimeString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96 w-full">
          <div 
            className="prose prose-sm max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: formatContent(content) }}
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};