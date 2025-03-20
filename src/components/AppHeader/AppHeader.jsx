import css from "./AppHeader.module.css";
import Navigation from "../Navigation/Navigation";

const AppHeader = () => {
  return (
    <header className={css.header}>
      <Navigation />
    </header>
  );
};

export default AppHeader;
