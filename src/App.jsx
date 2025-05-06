
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/Layout/AppLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import Assignments from "./pages/Assignments";
import Calendar from "./pages/Calendar";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Parents from "./pages/Parents";
import Admissions from "./pages/Admissions";
import Grades from "./pages/Grades";
import Attendance from "./pages/Attendance";
import Settings from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admissions" element={<Admissions />} />
              
              {/* Protected routes with AppLayout */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
                <Route path="/courses" element={<AppLayout><Courses /></AppLayout>} />
                <Route path="/assignments" element={<AppLayout><Assignments /></AppLayout>} />
                <Route path="/calendar" element={<AppLayout><Calendar /></AppLayout>} />
                <Route path="/messages" element={<AppLayout><Messages /></AppLayout>} />
                <Route path="/profile" element={<AppLayout><Profile /></AppLayout>} />
                <Route path="/students" element={<AppLayout><Students /></AppLayout>} />
                <Route path="/teachers" element={<AppLayout><Teachers /></AppLayout>} />
                <Route path="/parents" element={<AppLayout><Parents /></AppLayout>} />
                <Route path="/grades" element={<AppLayout><Grades /></AppLayout>} />
                <Route path="/attendance" element={<AppLayout><Attendance /></AppLayout>} />
                <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
