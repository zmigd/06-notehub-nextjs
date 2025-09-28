'use client';

import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import type { DehydratedState } from '@tanstack/react-query';

interface Props {
  state: DehydratedState;
  children: ReactNode;
}

export function ReactQueryHydrationProvider({ state, children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  // гідрація стану з сервера
  hydrate(queryClient, state);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
