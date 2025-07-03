import { getUsers } from "@/app/users/actions";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  roleDistribution: { role: string; count: number }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const users = await getUsers();

  if (!users) {
    return {
      totalUsers: 0,
      activeUsers: 0,
      inactiveUsers: 0,
      roleDistribution: [],
    };
  }

  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
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

  return {
    totalUsers,
    activeUsers,
    inactiveUsers,
    roleDistribution,
  };
}
