
import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Mail, Phone, MapPin, GraduationCap, Book, Clock, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "+254 712 345 678",
    address: "123 Westlands Road, Nairobi",
    studentId: "JHS-2025-001",
    dateOfBirth: "April 15, 2007",
    grade: "11",
    classTeacher: "Mrs. Odhiambo",
    bio: "I'm a passionate student interested in mathematics and science. I hope to pursue engineering in the future."
  });

  const academicRecords = [
    {
      year: "2024-2025",
      term: "Term 2",
      gpa: "3.8/4.0",
      grades: [
        { subject: "Mathematics", grade: "A", teacher: "Mrs. Johnson" },
        { subject: "Physics", grade: "A-", teacher: "Mr. Chen" },
        { subject: "English", grade: "B+", teacher: "Mrs. Barnes" },
        { subject: "History", grade: "A", teacher: "Mrs. Odhiambo" },
        { subject: "Chemistry", grade: "B+", teacher: "Dr. Wong" }
      ]
    },
    {
      year: "2024-2025",
      term: "Term 1",
      gpa: "3.7/4.0",
      grades: [
        { subject: "Mathematics", grade: "A", teacher: "Mrs. Johnson" },
        { subject: "Physics", grade: "B+", teacher: "Mr. Chen" },
        { subject: "English", grade: "A-", teacher: "Mrs. Barnes" },
        { subject: "History", grade: "A-", teacher: "Mrs. Odhiambo" },
        { subject: "Chemistry", grade: "B", teacher: "Dr. Wong" }
      ]
    }
  ];

  const attendance = {
    overall: "94%",
    data: [
      { month: "January", percentage: "96%", absences: 1 },
      { month: "February", percentage: "94%", absences: 2 },
      { month: "March", percentage: "97%", absences: 1 },
      { month: "April", percentage: "92%", absences: 3 },
      { month: "May", percentage: "95%", absences: 2 }
    ]
  };

  const handleProfileUpdate = () => {
    // In a real app with Supabase, this would update the user profile
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your information has been saved successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
            <p className="text-gray-600">View and manage your student profile</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleProfileUpdate}>
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 text-2xl font-bold">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <CardTitle>{profileData.firstName} {profileData.lastName}</CardTitle>
              <CardDescription>Student ID: {profileData.studentId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Email</h4>
                    <p>{profileData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Phone</h4>
                    <p>{profileData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Address</h4>
                    <p>{profileData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Date of Birth</h4>
                    <p>{profileData.dateOfBirth}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Grade</h4>
                    <p>Grade {profileData.grade}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Class Teacher</h4>
                    <p>{profileData.classTeacher}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Bio</h4>
                  <p className="text-sm">{profileData.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Academic Info Card */}
          <Card className="lg:col-span-2">
            <Tabs defaultValue="records">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Academic Information</CardTitle>
                  <TabsList>
                    <TabsTrigger value="records">Records</TabsTrigger>
                    <TabsTrigger value="attendance">Attendance</TabsTrigger>
                    {isEditing && <TabsTrigger value="edit">Edit Profile</TabsTrigger>}
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="records" className="space-y-6">
                  {academicRecords.map((term, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium">{term.year}, {term.term}</h3>
                          <p className="text-sm text-gray-500">GPA: {term.gpa}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <FileText className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                      </div>
                      
                      <div className="rounded-md border overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Grade
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Teacher
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {term.grades.map((subject, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Book className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                                    <div className="text-sm font-medium text-gray-900">
                                      {subject.subject}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`
                                    px-2 py-1 text-xs font-medium rounded-full
                                    ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' : ''}
                                    ${subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : ''}
                                    ${subject.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800' : ''}
                                    ${subject.grade.startsWith('D') ? 'bg-orange-100 text-orange-800' : ''}
                                    ${subject.grade.startsWith('F') ? 'bg-red-100 text-red-800' : ''}
                                  `}>
                                    {subject.grade}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {subject.teacher}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="attendance">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Attendance Summary</h3>
                      <p className="text-sm text-gray-500">Overall Attendance: {attendance.overall}</p>
                    </div>
                    
                    <div className="rounded-md border overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Attendance
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Absences
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {attendance.data.map((month, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {month.month}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ 
                                        width: month.percentage
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-900">
                                    {month.percentage}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {month.absences} days
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="edit">
                  {isEditing && (
                    <form className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input 
                          id="phone" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Input 
                          id="bio" 
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      </div>
                    </form>
                  )}
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
