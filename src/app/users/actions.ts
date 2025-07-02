'use server';

import { z } from 'zod';

// Define the schema for a single user
const userSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  status: z.string(),
  role: z.string(),
  last_login: z.string().datetime(),
  username: z.string(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

// Define the schema for the API response
const apiResponseSchema = z.object({
  data: z.array(userSchema),
});

export type User = z.infer<typeof userSchema>;

export async function getUsers(): Promise<User[]> {
  const url = `${process.env.SIS_API}/users`;

  if (!process.env.SIS_API) { 
    console.log('SIS_API environment variable is not set. Returning empty array.');
    return [];
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    const parsed = apiResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error('Failed to parse API response:', parsed.error);
      return [];
    }

    return parsed.data.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return [];
  }
}
