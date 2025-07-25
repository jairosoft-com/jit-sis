'use client';

import { useEffect, useState, useTransition } from 'react';
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
import { Student, CreateStudent, getLastStudentId } from './actions';

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

function incrementStudentId(studentId: string): string {
  // Extract the numeric part and increment it
  const match = studentId.match(/(\d+)$/);
  if (!match) return studentId; // fallback if format is unexpected
  
  const num = parseInt(match[1], 10);
  const nextNum = num + 1;
  const paddedNextNum = nextNum.toString().padStart(match[1].length, '0');
  
  return studentId.replace(/\d+$/, paddedNextNum);
}

export default function EditStudentModal({ mode, student, isOpen, onClose, onSave }: EditStudentModalProps) {
  const [isPending, startTransition] = useTransition();
  const [isLoadingId, setIsLoadingId] = useState(false);
  const [formData, setFormData] = useState<Partial<Student> & Partial<CreateStudent>>(() => ({
    ...defaultState,
    status: 'Active',
    enrollment_date: new Date().toISOString().split('T')[0]
  }));
  
  // Fetch next student ID when modal opens in add mode
  useEffect(() => {
    const fetchNextStudentId = async () => {
      if (!isOpen || mode !== 'add') return;
      
      setIsLoadingId(true);
      try {
        const result = await getLastStudentId();
        if (result.data?.student_id) {
          const nextId = incrementStudentId(result.data.student_id);
          setFormData(prev => ({
            ...prev,
            student_id: nextId,
            status: 'Active',
            enrollment_date: new Date().toISOString().split('T')[0]
          }));
        }
      } catch (error) {
        console.error('Error fetching next student ID:', error);
      } finally {
        setIsLoadingId(false);
      }
    };

    if (isOpen) {
      if (mode === 'edit' && student) {
        setFormData(student);
      } else if (mode === 'add') {
        fetchNextStudentId();
      }
    } else {
      // Reset form when modal is closed
      setFormData({
        ...defaultState,
        status: 'Active',
        enrollment_date: new Date().toISOString().split('T')[0]
      });
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
    const requiredFields: (keyof CreateStudent)[] = [
      'first_name',
      'last_name',
      'email',
      'student_id',
      'program',
      'year_level',
      'status',
      'age',
      'enrollment_date',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (isLoadingId) return;
    
    startTransition(() => {
      onSave(formData as Student | CreateStudent);
    });
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
            <div className="relative col-span-3">
              <Input 
                id="student_id" 
                name="student_id" 
                value={formData.student_id || ''} 
                onChange={handleChange} 
                className="w-full"
                disabled={true}
              />
              {isLoadingId && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
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
          <Button variant="outline" onClick={onClose} disabled={isPending || isLoadingId}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={isPending || isLoadingId}>
            {isPending ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-4 w-4 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                ></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save changes"
          )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
