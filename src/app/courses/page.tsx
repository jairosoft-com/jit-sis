import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Courses | JIT-SIS',
  description: 'Manage course offerings',
};

export default function CoursesPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-sm">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="mt-4">
            <div className="grid gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">Course Name</h3>
                    <p className="text-sm text-muted-foreground">Course Code</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="destructive" size="sm">Delete</Button>
                  </div>
                </div>
              </div>
              {/* Additional course items would be mapped here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
