import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schedule | JIT-SIS',
  description: 'View and manage class schedules',
};

export default function SchedulePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Class Schedule</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 border rounded-md hover:bg-accent">Week</button>
          <button className="px-4 py-2 border rounded-md bg-primary text-primary-foreground">Month</button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <div className="h-[600px] flex flex-col">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium py-2">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 flex-1">
            {Array.from({ length: 7 * 5 }).map((_, i) => (
              <div key={i} className="border rounded p-2 min-h-[100px] hover:bg-accent/50">
                <div className="text-sm font-medium">{i + 1}</div>
                {/* Schedule items would be rendered here */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
