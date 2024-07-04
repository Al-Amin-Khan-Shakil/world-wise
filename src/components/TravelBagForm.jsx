import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTravelBag } from "../contexts/TravelBagContext";

export default function TravelBagForm() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { handleSubmit } = useTravelBag();

  const handleSubnit = (e) => {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: uuidv4(),
    };

    handleSubmit(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form onSubmit={handleSubnit} className="add-form">
      <h3>What do you need for your 😍 trip?</h3>
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
    </form>
  );
}
