
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Mail, Phone } from "lucide-react";

const Teachers = () => {
  // Mock data for teachers
  const teachers = [
    {
      id: 1,
      name: "Dr. Alan Turing",
      subject: "Computer Science",
      department: "Science & Technology",
      email: "aturning@school.edu",
      phone: "+254-700-123456",
      qualification: "Ph.D. in Computer Science",
      classes: ["10A", "11B", "12A"]
    },
    {
      id: 2,
      name: "Prof. Grace Hopper",
      subject: "Mathematics",
      department: "Mathematics",
      email: "ghopper@school.edu",
      phone: "+254-700-234567",
      qualification: "Ph.D. in Mathematics",
      classes: ["9C", "10B", "11A"]
    },
    {
      id: 3,
      name: "Dr. Margaret Hamilton",
      subject: "History",
      department: "Humanities",
      email: "mhamilton@school.edu",
      phone: "+254-700-345678",
      qualification: "Ph.D. in History",
      classes: ["9A", "10C", "12B"]
    },
    {
      id: 4,
      name: "Prof. Richard Feynman",
      subject: "Physics",
      department: "Science & Technology",
      email: "rfeynman@school.edu",
      phone: "+254-700-456789",
      qualification: "Ph.D. in Physics",
      classes: ["10A", "11C", "12A"]
    },
    {
      id: 5,
      name: "Dr. Jane Goodall",
      subject: "Biology",
      department: "Science & Technology",
      email: "jgoodall@school.edu",
      phone: "+254-700-567890",
      qualification: "Ph.D. in Biology",
      classes: ["9B", "10B", "11B"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Teachers</h2>
          <p className="text-gray-600">Manage teacher information and assignments</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Teacher
        </Button>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input type="text" placeholder="Search teachers..." className="pl-9" />
        </div>
        <Button variant="outline">Department Filter</Button>
      </div>

      {/* Teachers list */}
      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <Card key={teacher.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="font-medium text-lg">{teacher.name}</h3>
                  <p className="text-sm text-blue-600">{teacher.subject} | {teacher.department}</p>
                  
                  <div className="mt-2 space-y-1 text-sm">
                    <p>Qualification: {teacher.qualification}</p>
                    <p>Classes: {teacher.classes.join(", ")}</p>
                    
                    <div className="flex items-center mt-2">
                      <Mail className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{teacher.email}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{teacher.phone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 flex flex-col space-y-2">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button variant="outline" size="sm">View Schedule</Button>
                  <Button variant="outline" size="sm">Send Message</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Teachers;
