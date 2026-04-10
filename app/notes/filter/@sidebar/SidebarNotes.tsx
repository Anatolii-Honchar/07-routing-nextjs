import css from "@/components/SidebarNotes/SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  const tags = ["Todo", "Shopping", "Meeting", "Personal", "Work"];

  return (
    <>
      <ul className={css.menuList}>
        {/* список тегів */}
        <li className={css.menuItem}>
          <Link href={`/notes/filter/all`} className={css.menuLink}>
            All notes
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarNotes;