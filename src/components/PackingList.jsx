import { useState } from "react";
import { useTravelBag } from "../contexts/TravelBagContext";
import Item from "./Item";
import styles from "./PackingList.module.css";

export default function PackingList() {
  const [sortBy, setSortBy] = useState("input");
  const { items, handleClearList } = useTravelBag();

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className={styles.list}>
      <ul>
        {sortedItems.length !== 0 ? (
          sortedItems.map((item) => <Item key={item.id} item={item} />)
        ) : (
          <p>
            Enter item details and click &apos;Add&apos; to include them in your
            packing list.😊
          </p>
        )}
      </ul>

      {sortedItems.length !== 0 ? (
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
          <button
            type="button"
            onClick={handleClearList}
            className={styles.clearButton}
          >
            Clear list
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
