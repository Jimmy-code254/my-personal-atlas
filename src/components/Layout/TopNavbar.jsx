
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Search, Bell, Menu as MenuIcon, X, Sun, Moon,
  Home, Calendar, Book, ClipboardList, MessageSquare, User, Settings,
  Users, GraduationCap, LogOut, PlusCircle, FileText, Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const TopNavbar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const location = useLocation();
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications] = useState(3);
  const { toast } = useToast();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      });
      setSearchQuery("");
    }
  };

  const getInitials = () => {
    if (!auth?.user) return "U";
    
    if (auth.user?.user_metadata?.first_name && auth.user?.user_metadata?.last_name) {
      return `${auth.user.user_metadata.first_name[0]}${auth.user.user_metadata.last_name[0]}`;
    }
    return auth.user?.email?.substring(0, 2)?.toUpperCase() || "U";
  };

  // Main navigation items
  const mainNavItems = [
    { title: "Dashboard", icon: Home, path: "/dashboard" },
    { title: "Courses", icon: Book, path: "/courses" },
    { title: "Calendar", icon: Calendar, path: "/calendar" },
    { title: "Assignments", icon: ClipboardList, path: "/assignments", badge: 5 },
    { title: "Messages", icon: MessageSquare, path: "/messages", badge: 3 }
  ];

  // Quick action items
  const quickActions = [
    { title: "Add New Student", icon: GraduationCap, action: () => handleQuickAction("student") },
    { title: "Add New Teacher", icon: Users, action: () => handleQuickAction("teacher") },
    { title: "Add New Parent", icon: Heart, action: () => handleQuickAction("parent") },
    { title: "Create Assignment", icon: FileText, action: () => handleQuickAction("assignment") },
  ];

  const handleQuickAction = (type) => {
    let message;
    switch(type) {
      case "student":
        message = "New student registration form opened";
        break;
      case "teacher":
        message = "New teacher registration form opened";
        break;
      case "parent":
        message = "New parent registration form opened";
        break;
      case "assignment":
        message = "New assignment creation form opened";
        break;
      default:
        message = "Action initiated";
    }
    
    toast({
      title: "Quick Action",
      description: message,
    });
  };

  const handleLogout = () => {
    if (auth?.logout) {
      auth.logout();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the system",
      });
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
          
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-700 dark:text-blue-500" />
            <span className="text-xl font-bold text-blue-700 dark:text-blue-500 hidden sm:inline-block">JimPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link to={item.path}>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          location.pathname === item.path
                            ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            : ""
                        )}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                        {item.badge && (
                          <Badge variant="outline" className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400">
                            {item.badge}
                          </Badge>
                        )}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="group">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>More</span>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2 bg-white dark:bg-gray-800">
                      <li>
                        <Link 
                          to="/profile"
                          className="block select-none space-y-1 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Profile</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/students"
                          className="block select-none space-y-1 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            <span>Students</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/settings"
                          className="block select-none space-y-1 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          <div className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right Section: Search, Quick Actions, Notifications, Theme Toggle, Avatar */}
          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="relative max-w-xs hidden sm:block">
              <Input 
                type="search"
                placeholder="Search..."
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
            
            {/* Quick Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Quick actions">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {quickActions.map((action) => (
                  <DropdownMenuItem key={action.title} onClick={action.action} className="cursor-pointer">
                    <action.icon className="mr-2 h-4 w-4" />
                    <span>{action.title}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Notifications */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <span className="font-medium text-blue-600 dark:text-blue-400">New assignment added</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span>Grade updated in Math 101</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span>New message from instructor</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-blue-600 dark:text-blue-400">
                  View all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            {/* User Avatar and Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={auth?.user?.user_metadata?.avatar_url} />
                  <AvatarFallback>{getInitials()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link to="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500 dark:text-red-400" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
