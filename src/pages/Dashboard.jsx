
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";
import { 
  CalendarDays, 
  BookOpen, 
  GraduationCap, 
  Users, 
  ClipboardCheck, 
  Bell, 
  MessageSquare, 
  FileText 
} from "lucide-react";

const Dashboard = () => {
  const { user, userRole } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    assignments: [],
    announcements: [],
    events: [],
    courses: [],
    stats: {
      assignmentsCount: 0,
      coursesCount: 0,
      averageGrade: "N/A",
      attendance: "N/A",
      unreadMessages: 0
    }
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Different queries based on user role
        if (userRole === "student") {
          // Fetch student dashboard data
          const { data: courses } = await supabase
            .from('student_courses')
            .select('*')
            .eq('student_id', user.id)
            .limit(5);
            
          const { data: assignments } = await supabase
            .from('assignments')
            .select('*')
            .eq('student_id', user.id)
            .order('due_date', { ascending: true })
            .limit(5);
            
          const { data: stats } = await supabase
            .rpc('get_student_stats', { student_id: user.id })
            .single();
            
          setDashboardData({
            courses: courses || [],
            assignments: assignments || [],
            events: [], // Placeholder for now
            announcements: [], // Placeholder for now
            stats: {
              assignmentsCount: assignments?.length || 0,
              coursesCount: courses?.length || 0,
              averageGrade: stats?.average_grade || "N/A",
              attendance: stats?.attendance_percentage ? `${stats.attendance_percentage}%` : "N/A",
              unreadMessages: stats?.unread_messages || 0
            }
          });
        } else if (userRole === "teacher") {
          // Fetch teacher dashboard data
          const { data: courses } = await supabase
            .from('courses')
            .select('*')
            .eq('teacher_id', user.id)
            .limit(5);
            
          const { data: assignments } = await supabase
            .from('assignments')
            .select('*')
            .eq('teacher_id', user.id)
            .limit(5);
            
          setDashboardData({
            courses: courses || [],
            assignments: assignments || [],
            events: [], // Placeholder for now
            announcements: [], // Placeholder for now
            stats: {
              assignmentsCount: assignments?.length || 0,
              coursesCount: courses?.length || 0,
              studentsCount: 120, // Placeholder
              classesCount: courses?.length || 0,
              unreadMessages: 5 // Placeholder
            }
          });
        } else if (userRole === "admin") {
          // Fetch admin dashboard data
          const { data: stats } = await supabase
            .rpc('get_admin_stats')
            .single();
            
          setDashboardData({
            courses: [],
            assignments: [],
            events: [],
            announcements: [],
            stats: {
              studentsCount: stats?.students_count || 0,
              teachersCount: stats?.teachers_count || 0,
              coursesCount: stats?.courses_count || 0,
              parentsCount: stats?.parents_count || 0
            }
          });
        } else if (userRole === "parent") {
          // Fetch parent dashboard data
          // Here we would typically fetch data related to the parent's children
          setDashboardData({
            courses: [],
            assignments: [],
            events: [],
            announcements: [],
            stats: {
              childrenCount: 2, // Placeholder
              averageGrade: "B+", // Placeholder
              attendance: "95%", // Placeholder
              upcomingEvents: 3 // Placeholder
            }
          });
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDashboardData();
    }
  }, [user, userRole]);

  // For demo purposes, we'll use sample data when real data is not available yet
  const getSampleData = () => {
    // Sample data for different roles
    const sampleData = {
      student: {
        assignments: [
          { id: 1, title: "Mathematics Homework", course: "Mathematics", due_date: "2025-05-10", status: "pending" },
          { id: 2, title: "Physics Lab Report", course: "Physics", due_date: "2025-05-12", status: "pending" },
          { id: 3, title: "English Essay", course: "English", due_date: "2025-05-15", status: "pending" }
        ],
        announcements: [
          { id: 1, title: "End of Semester Exams", date: "2025-05-02", content: "End of semester exams will begin on June 15th. Please prepare accordingly." },
          { id: 2, title: "School Sports Day", date: "2025-05-01", content: "Annual sports day will be held on May 20th. All students are encouraged to participate." }
        ],
        events: [
          { id: 1, title: "Math Quiz", date: "2025-05-10", time: "10:00 AM" },
          { id: 2, title: "Science Fair", date: "2025-05-20", time: "All Day" },
          { id: 3, title: "Parent-Teacher Conference", date: "2025-05-15", time: "2:00 PM" }
        ],
        stats: {
          assignmentsCount: 5,
          coursesCount: 6,
          averageGrade: "B+",
          attendance: "92%",
          unreadMessages: 3
        }
      },
      teacher: {
        classes: [
          { id: 1, name: "Mathematics 101", students: 30, time: "10:00 AM", day: "Monday, Wednesday, Friday" },
          { id: 2, name: "Advanced Calculus", students: 24, time: "1:00 PM", day: "Tuesday, Thursday" }
        ],
        upcomingLessons: [
          { id: 1, class: "Mathematics 101", topic: "Quadratic Equations", date: "2025-05-07", time: "10:00 AM" },
          { id: 2, class: "Advanced Calculus", topic: "Integration", date: "2025-05-08", time: "1:00 PM" }
        ],
        stats: {
          classesCount: 5,
          studentsCount: 120,
          assignmentsCount: 12,
          unreadMessages: 8
        }
      },
      admin: {
        stats: {
          studentsCount: 450,
          teachersCount: 35,
          coursesCount: 60,
          parentsCount: 380
        }
      },
      parent: {
        children: [
          { id: 1, name: "John Smith", grade: "9th Grade", averageGrade: "A-", attendance: "95%" },
          { id: 2, name: "Sarah Smith", grade: "6th Grade", averageGrade: "B+", attendance: "98%" }
        ],
        stats: {
          childrenCount: 2,
          averageGrade: "B+",
          attendance: "96.5%",
          upcomingEvents: 3
        }
      }
    };
    
    return sampleData[userRole] || sampleData.student;
  };
  
  // Combine real data with sample data when needed
  const data = dashboardData.assignments.length > 0 ? dashboardData : getSampleData();

  const renderRoleSpecificDashboard = () => {
    switch(userRole) {
      case "student":
        return <StudentDashboard data={data} />;
      case "teacher":
        return <TeacherDashboard data={data} />;
      case "admin":
        return <AdminDashboard data={data} />;
      case "parent":
        return <ParentDashboard data={data} />;
      default:
        return <StudentDashboard data={data} />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Calendar
          </Button>
        </div>
      </div>

      {renderRoleSpecificDashboard()}
    </div>
  );
};

const StudentDashboard = ({ data }) => {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{data.stats.assignmentsCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{data.stats.coursesCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{data.stats.averageGrade}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{data.stats.unreadMessages}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="assignments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="assignments" className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold">Upcoming Assignments</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {data.assignments.map((assignment) => (
                <div key={assignment.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{assignment.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Course: {assignment.course}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Due: {new Date(assignment.due_date).toLocaleDateString()}</p>
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                        {assignment.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="announcements" className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold">School Announcements</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {data.announcements.map((announcement) => (
                <div key={announcement.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div>
                    <div className="flex justify-between">
                      <h4 className="font-medium">{announcement.title}</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(announcement.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{announcement.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="events" className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
              <h3 className="font-semibold">Upcoming Events</h3>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="divide-y dark:divide-gray-700">
              {data.events.map((event) => (
                <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                    </div>
                    <span className="text-sm font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest actions and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Assignment Graded: Math Calculus Quiz</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Grade: A | 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">New Message from Mrs. Johnson</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">RE: Physics Project | Yesterday</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">New Course Material: Chemistry Lab Notes</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Chemistry 101 | 3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

const TeacherDashboard = ({ data }) => {
  return (
    <>
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Classes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{data.stats.classesCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{data.stats.studentsCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{data.stats.assignmentsCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center">
              <MessageSquare className="mr-2 h-4 w-4" />
              Unread Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{data.stats.unreadMessages}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
            <CardDescription>Classes you are currently teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.classes?.map((cls) => (
                <div key={cls.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{cls.name}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{cls.students} students</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {cls.day} at {cls.time}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Classes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Lessons</CardTitle>
            <CardDescription>Your teaching schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingLessons?.map((lesson) => (
                <div key={lesson.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{lesson.class}</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(lesson.date).toLocaleDateString()} at {lesson.time}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Topic: {lesson.topic}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Schedule</Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Submissions</CardTitle>
          <CardDescription>Latest assignment submissions from your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">John Smith submitted Physics Lab Report</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Physics 101 | 2 hours ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Mary Johnson submitted Math Homework</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mathematics 101 | Yesterday</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full">
                <FileText className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">James Wilson submitted English Essay</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">English Literature | 3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Submissions</Button>
        </CardFooter>
      </Card>
    </>
  );
};

const AdminDashboard = ({ data }) => {
  return (
    <>
      {/* Admin Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{data.stats.studentsCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{data.stats.teachersCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{data.stats.coursesCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Parents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{data.stats.parentsCount}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Admissions</CardTitle>
            <CardDescription>Latest student applications and enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div className="font-medium">Student Name</div>
                <div className="font-medium">Status</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm">JS</span>
                  </div>
                  <div>
                    <p className="font-medium">James Smith</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Grade 10 Application</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                  Pending Review
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm">AW</span>
                  </div>
                  <div>
                    <p className="font-medium">Alice White</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Grade 8 Application</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                  Approved
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-sm">RB</span>
                  </div>
                  <div>
                    <p className="font-medium">Robert Brown</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Grade 11 Application</p>
                  </div>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                  Interview Scheduled
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Applications</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add New Student
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4" />
                Add New Teacher
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Create New Course
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Bell className="mr-2 h-4 w-4" />
                Send Announcement
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <CalendarDays className="mr-2 h-4 w-4" />
                Create School Event
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate Reports
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

const ParentDashboard = ({ data }) => {
  return (
    <>
      {/* Parent Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300 flex items-center">
              <GraduationCap className="mr-2 h-4 w-4" />
              Children
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{data.stats.childrenCount}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300 flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Average Grade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900 dark:text-green-100">{data.stats.averageGrade}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 dark:text-amber-300 flex items-center">
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Attendance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-900 dark:text-amber-100">{data.stats.attendance}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300 flex items-center">
              <CalendarDays className="mr-2 h-4 w-4" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{data.stats.upcomingEvents}</p>
          </CardContent>
        </Card>
      </div>

      {/* Children Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Your Children</CardTitle>
          <CardDescription>Performance and attendance summary</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {data.children?.map((child) => (
              <div key={child.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{child.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{child.grade}</p>
                  </div>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Average Grade</p>
                    <p className="font-medium">{child.averageGrade}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Attendance</p>
                    <p className="font-medium">{child.attendance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Recent updates about your children</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-4 items-start">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <FileText className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Sarah's Math Quiz Result: A</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Mathematics | Yesterday</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                <ClipboardCheck className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">John was absent from Physics class</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Physics | 3 days ago</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Message from Mr. Davis about Science Fair</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Science | 4 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">View All Activities</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default Dashboard;
