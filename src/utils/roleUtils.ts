import { UserRole } from "@/contexts/AuthContext";

/**
 * Utility functions for role-based access control
 */

export const ROLE_ROUTES = {
  student: "/student-dashboard",
  mentor: "/mentor-dashboard", 
  recruiter: "/recruiter-dashboard",
  admin: "/admin"
} as const;

/**
 * Check if a user can access a specific route based on their role
 */
export const canAccessRoute = (userRole: UserRole | undefined, targetRoute: string): boolean => {
  if (!userRole) return false;
  
  // Allow access to general routes
  const publicRoutes = ["/", "/login", "/signup"];
  if (publicRoutes.includes(targetRoute)) return true;
  
  // Check if the route matches the user's role
  const userAllowedRoute = ROLE_ROUTES[userRole];
  
  // Allow access to the user's own dashboard and its sub-routes
  return targetRoute === userAllowedRoute || targetRoute.startsWith(`${userAllowedRoute}/`);
};

/**
 * Get the appropriate dashboard route for a user role
 */
export const getDashboardRoute = (userRole: UserRole | undefined): string => {
  if (!userRole) return "/";
  return ROLE_ROUTES[userRole];
};

/**
 * Get role-specific navigation items (only for the user's own role)
 */
export const getRoleNavigation = (userRole: UserRole | undefined) => {
  if (!userRole) return [];
  
  const roleNavigation = {
    student: [
      { 
        title: "Dashboard", 
        path: "/student-dashboard", 
        icon: "🏠",
        description: "Overview & quick stats"
      },
      { 
        title: "Profile Builder", 
        path: "/student-dashboard/profile", 
        icon: "👤",
        description: "Personal info, skills, resume"
      },
      { 
        title: "Internship Search", 
        path: "/student-dashboard/opportunities", 
        icon: "💼",
        description: "Find & apply for opportunities"
      },
      { 
        title: "My Applications", 
        path: "/student-dashboard/applications", 
        icon: "📄",
        description: "Track application status"
      },
      { 
        title: "Interviews", 
        path: "/student-dashboard/interviews", 
        icon: "🗓️",
        description: "Schedule & manage interviews"
      },
      { 
        title: "Certificates", 
        path: "/student-dashboard/certificates", 
        icon: "🏆",
        description: "Download completion certificates"
      },
      { 
        title: "Career Tracker", 
        path: "/student-dashboard/career", 
        icon: "📈",
        description: "Internship to placement conversion"
      }
    ],
    admin: [
      { 
        title: "Control Center", 
        path: "/admin", 
        icon: "🏠",
        description: "Real-time placement statistics"
      },
      { 
        title: "Opportunity Manager", 
        path: "/admin/opportunities", 
        icon: "�",
        description: "Post & manage internships"
      },
      { 
        title: "Student Pipeline", 
        path: "/admin/students", 
        icon: "🎓",
        description: "Track student progress"
      },
      { 
        title: "Analytics Hub", 
        path: "/admin/analytics", 
        icon: "�",
        description: "Placement insights & reports"
      },
      { 
        title: "Recruiter Network", 
        path: "/admin/recruiters", 
        icon: "🏢",
        description: "Manage company relationships"
      },
      { 
        title: "Communications", 
        path: "/admin/communications", 
        icon: "📢",
        description: "Announcements & notifications"
      },
      { 
        title: "Reports & Export", 
        path: "/admin/reports", 
        icon: "📈",
        description: "Generate detailed reports"
      }
    ],
    mentor: [
      { 
        title: "Mentee Overview", 
        path: "/mentor-dashboard", 
        icon: "🏠",
        description: "All assigned students"
      },
      { 
        title: "My Students", 
        path: "/mentor-dashboard/students", 
        icon: "👥",
        description: "Student profiles & progress"
      },
      { 
        title: "Approval Workflow", 
        path: "/mentor-dashboard/approvals", 
        icon: "✅",
        description: "Pending application approvals"
      },
      { 
        title: "Feedback Center", 
        path: "/mentor-dashboard/feedback", 
        icon: "�",
        description: "Post-internship evaluations"
      },
      { 
        title: "Progress Tracking", 
        path: "/mentor-dashboard/progress", 
        icon: "📈",
        description: "Placement statistics"
      },
      { 
        title: "Schedule", 
        path: "/mentor-dashboard/schedule", 
        icon: "🗓️",
        description: "Meetings & deadlines"
      }
    ],
    recruiter: [
      { 
        title: "Company Dashboard", 
        path: "/recruiter-dashboard", 
        icon: "🏠",
        description: "Company profile & overview"
      },
      { 
        title: "Post Openings", 
        path: "/recruiter-dashboard/opportunities", 
        icon: "💼",
        description: "Create job/internship posts"
      },
      { 
        title: "Candidate Pool", 
        path: "/recruiter-dashboard/candidates", 
        icon: "👥",
        description: "Browse & shortlist applicants"
      },
      { 
        title: "Interview Manager", 
        path: "/recruiter-dashboard/interviews", 
        icon: "🗓️",
        description: "Schedule & manage interviews"
      },
      { 
        title: "Offers & Feedback", 
        path: "/recruiter-dashboard/offers", 
        icon: "📋",
        description: "Send offers & evaluations"
      },
      { 
        title: "Reports", 
        path: "/recruiter-dashboard/reports", 
        icon: "📊",
        description: "Recruitment analytics"
      }
    ]
  };
  
  return roleNavigation[userRole] || [];
};

/**
 * Filter navigation items to only show user's accessible routes
 */
export const filterNavigationByRole = (navigationItems: any[], userRole: UserRole | undefined) => {
  if (!userRole) return [];
  
  return navigationItems.filter(item => 
    canAccessRoute(userRole, item.path || item.url || item.href)
  );
};

/**
 * Application status constants
 */
export const APPLICATION_STATUS = {
  PENDING: 'pending',
  APPROVED_BY_MENTOR: 'approved_by_mentor',
  INTERVIEW_SCHEDULED: 'interview_scheduled', 
  SELECTED: 'selected',
  REJECTED: 'rejected',
  WITHDRAWN: 'withdrawn'
} as const;

export type ApplicationStatus = typeof APPLICATION_STATUS[keyof typeof APPLICATION_STATUS];

/**
 * Get status badge color based on application status
 */
export const getStatusColor = (status: ApplicationStatus) => {
  const statusColors = {
    [APPLICATION_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
    [APPLICATION_STATUS.APPROVED_BY_MENTOR]: 'bg-blue-100 text-blue-800',
    [APPLICATION_STATUS.INTERVIEW_SCHEDULED]: 'bg-purple-100 text-purple-800',
    [APPLICATION_STATUS.SELECTED]: 'bg-green-100 text-green-800',
    [APPLICATION_STATUS.REJECTED]: 'bg-red-100 text-red-800',
    [APPLICATION_STATUS.WITHDRAWN]: 'bg-gray-100 text-gray-800'
  };
  
  return statusColors[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Get user-friendly status labels
 */
export const getStatusLabel = (status: ApplicationStatus) => {
  const statusLabels = {
    [APPLICATION_STATUS.PENDING]: 'Pending Review',
    [APPLICATION_STATUS.APPROVED_BY_MENTOR]: 'Approved by Mentor',
    [APPLICATION_STATUS.INTERVIEW_SCHEDULED]: 'Interview Scheduled',
    [APPLICATION_STATUS.SELECTED]: 'Selected',
    [APPLICATION_STATUS.REJECTED]: 'Rejected',
    [APPLICATION_STATUS.WITHDRAWN]: 'Withdrawn'
  };
  
  return statusLabels[status] || 'Unknown Status';
};

/**
 * Skills proficiency levels
 */
export const SKILL_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate', 
  ADVANCED: 'advanced',
  EXPERT: 'expert'
} as const;

export type SkillLevel = typeof SKILL_LEVELS[keyof typeof SKILL_LEVELS];

/**
 * Get skill level color
 */
export const getSkillLevelColor = (level: SkillLevel) => {
  const levelColors = {
    [SKILL_LEVELS.BEGINNER]: 'bg-gray-100 text-gray-800',
    [SKILL_LEVELS.INTERMEDIATE]: 'bg-blue-100 text-blue-800',
    [SKILL_LEVELS.ADVANCED]: 'bg-green-100 text-green-800',
    [SKILL_LEVELS.EXPERT]: 'bg-purple-100 text-purple-800'
  };
  
  return levelColors[level] || 'bg-gray-100 text-gray-800';
};