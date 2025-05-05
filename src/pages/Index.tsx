
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { School, Calendar, MessageSquare, Book, Users, GraduationCap, ClipboardList } from "lucide-react";
import { LoginForm } from "@/components/LoginForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast();

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Logged in successfully",
      description: "Welcome to JimPortal",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">JimPortal</h1>
          </div>
          
          {isLoggedIn ? (
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Dashboard</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                            href="#"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              Student Dashboard
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              View your courses, grades, and upcoming assignments
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link to="/courses">
                          <NavigationMenuLink asChild>
                            <a 
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 focus:text-blue-900"
                            >
                              <div className="text-sm font-medium leading-none">Courses</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                Browse and manage your current courses
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link to="/assignments">
                          <NavigationMenuLink asChild>
                            <a 
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 focus:text-blue-900"
                            >
                              <div className="text-sm font-medium leading-none">Assignments</div>
                              <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                                View and submit your pending assignments
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/calendar" className={navigationMenuTriggerStyle()}>
                    Calendar
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/messages" className={navigationMenuTriggerStyle()}>
                    Messages
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/profile" className={navigationMenuTriggerStyle()}>
                    Profile
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link to="/login">Log In</Link>
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {!isLoggedIn ? (
          <>
            <section className="mb-12 text-center">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to JimPortal</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
                Your all-in-one platform for managing courses, assignments, grades, and communication.
              </p>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Westlands, Nairobi, Kenya | Contact: 0740641514
              </p>
            </section>

            {/* Login Form Section */}
            <section className="max-w-md mx-auto mb-12 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Log In</h3>
              <LoginForm onLogin={handleLogin} />
            </section>

            {/* Features Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card>
                <CardHeader>
                  <Book className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Access all your course materials and resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Browse through your enrolled courses, access materials, and track your progress all in one place.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Explore Courses</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Schedule & Events</CardTitle>
                  <CardDescription>Never miss important dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Keep track of classes, exams, assignment due dates and school events with our integrated calendar.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Calendar</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <MessageSquare className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Messaging</CardTitle>
                  <CardDescription>Seamless communication</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Connect with instructors and classmates through our integrated messaging system.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Open Messages</Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <GraduationCap className="h-8 w-8 text-blue-600 mb-2" />
                  <CardTitle>Academic Records</CardTitle>
                  <CardDescription>Track your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Access your grades, attendance records, and academic performance reports all in one place.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View Records</Button>
                </CardFooter>
              </Card>
            </section>
          </>
        ) : (
          <DashboardPreview />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">JimPortal</h4>
              <p>Your comprehensive school management system designed to streamline education processes.</p>
              <p className="mt-2">Westlands, Nairobi, Kenya</p>
              <p>Contact: 0740641514</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-blue-300">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-300">Contact</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-300">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-300">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">School Hours</h4>
              <p className="mb-2">Monday - Friday: 8:00 AM - 4:00 PM</p>
              <p>Saturday: 9:00 AM - 1:00 PM (Activities)</p>
              <p>Sunday: Closed</p>
              <div className="flex space-x-4 mt-4">
                {/* Social media icons would go here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>&copy; 2025 JimPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const DashboardPreview = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-800">Your Dashboard</h2>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700">Upcoming Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">5</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700">Average Grade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">B+</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700">Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">92%</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">Unread Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">3</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity and Calendar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-gray-50 p-3 rounded-md">
                <ClipboardList className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Assignment Graded: Math Calculus Quiz</p>
                  <p className="text-sm text-gray-500">Grade: A | 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 p-3 rounded-md">
                <MessageSquare className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">New Message from Mrs. Johnson</p>
                  <p className="text-sm text-gray-500">RE: Physics Project | Yesterday</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-gray-50 p-3 rounded-md">
                <Book className="h-5 w-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">New Course Material: Chemistry Lab Notes</p>
                  <p className="text-sm text-gray-500">Chemistry 101 | 3 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">View All Activity</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="font-medium">Math Quiz</p>
                <p className="text-sm text-gray-500">May 7, 2025 • 10:00 AM</p>
              </div>
              <div className="border-l-4 border-green-500 pl-3">
                <p className="font-medium">Science Fair</p>
                <p className="text-sm text-gray-500">May 10, 2025 • All Day</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-3">
                <p className="font-medium">Parent-Teacher Conference</p>
                <p className="text-sm text-gray-500">May 15, 2025 • 2:00 PM</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild>
              <Link to="/calendar">View Calendar</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Index;
