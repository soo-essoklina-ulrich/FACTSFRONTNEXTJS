import AxiosInstance from '@/service/axios-manager/axios-instance';
import { z } from 'zod';

export const schemaLogin = z.object({
  username: z.string().min(2, { message: 'entre 2 caracteres au minimum' }),
  password: z.string().min(2, { message: 'entre 6 caracteres au minimum' }),
});

export class AuthService {
  static async login(data: { username: string; password: string }) {
    return (await AxiosInstance.post<{ bearer: string; refresh: string }>('auth/login', data)).data;
  }

  static async refreshToken(refreshToken: string) {
    return (
      await AxiosInstance.post<{ bearer: string; refresh: string }>('auth/refresh-token', {
        refresh: refreshToken,
      })
    ).data;
  }

  static async logout() {
    return (await AxiosInstance.post('auth/logout', {})).data;
  }
}
