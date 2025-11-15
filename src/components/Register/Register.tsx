import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { schema } from "./schema";
import type z from "zod";
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "../DatePicker";
import { useRegister } from "@/hooks/useAuth";
import { toast } from 'react-toastify';

type Form = z.infer<typeof schema>;

export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<Form>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const { mutateAsync: registerUser } = useRegister();

  const onSubmit = async ( data: Form) => {
    try {
        await registerUser({
            name: data.name,
            phone: data.phone,
            birthDate: data.date,
            password: data.password,
        });
        navigate('/login');

        toast.success('Пользователь успешно создан');
        } catch (e) {
        console.log(e);
        setError('root', {
            message: 'Ошибка при создании пользователя',
        });
    }
  };

  return (
    <div className="flex justify-center items-center p-3 h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-[32px]">Регистрация</h1>
        <div className="w-full">
            <Label>Номер телефона</Label>
            <Input {...register('phone')} />
            {errors.phone && <p className="text-red-500 text-[14px]">{errors.phone.message}</p>}
        </div>
        
        <div className="w-full">
            <Label>Имя</Label>
            <Input {...register('name')} />
            {errors.name && <p className="text-red-500 text-[14px]">{errors.name.message}</p>}
        </div>

        <div className="w-full">
            <Label>Дата рождения</Label>
            <Controller
            name='date'
            control={control}
            render={({ field: { onChange, value } }) => (
                <DatePicker value={value} onChange={onChange} />
            )}
            />
            {errors.date && <p className="text-red-500 text-[14px]">{errors.date.message}</p>}
        </div>

        <div className="w-full">
            <Label>Пароль</Label>
            <Input type="password" {...register('password')} />
            {errors.password && <p className="text-red-500 text-[14px]">{errors.password.message}</p>}
        </div>
        <div className="w-full">
            <Label>Повторите пароль</Label>
            <Input type="password" {...register('confirmPassword')} />
            {errors.confirmPassword && <p className="text-red-500 text-[14px]">{errors.confirmPassword.message}</p>}
        </div>
 
        <Button type="submit">Зарегистрироваться</Button>
      </form>
    </div>
  );
}