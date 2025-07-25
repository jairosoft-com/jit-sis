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

export async function getLastStudentId(): Promise<{ data?: { student_id: string }, status: number, message: string }> {
  const url = `${process.env.SIS_API}/students/get-last-id`;

  if (!process.env.SIS_API) {
    return {
      status: 400,
      message: "SIS_API environment variable is not set.",
    };
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('student id ', data)
    return {
      data: data.data,
      status: response.status,
      message: data.message || ""
    };
  } catch (error) {
    console.error("Error fetching last student ID:", error);
    return {
      status: 500,
      message: "Error fetching last student ID"
    };
  }
}

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

export async function createStudent(
  student: CreateStudent
): Promise<{ data?: any; status: number; message: string; error?: any }> {
    const url = `${process.env.SIS_API}/students/create`;

  if (!process.env.SIS_API) {
    return {
      status: 400,
      message: "SIS_API environment variable is not set.",
    };
  }

  console.log('student ', student)  
  student.student_id = 'h' // removed when backend is fixed

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });

    const responseText = await response.text();
    let json: any = {};
    try {
      json = JSON.parse(responseText);
    } catch (e) {
      return {
        status: response.status,
        message: "Server returned an unreadable response.",
      };
    }

    console.log('response ', json)

    return {
      data: json.data,
      status: json.status ?? response.status,
      message: json.message ?? "",
      error: json.error,
    };
  } catch (error) {
    console.error("Network or unexpected error in createStudent:", error);
    return { status: 400, message: "An unexpected network error occurred." };
  }
}

export async function updateStudent(
  student: Student
): Promise<{ data?: any; status: number; message: string; error?: any }> {
    if (!student.id) {
    return { status: 400, message: "Student ID is missing, cannot update." };
  }

  // Exclude uneditable fields
  const { created_at, updated_at, enrollment_date, id, ...payload } = student;

  student.student_id = 'h' // removed when backend is fixed

  const url = `${process.env.SIS_API}/students/update/${student.id}`;

  if (!process.env.SIS_API) {
    return {
      status: 400,
      message: "SIS_API environment variable is not set.",
    };
  }

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    let json: any = {};
    try {
      json = JSON.parse(responseText);
    } catch (e) {
      return {
        status: response.status,
        message: "Server returned an unreadable response.",
      };
    }
    
    console.log('student response ', json)
    
    return {
      data: json.data,
      status: json.status ?? response.status,
      message: json.message ?? "",
      error: json.error,
    };

  } catch (error) {
    console.error("Network or unexpected error in updateStudent:", error);
    return { status: 400, message: "An unexpected network error occurred." };
  }
}
