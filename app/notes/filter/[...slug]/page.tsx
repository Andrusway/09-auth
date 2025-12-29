import { QueryClient } from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";
import type { NoteTag } from "@/types/note";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";

interface NotesPageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];
  const tagName = tag.charAt(0).toUpperCase() + tag.slice(1);
  return {
    title: `${tagName} Notes`,
    description: `It's page for ${tagName} tags`,
    openGraph: {
      title: `${tagName} Notes`,
      description: `It's page for ${tagName} tags`,
      url: `https://08-zustand-roan-tau.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `${tagName} Notes`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;

  const tag = slug[0] !== "all" ? (slug[0] as NoteTag) : undefined;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () => fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
