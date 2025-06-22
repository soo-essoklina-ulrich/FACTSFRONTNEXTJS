import { ChildrenType } from '@/types/types';
// import { getServerSession } from 'next-auth';
import AuthRedirect from '@/components/auth/AuthRedirect';
import {getSession} from "next-auth/react";

const AuthGuard = async ({ children }: ChildrenType) => {
  const session = await getSession();
  return <>{session ? children : <AuthRedirect />}</>;
};

export default AuthGuard;
