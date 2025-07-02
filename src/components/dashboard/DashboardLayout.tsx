"use client";

import React, { useState } from "react";
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
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  if (!user) {
    return null; // or redirect to login
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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
          fixed lg:static lg:translate-x-0 z-40 w-64 h-full bg-card border-r transition-transform duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and school name */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                JIT
              </div>
              <div>
                <h1 className="font-bold text-lg">JIT.edu.ph</h1>
                <p className="text-xs text-muted-foreground">
                  Student Information System
                </p>
              </div>
            </div>
          </div>

          {/* User profile */}
          <div className="flex items-center space-x-3 border-b border-gray-200 p-4">
            <Avatar>
              <AvatarImage src={`/avatars/${user.id}.png`} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="truncate font-medium">{user.name}</p>
              <p className="truncate text-sm text-gray-500">{user.role}</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4 px-2 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {filteredNavigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <span className={cn(
                      "mr-3 flex-shrink-0",
                      pathname === item.href ? "text-primary" : "text-gray-400 group-hover:text-gray-500"
                    )}>
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Logout button at bottom */}
          <div className="p-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              <span>Log out</span>
            </Button>
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
                  <Link href="/dashboard/settings" className="w-full">
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
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
