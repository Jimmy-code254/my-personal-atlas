
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Plus } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for events
  const events = [
    {
      id: 1,
      title: "Math Quiz",
      description: "Algebra unit test",
      date: new Date(2025, 4, 10), // May 10, 2025
      time: "10:00 AM - 11:00 AM",
      location: "Room 203",
      type: "exam",
      color: "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20"
    },
    {
      id: 2,
      title: "Science Fair",
      description: "Annual school science exhibition",
      date: new Date(2025, 4, 15), // May 15, 2025
      time: "9:00 AM - 3:00 PM",
      location: "School Hall",
      type: "event",
      color: "border-green-500 bg-green-50 dark:border-green-400 dark:bg-green-900/20"
    },
    {
      id: 3,
      title: "Parent-Teacher Conference",
      description: "Term 2 progress discussion",
      date: new Date(2025, 4, 18), // May 18, 2025
      time: "2:00 PM - 5:00 PM",
      location: "Main Building",
      type: "meeting",
      color: "border-purple-500 bg-purple-50 dark:border-purple-400 dark:bg-purple-900/20"
    },
    {
      id: 4,
      title: "English Literature Assignment Due",
      description: "Essay on Macbeth",
      date: new Date(2025, 4, 12), // May 12, 2025
      time: "11:59 PM",
      location: "Submit online",
      type: "assignment",
      color: "border-amber-500 bg-amber-50 dark:border-amber-400 dark:bg-amber-900/20"
    },
    {
      id: 5,
      title: "Sports Day",
      description: "Annual athletics competition",
      date: new Date(2025, 4, 20), // May 20, 2025
      time: "8:00 AM - 4:00 PM",
      location: "School Field",
      type: "event",
      color: "border-red-500 bg-red-50 dark:border-red-400 dark:bg-red-900/20"
    }
  ];

  // Filter events for the selected date
  const selectedDateEvents = date 
    ? events.filter(event => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
    : [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Academic Calendar</h2>
          <p className="text-gray-600 dark:text-gray-300">View upcoming classes, events, and deadlines</p>
        </div>
        <Button className="transition-all hover:scale-105 hover:shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 hover:shadow-lg transition-shadow">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="pointer-events-auto"
              initialFocus
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium dark:text-white">
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </h3>
            </div>

            <div className="space-y-4">
              {selectedDateEvents.length > 0 ? (
                selectedDateEvents.map(event => (
                  <div 
                    key={event.id} 
                    className={`p-4 border-l-4 rounded-md ${event.color} transition-transform hover:scale-[1.01]`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium text-lg dark:text-white">{event.title}</h4>
                        <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                        
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                            <span className="dark:text-gray-300">{event.time}</span>
                          </div>
                          {event.location && (
                            <div className="flex items-center text-sm">
                              <MapPin className="mr-2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                              <span className="dark:text-gray-300">{event.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <span className={`
                        text-xs px-2 py-1 rounded-full capitalize transition-colors
                        ${event.type === 'exam' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                        ${event.type === 'event' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : ''}
                        ${event.type === 'meeting' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : ''}
                        ${event.type === 'assignment' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300' : ''}
                      `}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <CalendarIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-gray-100">No events scheduled</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">There are no events scheduled for this date.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
