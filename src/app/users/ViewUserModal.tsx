'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User } from './actions';

interface ViewUserModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }
  return date.toLocaleString();
};

export default function ViewUserModal({ user, isOpen, onClose }: ViewUserModalProps) {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>View User Details</DialogTitle>
          <DialogDescription>
            Viewing details for {user.first_name} {user.last_name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-semibold">Name</p>
            <p className="col-span-3">{`${user.first_name} ${user.last_name}`}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-semibold">Username</p>
            <p className="col-span-3">{user.username}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-semibold">Email</p>
            <p className="col-span-3">{user.email}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-semibold">Role</p>
            <p className="col-span-3">{user.role}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-semibold">Status</p>
            <p className="col-span-3">{user.status}</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right font-semibold">Last Login</p>
            <p className="col-span-3">{formatDate(user.last_login)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
