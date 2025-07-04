import { getUsers } from '@/app/users/actions';
import { getStudents } from '@/app/students/actions';

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  roleDistribution: { role: string; count: number }[];
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
  statusDistribution: { status: string; count: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const [users, students] = await Promise.all([getUsers(), getStudents()]);

  // User stats
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const inactiveUsers = totalUsers - activeUsers;

  const roleCounts = users.reduce((acc, user) => {
    const role = user.role || 'Unassigned';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const roleDistribution = Object.entries(roleCounts).map(([role, count]) => ({
    role,
    count,
  }));

  // Student stats
  const totalStudents = students.length;
  const activeStudents = students.filter(
    (student) => student.status === 'Active'
  ).length;
  const inactiveStudents = totalStudents - activeStudents;

  const statusCounts = students.reduce((acc, student) => {
    const status = student.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusDistribution = Object.entries(statusCounts).map(
    ([status, count]) => ({
      status,
      count,
    })
  );

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    roleDistribution,
    totalStudents,
    activeStudents,
    inactiveStudents,
    statusDistribution,
  };
}
