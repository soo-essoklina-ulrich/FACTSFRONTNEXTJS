import QueryProvider from '@/components/queryclient/QueryProvider';
import { NextAuthProvider } from '@/context/nextAuthProvider';
import { ChildrenType } from '@/types/types';

const Providers = async ({ children }: ChildrenType) => {
  return (
    <QueryProvider>
      <NextAuthProvider basePath={process.env.NEXTAUTH_BASEPATH}>{children}</NextAuthProvider>
    </QueryProvider>
  );
};

export default Providers;
