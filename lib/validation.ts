import { z } from "zod";

export const admissionSchema = z.object({
  studentName: z.string().min(2).max(80),
  fatherName: z.string().min(2).max(80),
  motherName: z.string().min(2).max(80),
  mobile: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  className: z.string().min(1),
  schoolName: z.string().min(2).max(120),
  address: z.string().min(8).max(300),
  preferredBatch: z.string().min(1)
});
