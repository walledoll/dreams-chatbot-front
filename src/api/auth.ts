import type { IUser } from '../entities/user';


const API_URL = import.meta.env.VITE_API_URL;

export const login = async (
  user: Pick<IUser, 'phone' | 'password'>,
): Promise<{ token: string }> => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    throw new Error(`Error to phone ${user.phone}`);
  }
  const data = await res.json();
  return data;
};

export const register = async (user: IUser) => {
  const res = await fetch(`${API_URL}/auth/registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error(`Error to register ${user.name}`);
  const data = await res.json();
  return data;
};

export const logout = async (): Promise<void> => {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Error to logout');
  }
  return res.json();
};

export const authMe = async () => {
  const res = await fetch(
    `${API_URL}/users/me`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) throw new Error('Error to refresh token');
  return res.json();
};