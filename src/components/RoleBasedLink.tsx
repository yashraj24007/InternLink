import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { canAccessRoute } from '@/utils/roleUtils';
import { Link, LinkProps } from 'react-router-dom';

interface RoleBasedLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onUnauthorizedClick?: () => void;
}

/**
 * A Link component that only renders if the user has access to the target route
 * Prevents users from seeing links to dashboards they can't access
 */
export const RoleBasedLink: React.FC<RoleBasedLinkProps> = ({ 
  to, 
  children, 
  fallback = null, 
  onUnauthorizedClick,
  ...linkProps 
}) => {
  const { user } = useAuth();
  
  const hasAccess = canAccessRoute(user?.role, to);
  
  if (!hasAccess) {
    if (onUnauthorizedClick) {
      return (
        <button 
          onClick={onUnauthorizedClick}
          className={linkProps.className}
          type="button"
        >
          {children}
        </button>
      );
    }
    return <>{fallback}</>;
  }
  
  return (
    <Link to={to} {...linkProps}>
      {children}
    </Link>
  );
};

interface RoleBasedNavigationProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  fallback?: React.ReactNode;
}

/**
 * A wrapper component that only renders navigation elements if the user has the required role
 */
export const RoleBasedNavigation: React.FC<RoleBasedNavigationProps> = ({
  children,
  allowedRoles = [],
  fallback = null
}) => {
  const { user } = useAuth();
  
  if (allowedRoles.length === 0) {
    return <>{children}</>;
  }
  
  const hasRequiredRole = user?.role && allowedRoles.includes(user.role);
  
  return hasRequiredRole ? <>{children}</> : <>{fallback}</>;
};

export default RoleBasedLink;