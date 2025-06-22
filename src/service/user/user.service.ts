import AxiosInstance from '@/service/axios-manager/axios-instance';
import { UtilisateurDto } from '@/types/utilisateur.type';

const url = `user`;
export class UserService {
  static USER_KEY = 'user';

  async getAllorOnebyEmail(email?: string) {
    return (await AxiosInstance.get<UtilisateurDto[]>(url + (email ? `/${email}` : ''))).data;
  }

  async create(user: UtilisateurDto) {
    return (await AxiosInstance.post<UtilisateurDto>(url, user)).data;
  }

  async update(id: string, user: UtilisateurDto) {
    return (await AxiosInstance.put<UtilisateurDto>(url + `/${id}`, user)).data;
  }

  async delete(id: string) {
    return (await AxiosInstance.delete<null>(url + `/${id}`)).data;
  }

  async activateorDesactivate(id: string) {
    return (await AxiosInstance.get<boolean>(url + `/${id}/activate`)).data;
  }

  async changepassword(value: { oldPassword: string; newPassword: string }) {
    return (await AxiosInstance.post<boolean>(url + `/change-password`, value)).data;
  }
}
