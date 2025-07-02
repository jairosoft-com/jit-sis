'use client';

import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function DashboardContent({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle server-side rendering
  if (!isClient || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  // Redirect to login if not authenticated
  if (!user) {
    router.push('/');
    return null;
  }
  // If we're at the root dashboard, render the dashboard content
  if (pathname === '/dashboard') {
    return (
        <div className="p-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcomess to your dashboard</p>
        </div>
    );
  }
  
  // For all other dashboard routes, render the children within the DashboardLayout
  return <>{children}</>;
}

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/');
      } else if (!userHasRequiredRole()) {  
        router.push('/unauthorized');
      } else {
        setShowContent(true);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated || !showContent) {
    return null;
  }

  return (
    <AuthProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </AuthProvider>
  );
}

// Add your actual role check implementation
function userHasRequiredRole() {
  // Implement your role-based access control logic here
  return true; // Placeholder - replace with actual logic
}
