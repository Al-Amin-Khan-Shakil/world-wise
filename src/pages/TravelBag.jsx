import PageNav from "../components/PageNav";
import TravelBagForm from "../components/TravelBagForm";
import styles from "./TravelBag.module.css";

export default function TravelBag() {
  return (
    <main className={styles.bagpack}>
      <PageNav />
      <section>
        <h2>🧳Manage your travel bag before flight ✈️</h2>
        <TravelBagForm />
      </section>
    </main>
  );
}
