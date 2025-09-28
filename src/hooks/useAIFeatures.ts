import { useState } from 'react';
import { groqClient } from '@/lib/groqClient';
import { toast } from '@/components/ui/use-toast';

export interface AIFeatureResult {
  content: string;
  loading: boolean;
  error: string | null;
}

export const useAIFeatures = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeAIFunction = async (
    aiFunction: () => Promise<string>,
    successMessage: string = 'AI analysis completed!'
  ): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const result = await aiFunction();
      
      toast({
        title: "AI Analysis Complete",
        description: successMessage,
      });
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'AI analysis failed';
      setError(errorMessage);
      
      toast({
        title: "AI Analysis Failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // AI-Powered Student-Opportunity Matching
  const matchStudentToOpportunities = async (studentProfile: any, opportunities: any[]) => {
    return executeAIFunction(
      () => groqClient.matchStudentToOpportunities(studentProfile, opportunities),
      'Found personalized opportunity matches!'
    );
  };

  // Real-Time Analytics and Insights
  const generatePlacementInsights = async (placementData: any) => {
    return executeAIFunction(
      () => groqClient.generatePlacementInsights(placementData),
      'Placement analytics insights generated!'
    );
  };

  // Interview Question Generation
  const generateInterviewQuestions = async (jobRole: string, skills: string[], difficulty: string = 'medium') => {
    return executeAIFunction(
      () => groqClient.generateInterviewQuestions(jobRole, skills, difficulty),
      'Interview questions generated successfully!'
    );
  };

  // Resume Analysis
  const analyzeResume = async (resumeContent: string, targetRole: string) => {
    return executeAIFunction(
      () => groqClient.analyzeResume(resumeContent, targetRole),
      'Resume analysis completed!'
    );
  };

  // Career Guidance
  const generateCareerGuidance = async (studentProfile: any, industryTrends: any) => {
    return executeAIFunction(
      () => groqClient.generateCareerGuidance(studentProfile, industryTrends),
      'Career guidance generated!'
    );
  };

  // Application Optimization
  const optimizeApplication = async (applicationData: any, jobRequirements: any) => {
    return executeAIFunction(
      () => groqClient.optimizeApplication(applicationData, jobRequirements),
      'Application optimized successfully!'
    );
  };

  return {
    loading,
    error,
    matchStudentToOpportunities,
    generatePlacementInsights,
    generateInterviewQuestions,
    analyzeResume,
    generateCareerGuidance,
    optimizeApplication,
  };
};