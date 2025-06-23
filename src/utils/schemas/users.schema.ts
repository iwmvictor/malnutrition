import { z } from "zod";


export const userSchema = z.object({
  firstName: z.string().min(1, "firstName is required"),
  lastName: z.string().min(1, "lastName is required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  role: z.string().optional(),
  password: z.string().min(1, "password is required"),
  photo: z.any().optional(),
});

