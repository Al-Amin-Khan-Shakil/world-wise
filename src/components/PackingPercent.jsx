import { useTravelBag } from "../contexts/TravelBagContext";

export default function PackingPercent() {
  const { items } = useTravelBag();

  if (items.length === 0) {
    return (
      <footer className="stats">
        <em>
          Begin including items in your packing list for a smooth journey ahead!
          🚀
        </em>
      </footer>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <div className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </div>
  );
}
