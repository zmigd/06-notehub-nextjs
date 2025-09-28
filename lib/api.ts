// lib/api.ts
import axios, { AxiosResponse } from 'axios';
import type { Note } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes(params: { page?: number; perPage?: number; search?: string }): Promise<FetchNotesResponse> {
  const { page = 1, perPage = 12, search = '' } = params;
  const response: AxiosResponse<FetchNotesResponse> = await api.get('/notes', {
    params: { page, perPage, search },
  });
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.get(`/notes/${id}`);
  return response.data;
}

export async function createNote(payload: { title: string; content?: string; tag: string }): Promise<Note> {
  const response: AxiosResponse<Note> = await api.post('/notes', payload);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response: AxiosResponse<Note> = await api.delete(`/notes/${id}`);
  return response.data;
}
