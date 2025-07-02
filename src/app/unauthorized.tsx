"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function Unauthorized() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after 5 seconds
    const timer = setTimeout(() => {
      router.push('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4">Unauthorized Access</h1>
        <p className="text-lg text-muted-foreground mb-8">
          You do not have permission to view this page. You will be redirected to the home page shortly.
        </p>
        <Button onClick={() => router.push('/')}>
          Return to Home Page Now
        </Button>
      </div>
    </div>
  );
}
