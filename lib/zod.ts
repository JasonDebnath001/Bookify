import { z } from "zod";

export const UploadSchema = z.object({
  pdfFile: z
    .union([z.instanceof(File), z.undefined()])
    .refine((file): file is File => file instanceof File, {
      message: "PDF file is required",
    })
    .refine((file) => file.type === "application/pdf", {
      message: "Only PDF files are allowed",
    })
    .refine((file) => file.size <= 50 * 1024 * 1024, {
      message: "PDF must be 50MB or smaller",
    }),
  coverImage: z
    .union([z.instanceof(File), z.undefined(), z.null()])
    .refine((file) => !file || file.type.startsWith("image/"), {
      message: "Cover image must be an image file",
    }),
  title: z.string().min(1, { message: "Title is required" }),
  author: z.string().min(1, { message: "Author name is required" }),
  assistantVoice: z.enum(["dave", "daniel", "chris", "rachel", "sarah"], {
    errorMap: () => ({ message: "Please choose an assistant voice" }),
  }),
});
