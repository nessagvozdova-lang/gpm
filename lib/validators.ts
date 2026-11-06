import { z } from 'zod';
export const registerSchema = z.object({ name: z.string().trim().min(2).max(90), email: z.email().toLowerCase().max(254), password: z.string().min(10).max(128) });
export const loginSchema = z.object({ email: z.email().toLowerCase(), password: z.string().min(1) });
export const cartSchema = z.object({ variantId: z.string().min(1), quantity: z.number().int().min(1).max(20) });
export const contactSchema = z.object({ name: z.string().trim().min(2).max(90), email: z.email().max(254), phone: z.string().max(30).optional(), subject: z.string().trim().min(2).max(120), message: z.string().trim().min(10).max(3000) });
export const checkoutSchema = z.object({
  name: z.string().trim().min(2).max(90), email: z.email().max(254), phone: z.string().trim().min(7).max(30),
  street: z.string().trim().min(5).max(200), city: z.string().trim().min(2).max(100), postalCode: z.string().trim().min(2).max(20), country: z.string().trim().min(2).max(100),
  note: z.string().max(500).optional(), coupon: z.string().trim().max(30).optional(), paymentMethod: z.literal('COD')
});
export const productSchema = z.object({
  name: z.string().trim().min(3).max(150), slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/), description: z.string().trim().min(10).max(8000),
  categoryId: z.string().min(1), price: z.number().int().min(100), compareAt: z.number().int().positive().nullable().optional(),
  brand: z.string().trim().max(100).default('Maison Voyage'), material: z.string().trim().max(100).optional(),
  imageUrl: z.url().refine(v => v.startsWith('https://'), 'Use an HTTPS image URL'), imageAlt: z.string().trim().min(3).max(160),
  color: z.string().trim().min(2).max(40), size: z.string().trim().min(1).max(40), sku: z.string().regex(/^[A-Z0-9-]{3,40}$/), stock: z.number().int().min(0).max(100000),
  featured: z.boolean().default(false), active: z.boolean().default(true)
});
