import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="w-full max-w-6xl px-4 py-8 flex flex-col items-center">
        {/* Header with Logo */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-600 rounded-full p-3 shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=250&q=80"
                alt="JIT Logo"
                width={80}
                height={80}
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-blue-800 mb-2">JIT.edu.ph</h1>
          <h2 className="text-xl text-gray-600">Student Information System</h2>
        </div>

        {/* Main Content */}
        <div className="w-full flex flex-col md:flex-row gap-8 items-center justify-center">
          {/* Left Side - Welcome Message */}
          <div className="w-full md:w-1/2 max-w-md">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">
                  Welcome to JIT SIS
                </CardTitle>
                <CardDescription>
                  The comprehensive Student Information System for JIT.edu.ph
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Manage student admissions, profiles, and records efficiently
                  through our intuitive digital platform. Access student
                  information securely based on your role.
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span>
                      Register new students with comprehensive profiles
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span>Search and manage student records efficiently</span>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                    </div>
                    <span>
                      Role-based access for secure information handling
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 max-w-md">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-700">
                  Sign In
                </CardTitle>
                <CardDescription>
                  Enter your credentials to access the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                <p>Contact administrator for account assistance</p>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} JIT.edu.ph. All rights reserved.
          </p>
          <p className="mt-1">
            Student Information System - Admission & Profile Management
          </p>
        </div>
      </div>
    </div>
  );
}
