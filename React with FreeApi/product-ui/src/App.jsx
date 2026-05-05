import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.freeapi.app/api/v1/public/randomproducts")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data.data);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 className="status">Loading products...</h2>;

  return (
    <div>
      <h1 className="title">🛍️ Product Store</h1>

      <div className="container">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default App;