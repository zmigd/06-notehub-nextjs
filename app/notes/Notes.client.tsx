// app/notes/Notes.client.tsx
'use client';

import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, deleteNote } from '../../lib/api';
import type { FetchNotesResponse } from '../../lib/api';
import NoteList from '../../components/NoteList/NoteList';
import SearchBox from '../../components/SearchBox/SearchBox';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import css from './Notes.client.module.css';

// Хук для дебаунса
function useDebounce<T>(value: T, delay = 500): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

export default function NotesClient() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const queryClient = useQueryClient();

  // Запит нотаток
  const { data, isLoading, isError } = useQuery<FetchNotesResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
  });

  const notesResults = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  // Mutation для видалення нотатки
  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });

    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  // Скидаємо сторінку при зміні пошуку
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page - 1}
            onPageChange={(selected) => setPage(selected + 1)}
          />
        )}
        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading notes</p>}

      {notesResults.length > 0 ? (
        <NoteList notes={notesResults} onDelete={handleDelete} />
      ) : (
        !isLoading && <p>No notes found</p>
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onCancel={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
