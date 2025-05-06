
import React from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import { 
  School, Home, Book, ClipboardList, Calendar, MessageSquare, User, 
  Settings, LogOut, Bell, Search, Users, GraduationCap, CheckSquare,
  FileText, Sun, Moon, AlertTriangle
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const AppLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [notifications] = React.useState(3);

  // Check if auth context is available
  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="py-2">
            Authentication service is not available. Please try again later or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { user, userRole, logout } = auth;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
      setSearchQuery("");
    }
  };

  const getInitials = () => {
    if (user?.user_metadata?.first_name && user?.user_metadata?.last_name) {
      return `${user.user_metadata.first_name[0]}${user.user_metadata.last_name[0]}`;
    }
    return user?.email?.substring(0, 2)?.toUpperCase() || "U";
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { 
        title: "Dashboard", 
        path: "/dashboard", 
        icon: Home, 
        roles: ["student", "teacher", "admin", "parent"] 
      },
      { 
        title: "Profile", 
        path: "/profile", 
        icon: User, 
        roles: ["student", "teacher", "admin", "parent"] 
      },
      { 
        title: "Messages", 
        path: "/messages", 
        icon: MessageSquare, 
        badge: 3,
        roles: ["student", "teacher", "admin", "parent"] 
      },
    ];
    
    const roleSpecificItems = [
      { 
        title: "Courses", 
        path: "/courses", 
        icon: Book, 
        roles: ["student", "teacher", "admin"] 
      },
      { 
        title: "Assignments", 
        path: "/assignments", 
        icon: ClipboardList, 
        badge: 5,
        roles: ["student", "teacher", "admin"] 
      },
      { 
        title: "Calendar", 
        path: "/calendar", 
        icon: Calendar, 
        roles: ["student", "teacher", "admin", "parent"] 
      },
      { 
        title: "Grades", 
        path: "/grades", 
        icon: FileText, 
        roles: ["student", "teacher", "admin", "parent"] 
      },
      { 
        title: "Attendance", 
        path: "/attendance", 
        icon: CheckSquare, 
        roles: ["student", "teacher", "admin", "parent"] 
      },
      { 
        title: "Students", 
        path: "/students", 
        icon: GraduationCap, 
        roles: ["teacher", "admin"] 
      },
      { 
        title: "Teachers", 
        path: "/teachers", 
        icon: Users, 
        roles: ["admin"] 
      },
      { 
        title: "Settings", 
        path: "/settings", 
        icon: Settings, 
        roles: ["admin"] 
      },
    ];
    
    // Filter items based on user role
    return [...commonItems, ...roleSpecificItems].filter(
      item => !userRole || item.roles.includes(userRole)
    );
  };

  return (
    <div className="min-h-screen flex bg-blue-50 dark:bg-gray-900">
      {/* Static Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700">
        {/* Logo */}
        <div className="p-4 border-b dark:border-gray-700">
          <Link to="/dashboard" className="flex items-center gap-2">
            <School className="h-6 w-6 text-blue-700 dark:text-blue-500" />
            <h1 className="text-xl font-bold text-blue-700 dark:text-blue-500">JimPortal</h1>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {getNavItems().map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile and Theme Toggle */}
        <div className="border-t dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">
                  {user?.user_metadata?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {userRole || "User"}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/10"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
              
              {/* Mobile Logo - Shown only on small screens */}
              <div className="md:hidden">
                <Link to="/dashboard" className="flex items-center gap-2">
                  <School className="h-6 w-6 text-blue-700 dark:text-blue-500" />
                  <h1 className="text-xl font-bold text-blue-700 dark:text-blue-500">JimPortal</h1>
                </Link>
              </div>

              <div className="hidden md:flex flex-1 max-w-md mx-4">
                <form onSubmit={handleSearch} className="relative w-full">
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
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>
                
                <div className="md:hidden">
                  <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  </Button>
                </div>
                
                <Avatar className="md:hidden cursor-pointer" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-md">
            <nav className="px-4 py-2 space-y-2">
              <form onSubmit={handleSearch} className="relative mb-4">
                <Input 
                  type="search"
                  placeholder="Search..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
              
              <div className="flex items-center gap-2 p-3 mb-1">
                <Avatar>
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {user?.user_metadata?.name || user?.email}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    {userRole || "User"}
                  </p>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-2" />

              {getNavItems().map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-500"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <Badge className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-400">
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              ))}
              
              <div className="border-t dark:border-gray-700 pt-2 mt-2">
                <Button 
                  variant="outline" 
                  className="w-full mt-2 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900/30"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
