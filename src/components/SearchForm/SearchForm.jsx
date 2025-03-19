import css from "./SearchForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast, { Toaster } from "react-hot-toast";

const SearchForm = ({ onSubmit }) => {
  const handleSubmit = (values, actions) => {
    if (values.search.trim()) {
      onSubmit(values.search);
      actions.resetForm();
    } else {
      toast.error("Це поле не може бути порожнім");
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.search.trim()) {
      errors.search = "Це поле не може бути порожнім";
    }
    return errors;
  };

  return (
    <header className={css.header}>
      <Formik
        initialValues={{ search: "" }}
        onSubmit={handleSubmit}
        validate={validate}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search for movies"
          />

          <ErrorMessage name="search" component="div" className={css.error} />
          <button className={css.button} type="submit">
            Search
          </button>
        </Form>
      </Formik>
      <Toaster />
    </header>
  );
};

export default SearchForm;
