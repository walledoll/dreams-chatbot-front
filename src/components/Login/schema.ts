import { z } from 'zod';

export const schema = z
  .object({
    phone: z.string().min(11, 'Неверное количество символов'),
    password: z.string().min(8, 'Пароль слишком короткий'),
  });