'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import type { Note } from '../../types/note';

interface NoteItemProps {
  note: Note;
}

export default function NoteItem({ note }: NoteItemProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(new Date(note.updatedAt).toLocaleString());
  }, [note.updatedAt]);

  return (
    <li>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <small>Updated: {formattedDate}</small>
      <div>
        <Link href={`/notes/${note.id}`}>View details</Link>
        <button>Delete</button>
      </div>
    </li>
  );
}
