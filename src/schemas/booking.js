import { z } from 'zod';

const bookingSchemaZod = z.object({
  user_id: z.string(),
  fecha_in: z.coerce.date({
    message: 'Fecha de inicio debe ser una fecha válida',
    format: 'YYYY-MM-DD'
  }),
  fecha_fin: z.coerce.date({
    message: 'Fecha de finalización debe ser una fecha válida',
    format: 'YYYY-MM-DD'
  }),
  type: z.enum(['a', 'b', 'c', 'd'])
});

const validateBooking = (object) => {
    return bookingSchemaZod.safeParse(object);
}

export { bookingSchemaZod, validateBooking };