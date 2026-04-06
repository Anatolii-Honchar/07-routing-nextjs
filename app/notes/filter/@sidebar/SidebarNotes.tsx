import css from "./SidebarNotes.module.css";

const tags = ["all", "Work", "Personal", "Meeting"];

export default function SidebarNotes() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href="/notes/filter/all" className={css.menuLink}>
          All notes
        </a>
      </li>

      {tags
        .filter((tag) => tag !== "all")
        .map((tag) => (
          <li key={tag} className={css.menuItem}>
            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        ))}
    </ul>
  );
}
