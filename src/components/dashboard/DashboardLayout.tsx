"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Settings,
  LogOut,
  UserPlus,
  Search,
  Home,
  Menu,
  X,
  LayoutDashboard,
  UserCog,
  BookOpen,
  GraduationCap,
  Calendar,
  FileText,
  BarChart3,
  Bell,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton Components
const UserProfileSkeleton = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div data-testid="user-profile-skeleton" className={`flex items-center ${isCollapsed ? 'justify-center p-2' : 'space-x-3 p-4'} border-b border-gray-200`}>
    <Skeleton className={`${isCollapsed ? 'h-8 w-8' : 'h-10 w-10'} rounded-full`} />
    {!isCollapsed && (
    <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    )}
  </div>
);

const NavigationItemSkeleton = ({ isCollapsed }: { isCollapsed: boolean }) => (
  <div data-testid="nav-item-skeleton" className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-3'} py-2`}>
    <Skeleton className="h-5 w-5 rounded-sm" />
    {!isCollapsed && <Skeleton className="ml-3 h-4 w-24" />}
  </div>
);

const MainContentSkeleton = () => (
  <div data-testid="main-content-skeleton" className="space-y-6 p-4">
    <div className="flex items-center justify-between">
      <Skeleton className="h-8 w-48" />
      <div className="flex space-x-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
    
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((item) => (
        <Skeleton key={item} className="h-32 rounded-lg" />
      ))}
    </div>
    
    <div className="grid gap-6 md:grid-cols-2">
      <Skeleton className="h-80 rounded-lg" />
      <Skeleton className="h-80 rounded-lg" />
    </div>
    
    <Skeleton className="h-96 w-full rounded-lg" />
  </div>
);

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  roles?: string[];
}

type UserRole = 'Administrator' | 'Admissions Officer' | 'Data Entry Clerk' | 'Teacher' | 'Student';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  
  if (loading) {
    // Show a full-page skeleton loader when loading
    return (
      <div className="min-h-screen bg-background flex">
        <div className={`${isCollapsed ? 'w-16' : 'w-64'} h-full bg-card border-r transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className={`p-4 border-b flex flex-col items-center ${isCollapsed ? 'space-y-4' : 'space-y-6'}`}>
              <Skeleton className="h-8 w-8 hidden lg:flex self-end" />
              {!isCollapsed ? (
                <div className="flex flex-col items-center w-full">
                  <Skeleton className="w-16 h-16 rounded-full mb-2" />
                  <Skeleton className="h-5 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              ) : (
                <Skeleton className="w-10 h-10 rounded-full" />
              )}
            </div>
            <UserProfileSkeleton isCollapsed={isCollapsed} />
            <nav className="mt-4 px-2 flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <li key={`skeleton-nav-${index}`}>
                    <NavigationItemSkeleton isCollapsed={isCollapsed} />
                  </li>
                ))}
              </ul>
            </nav>
            <div className={`p-4 border-t ${isCollapsed ? 'flex justify-center' : ''}`}>
              <Skeleton className={`${isCollapsed ? 'w-10 h-10' : 'w-full h-10'}`} />
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col overflow-hidden">
          <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex items-center space-x-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <MainContentSkeleton />
          </main>
        </div>
      </div>
    );
  }

  if (!user) {
    // After loading, if there's still no user, render a fallback UI for better test/debug experience
    return (
      <div data-testid="no-user-fallback" style={{ padding: 40, textAlign: 'center' }}>
        <h2>No user found</h2>
        <p>You are not authorized or not logged in.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  const sidebarWidth = isCollapsed ? 'w-16' : 'w-64';

  // Define navigation items based on user role
  const navigation: NavItem[] = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      roles: ["Administrator", "Admissions Officer", "Data Entry Clerk", "Teacher", "Student"]
    },
    {
      name: "Students",
      href: "/students",
      icon: <GraduationCap className="h-5 w-5" />,
      roles: ["Administrator", "Admissions Officer", "Data Entry Clerk"]
    },
    {
      name: "Courses",
      href: "/courses",
      icon: <BookOpen className="h-5 w-5" />,
      roles: ["Administrator", "Admissions Officer", "Teacher"]
    },
    {
      name: "Schedule",
      href: "/schedule",
      icon: <Calendar className="h-5 w-5" />,
      roles: ["Administrator", "Teacher", "Student"]
    },
    {
      name: "Grades",
      href: "/grades",
      icon: <FileText className="h-5 w-5" />,
      roles: ["Administrator", "Teacher", "Student"]
    },
    {
      name: "Reports",
      href: "/reports",
      icon: <BarChart3 className="h-5 w-5" />,
      roles: ["Administrator", "Admissions Officer"]
    },
    {
      name: "Users",
      href: "/users",
      icon: <UserCog className="h-5 w-5" />,
      roles: ["Administrator"]
    },
    {
      name: "Settings",
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
      roles: ["Administrator"]
    }
  ];

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(
    (item) => !item.roles || (user && item.roles.includes(user.role))
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background flex">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          fixed lg:static lg:translate-x-0 z-40 ${sidebarWidth} h-full bg-card border-r transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and school name */}
          <div className={`p-4 border-b flex flex-col items-center ${isCollapsed ? 'space-y-4' : 'space-y-6'}`}>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 hidden lg:flex self-end"
              onClick={toggleCollapse}
            >
              {isCollapsed ? (
                <Menu className="h-4 w-4" />
              ) : (
                <X className="h-4 w-4" />
              )}
            </Button>
            
            {!isCollapsed ? (
              <div className="flex flex-col items-center w-full">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mb-2">
                  JIT
                </div>
                <h1 className="font-bold text-lg text-center">JIT.edu.ph</h1>
                <p className="text-xs text-muted-foreground text-center">
                  Student Information System
                </p>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                JIT
              </div>
            )}
          </div>

          {/* User profile */}
          {loading ? (
            <UserProfileSkeleton isCollapsed={isCollapsed} />
          ) : (
            <div className={`flex items-center ${isCollapsed ? 'justify-center p-2' : 'space-x-3 p-4'} border-b border-gray-200`}>
              <Avatar className={isCollapsed ? 'h-8 w-8' : ''}>
                <AvatarImage src={`/avatars/${user.id}.png`} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium">{user.name}</p>
                  <p className="truncate text-sm text-gray-500">{user.role}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <TooltipProvider>
            <nav className="mt-4 px-2 flex-1 overflow-y-auto">
              <ul className="space-y-1">
                {loading ? (
                  // Skeleton navigation items
                  Array.from({ length: 5 }).map((_, index) => (
                    <li key={`skeleton-nav-${index}`}>
                      <NavigationItemSkeleton isCollapsed={isCollapsed} />
                    </li>
                  ))
                ) : (
                  // Actual navigation items
                  filteredNavigation.map((item) => (
                    <li key={item.href}>
                      <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                              pathname === item.href
                                ? "bg-primary/10 text-primary"
                                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                              isCollapsed ? "justify-center px-0" : ""
                            )}
                          >
                            <span className={cn(
                              "flex-shrink-0",
                              pathname === item.href 
                                ? "text-primary" 
                                : "text-gray-400 group-hover:text-gray-500",
                              !isCollapsed && "mr-3"
                            )}>
                              {item.icon}
                            </span>
                            {!isCollapsed && <span>{item.name}</span>}
                          </Link>
                        </TooltipTrigger>
                        {isCollapsed && (
                          <TooltipContent side="right" className="ml-2">
                            {item.name}
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </li>
                  ))
                )}
              </ul>
            </nav>
          </TooltipProvider>
          
          {/* Logout button at bottom */}
          <div className={`p-4 border-t ${isCollapsed ? 'flex justify-center' : ''}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className={`flex items-center justify-start ${isCollapsed ? 'w-10 h-10 p-0 justify-center' : 'w-full'}`}
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  {!isCollapsed && <span className="ml-2">Logout</span>}
                </Button>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" className="ml-2">
                  Logout
                </TooltipContent>
              )}
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="mr-2 text-gray-500 focus:outline-none lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-lg font-medium">
              {navigation.find((item) => pathname.startsWith(item.href))?.name ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <button className="rounded-full p-1 text-gray-500 hover:bg-gray-100">
              <HelpCircle className="h-5 w-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/avatars/${user.id}.png`} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="w-full">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {loading ? (
            <MainContentSkeleton />
          ) : (
            <div className="p-4 md:p-6">
              {children}
            </div>
          )}
        </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
