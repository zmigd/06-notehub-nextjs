'use client';

import { useQuery, QueryClient, hydrate } from '@tanstack/react-query';
import { useState } from 'react';
import { fetchNoteById } from '../../../lib/api';
import type { DehydratedState } from '@tanstack/react-query';
import type { Note } from '../../../types/note';
import css from './NoteDetails.module.css';

interface Props {
  noteId: string;
  dehydratedState?: DehydratedState;
}

export default function NoteDetailsClient({ noteId, dehydratedState }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }

  const { data: note, isLoading, isError } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (isError || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
