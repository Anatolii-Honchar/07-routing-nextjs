import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";
import NotesClient from "@/app/notes/Notes.client";

interface Props {
  params: { slug: string[] };
}

export default async function FilterPage({ params }: Props) {
  const queryClient = new QueryClient();

  const tag = params.slug?.[0];

  // ❗ якщо all → не передаємо тег
  const searchTag = tag === "all" ? "" : tag;

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, searchTag],
    queryFn: () => fetchNotes(1, searchTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialTag={searchTag} />
    </HydrationBoundary>
  );
}
