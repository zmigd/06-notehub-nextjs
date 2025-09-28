import type { Note } from '../types/note';
import axios from 'axios';

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
  headers: { Authorization: `Bearer ${token}` },
});

// список нотаток
export const getNotes = async (): Promise<Note[]> => {
  const response = await axiosInstance.get<Note[]>('/notes');
  return Array.isArray(response.data) ? response.data : [];
};

// отримання однієї нотатки за id
export const fetchNoteById = async (id: string | number): Promise<Note> => {
  const response = await axiosInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

// створення нотатки
export const createNote = async (payload: {
  title: string;
  content?: string;
  tag: string;
}): Promise<Note> => {
  const response = await axiosInstance.post<Note>('/notes', payload);
  return response.data;
};

// видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await axiosInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};
