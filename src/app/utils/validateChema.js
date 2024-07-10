import { z } from 'zod';

export const createArticleSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters long' })
    .max(200, { message: 'Title cannot exceed 200 characters' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' }),
});

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Username can only contain letters, numbers, and underscores',
    ),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const deleteAccountSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  token: z.string(),
});

export const creatCommentSchema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});
