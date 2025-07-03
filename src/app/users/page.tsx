import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Users | JIT-SIS',
  description: 'Manage system users and permissions',
};

import { getUsers, User } from './actions';
import UsersTable from './UsersTable';

export default async function UsersPage() {
  const users: User[] = await getUsers();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage system users and permissions</p>
        </div>

      </div>
      
      <UsersTable users={users} />
    </div>
  );
}
