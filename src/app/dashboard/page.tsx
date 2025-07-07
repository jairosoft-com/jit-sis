import { getDashboardStats } from './actions';
import StatCard from './StatCard';
import UserRoleChart from './UserRoleChart';
import StudentStatusChart from './StudentStatusChart';
import { Users, UserCheck, UserX, GraduationCap, CircleCheck, CircleX } from 'lucide-react';

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const userStatCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Active Users', value: stats.activeUsers, icon: <UserCheck className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Inactive Users', value: stats.inactiveUsers, icon: <UserX className="h-4 w-4 text-muted-foreground" /> },
  ];

  const studentStatCards = [
    { title: 'Total Students', value: stats.totalStudents, icon: <GraduationCap className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Active Students', value: stats.activeStudents, icon: <CircleCheck className="h-4 w-4 text-muted-foreground" /> },
    { title: 'Inactive Students', value: stats.inactiveStudents, icon: <CircleX className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground mb-6">An overview of the system's current status.</p>
      
      <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {userStatCards.map(card => (
          <StatCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Student Statistics</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {studentStatCards.map(card => (
          <StatCard key={card.title} title={card.title} value={card.value} icon={card.icon} />
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <UserRoleChart data={stats.roleDistribution} />
        <StudentStatusChart data={stats.statusDistribution} />
      </div>
    </main>
  );
}
