"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
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
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: "Administrator" | "Admissions Officer" | "Data Entry Clerk";
  userName?: string;
}

export default function DashboardLayout({
  children,
  userRole = "Administrator",
  userName = "John Doe",
}: DashboardLayoutProps) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    // In a real implementation, this would handle logout logic
    router.push("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Define navigation items based on user role
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
      roles: ["Administrator", "Admissions Officer", "Data Entry Clerk"],
    },
    {
      name: "Register Student",
      href: "/students/register",
      icon: UserPlus,
      roles: ["Administrator", "Admissions Officer", "Data Entry Clerk"],
    },
    {
      name: "Search Students",
      href: "/students/search",
      icon: Search,
      roles: ["Administrator", "Admissions Officer", "Data Entry Clerk"],
    },
    {
      name: "Manage Users",
      href: "/users",
      icon: Users,
      roles: ["Administrator"],
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ["Administrator"],
    },
  ];

  // Filter navigation items based on user role
  const filteredNavItems = navigationItems.filter((item) =>
    item.roles.includes(userRole),
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

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {filteredNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* User info at bottom */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                  alt={userName}
                />
                <AvatarFallback>
                  {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userName}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {userRole}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 border-b bg-card flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold">
            {/* This could be dynamic based on current page */}
            Student Information System
          </h2>

          {/* User dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                    alt={userName}
                  />
                  <AvatarFallback>
                    {userName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {userRole}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
