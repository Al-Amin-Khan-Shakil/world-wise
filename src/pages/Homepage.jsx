import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <section>
        <h1>
          You trvel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <p>
          A world map that tracks your footsetps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </p>
      </section>
    </main>
  );
}
