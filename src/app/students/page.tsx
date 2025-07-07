import { Metadata } from 'next';
import { getStudents, Student } from './actions';
import StudentsTable from './StudentsTable';

export const metadata: Metadata = {
  title: 'Students | JIT-SIS',
  description: 'Manage student records',
};

export default async function StudentsPage() {
  const students: Student[] = await getStudents();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage student records</p>
        </div>
      </div>
      
      <StudentsTable students={students} />
    </div>
  );
}
