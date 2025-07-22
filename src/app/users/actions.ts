"use server";

import { z } from "zod";

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

const createUserSchema = userSchema
  .omit({
    id: true,
    created_at: true,
    updated_at: true,
    last_login: true,
  })
  .extend({
    password: z.string().min(8, "Password must be at least 8 characters"),
  });

export type CreateUser = z.infer<typeof createUserSchema>;

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
      console.error("SIS API Response Text:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    const json = JSON.parse(responseText);
    const parsed = apiResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error("Zod Parsing Failed:", parsed.error.issues);
      return [];
    }

    return parsed.data.data;
  } catch (error) {
    console.error("Critical error in getUsers:", error);
    return [];
  }
}

export async function createUser(
  user: CreateUser
): Promise<{ data?: any; status: number; message: string }> {
  const url = `${process.env.SIS_API}/students/create`;

  if (!process.env.SIS_API) {
    return {
      status: 400,
      message: "SIS_API environment variable is not set.",
    };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseText = await response.text();
    let json: any = {};
    try {
      json = JSON.parse(responseText);
    } catch (e) {
      // If response is not JSON, treat as error
      return {
        status: response.status,
        message: "Server returned an unreadable response.",
      };
    }
    return {
      data: json.data,
      status: json.status ?? response.status,
      message: json.message ?? "",
    };
  } catch (error) {
    console.error("Network or unexpected error in createUser:", error);
    return { status: 400, message: "An unexpected network error occurred." };
  }
}

export async function updateUser(
  user: User
): Promise<{ data?: any; status: number; message: string; error?: any }> {
  if (!user.id) {
    return { status: 400, message: "User ID is missing, cannot update." };
  }
  // Exclude created_at, updated_at, last_login, and id from the payload
  const { created_at, updated_at, last_login, id, ...payload } = user;
  const url = `${process.env.SIS_API}/users/update/${user.id}`;

  if (!process.env.SIS_API) {
    return {
      status: 400,
      message: "SIS_API environment variable is not set.",
    };
  }

  console.log("payloadd ", payload);

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
    console.log("Updating user:", json);
    return {
      data: json.data,
      status: json.status ?? response.status,
      message: json.message ?? "",
      error: json.error,
    };
  } catch (error) {
    console.error("Network or unexpected error in updateUser:", error);
    return { status: 400, message: "An unexpected network error occurred." };
  }
}
