import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

interface Props {
  params: Promise<{ slug: string[] }>;
}

export default async function FilterPage({ params }: Props) {
  const { slug } = await params;

  const tag = slug[0]; // "Work" або "all"

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, "", tag === "all" ? undefined : tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={tag} />
    </HydrationBoundary>
  );
}
