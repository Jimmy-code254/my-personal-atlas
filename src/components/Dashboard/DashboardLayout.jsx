
import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  School, Home, Book, ClipboardList, Calendar, MessageSquare, User, 
  Settings, LogOut, Bell, Search, Users, GraduationCap, CheckSquare,
  FileText, Menu, X, Moon, Sun, Heart
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SidebarProvider,
  Sidebar,
  SidebarTrigger,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar
} from "@/components/ui/sidebar";

export function DashboardLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  
  // Check if auth and theme contexts are available
  if (!auth) {
    console.error("Auth context is not available");
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <Alert variant="destructive" className="max-w-md">
          <AlertDescription className="py-2">
            Authentication service is not available. Please try again later or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  const { user, userRole, logout } = auth;
  // Access theme context safely
  const themeContext = useTheme();
  const theme = themeContext?.theme || "light";
  const toggleTheme = themeContext?.toggleTheme || (() => {});

  const handleLogout = () => {
    logout();
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
  
  const [searchQuery, setSearchQuery] = useState("");

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
        title: "Parents", 
        path: "/parents", 
        icon: Heart, 
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
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen">
        {/* Sidebar for large screens */}
        <Sidebar variant="sidebar" collapsible="offcanvas">
          <SidebarHeader className="border-b p-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <School className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-600">JimPortal</h1>
            </Link>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarMenu>
                {getNavItems().map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={location.pathname === item.path}
                      tooltip={item.title}
                    >
                      <Link to={item.path}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <Badge className="ml-auto bg-blue-100 text-blue-800 hover:bg-blue-200">
                        {item.badge}
                      </Badge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarSeparator />
            
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    onClick={handleLogout}
                    tooltip="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign Out</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">
                    {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleTheme}>
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main content area */}
        <SidebarInset className="bg-gray-50 dark:bg-gray-900">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Sidebar trigger for desktop */}
                  <SidebarTrigger className="hidden md:flex" />
                  
                  {/* Mobile menu button */}
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
                </div>

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
                    {notifications > 0 && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                    )}
                  </Button>
                  
                  <div className="hidden md:flex">
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                  
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user?.avatar_url} />
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
                {getNavItems().map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                      location.pathname === item.path
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge className="ml-auto bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                ))}
                <div className="border-t dark:border-gray-700 pt-2 mt-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-3 py-2"
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
          <main className="container mx-auto p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
