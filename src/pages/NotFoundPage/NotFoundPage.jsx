import { Link } from "react-router-dom";

import css from "./NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <>
      <p className={css.message}>
        No such page found! Click the link to the main page
      </p>
      <Link className={css["link-home"]} to="/">
        Home
      </Link>
    </>
  );
}

export default NotFoundPage;
