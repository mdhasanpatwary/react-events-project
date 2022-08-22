import Link from "next/link";
import styles from "./button.module.css";

function Button(props) {
  if (props.link) {
    return (
      <Link href={props.link}>
        <a className={styles.btn}>{props.children}</a>
      </Link>
    );
  }

  return (
    <button className={styles.btn} type={props.type} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
