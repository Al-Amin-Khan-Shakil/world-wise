import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <div>
      <PageNav />
      <h1 className="test">World Wise</h1>
      <Link to="/app">App layout</Link>
    </div>
  );
}
