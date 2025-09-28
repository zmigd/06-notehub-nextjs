import NoteItem from '../NoteItem/NoteItem';
import type { Note } from '../../types/note';

interface NotesListProps {
  notes: Note[];
}

export default function NotesList({ notes }: NotesListProps) {
  if (!Array.isArray(notes)) return null;

  return (
    <ul>
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
}
