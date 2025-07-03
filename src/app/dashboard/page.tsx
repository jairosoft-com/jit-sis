import { getDashboardStats } from './actions';
import StatCard from './StatCard';
import UserRoleChart from './UserRoleChart';
import { Users, UserCheck, UserX } from 'lucide-react';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Active Users', value: stats.activeUsers, icon: <UserCheck className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Inactive Users', value: stats.inactiveUsers, icon: <UserX className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mb-6">An overview of the system's current status.</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        {statCards.map(card => (
          <StatCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UserRoleChart data={stats.roleDistribution} />
      </div>
    </main>
  );
}
