import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">🛍️ Product Showcase</h1>
      <nav>
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/cart" className="mr-4">Cart</Link>
      </nav>
    </header>
  );
}