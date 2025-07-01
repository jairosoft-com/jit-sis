// This is a Server Component
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | JIT-SIS',
  description: 'JIT Student Information System Dashboard',
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
