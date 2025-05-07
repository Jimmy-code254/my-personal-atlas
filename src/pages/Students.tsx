
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Filter } from "lucide-react";

const Students = () => {
  // Mock data for students
  const students = [
    {
      id: 1,
      name: "John Doe",
      grade: "10th",
      class: "A",
      attendance: "95%",
      averageGrade: "A-",
      parentName: "Robert & Mary Doe",
      contactInfo: "robertdoe@email.com"
    },
    {
      id: 2,
      name: "Jane Smith",
      grade: "11th",
      class: "B",
      attendance: "98%",
      averageGrade: "A+",
      parentName: "Michael & Sarah Smith",
      contactInfo: "msmith@email.com"
    },
    {
      id: 3,
      name: "David Johnson",
      grade: "9th",
      class: "C",
      attendance: "92%",
      averageGrade: "B+",
      parentName: "James & Lisa Johnson",
      contactInfo: "jjohnson@email.com"
    },
    {
      id: 4,
      name: "Emily Williams",
      grade: "12th",
      class: "A",
      attendance: "97%",
      averageGrade: "A",
      parentName: "Richard & Patricia Williams",
      contactInfo: "rwilliams@email.com"
    },
    {
      id: 5,
      name: "Kevin Brown",
      grade: "10th",
      class: "B",
      attendance: "89%",
      averageGrade: "B",
      parentName: "Thomas & Jennifer Brown",
      contactInfo: "tbrown@email.com"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Students</h2>
          <p className="text-gray-600">Manage student information and records</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New Student
        </Button>
      </div>

      {/* Search and filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input type="text" placeholder="Search students..." className="pl-9" />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Students list */}
      <div className="grid gap-4">
        {students.map((student) => (
          <Card key={student.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="font-medium text-lg">{student.name}</h3>
                  <div className="mt-1 text-sm text-gray-500 space-y-1">
                    <p>Grade: {student.grade}, Class: {student.class}</p>
                    <p>Attendance: {student.attendance} | Average Grade: {student.averageGrade}</p>
                    <p>Parents: {student.parentName}</p>
                    <p>Contact: {student.contactInfo}</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">View Grades</Button>
                  <Button variant="outline" size="sm">Contact Parent</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Students;
