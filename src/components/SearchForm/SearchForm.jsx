import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./SearchForm.module.css";

const SearchForm = ({ defaultQuery, setSearchParams }) => {
  const initialValues = {
    searchQuery: defaultQuery || "",
  };

  const searchQuerySchema = Yup.object().shape({
    searchQuery: Yup.string()
      .min(2, "*need a little more data to search!")
      .max(50, "*a very large search key!")
      .required("*you must enter a search query!"),
  });

  const handleSubmit = ({ searchQuery }) =>
    setSearchParams({ query: searchQuery });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={searchQuerySchema}
    >
      <Form className={css.form}>
        <Field
          className={css.input}
          name="searchQuery"
          type="text"
          autoFocus
          placeholder="Enter name movie..."
        />
        <ErrorMessage className={css.error} name="searchQuery" component="span" />
        <button type="submit" className={css.btn}>
          Search
        </button>
      </Form>
    </Formik>
  );
};

export default SearchForm;
