import AxiosInstance from '@/service/axios-manager/axios-instance';
import { z } from 'zod';

export class LoginService {
  static schemaLogin = z.object({
    usename: z.string(),
    password: z.string(),
  });

  static async login(data: { username: string; password: string }) {
    return (await AxiosInstance.post('auth/login', data)).data;
  }
}
