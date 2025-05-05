
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useState } from "react";
import { School, Calendar, MessageSquare, Book, Users } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // This will be replaced with actual Supabase authentication later
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">EduPortal</h1>
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
                        <NavigationMenuLink asChild>
                          <a 
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 focus:text-blue-900"
                          >
                            <div className="text-sm font-medium leading-none">Courses</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                              Browse and manage your current courses
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <a 
                            href="#"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-900 focus:bg-blue-100 focus:text-blue-900"
                          >
                            <div className="text-sm font-medium leading-none">Assignments</div>
                            <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                              View and submit your pending assignments
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="#" className={navigationMenuTriggerStyle()}>
                    Calendar
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="#" className={navigationMenuTriggerStyle()}>
                    Messages
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          ) : (
            <div className="flex gap-4">
              <Button variant="outline">Sign Up</Button>
              <Button onClick={handleLogin}>Log In</Button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to EduPortal</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your all-in-one platform for managing courses, assignments, grades, and communication in one place.
          </p>
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
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle>Community</CardTitle>
              <CardDescription>Join discussion groups</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Participate in academic discussions, join study groups, and collaborate on projects.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">Find Groups</Button>
            </CardFooter>
          </Card>
        </section>
        
        {/* CTA Section */}
        <section className="bg-blue-600 text-white rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
          <p className="mb-6">Create an account or log in to access all features of the school portal.</p>
          <div className="flex justify-center gap-4">
            <Button variant="secondary">Sign Up</Button>
            <Button variant="outline" className="text-white border-white hover:bg-blue-700">Learn More</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">EduPortal</h4>
              <p>Your comprehensive school management system designed to streamline education processes.</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300">About Us</a></li>
                <li><a href="#" className="hover:text-blue-300">Contact</a></li>
                <li><a href="#" className="hover:text-blue-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-blue-300">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Connect</h4>
              <p className="mb-2">Email: support@eduportal.com</p>
              <p>Phone: (123) 456-7890</p>
              <div className="flex space-x-4 mt-4">
                {/* Social media icons would go here */}
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-6 text-center">
            <p>&copy; 2025 EduPortal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
