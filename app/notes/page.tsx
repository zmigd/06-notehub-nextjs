import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getNotes } from '../../lib/api';
import NotesClient from './Notes.client';
import { ReactQueryHydrationProvider } from '../../components/ReactQueryHydrationProvider/ReactQueryHydrationProvider';

export default async function NotesPage() {
  const queryClient = new QueryClient();

  // Prefetch notes на сервері
  await queryClient.prefetchQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrationProvider state={dehydratedState}>
      <NotesClient dehydratedState={dehydratedState} />
    </ReactQueryHydrationProvider>
  );
}
