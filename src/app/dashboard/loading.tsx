import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <main className="p-6">
      <Skeleton className="h-9 w-48 mb-2" />
      <Skeleton className="h-5 w-80 mb-6" />
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="p-4 border rounded-lg">
          <Skeleton className="h-6 w-40 mb-4" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      </div>
    </main>
  );
}
