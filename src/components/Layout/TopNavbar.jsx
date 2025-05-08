
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Search, Bell, Menu as MenuIcon, X, Sun, Moon,
  Home, Calendar, Book, ClipboardList, MessageSquare, User, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const TopNavbar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const location = useLocation();
  const auth = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [notifications] = React.useState(3);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
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
    { title: "Assignments", icon: ClipboardList, path: "/assignments" },
    { title: "Messages", icon: MessageSquare, path: "/messages", badge: 3 }
  ];

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
                          <Badge variant="outline" className="ml-2 h-5 w-5 p-0 flex items-center justify-center">
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
                    <ul className="grid w-[200px] gap-1 p-2">
                      <li>
                        <Link 
                          to="/profile"
                          className="block select-none space-y-1 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700"
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
                          className="block select-none space-y-1 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700"
                        >
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Students</span>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/settings"
                          className="block select-none space-y-1 rounded-md p-2 hover:bg-blue-50 dark:hover:bg-gray-700"
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

          {/* Right Section: Search, Notifications, Theme Toggle, Avatar */}
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
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Link to="/profile">
              <Avatar className="cursor-pointer">
                <AvatarImage src={auth?.user?.user_metadata?.avatar_url} />
                <AvatarFallback>{getInitials()}</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
