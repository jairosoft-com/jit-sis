'use client';

import { usePathname } from 'next/navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import { DashboardProvider } from './dashboard/dashboard-provider';

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRootPath = pathname === '/';

  return (
    <AuthProvider>
      {isRootPath ? (
        children
      ) : (
        <DashboardProvider>
          {children}
        </DashboardProvider>
      )}
    </AuthProvider>
  );
}
