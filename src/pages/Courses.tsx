
import React from 'react';
import { useAuth } from "../contexts/AuthContext";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Clock, Calendar, Users } from "lucide-react";

const Courses = () => {
  const auth = useAuth();

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
      description: "Foundational principles of computer science, algorithms, and computational thinking."
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      instructor: "Dr. Grace Hopper",
      schedule: "Tue, Thu 1:00 - 2:30 PM",
      students: 22,
      progress: 42,
      description: "In-depth study of calculus, linear algebra, and discrete mathematics."
    },
    {
      id: 3,
      title: "History of Ancient Civilizations",
      instructor: "Prof. Margaret Hamilton",
      schedule: "Mon, Wed 3:00 - 4:30 PM",
      students: 35,
      progress: 78,
      description: "Exploration of ancient cultures, their rise, achievements, and legacies."
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">My Courses</h2>
        <Button>Join New Course</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course) => (
          <Card key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.instructor}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {course.description}
                </p>
                
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4 opacity-70" />
                  <span>{course.schedule}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Users className="mr-2 h-4 w-4 opacity-70" />
                  <span>{course.students} students enrolled</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
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
            <CardFooter>
              <Button className="w-full">View Course</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Courses;
