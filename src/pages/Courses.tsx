
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Courses = () => {
  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Mathematics",
      description: "Algebra, Calculus, and Geometry",
      teacher: "Dr. Sarah Johnson",
      students: 28,
      progress: 65,
      time: "Mon, Wed, Fri 9:00 AM",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 2,
      title: "Physics",
      description: "Mechanics, Thermodynamics, and Electromagnetism",
      teacher: "Mr. Robert Chen",
      students: 24,
      progress: 42,
      time: "Tue, Thu 11:00 AM",
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 3,
      title: "English Literature",
      description: "Poetry, Prose, and Drama",
      teacher: "Mrs. Emily Barnes",
      students: 32,
      progress: 78,
      time: "Mon, Wed 2:00 PM",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 4,
      title: "Chemistry",
      description: "Organic and Inorganic Chemistry",
      teacher: "Dr. Michael Wong",
      students: 26,
      progress: 51,
      time: "Tue, Thu 1:30 PM",
      color: "bg-amber-100 text-amber-800"
    },
    {
      id: 5,
      title: "History",
      description: "World History and African History",
      teacher: "Mrs. Lily Odhiambo",
      students: 30,
      progress: 85,
      time: "Wed, Fri 10:30 AM",
      color: "bg-red-100 text-red-800"
    },
    {
      id: 6,
      title: "Computer Science",
      description: "Programming, Algorithms, and Data Structures",
      teacher: "Mr. James Mwangi",
      students: 22,
      progress: 60,
      time: "Mon, Thu 3:00 PM",
      color: "bg-cyan-100 text-cyan-800"
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
            <p className="text-gray-600">View and manage your enrolled courses</p>
          </div>
          <Button>
            <Book className="mr-2 h-4 w-4" />
            Browse All Courses
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <Link to={`/courses/${course.id}`} key={course.id} className="group">
              <Card className="h-full transition-all hover:shadow-md">
                <CardHeader className={`${course.color} rounded-t-lg`}>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="text-gray-700">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="font-medium">{course.teacher}</p>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center text-sm">
                      <Clock className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{course.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{course.students} students</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Courses;
