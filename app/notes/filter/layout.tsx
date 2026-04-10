import css from "@/components/LayoutNotes/LayoutNotes.module.css";
import React from "react";

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

const FilterLayout = ({ children, sidebar }: Props) => {
  return (
    <section className={css.container}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.notesWrapper}>{children}</div>
    </section>
  );
};

export default FilterLayout;
