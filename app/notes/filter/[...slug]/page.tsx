import NotesClient from "./Notes.client";
import { fetchNotes } from "@/lib/api";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function FilterPage({
  params,
  searchParams,
}: FilterPageProps) {
  const { slug } = await params;
  const { page, search } = await searchParams;
  const category = slug?.[0] === "all" ? undefined : slug?.[0];
  const currentPage = Number(page ?? "1");

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", currentPage, search, category],
    queryFn: () =>
      fetchNotes({ page: currentPage, perPage: 12, search, tag: category }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={category} />
    </HydrationBoundary>
  );
}
