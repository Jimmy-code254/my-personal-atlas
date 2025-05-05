
import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  School, 
  Home, 
  Book, 
  ClipboardList, 
  Calendar, 
  MessageSquare, 
  User, 
  Settings, 
  LogOut, 
  Bell,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    // In a real app, this would use Supabase auth
    // For now, we'll simulate logout
    toast({
      title: "Logged out successfully",
      description: "See you soon!",
    });
    navigate("/");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
      setSearchQuery("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <School className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-600">JimPortal</h1>
            </Link>

            <div className="flex-1 max-w-md mx-4">
              <form onSubmit={handleSearch} className="relative">
                <Input 
                  type="search"
                  placeholder="Search..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
              
              <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r bg-white hidden md:block">
          <nav className="p-4 space-y-1">
            <Link 
              to="/" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link 
              to="/courses" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/courses' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Book className="h-5 w-5" />
              <span>Courses</span>
            </Link>
            
            <Link 
              to="/assignments" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/assignments' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <ClipboardList className="h-5 w-5" />
              <span>Assignments</span>
            </Link>
            
            <Link 
              to="/calendar" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/calendar' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Calendar className="h-5 w-5" />
              <span>Calendar</span>
            </Link>
            
            <Link 
              to="/messages" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/messages' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
              <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">3</span>
            </Link>
            
            <Link 
              to="/profile" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/profile' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            
            <hr className="my-4" />
            
            <Link 
              to="/settings" 
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${location.pathname === '/settings' ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-100'}`}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
