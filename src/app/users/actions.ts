'use server';

import { z } from 'zod';

// Define the schema for a single user
const userSchema = z.object({
  id: z.preprocess((val) => {
    const num = Number(val);
    return isNaN(num) ? val : num;
  }, z.number()),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  status: z.string(),
  role: z.string(),
  last_login: z.string(),
  username: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

// Define the schema for the API response
const apiResponseSchema = z.object({
  data: z.array(userSchema),
});

const partialUserSchema = userSchema.partial();
export type PartialUser = z.infer<typeof partialUserSchema>;

const updateUserResponseSchema = z.object({
  message: z.string(),
  data: partialUserSchema,
});

export type User = z.infer<typeof userSchema>;

export async function getUsers(): Promise<User[]> {
  const url = `${process.env.SIS_API}/users`;

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
    console.error('Critical error in getUsers:', error);
    return [];
  }
}

export async function updateUser(user: User): Promise<{ success: boolean; message: string; data?: PartialUser }> {
    if (!user.id) {
    return { success: false, message: 'User ID is missing, cannot update.' };
  }
  const url = `${process.env.SIS_API}/users/${user.id}`;

  if (!process.env.SIS_API) {
    return { success: false, message: 'SIS_API environment variable is not set.' };
  }

  const { id, created_at, updated_at, last_login, username, ...updateData } = user;

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
      console.error('Failed to update user. Server response:', responseText);
      try {
        const errorData = JSON.parse(responseText);
        const message = typeof errorData.message === 'string' ? errorData.message : 'An unknown error occurred.';
        return { success: false, message, data: undefined };
      } catch (e) {
        return { success: false, message: 'Update failed: The server returned an unreadable error.', data: undefined };
      }
    }

    // Handle successful responses
    try {
      const json = JSON.parse(responseText);
      return {
        success: true,
        message: json.message || 'User updated successfully.',
        data: json.data || undefined,
      };
    } catch (e) {
      // This case handles a successful (2xx) response that is not JSON, or is empty.
      return { success: true, message: 'User updated successfully.', data: undefined };
    }

  } catch (error) {
    console.error('Network or unexpected error in updateUser:', error);
    return { success: false, message: 'An unexpected network error occurred.' };
  }
}
