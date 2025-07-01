import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reports | JIT-SIS',
  description: 'Generate and view system reports',
};

export default function ReportsPage() {
  const reportTypes = [
    {
      id: 'enrollment',
      name: 'Enrollment Report',
      description: 'View enrollment statistics by program, year level, and semester',
      icon: '📊',
    },
    {
      id: 'grades',
      name: 'Grade Summary',
      description: 'View grade distribution and statistics',
      icon: '📈',
    },
    {
      id: 'attendance',
      name: 'Attendance Report',
      description: 'View student attendance records',
      icon: '✅',
    },
    {
      id: 'financial',
      name: 'Financial Report',
      description: 'View tuition and fee collections',
      icon: '💰',
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Reports</h1>
        <p className="text-muted-foreground">Generate and view system reports</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reportTypes.map((report) => (
          <div 
            key={report.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="text-4xl mb-4">{report.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{report.name}</h3>
            <p className="text-muted-foreground mb-4">{report.description}</p>
            <button className="text-primary hover:underline">Generate Report →</button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-card rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Generated On
                </th>
                <th className="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Enrollment Report - 1st Semester 2023</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  June 30, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">View</a>
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">Download</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
