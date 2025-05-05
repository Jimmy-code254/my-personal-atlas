
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, FileText, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const Assignments = () => {
  const [filter, setFilter] = useState("all");
  
  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: "Math Problem Set 5",
      subject: "Mathematics",
      dueDate: "May 10, 2025",
      status: "pending",
      description: "Complete problems 1-20 on page 45 of the textbook"
    },
    {
      id: 2,
      title: "Essay on Macbeth",
      subject: "English Literature",
      dueDate: "May 12, 2025",
      status: "pending",
      description: "Write a 1000-word analysis of themes in Macbeth"
    },
    {
      id: 3,
      title: "Chemical Reactions Lab Report",
      subject: "Chemistry",
      dueDate: "May 15, 2025",
      status: "pending",
      description: "Document your findings from the acid-base experiment"
    },
    {
      id: 4,
      title: "Photosynthesis Quiz",
      subject: "Biology",
      dueDate: "May 5, 2025",
      status: "completed",
      grade: "A",
      description: "Online quiz covering the photosynthesis process"
    },
    {
      id: 5,
      title: "Historical Figure Presentation",
      subject: "History",
      dueDate: "May 3, 2025",
      status: "completed",
      grade: "B+",
      description: "5-minute presentation on a significant historical figure"
    },
    {
      id: 6,
      title: "Physics Problem Set 3",
      subject: "Physics",
      dueDate: "April 28, 2025",
      status: "overdue",
      description: "Complete problems on forces and motion"
    }
  ];

  const filteredAssignments = filter === "all" 
    ? assignments 
    : assignments.filter(a => a.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Assignments</h2>
            <p className="text-gray-600">Track and submit your assignments</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger 
              value="all" 
              onClick={() => setFilter("all")}
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="pending" 
              onClick={() => setFilter("pending")}
            >
              Pending
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              onClick={() => setFilter("completed")}
            >
              Completed
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
              
              {filteredAssignments.length === 0 && (
                <div className="text-center py-12">
                  <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No assignments found</h3>
                  <p className="mt-1 text-gray-500">There are no assignments matching your filter.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
              
              {filteredAssignments.length === 0 && (
                <div className="text-center py-12">
                  <Check className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">All caught up!</h3>
                  <p className="mt-1 text-gray-500">You have no pending assignments.</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {filteredAssignments.map(assignment => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
              
              {filteredAssignments.length === 0 && (
                <div className="text-center py-12">
                  <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No completed assignments</h3>
                  <p className="mt-1 text-gray-500">You haven't completed any assignments yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  status: string;
  description: string;
  grade?: string;
}

const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-blue-100 text-blue-800";
      case "completed": return "bg-green-100 text-green-800";
      case "overdue": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "completed": return <Check className="h-4 w-4" />;
      case "overdue": return <X className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getStatusColor(assignment.status)}`}>
                {getStatusIcon(assignment.status)}
                <span className="capitalize">{assignment.status}</span>
              </span>
              <span className="text-sm text-gray-500">{assignment.subject}</span>
            </div>
            <h3 className="font-medium text-lg">{assignment.title}</h3>
            <p className="text-gray-600 mt-1">{assignment.description}</p>
            
            <div className="mt-3 flex items-center text-sm">
              <Clock className="mr-1 h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Due: {assignment.dueDate}</span>
              
              {assignment.grade && (
                <div className="ml-4 flex items-center">
                  <span className="font-medium text-gray-900">Grade: {assignment.grade}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="md:ml-6 mt-4 md:mt-0 flex flex-col md:flex-row gap-2 md:items-center">
            <Button variant="outline" size="sm" className="md:mr-2">
              <FileText className="mr-2 h-4 w-4" />
              View Details
            </Button>
            
            {assignment.status === "pending" && (
              <Button size="sm">
                Submit Assignment
              </Button>
            )}
            
            {assignment.status === "completed" && (
              <Button variant="outline" size="sm">
                View Feedback
              </Button>
            )}
            
            {assignment.status === "overdue" && (
              <Button variant="outline" size="sm" className="text-red-600 border-red-200">
                Submit Late
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Assignments;
