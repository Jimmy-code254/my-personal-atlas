import { useState } from "react";
import { DashboardLayout } from "@/components/Dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Mail, Phone, MapPin, GraduationCap, Book, Clock, FileText, Calendar as CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  
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

  const handleAddEvent = () => {
    if (!eventTitle || !selectedDate) {
      toast({
        title: "Missing information",
        description: "Please provide at least an event title and date",
        variant: "destructive",
      });
      return;
    }

    // In a real app with Supabase, this would save the event to the database
    toast({
      title: "Event Added",
      description: `"${eventTitle}" has been added to your calendar for ${format(selectedDate, 'MMMM d, yyyy')}`,
    });

    // Reset form
    setEventTitle("");
    setEventDescription("");
    setEventTime("");
    setEventLocation("");
    setSelectedDate(undefined);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My Profile</h2>
            <p className="text-gray-600 dark:text-gray-300">View and manage your student profile</p>
          </div>
          {!isEditing ? (
            <div className="space-x-2">
              <Button onClick={() => setIsEditing(true)} className="transition-all hover:scale-105">
                Edit Profile
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="transition-all hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Add Calendar Event
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Event</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Input 
                        id="event-title" 
                        value={eventTitle}
                        onChange={(e) => setEventTitle(e.target.value)}
                        placeholder="Enter event title"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-date">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="event-date"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !selectedDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            initialFocus
                            className="pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-time">Time</Label>
                      <Input 
                        id="event-time" 
                        value={eventTime}
                        onChange={(e) => setEventTime(e.target.value)}
                        placeholder="e.g., 10:00 AM - 11:00 AM"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-location">Location</Label>
                      <Input 
                        id="event-location" 
                        value={eventLocation}
                        onChange={(e) => setEventLocation(e.target.value)}
                        placeholder="e.g., Room 203"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="event-description">Description</Label>
                      <Input 
                        id="event-description" 
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        placeholder="Enter event description"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddEvent} className="transition-all hover:scale-105">Add Event</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} className="transition-all hover:bg-red-50 dark:hover:bg-red-900/20">
                Cancel
              </Button>
              <Button onClick={handleProfileUpdate} className="transition-all hover:scale-105">
                Save Changes
              </Button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="lg:col-span-1 hover:shadow-md transition-shadow">
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200 flex items-center justify-center mx-auto mb-2 text-2xl font-bold">
                {profileData.firstName[0]}{profileData.lastName[0]}
              </div>
              <CardTitle className="dark:text-white">{profileData.firstName} {profileData.lastName}</CardTitle>
              <CardDescription className="dark:text-gray-300">Student ID: {profileData.studentId}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
                    <p className="dark:text-gray-200">{profileData.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h4>
                    <p className="dark:text-gray-200">{profileData.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</h4>
                    <p className="dark:text-gray-200">{profileData.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Date of Birth</h4>
                    <p className="dark:text-gray-200">{profileData.dateOfBirth}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <GraduationCap className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Grade</h4>
                    <p className="dark:text-gray-200">Grade {profileData.grade}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Class Teacher</h4>
                    <p className="dark:text-gray-200">{profileData.classTeacher}</p>
                  </div>
                </div>
                
                <div className="pt-2 border-t dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Bio</h4>
                  <p className="text-sm dark:text-gray-200">{profileData.bio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Academic Info Card */}
          <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
            <Tabs defaultValue="records">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="dark:text-white">Academic Information</CardTitle>
                  <TabsList>
                    <TabsTrigger value="records" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">Records</TabsTrigger>
                    <TabsTrigger value="attendance" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">Attendance</TabsTrigger>
                    {isEditing && <TabsTrigger value="edit" className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">Edit Profile</TabsTrigger>}
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent>
                <TabsContent value="records" className="space-y-6">
                  {academicRecords.map((term, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="text-lg font-medium dark:text-white">{term.year}, {term.term}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">GPA: {term.gpa}</p>
                        </div>
                        <Button variant="outline" size="sm" className="transition-all hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          <FileText className="mr-2 h-4 w-4" />
                          Download Report
                        </Button>
                      </div>
                      
                      <div className="rounded-md border dark:border-gray-700 overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Subject
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Grade
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Teacher
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {term.grades.map((subject, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="flex items-center">
                                    <Book className="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 mr-2" />
                                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                      {subject.subject}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`
                                    px-2 py-1 text-xs font-medium rounded-full
                                    ${subject.grade.startsWith('A') ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                                    ${subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                                    ${subject.grade.startsWith('C') ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                                    ${subject.grade.startsWith('D') ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' : ''}
                                    ${subject.grade.startsWith('F') ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                                  `}>
                                    {subject.grade}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
                      <h3 className="text-lg font-medium dark:text-white">Attendance Summary</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Overall Attendance: {attendance.overall}</p>
                    </div>
                    
                    <div className="rounded-md border dark:border-gray-700 overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Month
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Attendance
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Absences
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                          {attendance.data.map((month, index) => (
                            <tr key={index}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                                {month.month}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                                    <div 
                                      className="bg-blue-600 h-2 rounded-full" 
                                      style={{ 
                                        width: month.percentage
                                      }}
                                    ></div>
                                  </div>
                                  <span className="text-sm text-gray-900 dark:text-gray-100">
                                    {month.percentage}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
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
                          <Label htmlFor="firstName" className="dark:text-gray-200">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            className="hover:border-blue-400 focus:border-blue-500 transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="dark:text-gray-200">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            className="hover:border-blue-400 focus:border-blue-500 transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email" className="dark:text-gray-200">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="hover:border-blue-400 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="dark:text-gray-200">Phone</Label>
                        <Input 
                          id="phone" 
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="hover:border-blue-400 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address" className="dark:text-gray-200">Address</Label>
                        <Input 
                          id="address" 
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          className="hover:border-blue-400 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio" className="dark:text-gray-200">Bio</Label>
                        <Input 
                          id="bio" 
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          className="hover:border-blue-400 focus:border-blue-500 transition-colors"
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
