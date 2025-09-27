import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Button } from "@/components/ui/button";
import { Bell, User, LogOut } from "lucide-react";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  title?: string;
}

export function DashboardLayout({ children, role, title }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar role={role} />
        
        <div className="flex-1 flex flex-col">
          {/* Top Header */}
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="h-8 w-8" />
              {title && (
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{title}</h1>
                  <p className="text-sm text-muted-foreground capitalize">{role} Dashboard</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground">
                  3
                </span>
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </header>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <div className="p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}