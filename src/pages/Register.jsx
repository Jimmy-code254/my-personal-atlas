
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School, Info, Check, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    schoolCode: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleChange = (value) => {
    setFormData({
      ...formData,
      role: value
    });
  };

  const validateStep1 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    return true;
  };

  const validateStep2 = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all required fields");
      return false;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    return true;
  };

  const handleContinue = () => {
    setError("");
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateStep2()) {
      return;
    }
    
    try {
      setIsLoading(true);
      const success = await register(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.role
      );
      
      if (success) {
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 w-fit">
            <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">JimPortal</h1>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Join JimPortal to access your school resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="w-full mb-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="parent">Parent</TabsTrigger>
                </TabsList>
                
                <TabsContent value="student" className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create a student account to access your courses, assignments, and grades.
                  </p>
                </TabsContent>
                
                <TabsContent value="teacher" className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create a teacher account to manage your classes, assignments, and student records.
                  </p>
                </TabsContent>
                
                <TabsContent value="parent" className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Create a parent account to monitor your children's progress and stay connected with teachers.
                  </p>
                </TabsContent>
              </Tabs>
              
              {/* Registration Steps */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}>
                      {step > 1 ? <Check className="h-5 w-5" /> : 1}
                    </div>
                    <div className="ml-2">
                      <p className={`text-sm font-medium ${
                        step >= 1 ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                      }`}>Personal Info</p>
                    </div>
                  </div>
                  <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700">
                    <div className={`h-full ${step > 1 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}></div>
                  </div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}>
                      2
                    </div>
                    <div className="ml-2">
                      <p className={`text-sm font-medium ${
                        step >= 2 ? "text-gray-900 dark:text-gray-100" : "text-gray-500 dark:text-gray-400"
                      }`}>Security</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {step === 1 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name*</Label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name*</Label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address*</Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">I am a*</Label>
                      <Select value={formData.role} onValueChange={handleRoleChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Student</SelectItem>
                          <SelectItem value="teacher">Teacher</SelectItem>
                          <SelectItem value="parent">Parent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {(formData.role === "teacher") && (
                      <div className="space-y-2">
                        <Label htmlFor="schoolCode">School Access Code</Label>
                        <Input 
                          id="schoolCode"
                          name="schoolCode"
                          value={formData.schoolCode}
                          onChange={handleChange}
                          placeholder="Required for teacher accounts"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Teachers need an access code from the school administrator
                        </p>
                      </div>
                    )}
                    
                    <Button 
                      type="button" 
                      className="w-full" 
                      onClick={handleContinue}
                    >
                      Continue
                    </Button>
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password*</Label>
                      <Input 
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Password must be at least 8 characters
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password*</Label>
                      <Input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => {
                          setStep(1);
                          setError("");
                        }}
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        className="flex-1"
                        disabled={isLoading}
                      >
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Create Account
                      </Button>
                    </div>
                  </>
                )}
                
                <div className="mt-4 text-center text-sm">
                  <p>Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 border-t pt-6">
              <div className="text-sm text-center text-gray-600 dark:text-gray-400">
                <p>By registering, you agree to our{" "}
                  <Link to="/terms" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-blue-600 dark:text-blue-400 hover:underline">
                    Privacy Policy
                  </Link>
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

export default Register;
