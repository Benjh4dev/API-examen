import { z } from 'zod';


const userSchemaZod = z.object({
  name: z.string(),
  email: z.string({
    message: 'Email must be a string'
  }).email({
    message: 'Invalid email address'
    }),
});


const validateUser = (object) => {
    return userSchemaZod.safeParse(object);
}

export { userSchemaZod, validateUser };