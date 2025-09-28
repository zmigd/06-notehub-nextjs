import { QueryClient, dehydrate } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { fetchNoteById } from '../../../lib/api';
import { ReactQueryHydrationProvider } from '../../../components/ReactQueryHydrationProvider/ReactQueryHydrationProvider';

interface NoteDetailsPageProps {
  params: { id: string };
}

export default async function NoteDetailsPage({ params }: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const noteId = params.id;

  // Prefetch note на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <ReactQueryHydrationProvider state={dehydratedState}>
      <NoteDetailsClient noteId={noteId} />
    </ReactQueryHydrationProvider>
  );
}
