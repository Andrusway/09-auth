"use client";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import type { FormikHelpers } from "formik";
import type { NoteFormValues } from "../../types/note";
// import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createNote } from "../../lib/api";
import toast from "react-hot-toast";
import { useNoteDraft } from "@/lib/store/noteStore";

// interface NoteFormProps {
//   onClose: () => void;
// }

// const initialValues: NoteFormValues = {
//   title: "",
//   content: "",
//   tag: "Todo",
// };

// const NoteFormSchema = Yup.object().shape({
//   title: Yup.string()
//     .min(3, "Title must be at least 3 characters")
//     .max(50, "Title is too long")
//     .required("Title is required"),
//   content: Yup.string().max(500, "Content is too long"),
//   tag: Yup.string()
//     .oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"], "Invalid tag")
//     .required("Select tag"),
// });

export default function NoteForm() {
  const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteDraft();
  // const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note added successfully");
      router.push("/notes/filter/all");
      clearDraft();
      // onClose();
    },
    onError: (error) => {
      console.log("Error", error);
      toast.error("An error occurred");
    },
  });

  const handleCancel = () => router.back();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const handleSubmit = (formData: FormData) =>
    // values: NoteFormValues,
    // actions: FormikHelpers<NoteFormValues>
    {
      const values = {
        title: formData.get("title"),
        content: formData.get("content"),
        tag: formData.get("tag"),
      } as NoteFormValues;
      mutation.mutate(values);
      // actions.resetForm();
    };

  return (
    <>
      {/* <Formik
        initialValues={initialValues}
        validationSchema={NoteFormSchema}
        onSubmit={handleSubmit}
      > */}
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            className={css.input}
            onChange={handleChange}
            defaultValue={draft.title}
          />
          {/* <ErrorMessage name="title" component="span" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
            onChange={handleChange}
            defaultValue={draft.content}
          />
          {/* <ErrorMessage name="content" component="span" className={css.error} /> */}
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <select
            id="tag"
            name="tag"
            className={css.select}
            onChange={handleChange}
            defaultValue={draft.tag}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </select>
          {/* <ErrorMessage name="tag" component="span" className={css.error} /> */}
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button type="submit" className={css.submitButton} disabled={false}>
            Create note
          </button>
        </div>
      </form>
      {/* </Formik> */}
      {mutation.isPending && <div>Adding note...</div>}
    </>
  );
}
