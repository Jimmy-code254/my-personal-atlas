
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppLayout from "./Layout/AppLayout";
import { Loader2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const ProtectedRoute = () => {
  const auth = useAuth();
  
  if (!auth) {
    console.error("Auth context is not available in ProtectedRoute");
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              Authentication service is not available. Please try again later or contact support.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </AlertDescription>
        </Alert>
      </div>
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

  // Even if there's a config error, we'll still render the app in demo mode
  // instead of showing a blocking error screen
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the AppLayout with Outlet (children routes) regardless of config status
  return <AppLayout><Outlet /></AppLayout>;
};

export default ProtectedRoute;
