import { NavLink } from "react-router-dom";
import css from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={css.header}>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? css.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/movies"
              className={({ isActive }) => (isActive ? css.active : "")}
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
