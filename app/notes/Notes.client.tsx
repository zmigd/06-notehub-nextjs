'use client';

import { useQuery, QueryClient, hydrate } from '@tanstack/react-query';
import { useState } from 'react';
import { getNotes } from '../../lib/api';
import NotesList from '../../components/NoteList/NoteList';
import type { DehydratedState } from '@tanstack/react-query';
import type { Note } from '../../types/note';

interface Props {
  dehydratedState: DehydratedState;
}

export default function NotesClient({ dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  hydrate(queryClient, dehydratedState);

  const { data: notes, isLoading, isError } = useQuery<Note[], Error>({
    queryKey: ['notes'],
    queryFn: getNotes,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !notes) return <p>Something went wrong.</p>;

  return <NotesList notes={notes} />;
}
