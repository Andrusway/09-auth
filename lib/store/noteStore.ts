import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteFormValues } from "@/types/note";

type NoteDraft = {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
};

const initialValues: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export const useNoteDraft = create<NoteDraft>()(
  persist(
    (set) => ({
      draft: initialValues,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialValues })),
    }),
    {
      name: "note-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
