import { ChildrenType } from '@/types/types';
import AuthGuard from '@/components/auth/AuthGuard';

const PrivateLayout = async ({ children }: ChildrenType) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default PrivateLayout;
