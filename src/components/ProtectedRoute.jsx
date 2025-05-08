import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppLayout from "./Layout/AppLayout";
import { Loader2 } from "lucide-react";

const ProtectedRoute = () => {
  const auth = useAuth();
  
  // If auth context is not available, still show the app but in demo mode
  // This prevents blank screens when Supabase isn't configured
  if (!auth) {
    console.error("Auth context is not available in ProtectedRoute");
    // Return AppLayout with children to ensure the UI is visible even without auth
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }
  
  const { isAuthenticated, loading, configError } = auth;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
        <span className="text-lg">Loading...</span>
      </div>
    );
  }

  // If there's a config error (Supabase not configured), still show the app in demo mode
  // instead of redirecting to login, which would create a login loop
  if (configError) {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }

  // If not authenticated and no config error, redirect to login
  if (!isAuthenticated && !configError) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the AppLayout with Outlet (children routes)
  return <AppLayout><Outlet /></AppLayout>;
};

export default ProtectedRoute;
