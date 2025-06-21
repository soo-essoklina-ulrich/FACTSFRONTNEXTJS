'use client';

import { type ReactNode, useState } from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
