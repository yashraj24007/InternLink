// Groq API Client for AI-powered features
export class GroqClient {
  private apiKey: string;
  private baseURL: string = 'https://api.groq.com/openai/v1';

  constructor() {
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
    if (!this.apiKey) {
      console.warn('Groq API key not found. AI features will use mock responses.');
    }
  }

  private async makeRequest(endpoint: string, body: any) {
    if (!this.apiKey) {
      // Return mock response when API key is not available
      return this.getMockResponse(body.messages[body.messages.length - 1].content);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Groq API Error:', error);
      // Fallback to mock response
      return this.getMockResponse(body.messages[body.messages.length - 1].content);
    }
  }

  private getMockResponse(prompt: string): any {
    // Determine response type based on prompt content
    if (prompt.includes('match') || prompt.includes('recommend')) {
      return {
        choices: [{
          message: {
            content: `Based on your profile and skills, here are some tailored recommendations:

1. **Software Development Internship at TechCorp**
   - Match Score: 95%
   - Required Skills: JavaScript, React, Node.js
   - Duration: 6 months
   - Stipend: ₹25,000/month

2. **Full Stack Developer Position at InnovateLabs**
   - Match Score: 88%
   - Required Skills: Python, Django, PostgreSQL
   - Duration: 12 months
   - Stipend: ₹30,000/month

3. **AI/ML Intern at DataScience Inc**
   - Match Score: 82%
   - Required Skills: Python, TensorFlow, Machine Learning
   - Duration: 4 months
   - Stipend: ₹35,000/month

These opportunities align well with your technical background and career goals.`
          }
        }]
      };
    }

    if (prompt.includes('analytics') || prompt.includes('insights')) {
      return {
        choices: [{
          message: {
            content: `## Placement Analytics Insights

**Key Trends:**
- 📈 Placement rate increased by 12% compared to last year
- 🏢 Tech sector hiring up 25%, Finance sector up 15%
- 💰 Average salary packages increased by 8.5%
- 🎯 CS/IT departments showing highest placement rates (87%)

**Recommendations:**
- Focus recruitment efforts on emerging tech companies
- Strengthen partnerships with fintech startups
- Improve soft skills training for better interview success
- Expand internship-to-placement conversion programs

**Predictions:**
- Expected 15% increase in tech internships next quarter
- Remote/hybrid opportunities likely to grow by 30%
- AI/ML roles expected to double in demand`
          }
        }]
      };
    }

    // Generic helpful response
    return {
      choices: [{
        message: {
          content: `I understand you're looking for assistance. Here's what I can help you with:

• **Smart Matching**: Find the best internship/job opportunities based on your skills and preferences
• **Application Optimization**: Get personalized recommendations to improve your applications
• **Interview Preparation**: Receive tailored interview questions and preparation tips
• **Career Guidance**: Get insights about industry trends and career paths
• **Analytics**: Understand placement trends and success patterns

Please let me know what specific area you'd like help with, and I'll provide detailed assistance!`
        }
      }]
    };
  }

  async generateCompletion(messages: Array<{ role: string; content: string }>) {
    return await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });
  }

  // AI-Powered Student-Opportunity Matching
  async matchStudentToOpportunities(studentProfile: any, opportunities: any[]) {
    const prompt = `Analyze this student profile and match them with the best opportunities:

Student Profile:
- Name: ${studentProfile.name}
- Skills: ${studentProfile.skills?.join(', ') || 'Not specified'}
- CGPA: ${studentProfile.cgpa || 'Not specified'}
- Department: ${studentProfile.department || 'Not specified'}
- Experience: ${studentProfile.experience || 'Beginner'}
- Interests: ${studentProfile.interests?.join(', ') || 'Not specified'}

Available Opportunities:
${opportunities.map((opp, idx) => `${idx + 1}. ${opp.title} at ${opp.company} - Required: ${opp.requirements?.join(', ')}`).join('\n')}

Please provide:
1. Top 3 best matches with match percentage
2. Reasons for each match
3. Skills gaps to address
4. Application tips for each opportunity`;

    const response = await this.generateCompletion([
      { role: 'user', content: prompt }
    ]);

    return response.choices[0].message.content;
  }

  // Real-time Analytics and Insights
  async generatePlacementInsights(placementData: any) {
    const prompt = `Analyze this placement data and provide actionable insights:

Placement Statistics:
- Total Students: ${placementData.totalStudents}
- Placed Students: ${placementData.placedStudents}
- Placement Rate: ${placementData.placementRate}%
- Average Package: ₹${placementData.averagePackage} LPA
- Top Companies: ${placementData.topCompanies?.join(', ')}
- Department-wise data: ${JSON.stringify(placementData.departmentStats)}

Please provide:
1. Key trends and patterns
2. Areas of improvement
3. Predictions for next quarter
4. Actionable recommendations for placement cell
5. Student guidance points`;

    const response = await this.generateCompletion([
      { role: 'user', content: prompt }
    ]);

    return response.choices[0].message.content;
  }

  // Automated Interview Question Generation
  async generateInterviewQuestions(jobRole: string, skills: string[], difficulty: string = 'medium') {
    const prompt = `Generate interview questions for a ${jobRole} position focusing on these skills: ${skills.join(', ')}.
    
Difficulty level: ${difficulty}

Please provide:
1. 5 technical questions with expected answers
2. 3 behavioral questions
3. 2 scenario-based questions
4. Tips for answering each type of question`;

    const response = await this.generateCompletion([
      { role: 'user', content: prompt }
    ]);

    return response.choices[0].message.content;
  }

  // Resume Analysis and Improvement Suggestions
  async analyzeResume(resumeContent: string, targetRole: string) {
    const prompt = `Analyze this resume for a ${targetRole} position and provide improvement suggestions:

Resume Content:
${resumeContent}

Please provide:
1. Overall score (1-10)
2. Strengths identified
3. Areas for improvement
4. Missing keywords for ATS optimization
5. Specific suggestions for each section
6. Industry-specific recommendations`;

    const response = await this.generateCompletion([
      { role: 'user', content: prompt }
    ]);

    return response.choices[0].message.content;
  }

  // Career Path Recommendations
  async generateCareerGuidance(studentProfile: any, industryTrends: any) {
    const prompt = `Provide career guidance for this student based on their profile and current industry trends:

Student Profile:
- Skills: ${studentProfile.skills?.join(', ')}
- Interests: ${studentProfile.interests?.join(', ')}
- Academic Performance: ${studentProfile.cgpa}
- Current Year: ${studentProfile.year}
- Department: ${studentProfile.department}

Industry Trends:
${JSON.stringify(industryTrends)}

Please provide:
1. Top 3 career paths with growth potential
2. Skills to develop for each path
3. Certification recommendations
4. Timeline for skill development
5. Industry connections to make`;

    const response = await this.generateCompletion([
      { role: 'user', content: prompt }
    ]);

    return response.choices[0].message.content;
  }

  // Automated Application Optimization
  async optimizeApplication(applicationData: any, jobRequirements: any) {
    const prompt = `Optimize this job application for better success rate:

Application Details:
- Cover Letter: ${applicationData.coverLetter}
- Applied Role: ${applicationData.role}
- Student Skills: ${applicationData.skills?.join(', ')}

Job Requirements:
- Required Skills: ${jobRequirements.skills?.join(', ')}
- Experience Level: ${jobRequirements.experience}
- Company Culture: ${jobRequirements.culture}

Please provide:
1. Optimized cover letter
2. Key points to highlight
3. Skills alignment score
4. Application timeline recommendations
5. Follow-up strategy`;

    const response = await this.generateCompletion([
      { role: 'user', content: prompt }
    ]);

    return response.choices[0].message.content;
  }
}

// Export singleton instance
export const groqClient = new GroqClient();