'use client';

import { useState, useMemo, useEffect } from 'react';
import { toast } from 'sonner';
import { Student, updateStudent, getStudents, createStudent, CreateStudent } from './actions';
import ViewStudentModal from './ViewStudentModal';
import EditStudentModal from './EditStudentModal';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Eye, Pencil } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StudentsTableProps {
  students: Student[];
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('edit');
  const [tableStudents, setTableStudents] = useState<Student[]>(students);

  useEffect(() => {
    setTableStudents(students);
  }, [students]);

  const filteredStudents = useMemo(() => {
    return tableStudents
      .filter(student => {
        const searchLower = searchTerm.toLowerCase();
        const name = `${student.first_name} ${student.last_name}`.toLowerCase();
        return (
          name.includes(searchLower) ||
          student.student_id.toLowerCase().includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.program.toLowerCase().includes(searchLower)
        );
      });
  }, [tableStudents, searchTerm]);

  const paginatedStudents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredStudents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student: Student) => {
    setModalMode('edit');
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleAddStudent = () => {
    setModalMode('add');
    setSelectedStudent(null);
    setIsEditModalOpen(true);
  };

  const handleCloseModals = () => {
    setIsViewModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  const fetchStudents = async () => {
    const freshStudents = await getStudents();
    setTableStudents(freshStudents);
  };

  const handleSaveStudent = async (studentData: Student | CreateStudent) => {
    let result;
    if (modalMode === 'edit' && 'id' in studentData) {
      result = await updateStudent(studentData as Student);
    } else {
      result = await createStudent(studentData as CreateStudent);
    }

    if (result.success) {
      toast.success(result.message);
      await fetchStudents();
    } else {
      toast.error(result.message);
    }
    handleCloseModals();
  };

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
            <div className="flex-1 max-w-sm">
                <input
                type="text"
                placeholder="Search students..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Button onClick={handleAddStudent}>
                <Plus className="mr-2 h-4 w-4" />
                Add Student
            </Button>
        </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedStudents.map((student) => {
              const statusClass = student.status.toLowerCase() === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';

              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.student_id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{`${student.first_name} ${student.last_name}`}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.program}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.year_level}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewStudent(student)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditStudent(student)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{paginatedStudents.length}</strong> of <strong>{filteredStudents.length}</strong> results
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
      <ViewStudentModal student={selectedStudent} isOpen={isViewModalOpen} onClose={handleCloseModals} />
      <EditStudentModal mode={modalMode} student={selectedStudent} isOpen={isEditModalOpen} onClose={handleCloseModals} onSave={handleSaveStudent} />
    </div>
  );
}
