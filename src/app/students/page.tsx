'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Student
        </Button>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        {/* Search Input */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <input
              type="text"
              placeholder="Search students..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Student ID</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Program</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Year Level</th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">2023-0001</td>
                <td className="p-4 align-middle font-medium">John Doe</td>
                <td className="p-4 align-middle">BS Computer Science</td>
                <td className="p-4 align-middle">2nd Year</td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green-100 text-green-800 hover:bg-green-200">
                    Active
                  </span>
                </td>
                <td className="p-4 align-middle text-right">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50">
                <td className="p-4 align-middle">2023-0002</td>
                <td className="p-4 align-middle font-medium">Jane Smith</td>
                <td className="p-4 align-middle">BS Information Technology</td>
                <td className="p-4 align-middle">1st Year</td>
                <td className="p-4 align-middle">
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
                    Inactive
                  </span>
                </td>
                <td className="p-4 align-middle text-right">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Page 1 of 1
          </div>
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
