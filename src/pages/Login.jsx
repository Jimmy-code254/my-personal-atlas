
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School, Info, AlertTriangle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  // Check if auth context is available
  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription className="mt-2">
            <p className="mb-4">
              Authentication service is not available. Supabase may not be properly configured. Please ensure the environment variables 
              VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { login } = auth;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setIsLoading(true);
      const success = await login(formData.email, formData.password);
      
      if (success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <School className="h-6 w-6 text-blue-700 dark:text-blue-500" />
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-500">JimPortal</h1>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              : 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
            }
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center text-blue-700 dark:text-blue-500">Sign in to your account</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="credentials" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="credentials">Email & Password</TabsTrigger>
                  <TabsTrigger value="code">Access Code</TabsTrigger>
                </TabsList>
                
                <TabsContent value="credentials">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@jimportal.com"
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link to="/reset-password" className="text-xs text-blue-700 dark:text-blue-500 hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="code">
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="accessCode">Access Code</Label>
                      <Input 
                        id="accessCode"
                        name="accessCode"
                        type="text"
                        placeholder="Enter your access code"
                      />
                    </div>
                    
                    <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                      <Info className="h-4 w-4 text-blue-700 dark:text-blue-500 mr-2 shrink-0" />
                      <p className="text-xs text-blue-700 dark:text-blue-400">
                        Access codes are provided by your school administrator
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700">
                      Continue
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 text-center text-sm">
                <p>New to JimPortal?{" "}
                  <Link to="/register" className="text-blue-700 dark:text-blue-500 hover:underline font-medium">
                    Create an account
                  </Link>
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                <p className="mb-1">
                  For account issues, please contact the school administrator
                </p>
                <p>
                  Tel: 0740641514 | Westlands, Nairobi, Kenya
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-4 border-t dark:border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; 2025 JimPortal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
