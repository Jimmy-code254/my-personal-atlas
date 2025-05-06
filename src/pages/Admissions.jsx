
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { School, ChevronLeft, ChevronRight, FileUpload, Calendar, Loader2, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "../lib/supabase";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admissions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    studentFirstName: "",
    studentLastName: "",
    dateOfBirth: "",
    gender: "",
    currentSchool: "",
    gradeApplying: "",
    parentFirstName: "",
    parentLastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    relationship: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    emergencyContactRelationship: "",
    specialNeeds: "",
    additionalInformation: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const validateStep = (currentStep) => {
    // Simple validation for each step
    if (currentStep === 1) {
      if (!formData.studentFirstName || 
          !formData.studentLastName || 
          !formData.dateOfBirth || 
          !formData.gender || 
          !formData.gradeApplying) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return false;
      }
    } else if (currentStep === 2) {
      if (!formData.parentFirstName || 
          !formData.parentLastName || 
          !formData.email || 
          !formData.phone || 
          !formData.address) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields",
          variant: "destructive"
        });
        return false;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address",
          variant: "destructive"
        });
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app with Supabase, this would submit to the database
      // For demo purposes, we'll simulate successful submission
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      const { data, error } = await supabase
        .from('admissions_applications')
        .insert([
          { 
            student_first_name: formData.studentFirstName,
            student_last_name: formData.studentLastName,
            date_of_birth: formData.dateOfBirth,
            gender: formData.gender,
            current_school: formData.currentSchool,
            grade_applying: formData.gradeApplying,
            parent_first_name: formData.parentFirstName,
            parent_last_name: formData.parentLastName,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            country: formData.country,
            relationship: formData.relationship,
            emergency_contact_name: formData.emergencyContactName,
            emergency_contact_phone: formData.emergencyContactPhone,
            emergency_contact_relationship: formData.emergencyContactRelationship,
            special_needs: formData.specialNeeds,
            additional_information: formData.additionalInformation,
            status: "pending"
          }
        ]);
        
      if (error) throw error;
      
      toast({
        title: "Application submitted successfully",
        description: "We'll review your application and get back to you soon.",
      });
      
      setIsSubmitted(true);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <School className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">JimPortal</h1>
            </Link>
            <div className="flex gap-4">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/register">Register</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Student Admissions</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Apply for admission to JimPortal School, Westlands, Nairobi
            </p>
          </div>

          {!isSubmitted ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}>
                      1
                    </div>
                    <div className="h-1 w-12 bg-gray-200 dark:bg-gray-700">
                      <div className={`h-full ${step > 1 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}></div>
                    </div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}>
                      2
                    </div>
                    <div className="h-1 w-12 bg-gray-200 dark:bg-gray-700">
                      <div className={`h-full ${step > 2 ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-700"}`}></div>
                    </div>
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                    }`}>
                      3
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Step {step} of 3</p>
                </div>
                <CardTitle>
                  {step === 1 && "Student Information"}
                  {step === 2 && "Parent/Guardian Information"}
                  {step === 3 && "Additional Information"}
                </CardTitle>
                <CardDescription>
                  {step === 1 && "Please provide the student's personal details"}
                  {step === 2 && "Contact information for parent or guardian"}
                  {step === 3 && "Final details to complete your application"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  {step === 1 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="studentFirstName">First Name*</Label>
                          <Input
                            id="studentFirstName"
                            name="studentFirstName"
                            value={formData.studentFirstName}
                            onChange={handleChange}
                            placeholder="Student's first name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="studentLastName">Last Name*</Label>
                          <Input
                            id="studentLastName"
                            name="studentLastName"
                            value={formData.studentLastName}
                            onChange={handleChange}
                            placeholder="Student's last name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth">Date of Birth*</Label>
                          <div className="relative">
                            <Input
                              id="dateOfBirth"
                              name="dateOfBirth"
                              type="date"
                              value={formData.dateOfBirth}
                              onChange={handleChange}
                              required
                            />
                            <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gender">Gender*</Label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) => handleSelectChange("gender", value)}
                          >
                            <SelectTrigger id="gender">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentSchool">Current School (if any)</Label>
                          <Input
                            id="currentSchool"
                            name="currentSchool"
                            value={formData.currentSchool}
                            onChange={handleChange}
                            placeholder="Current school name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="gradeApplying">Grade Applying For*</Label>
                          <Select
                            value={formData.gradeApplying}
                            onValueChange={(value) => handleSelectChange("gradeApplying", value)}
                          >
                            <SelectTrigger id="gradeApplying">
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="grade1">Grade 1</SelectItem>
                              <SelectItem value="grade2">Grade 2</SelectItem>
                              <SelectItem value="grade3">Grade 3</SelectItem>
                              <SelectItem value="grade4">Grade 4</SelectItem>
                              <SelectItem value="grade5">Grade 5</SelectItem>
                              <SelectItem value="grade6">Grade 6</SelectItem>
                              <SelectItem value="grade7">Grade 7</SelectItem>
                              <SelectItem value="grade8">Grade 8</SelectItem>
                              <SelectItem value="form1">Form 1</SelectItem>
                              <SelectItem value="form2">Form 2</SelectItem>
                              <SelectItem value="form3">Form 3</SelectItem>
                              <SelectItem value="form4">Form 4</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialNeeds">Special Needs or Considerations</Label>
                        <Textarea
                          id="specialNeeds"
                          name="specialNeeds"
                          value={formData.specialNeeds}
                          onChange={handleChange}
                          placeholder="Please describe any special needs or accommodations required"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="parentFirstName">Parent/Guardian First Name*</Label>
                          <Input
                            id="parentFirstName"
                            name="parentFirstName"
                            value={formData.parentFirstName}
                            onChange={handleChange}
                            placeholder="First name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parentLastName">Parent/Guardian Last Name*</Label>
                          <Input
                            id="parentLastName"
                            name="parentLastName"
                            value={formData.parentLastName}
                            onChange={handleChange}
                            placeholder="Last name"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Relationship to Student*</Label>
                          <Select
                            value={formData.relationship}
                            onValueChange={(value) => handleSelectChange("relationship", value)}
                          >
                            <SelectTrigger id="relationship">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="guardian">Legal Guardian</SelectItem>
                              <SelectItem value="grandparent">Grandparent</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number*</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="e.g., +254700000000"
                            required
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
                          placeholder="email@example.com"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Home Address*</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Street address"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City/Town*</Label>
                          <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            placeholder="City"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country*</Label>
                          <Input
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            placeholder="Country"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContactName">Emergency Contact Name*</Label>
                        <Input
                          id="emergencyContactName"
                          name="emergencyContactName"
                          value={formData.emergencyContactName}
                          onChange={handleChange}
                          placeholder="Full name"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactPhone">Emergency Contact Phone*</Label>
                          <Input
                            id="emergencyContactPhone"
                            name="emergencyContactPhone"
                            value={formData.emergencyContactPhone}
                            onChange={handleChange}
                            placeholder="Phone number"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="emergencyContactRelationship">Relationship to Student*</Label>
                          <Input
                            id="emergencyContactRelationship"
                            name="emergencyContactRelationship"
                            value={formData.emergencyContactRelationship}
                            onChange={handleChange}
                            placeholder="e.g., Aunt, Uncle, Neighbor"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="additionalInformation">Additional Information</Label>
                        <Textarea
                          id="additionalInformation"
                          name="additionalInformation"
                          value={formData.additionalInformation}
                          onChange={handleChange}
                          placeholder="Any other information you'd like us to know"
                          rows={4}
                        />
                      </div>

                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                        <h3 className="font-semibold mb-2">Required Documents</h3>
                        <p className="text-sm mb-3">
                          Please note that the following documents will be required if your application proceeds:
                        </p>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                          <li>Birth certificate</li>
                          <li>Previous school records</li>
                          <li>Immunization records</li>
                          <li>Recent passport-sized photograph</li>
                          <li>Any relevant medical documents</li>
                        </ul>
                        <p className="text-sm mt-3">
                          You'll be able to upload these documents after your initial application is reviewed.
                        </p>
                      </div>
                    </>
                  )}
                </form>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={step === 1}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {step < 3 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit Application"
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          ) : (
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <CardTitle className="text-2xl mb-2">Application Submitted Successfully!</CardTitle>
                <CardDescription className="text-base">
                  Thank you for applying to JimPortal School
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Your application has been received and is being processed. Here's what happens next:
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                  <ol className="list-decimal pl-5 space-y-2 text-left">
                    <li>Our admissions team will review your application (typically within 5-7 business days)</li>
                    <li>You'll receive an email with further instructions for the next steps</li>
                    <li>If additional information is needed, we'll contact you via email or phone</li>
                    <li>Qualified applicants will be invited for an assessment and interview</li>
                  </ol>
                </div>
                <p className="italic">
                  Application Reference: <span className="font-semibold">JPS-{new Date().getFullYear()}-{Math.floor(1000 + Math.random() * 9000)}</span>
                </p>
              </CardContent>
              <CardFooter className="flex-col space-y-2">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  For any questions, please contact our admissions office at (0740641514) or email at admissions@jimportal.com
                </p>
                <div className="flex gap-4">
                  <Button variant="outline" asChild>
                    <Link to="/">Return Home</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Create Account</Link>
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 py-8 mt-12 border-t dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">JimPortal</h4>
              <p className="text-gray-600 dark:text-gray-400">Your comprehensive school management system designed to streamline education processes.</p>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Westlands, Nairobi, Kenya</p>
              <p className="text-gray-600 dark:text-gray-400">Contact: 0740641514</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About Us</Link></li>
                <li><Link to="/admissions" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Admissions</Link></li>
                <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
                <li><Link to="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">School Hours</h4>
              <p className="mb-2 text-gray-600 dark:text-gray-400">Monday - Friday: 8:00 AM - 4:00 PM</p>
              <p className="text-gray-600 dark:text-gray-400">Saturday: 9:00 AM - 1:00 PM (Activities)</p>
              <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
            </div>
          </div>
          <div className="border-t dark:border-gray-700 mt-8 pt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">&copy; 2025 JimPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Admissions;
