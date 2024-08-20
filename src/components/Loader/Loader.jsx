import { ProgressBar } from "react-loader-spinner";

import css from "./Loader.module.css";

const Loader = () => {
  return (
    <ProgressBar
      visible={true}
      height="180"
      width="180"
      color="#4fa94d"
      barColor="#ffba00"
      borderColor="#ffffff"
      ariaLabel="progress-bar-loading"
      wrapperClass={css.loader}
    />
  );
};

export default Loader;
