'use client';

import { usePathname } from 'next/navigation';
import DashboardProvider from '@/app/dashboard/dashboard-provider';

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <>{children}</>;
  }

  return <DashboardProvider>{children}</DashboardProvider>;
}
