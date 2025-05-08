
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  onLogin?: () => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Please enter both username and password");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // If we have auth context, use it
      if (auth) {
        const success = await auth.login(username, password);
        if (success) {
          toast({
            title: "Login successful",
            description: "Welcome to JimPortal!",
          });
          if (onLogin) onLogin();
          navigate("/dashboard");
        } else {
          // Handle failed login
          setError("Invalid username or password");
        }
      } else {
        // Fallback for demo mode
        toast({
          title: "Demo Mode Active",
          description: "Logging in with demo credentials",
        });
        if (onLogin) onLogin();
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="username" className="text-gray-800 dark:text-gray-200">Email</Label>
        <Input 
          id="username"
          type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username or email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-800 dark:text-gray-200">Password</Label>
        <Input 
          id="password"
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
          />
          <Label 
            htmlFor="remember" 
            className="text-sm font-normal cursor-pointer text-gray-700 dark:text-gray-300"
          >
            Remember me
          </Label>
        </div>
        
        <Button type="button" variant="link" className="p-0 h-auto text-sm text-blue-600 dark:text-blue-400">
          Forgot password?
        </Button>
      </div>
      
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
