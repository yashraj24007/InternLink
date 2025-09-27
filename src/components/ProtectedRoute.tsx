import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Log unauthorized access attempt for debugging
    console.warn(`Access denied: User role '${user?.role}' attempted to access '${requiredRole}' route at '${location.pathname}'`);
    
    // Redirect to appropriate dashboard based on user role
    const roleRoutes = {
      student: "/student",
      mentor: "/mentor", 
      recruiter: "/recruiter",
      admin: "/admin",
      placement_cell: "/placement"
    };
    
    const redirectPath = roleRoutes[user?.role as keyof typeof roleRoutes] || "/";
    
    // Show a toast notification about the redirect
    setTimeout(() => {
      console.info(`Redirecting to authorized dashboard: ${redirectPath}`);
    }, 100);
    
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;