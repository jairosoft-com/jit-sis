'use client';

import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string[];
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    // In a real app, you would check the authentication state here
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated) {
      router.push('/');
      return;
    }

    if (requiredRole && (!userRole || !requiredRole.includes(userRole))) {
      router.push('/unauthorized');
    }
  }, [router, requiredRole]);

  return <>{children}</>;
}
