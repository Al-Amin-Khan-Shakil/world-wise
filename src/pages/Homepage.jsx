import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div>
      <h2>World Wise</h2>
      <Link to="/pricing">Pricing</Link>
    </div>
  );
}
