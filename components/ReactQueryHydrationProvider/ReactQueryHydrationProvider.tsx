import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ReactQueryHydrationProviderProps {
  state: unknown;
  children: React.ReactNode;
}

const ReactQueryHydrationProvider = ({ state, children }: ReactQueryHydrationProviderProps) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={state}>{children}</Hydrate>
    </QueryClientProvider>
  );
};

export { ReactQueryHydrationProvider };
