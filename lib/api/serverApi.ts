import { cookies } from "next/headers";
import { Note, NoteTag } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { CheckSessionRequest, FetchNotesResponse } from "./clientApi";

export async function fetchNotes(
  page: number,
  search: string,
  tag?: NoteTag
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      search,
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function getMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
}

export async function checkSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get<CheckSessionRequest>("auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}
