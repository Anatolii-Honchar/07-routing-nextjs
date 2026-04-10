import axios from "axios";
import type { Note, CreateNote } from "@/types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
} // ДЗ

const AUTH_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
  tag?: string;
}

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const fetchNotes = async ({
  page,
  perPage,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await instance.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      search,
      tag,
    },
  });

  return response.data;
};

export const createNote = async (newNote: CreateNote): Promise<Note> => {
  const { data } = await instance.post<Note>("/notes", newNote);
  return data;
};

export const deleteNote = async (deleteNoteId: Note["id"]): Promise<Note> => {
  const { data } = await instance.delete<Note>(`/notes/${deleteNoteId}`);
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await instance.get<Note>(`/notes/${id}`);
  return response.data;
};
