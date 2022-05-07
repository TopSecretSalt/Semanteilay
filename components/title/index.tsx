import { FC } from "react";
import styles from "./title.module.css";

interface TitleProps {
  children: string;
}

const Title: FC<TitleProps> = (props) => (
  <h1 className={styles.title}>
    Welcome to <a>{props.children}</a>
  </h1>
);

export default Title;
