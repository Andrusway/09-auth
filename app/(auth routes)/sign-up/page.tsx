"use client";
import css from "./SignUpPage.module.css";
import { register, RegisterAndLoginRequest } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";
import { useState } from "react";
import { ApiError } from "@/app/api/api";

export default function SignUp() {
  const router = useRouter();
  const [err, setErr] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setUser = useAuth((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setErr("");
    try {
      const formValues = {
        email: formData.get("email"),
        password: formData.get("password"),
      } as RegisterAndLoginRequest;

      const res = await register(formValues);

      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setErr("Invalid email or password");
      }
    } catch (err) {
      setErr(
        (err as ApiError).response?.data.error ??
          (err as ApiError).message ??
          "Oops... Some error :("
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button
            type="submit"
            className={css.submitButton}
            disabled={isLoading}
          >
            Register
          </button>
        </div>

        {err && <p className={css.error}>Error: {err}</p>}
      </form>
    </main>
  );
}
