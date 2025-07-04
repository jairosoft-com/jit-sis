'use server';

import { z } from 'zod';

// Define the schema for a single student
const studentSchema = z.object({
  id: z.string(),
  student_id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  program: z.string(),
  year_level: z.coerce.number(),
  status: z.string(),
  age: z.coerce.number(),
  enrollment_date: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  email: z.string().email().catch(''),
});

const createStudentSchema = studentSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type CreateStudent = z.infer<typeof createStudentSchema>;

// Define the schema for the API response
const apiResponseSchema = z.object({
  data: z.array(studentSchema),
});

const partialStudentSchema = studentSchema.partial();
export type PartialStudent = z.infer<typeof partialStudentSchema>;

const updateStudentResponseSchema = z.object({
  message: z.string(),
  data: partialStudentSchema,
});

export type Student = z.infer<typeof studentSchema>;

export async function getStudents(): Promise<Student[]> {
  const url = `${process.env.SIS_API}/students`;

  if (!process.env.SIS_API) {
    return [];
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`SIS API Error: HTTP status ${response.status}`);
      const errorText = await response.text();
      console.error('SIS API Response Text:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    const json = JSON.parse(responseText);
    const parsed = apiResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error('Zod Parsing Failed:', parsed.error.issues);
      return [];
    }

    return parsed.data.data;
  } catch (error) {
    console.error('Critical error in getStudents:', error);
    return [];
  }
}

export async function createStudent(student: CreateStudent): Promise<{ success: boolean; message: string }> {
  const url = `${process.env.SIS_API}/students`;

  if (!process.env.SIS_API) {
    return { success: false, message: 'SIS_API environment variable is not set.' };
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Failed to create student. Server response:', responseText);
      try {
        const errorData = JSON.parse(responseText);
        const message = typeof errorData.message === 'string' ? errorData.message : 'An unknown error occurred.';
        return { success: false, message };
      } catch (e) {
        return { success: false, message: 'Create failed: The server returned an unreadable error.' };
      }
    }

    const json = JSON.parse(responseText);
    return {
      success: true,
      message: json.message || 'Student created successfully.',
    };
  } catch (error) {
    console.error('Network or unexpected error in createStudent:', error);
    return { success: false, message: 'An unexpected network error occurred.' };
  }
}

export async function updateStudent(student: Partial<Student> & { id: string }): Promise<{ success: boolean; message: string; data?: PartialStudent }> {
  if (!student.id) {
    return { success: false, message: 'Student ID is missing, cannot update.' };
  }
  const url = `${process.env.SIS_API}/students/${student.id}`;

  if (!process.env.SIS_API) {
    return { success: false, message: 'SIS_API environment variable is not set.' };
  }

  const { id, created_at, updated_at, ...updateData } = student;

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const responseText = await response.text();

    if (!response.ok) {
      console.error('Failed to update student. Server response:', responseText);
      try {
        const errorData = JSON.parse(responseText);
        const message = typeof errorData.message === 'string' ? errorData.message : 'An unknown error occurred.';
        return { success: false, message, data: undefined };
      } catch (e) {
        return { success: false, message: 'Update failed: The server returned an unreadable error.', data: undefined };
      }
    }

    try {
      const json = JSON.parse(responseText);
      return {
        success: true,
        message: json.message || 'Student updated successfully.',
        data: json.data || undefined,
      };
    } catch (e) {
      return { success: true, message: 'Student updated successfully.', data: undefined };
    }

  } catch (error) {
    console.error('Network or unexpected error in updateStudent:', error);
    return { success: false, message: 'An unexpected network error occurred.' };
  }
}
