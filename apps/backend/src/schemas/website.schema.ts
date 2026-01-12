import z from "zod";

export const websiteRegistrationSchema = z.object({
  body: z.object({
    url: z.string().min(5).url(),
  }),
});
