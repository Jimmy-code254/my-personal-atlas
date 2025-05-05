
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/LoginForm";
import { School } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = () => {
    // In a real app with Supabase, this would verify credentials
    // For now, we'll simulate a successful login
    toast({
      title: "Logged in successfully",
      description: "Welcome to JimPortal",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <School className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">JimPortal</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-gray-600">
              Or{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                create a new account
              </Link>
            </p>
          </div>

          <div className="bg-white p-8 shadow-lg rounded-lg">
            <LoginForm onLogin={handleLogin} />
            
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                For account issues, please contact the school administrator
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Tel: 0740641514
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; 2025 JimPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
