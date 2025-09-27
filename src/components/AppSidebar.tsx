import { useState } from "react";
import { 
  Home, 
  User, 
  Briefcase, 
  Calendar, 
  FileText, 
  BarChart3, 
  Settings,
  GraduationCap,
  Users,
  Building2,
  Award,
  TrendingUp
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface MenuItem {
  title: string;
  url: string;
  icon: any;
}

interface MenuGroup {
  label: string;
  items: MenuItem[];
}

const getMenusByRole = (role: string): MenuGroup[] => {
  switch (role) {
    case 'student':
      return [
        {
          label: "Dashboard",
          items: [
            { title: "Overview", url: "/student-dashboard", icon: Home },
            { title: "My Profile", url: "/student-dashboard/profile", icon: User },
            { title: "Opportunities", url: "/student-dashboard/opportunities", icon: Briefcase },
            { title: "Applications", url: "/student-dashboard/applications", icon: FileText },
            { title: "Interviews", url: "/student-dashboard/interviews", icon: Calendar },
            { title: "Certificates", url: "/student-dashboard/certificates", icon: Award },
          ]
        }
      ];
    
    case 'admin':
      return [
        {
          label: "Dashboard",
          items: [
            { title: "Overview", url: "/admin-dashboard", icon: Home },
            { title: "Analytics", url: "/admin-dashboard/analytics", icon: BarChart3 },
            { title: "Students", url: "/admin-dashboard/students", icon: GraduationCap },
            { title: "Opportunities", url: "/admin-dashboard/opportunities", icon: Briefcase },
            { title: "Recruiters", url: "/admin-dashboard/recruiters", icon: Building2 },
            { title: "Reports", url: "/admin-dashboard/reports", icon: TrendingUp },
          ]
        }
      ];
    
    case 'mentor':
      return [
        {
          label: "Dashboard", 
          items: [
            { title: "Overview", url: "/mentor-dashboard", icon: Home },
            { title: "My Students", url: "/mentor-dashboard/students", icon: Users },
            { title: "Applications", url: "/mentor-dashboard/applications", icon: FileText },
            { title: "Schedule", url: "/mentor-dashboard/schedule", icon: Calendar },
            { title: "Progress", url: "/mentor-dashboard/progress", icon: TrendingUp },
          ]
        }
      ];
    
    case 'recruiter':
      return [
        {
          label: "Dashboard",
          items: [
            { title: "Overview", url: "/recruiter-dashboard", icon: Home },
            { title: "Opportunities", url: "/recruiter-dashboard/opportunities", icon: Briefcase },
            { title: "Candidates", url: "/recruiter-dashboard/candidates", icon: Users },
            { title: "Interviews", url: "/recruiter-dashboard/interviews", icon: Calendar },
            { title: "Reports", url: "/recruiter-dashboard/reports", icon: BarChart3 },
          ]
        }
      ];
    
    default:
      return [];
  }
};

interface AppSidebarProps {
  role: string;
}

export function AppSidebar({ role }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  
  const menuGroups = getMenusByRole(role);
  
  const isActive = (path: string) => {
    if (path === `/${role}-dashboard`) {
      return currentPath === path;
    }
    return currentPath.startsWith(path);
  };
  
  const getNavCls = (path: string) =>
    isActive(path) ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium" : "hover:bg-sidebar-accent";

  return (
    <Sidebar
      className={`${collapsed ? "w-14" : "w-64"} bg-gradient-sidebar border-r-0 shadow-sidebar`}
      collapsible="icon"
    >
      <SidebarContent className="bg-transparent">
        {/* Header */}
        <div className="p-4 border-b border-sidebar-border/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-sidebar-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="text-sidebar-foreground font-semibold">Internlink</h2>
                <p className="text-sidebar-foreground/70 text-xs capitalize">{role} Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Menu Groups */}
        {menuGroups.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex} className="px-2 py-4">
            {!collapsed && (
              <SidebarGroupLabel className="text-sidebar-foreground/80 text-xs font-medium mb-2">
                {group.label}
              </SidebarGroupLabel>
            )}
            
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className="h-10">
                      <NavLink 
                        to={item.url} 
                        end={item.url === `/${role}-dashboard`}
                        className={`${getNavCls(item.url)} flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground`}
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}

        {/* Footer */}
        <div className="mt-auto p-4 border-t border-sidebar-border/20">
          <SidebarMenuButton asChild className="h-10">
            <NavLink 
              to={`/${role}-dashboard/settings`}
              className={`${getNavCls(`/${role}-dashboard/settings`)} flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sidebar-foreground`}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">Settings</span>}
            </NavLink>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}