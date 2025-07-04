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
import { Student } from './actions';

interface ViewStudentModalProps {
  student: Student | null;
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

export default function ViewStudentModal({ student, isOpen, onClose }: ViewStudentModalProps) {
  if (!student) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>View Student Details</DialogTitle>
          <DialogDescription>
            Viewing details for {student.first_name} {student.last_name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Student ID</p>
            <p className="col-span-2">{student.student_id}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Name</p>
            <p className="col-span-2">{`${student.first_name} ${student.last_name}`}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Email</p>
            <p className="col-span-2">{student.email}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Program</p>
            <p className="col-span-2">{student.program}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Year Level</p>
            <p className="col-span-2">{student.year_level}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Age</p>
            <p className="col-span-2">{student.age}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Status</p>
            <p className="col-span-2">{student.status}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Enrollment Date</p>
            <p className="col-span-2">{formatDate(student.enrollment_date)}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Created At</p>
            <p className="col-span-2">{formatDate(student.created_at)}</p>
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <p className="text-right font-semibold">Updated At</p>
            <p className="col-span-2">{formatDate(student.updated_at)}</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
