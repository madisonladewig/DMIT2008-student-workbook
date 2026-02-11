import styles from "./page.module.css";
import Hello from "./components/Hello.js";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>My React App hehe</h1>
        <Hello />
      </main>
    </div>
  );
}
