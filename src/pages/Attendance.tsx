
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { CheckCircle2, XCircle, AlertCircle, CalendarDays, Clock, BarChart } from "lucide-react";

const Attendance = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  // Mock data for attendance records
  const attendanceData = [
    { date: "2025-05-05", status: "present", timeIn: "7:45 AM", timeOut: "4:00 PM", subject: "All Day" },
    { date: "2025-05-06", status: "present", timeIn: "7:50 AM", timeOut: "4:00 PM", subject: "All Day" },
    { date: "2025-05-07", status: "present", timeIn: "7:40 AM", timeOut: "4:00 PM", subject: "All Day" },
    { date: "2025-05-08", status: "tardy", timeIn: "8:15 AM", timeOut: "4:00 PM", subject: "All Day", reason: "Traffic delay" },
    { date: "2025-05-09", status: "absent", reason: "Sick leave", subject: "All Day" },
    { date: "2025-05-12", status: "present", timeIn: "7:55 AM", timeOut: "4:00 PM", subject: "All Day" },
    { date: "2025-05-13", status: "present", timeIn: "7:45 AM", timeOut: "4:00 PM", subject: "All Day" },
    { date: "2025-05-14", status: "excused", subject: "Mathematics", reason: "Doctor's appointment" },
    { date: "2025-05-15", status: "present", timeIn: "7:50 AM", timeOut: "4:00 PM", subject: "All Day" },
    { date: "2025-05-16", status: "present", timeIn: "7:45 AM", timeOut: "4:00 PM", subject: "All Day" }
  ];
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <CheckCircle2 className="text-green-500 h-5 w-5" />;
      case "absent":
        return <XCircle className="text-red-500 h-5 w-5" />;
      case "tardy":
        return <Clock className="text-orange-500 h-5 w-5" />;
      case "excused":
        return <AlertCircle className="text-blue-500 h-5 w-5" />;
      default:
        return null;
    }
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "tardy":
        return "bg-orange-100 text-orange-800";
      case "excused":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Attendance Records</h2>
          <p className="text-gray-600">View and manage attendance history</p>
        </div>
        <Button variant="outline">
          <CalendarDays className="mr-2 h-4 w-4" />
          Download Attendance Report
        </Button>
      </div>

      {/* Attendance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Present Days</p>
                <p className="text-2xl font-bold text-green-600">18</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Absent Days</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Tardy Days</p>
                <p className="text-2xl font-bold text-orange-600">1</p>
              </div>
              <Clock className="h-8 w-8 text-orange-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Attendance Rate</p>
                <p className="text-2xl font-bold text-blue-600">95%</p>
              </div>
              <BarChart className="h-8 w-8 text-blue-500 opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Calendar View</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border"
            />
            
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
                <span className="text-xs">Present</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                <span className="text-xs">Absent</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full mr-1"></div>
                <span className="text-xs">Tardy</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs">Excused</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="present">Present</TabsTrigger>
                <TabsTrigger value="absent">Absent</TabsTrigger>
                <TabsTrigger value="tardy">Tardy</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Status</th>
                        <th className="px-4 py-2 text-left">Time In</th>
                        <th className="px-4 py-2 text-left">Time Out</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((record, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3">{record.date}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {getStatusIcon(record.status)}
                              <span className={`ml-2 text-xs px-2 py-1 rounded-full capitalize ${getStatusClass(record.status)}`}>
                                {record.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">{record.timeIn || "-"}</td>
                          <td className="px-4 py-3">{record.timeOut || "-"}</td>
                          <td className="px-4 py-3">{record.subject}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{record.reason || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="present" className="mt-4">
                {/* Filter for present only */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Time In</th>
                        <th className="px-4 py-2 text-left">Time Out</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData
                        .filter(record => record.status === "present")
                        .map((record, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{record.date}</td>
                            <td className="px-4 py-3">{record.timeIn}</td>
                            <td className="px-4 py-3">{record.timeOut}</td>
                            <td className="px-4 py-3">{record.subject}</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              {/* Similar content for other tabs */}
              <TabsContent value="absent" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData
                        .filter(record => record.status === "absent")
                        .map((record, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{record.date}</td>
                            <td className="px-4 py-3">{record.subject}</td>
                            <td className="px-4 py-3">{record.reason}</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
              
              <TabsContent value="tardy" className="mt-4">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Time In</th>
                        <th className="px-4 py-2 text-left">Subject</th>
                        <th className="px-4 py-2 text-left">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData
                        .filter(record => record.status === "tardy")
                        .map((record, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="px-4 py-3">{record.date}</td>
                            <td className="px-4 py-3">{record.timeIn}</td>
                            <td className="px-4 py-3">{record.subject}</td>
                            <td className="px-4 py-3">{record.reason}</td>
                          </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Attendance;
