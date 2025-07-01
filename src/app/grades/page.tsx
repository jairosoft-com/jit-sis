import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grades | JIT-SIS',
  description: 'View and manage student grades',
};

export default function GradesPage() {
  // Mock data - in a real app, this would come from an API
  const courses = [
    { id: 1, name: 'Mathematics 101', code: 'MATH101' },
    { id: 2, name: 'Computer Science 101', code: 'CS101' },
    { id: 3, name: 'Physics 101', code: 'PHYS101' },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Grades</h1>
        <p className="text-muted-foreground">View and manage student grades</p>
      </div>
      
      <div className="bg-card rounded-lg border p-6">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-sm">
              <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Select a course...</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.code} - {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Grade
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">John Doe</div>
                          <div className="text-sm text-gray-500">2023-0001</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">1.25</div>
                      <div className="text-sm text-gray-500">A</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Passed
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
