'use client';

import { useState, useMemo } from 'react';
import { User } from './actions';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';

interface UsersTableProps {
  users: User[];
}

export default function UsersTable({ users }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const searchLower = searchTerm.toLowerCase();
        return (
          user.first_name.toLowerCase().includes(searchLower) ||
          user.last_name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.username.toLowerCase().includes(searchLower)
        );
      })
      .filter(user => {
        return roleFilter ? user.role === roleFilter : true;
      });
  }, [users, searchTerm, roleFilter]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-sm">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="ml-4">
            <select 
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              <option value="Administrator">Administrator</option>
              <option value="Admissions Officer">Admissions Officer</option>
              <option value="Data Entry Clerk">Data Entry Clerk</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedUsers.map((user) => (
              <tr key={user.username} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{`${user.first_name} ${user.last_name}`}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.last_login).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{paginatedUsers.length}</strong> of <strong>{filteredUsers.length}</strong> results
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="px-2 py-1 border rounded-md text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
          </select>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</Button>
            <Button variant="outline" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
