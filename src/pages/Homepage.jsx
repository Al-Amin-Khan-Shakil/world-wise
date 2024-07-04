import { Link, useNavigate } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";

export default function Homepage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const navigateApp = () => {
    if (isAuthenticated === true) {
      navigate("/app");
    } else {
      navigate("/login");
    }
  };

  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          WorldWise keeps track of your adventures.
        </h1>
        <p>
          A world map that tracks your footsteps into every city you can think
          of. Never forget your wonderful experiences, and show your friends how
          you have wandered the world.
        </p>
        <button className={styles.cta} onClick={navigateApp}>
          Start tracking now
        </button>
      </section>
    </main>
  );
}
