// app/notes/[id]/page.tsx
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: { id: string };
}

export default async function NotePage({ params }: NotePageProps) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['note', params.id], () => fetchNoteById(params.id));

  return <NoteDetailsClient />;
}
