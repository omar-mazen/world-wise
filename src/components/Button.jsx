/* eslint-disable react/prop-types */
import styles from "./Button.module.css";

export default function Button({ children, onClick, type, cssStyle = {} }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${styles[type]}`}
      style={cssStyle}
    >
      {children}
    </button>
  );
}
