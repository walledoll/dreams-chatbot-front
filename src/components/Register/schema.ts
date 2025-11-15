import { z } from 'zod';

export const schema = z
  .object({
    name: z.string().min(2, 'Имя слишком короткое'),
    phone: z.string().min(11, 'Неверное количество символов'),
    password: z.string().min(8, 'Пароль слишком короткий'),
    date: z.date('Неверный формат даты'),
    confirmPassword: z.string().min(8, 'Повторите пароль'),
    confirmAgreement: z.boolean().refine((val) => val === true, {
      message: 'Вы должны дать согласие на обработку персональных данных',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Пароли не совпадают',
  });