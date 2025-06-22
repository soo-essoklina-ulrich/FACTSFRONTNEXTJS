import QueryProvider from '@/components/queryclient/QueryProvider';
import NextAuthProvider from "@/context/nextAuthProvider";
import {ChildrenType} from '@/types/types';

const Providers = async ({children}: ChildrenType) => {
    return (
        <NextAuthProvider>
            <QueryProvider>{children} </QueryProvider>
        </NextAuthProvider>
    );
};

export default Providers;
