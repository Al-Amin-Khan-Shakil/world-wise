import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTravelBag } from "../contexts/TravelBagContext";
import styles from "./TravelBagForm.module.css";

export default function TravelBagForm() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { handleAddItems } = useTravelBag();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: uuidv4(),
    };

    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addForm}>
      <h3>What do you need for your 😍 trip?</h3>
      <div>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Items..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add</button>
      </div>
    </form>
  );
}
