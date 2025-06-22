import { ChildrenType } from '@/types/types';
import GuestOnly from '@/components/auth/GuestOnly';

const Layout = ({ children }: ChildrenType) => {
  return (
    <>
      {' '}
      <GuestOnly>{children}</GuestOnly>
    </>
  );
};

export default Layout;
