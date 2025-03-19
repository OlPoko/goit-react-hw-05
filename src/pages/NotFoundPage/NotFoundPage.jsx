import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className={css.container}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={goBack} className={css.button}>
        Go to Home
      </button>
    </div>
  );
};

export default NotFoundPage;
