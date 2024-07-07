import { useTravelBag } from '../contexts/TravelBagContext';
import styles from './Item.module.css';

export default function Item({ item }) {
  const { handleToggleItems, handleDeleteItem } = useTravelBag();

  return (
    <li className={styles.listItem}>
      <input
        type="checkbox"
        onChange={() => handleToggleItems(item.id)}
        checked={item.packed}
      />
      {' '}
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>
        {item.quantity}
        {' '}
        {item.description}
      </span>
      {' '}
      <button
        type="button"
        onClick={() => handleDeleteItem(item.id)}
        className={styles.deleteBtn}
      >
        &#10006;
      </button>
    </li>
  );
}
