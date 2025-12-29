import { Metadata } from "next";
import css from "./Home.module.css";

export const metadata: Metadata = {
  title: "Not found",
  description: "The page does not exist or has been deleted.",
  openGraph: {
    title: "Not found",
    description: "The page does not exist or has been deleted.",
    url: "https://08-zustand-roan-tau.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Note Hub",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function NotFound() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
