
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Download } from "lucide-react";

const Grades = () => {
  // Mock data for grades
  const currentTermGrades = [
    { subject: "Mathematics", grade: "A", score: "91%", teacher: "Prof. Grace Hopper", comments: "Excellent understanding of complex concepts" },
    { subject: "English Literature", grade: "B+", score: "88%", teacher: "Ms. Jane Austen", comments: "Strong analytical skills, could improve essay structure" },
    { subject: "Physics", grade: "A-", score: "89%", teacher: "Prof. Richard Feynman", comments: "Very good problem-solving abilities" },
    { subject: "Chemistry", grade: "B", score: "85%", teacher: "Dr. Marie Curie", comments: "Good lab work, needs more focus on theory" },
    { subject: "History", grade: "A", score: "93%", teacher: "Dr. Margaret Hamilton", comments: "Excellent research and presentation skills" },
    { subject: "Computer Science", grade: "A+", score: "97%", teacher: "Dr. Alan Turing", comments: "Outstanding programming and algorithmic thinking" },
    { subject: "Biology", grade: "B+", score: "87%", teacher: "Dr. Jane Goodall", comments: "Good understanding of concepts, excellent lab work" },
    { subject: "Physical Education", grade: "A", score: "92%", teacher: "Mr. Jesse Owens", comments: "Great teamwork and leadership skills" }
  ];

  const previousTermGrades = [
    { subject: "Mathematics", grade: "B+", score: "87%", teacher: "Prof. Grace Hopper", comments: "Good progress throughout the term" },
    { subject: "English Literature", grade: "A-", score: "90%", teacher: "Ms. Jane Austen", comments: "Excellent critical analysis in essays" },
    { subject: "Physics", grade: "B", score: "84%", teacher: "Prof. Richard Feynman", comments: "Solid understanding of fundamentals" },
    { subject: "Chemistry", grade: "B-", score: "81%", teacher: "Dr. Marie Curie", comments: "Needs to improve lab technique" },
    { subject: "History", grade: "A-", score: "91%", teacher: "Dr. Margaret Hamilton", comments: "Very good historical analysis" },
    { subject: "Computer Science", grade: "A", score: "94%", teacher: "Dr. Alan Turing", comments: "Excellent coding skills" },
    { subject: "Biology", grade: "B", score: "83%", teacher: "Dr. Jane Goodall", comments: "Good understanding of core concepts" },
    { subject: "Physical Education", grade: "A-", score: "90%", teacher: "Mr. Jesse Owens", comments: "Strong athletic performance" }
  ];

  const getGradeColor = (grade: string) => {
    switch (grade.charAt(0)) {
      case 'A': return "bg-green-100 text-green-800";
      case 'B': return "bg-blue-100 text-blue-800";
      case 'C': return "bg-yellow-100 text-yellow-800";
      case 'D': return "bg-orange-100 text-orange-800";
      default: return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Academic Grades</h2>
          <p className="text-gray-600">View your performance across all subjects</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download Report Card
        </Button>
      </div>

      {/* GPA Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Current Term GPA</p>
              <p className="text-3xl font-bold text-green-600">3.8</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Previous Term GPA</p>
              <p className="text-3xl font-bold text-blue-600">3.6</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Cumulative GPA</p>
              <p className="text-3xl font-bold text-purple-600">3.7</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Class Rank</p>
              <p className="text-3xl font-bold">4/35</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades by Term */}
      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Term</TabsTrigger>
          <TabsTrigger value="previous">Previous Term</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Term 2, 2024-2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                      <th className="px-4 py-2 text-left">Score</th>
                      <th className="px-4 py-2 text-left">Teacher</th>
                      <th className="px-4 py-2 text-left">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentTermGrades.map((subject, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{subject.subject}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3">{subject.score}</td>
                        <td className="px-4 py-3">{subject.teacher}</td>
                        <td className="px-4 py-3 text-sm">{subject.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="previous" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" />
                Term 1, 2024-2025
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="px-4 py-2 text-left">Subject</th>
                      <th className="px-4 py-2 text-left">Grade</th>
                      <th className="px-4 py-2 text-left">Score</th>
                      <th className="px-4 py-2 text-left">Teacher</th>
                      <th className="px-4 py-2 text-left">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {previousTermGrades.map((subject, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">{subject.subject}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(subject.grade)}`}>
                            {subject.grade}
                          </span>
                        </td>
                        <td className="px-4 py-3">{subject.score}</td>
                        <td className="px-4 py-3">{subject.teacher}</td>
                        <td className="px-4 py-3 text-sm">{subject.comments}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Grades;
