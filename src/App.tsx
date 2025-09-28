import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { DevelopmentNotice } from "@/components/DevelopmentNotice";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SimpleStudentDashboard from "./pages/SimpleStudentDashboard";
import WorkingStudentDashboard from "./pages/WorkingStudentDashboardFixed";
import AdminDashboard from "./pages/AdminDashboardFinal";
import PlacementCellDashboard from "./pages/PlacementCellDashboardNew";
import MentorDashboardNew from "./pages/MentorDashboardNew";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="InternLink-ui-theme">
      <AuthProvider>
        <TooltipProvider>
          <DevelopmentNotice />
          <Toaster />
          <Sonner />
          <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/student" 
            element={
              <ProtectedRoute requiredRole="student">
                <WorkingStudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/student-test" element={<SimpleStudentDashboard />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/placement" 
            element={
              <ProtectedRoute requiredRole="placement_cell">
                <PlacementCellDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/mentor" 
            element={
              <ProtectedRoute requiredRole="mentor">
                <MentorDashboardNew />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recruiter" 
            element={
              <ProtectedRoute requiredRole="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            } 
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
      </AuthProvider>
  </ThemeProvider>
</QueryClientProvider>
);

export default App;
