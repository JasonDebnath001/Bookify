import { z } from "zod";

export const UploadSchema = z.object({
  pdfFile: z
    .union([z.instanceof(File), z.undefined()])
    .superRefine((file, ctx) => {
      if (!file) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PDF file is required",
        });
        return;
      }

      if (file.type !== "application/pdf") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Only PDF files are allowed",
        });
      }

      if (file.size > 50 * 1024 * 1024) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PDF must be 50MB or smaller",
        });
      }
    }),
  coverImage: z
    .union([z.instanceof(File), z.undefined(), z.null()])
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Cover image must be an image file",
    }),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author name is required" }),
  assistantVoice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"], {
    error: () => ({ message: "Please choose an assistant voice" }),
  }),
});
