import React from "react";
import styles from "./Footer.module.scss";

export default function Footer(props) {
  return (
    <footer className={styles.container}>
      <p>
        Made with{" "}
        <span role="img" aria-label="love">
          ❤️
        </span>{" "}
        by{" "}
        <a
          style={{ color: "inherit" }}
          href="https://github.com/mftw"
        >
          mftw
        </a>
      </p>
      {props.children}
    </footer>
  );
}
