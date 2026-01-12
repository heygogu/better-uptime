import { z } from "zod";

export const userRegistrationSchema = z.object({
  body: z.object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    password: z.string(),
  }),
});

// export type UserRegistrationBody = z.infer<
//   typeof userRegistrationSchema
// >["body"];

// export type WebsiteRegistrationBody = z.infer<
//   typeof websiteRegistrationSchema
// >["body"];
