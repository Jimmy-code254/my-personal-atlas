
import React, { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Clock, Calendar, Users, Search, Filter, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Courses = () => {
  const auth = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [showFiltered, setShowFiltered] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    instructor: "",
    schedule: "",
    description: ""
  });

  // Check if auth context is available
  if (!auth || !auth.user) {
    return (
      <div className="container mx-auto p-4">
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            User authentication data is not available. Please try logging in again.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const courseData = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      instructor: "Dr. Alan Turing",
      schedule: "Mon, Wed, Fri 10:00 - 11:30 AM",
      students: 28,
      progress: 65,
      description: "Foundational principles of computer science, algorithms, and computational thinking.",
      status: "active"
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      instructor: "Dr. Grace Hopper",
      schedule: "Tue, Thu 1:00 - 2:30 PM",
      students: 22,
      progress: 42,
      description: "In-depth study of calculus, linear algebra, and discrete mathematics.",
      status: "active"
    },
    {
      id: 3,
      title: "History of Ancient Civilizations",
      instructor: "Prof. Margaret Hamilton",
      schedule: "Mon, Wed 3:00 - 4:30 PM",
      students: 35,
      progress: 78,
      description: "Exploration of ancient cultures, their rise, achievements, and legacies.",
      status: "active"
    },
    {
      id: 4,
      title: "Introduction to Psychology",
      instructor: "Dr. Carl Jung",
      schedule: "Tue, Thu 9:00 - 10:30 AM",
      students: 30,
      progress: 25,
      description: "Study of human behavior, mental processes, and psychological theories.",
      status: "upcoming"
    },
    {
      id: 5,
      title: "Modern Physics",
      instructor: "Dr. Richard Feynman",
      schedule: "Mon, Wed, Fri 2:00 - 3:30 PM",
      students: 18,
      progress: 15,
      description: "Exploration of quantum mechanics, relativity, and modern physics concepts.",
      status: "upcoming"
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = courseData.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(filtered);
    setShowFiltered(true);
    
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} courses matching "${searchQuery}"`,
    });
  };
  
  const resetSearch = () => {
    setSearchQuery("");
    setShowFiltered(false);
  };

  const handleCreateCourse = () => {
    toast({
      title: "Course Created",
      description: `"${newCourse.title}" has been successfully created`,
    });
    
    // Reset form
    setNewCourse({
      title: "",
      instructor: "",
      schedule: "",
      description: ""
    });
  };

  const coursesToDisplay = showFiltered ? filteredCourses : courseData;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Courses</h2>
        
        <div className="flex gap-2">
          <form onSubmit={handleSearch} className="relative max-w-xs flex-1">
            <Input 
              type="search"
              placeholder="Search courses..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {showFiltered && (
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                onClick={resetSearch}
              >
                ×
              </Button>
            )}
          </form>

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Course
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>
                  Add the details for your new course below.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title</Label>
                  <Input 
                    id="title" 
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="Enter course title" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instructor">Instructor</Label>
                  <Input 
                    id="instructor" 
                    value={newCourse.instructor}
                    onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value})}
                    placeholder="Enter instructor name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="schedule">Schedule</Label>
                  <Input 
                    id="schedule" 
                    value={newCourse.schedule}
                    onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value})}
                    placeholder="e.g. Mon, Wed, Fri 10:00 - 11:30 AM" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Enter course description" 
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateCourse}>Create Course</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {showFiltered && filteredCourses.length === 0 && (
        <Alert>
          <AlertDescription>
            No courses match your search criteria. Try a different search term or <Button variant="link" className="p-0 h-auto" onClick={resetSearch}>view all courses</Button>.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coursesToDisplay.map((course) => (
          <Card key={course.id} className="overflow-hidden border-gray-200 dark:border-gray-700 transition-all hover:shadow-md">
            <CardHeader className="bg-gray-50 dark:bg-gray-800 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-gray-900 dark:text-gray-100">{course.title}</CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300 mt-1">{course.instructor}</CardDescription>
                </div>
                <Badge variant={course.status === "active" ? "default" : "secondary"}>
                  {course.status === "active" ? "Active" : "Upcoming"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {course.description}
                </p>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <span>{course.schedule}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="mr-2 h-4 w-4 opacity-70" />
                  <span>{course.students} students enrolled</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">Progress</span>
                    <span className="font-medium text-blue-600 dark:text-blue-400">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
              <Button className="w-full">View Course</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
