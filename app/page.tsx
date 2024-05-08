"use client";

import React from "react";
import styles from "./page.module.css";

const Home = () => {
  const categories = {
    "Basic chat": "chat",
    "File search": "chat-with-file-search",
  };

  return (
    <main className={styles.main}>
      <div className={styles.title}>
        Choose an interface to work with
      </div>
      <div className={styles.container}>
        {Object.entries(categories).map(([name, url]) => (
          <a key={name} className={styles.category} href={`/${url}`}>
            {name}
          </a>
        ))}
      </div>
    </main>
  );
};

export default Home;
