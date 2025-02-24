import { z } from "zod";

export const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email().nonempty(),
});

export type FormFields = z.infer<typeof schema>;
