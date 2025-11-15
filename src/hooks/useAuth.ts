import { useMutation, useQuery } from '@tanstack/react-query';
import { authMe, login, logout, register } from '../api/auth';

export const useLogin = () => {
  return useMutation({
    mutationFn: login,
    mutationKey: ['login'],
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    mutationKey: ['logout'],
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: register,
    mutationKey: ['register'],
  });
};

export const useAuthMe = () => {
  return useQuery({
    queryFn: authMe,
    queryKey: ['auth'],
  });
};