"use client";

import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LoginFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function LoginForm({
  className,
  onSuccess,
}: LoginFormProps = {}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing again
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error("Please enter both email and password");
      }

      // This would be replaced with actual API call in production
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock authentication logic - in production this would call your authentication API
      if (
        formData.email === "admin@jit.edu.ph" &&
        formData.password === "admin"
      ) {
        // Redirect to admin dashboard
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else if (
        formData.email === "officer@jit.edu.ph" &&
        formData.password === "officer"
      ) {
        // Redirect to admissions officer dashboard
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else if (
        formData.email === "clerk@jit.edu.ph" &&
        formData.password === "clerk"
      ) {
        // Redirect to data entry clerk dashboard
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard");
        }
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("w-full max-w-md mx-auto bg-background", className)}>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Sign In
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access the Student Information System
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@jit.edu.ph"
              autoComplete="email"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={isLoading}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <Eye className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="text-sm text-center text-muted-foreground">
          <span>Demo credentials:</span>
          <ul className="mt-2 space-y-1">
            <li>Admin: admin@jit.edu.ph / admin</li>
            <li>Officer: officer@jit.edu.ph / officer</li>
            <li>Clerk: clerk@jit.edu.ph / clerk</li>
          </ul>
        </div>
      </CardFooter>
    </Card>
  );
}
