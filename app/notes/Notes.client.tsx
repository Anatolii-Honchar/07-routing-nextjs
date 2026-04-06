"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";

import css from "@/components/NotesPage/NotesPage.module.css";

interface Props {
  initialTag?: string;
}

export default function NotesClient({ initialTag = "all" }: Props) {
  // 🔹 локальні стани
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 нормалізація тегу
  const tag = initialTag === "all" ? undefined : initialTag;

  // 🔹 запит
  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: (prev) => prev, // ✅ щоб не було мерехтіння
  });

  // 🔹 стани
  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  const { notes, totalPages } = data;

  return (
    <div className={css.container}>
      {/*  Пошук + кнопка */}
      <div className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1); // reset сторінки при пошуку
          }}
        />

        {/*  Пагінація */}
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <button className={css.button} onClick={() => setIsModalOpen(true)}>
          Create note +
        </button>
      </div>

      {/*  Список нотаток */}
      <NoteList notes={notes} />

      {/*  Модалка */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
