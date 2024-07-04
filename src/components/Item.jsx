import { useTravelBag } from "../contexts/TravelBagContext";

export default function Item({ item }) {
  const { handleToggleItems, handleDeleteItem } = useTravelBag();

  return (
    <li>
      <input
        type="checkbox"
        onChange={() => handleToggleItems(item.id)}
        checked={item.packed}
      />{" "}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>{" "}
      <button type="button" onClick={() => handleDeleteItem(item.id)}>
        ❌
      </button>
    </li>
  );
}
