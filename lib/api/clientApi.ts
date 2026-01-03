import type { Note, NoteFormValues, NoteTag } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface RegisterAndLoginRequest {
  email: string;
  password: string;
}

export interface CheckSessionRequest {
  success: boolean;
}

export interface UpdateUserRequest {
  username?: string;
}

export async function fetchNotes(
  page: number,
  search: string,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
  });
  return data;
}

export async function createNote(newNote: NoteFormValues): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", newNote, {
    headers: {},
  });
  return data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`, {
    headers: {},
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${id}`);
  return data;
}

export async function register(data: RegisterAndLoginRequest) {
  const res = await nextServer.post<User>("auth/register", data);
  return res.data;
}

export async function login(data: RegisterAndLoginRequest) {
  const res = await nextServer.post("auth/login", data);
  return res.data;
}

export async function logout(): Promise<void> {
  await nextServer.post("auth/logout");
}

export async function checkSession() {
  const { data } = await nextServer.get<CheckSessionRequest>("auth/session");
  return data.success;
}

export async function getMe() {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: UpdateUserRequest) {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
}
