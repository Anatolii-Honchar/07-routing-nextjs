import axios from "axios";
import { Note } from "@/types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`;
  return config;
});

// 🔹 Типи
interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}

// 🔹 Отримання нотаток
export const fetchNotes = async (
  page: number,
  search: string,
): Promise<FetchNotesResponse> => {
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search && { search }),
    },
  });

  return response.data;
};

// 🔹 Створення нотатки
export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response = await api.post<Note>("/notes", payload);
  return response.data;
};

// 🔹 Видалення нотатки
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

// 🔹 Отримання нотатки за ID
export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
