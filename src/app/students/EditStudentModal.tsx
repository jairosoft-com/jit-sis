'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Student, CreateStudent } from './actions';

interface EditStudentModalProps {
  mode: 'add' | 'edit';
  student?: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: Student | CreateStudent) => void;
}

const defaultState: CreateStudent = {
  first_name: '',
  last_name: '',
  email: '',
  student_id: '',
  program: '',
  year_level: 1,
  status: 'Active',
  age: 18,
  enrollment_date: new Date().toISOString().split('T')[0],
};

export default function EditStudentModal({ mode, student, isOpen, onClose, onSave }: EditStudentModalProps) {
  const [formData, setFormData] = useState<Partial<Student> & Partial<CreateStudent>>({});

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && student) {
        setFormData(student);
      } else {
        setFormData(defaultState);
      }
    }
  }, [isOpen, mode, student]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'number' ? Number(value) : value }));
  };

  const handleSelectChange = (name: 'status') => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const requiredFields: (keyof CreateStudent)[] = ['first_name', 'last_name', 'email', 'student_id', 'program', 'year_level', 'status', 'age', 'enrollment_date'];

    const missingFields = requiredFields.filter(field => !formData[field]);

    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    onSave(formData as Student | CreateStudent);
  };

  const isEditMode = mode === 'edit';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isEditMode ? 'Edit Student' : 'Add New Student'}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Make changes to the student profile here. Click save when you're done."
              : "Fill in the details to create a new student. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="first_name" className="text-right">First Name</Label>
            <Input id="first_name" name="first_name" value={formData.first_name || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="last_name" className="text-right">Last Name</Label>
            <Input id="last_name" name="last_name" value={formData.last_name || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="student_id" className="text-right">Student ID</Label>
            <Input id="student_id" name="student_id" value={formData.student_id || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="program" className="text-right">Program</Label>
            <Input id="program" name="program" value={formData.program || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="year_level" className="text-right">Year Level</Label>
            <Input id="year_level" name="year_level" type="number" value={formData.year_level || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="age" className="text-right">Age</Label>
            <Input id="age" name="age" type="number" value={formData.age || ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="enrollment_date" className="text-right">Enrollment Date</Label>
            <Input id="enrollment_date" name="enrollment_date" type="date" value={formData.enrollment_date ? new Date(formData.enrollment_date).toISOString().split('T')[0] : ''} onChange={handleChange} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">Status</Label>
            <Select name="status" value={formData.status} onValueChange={handleSelectChange('status')}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
