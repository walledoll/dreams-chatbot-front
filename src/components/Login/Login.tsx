import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { schema } from "./schema";
import type z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "@/hooks/useAuth";
import { toast } from 'react-toastify';
import { Header } from "../Header";

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
        /*await registerUser({
            name: data.name,
            phone: data.phone,
            birthDate: data.date,
            password: data.password,
        });*/
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
    <div className="flex flex-col h-screen bg-background">
      <Header isBotTyping={false}/>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-3 p-3 w-100">
          <h1 className="text-[32px]">Войти</h1>
          <div className="w-full">
              <Label>Номер телефона</Label>
              <Input {...register('phone')} />
              {errors.phone && <p className="text-red-500 text-[14px]">{errors.phone.message}</p>}
          </div>

          <div className="w-full">
              <Label>Пароль</Label>
              <Input type="password" {...register('password')} />
              {errors.password && <p className="text-red-500 text-[14px]">{errors.password.message}</p>}
          </div>

          <Button type="submit">Выполнить вход</Button>
          <p>Нет аккаунта? <Link to='/register' className="underline">Зарегистрироваться</Link></p>
        </form>
      </div>
      
    </div>
  );
}