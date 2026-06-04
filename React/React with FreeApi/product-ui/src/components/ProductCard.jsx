function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>

      <p className="category">{product.category}</p>

      <div className="price-row">
        <span className="price">₹{product.price}</span>
        <span className="rating">⭐ {product.rating}</span>
      </div>

      <button>Add to Cart</button>
    </div>
  );
}

export default ProductCard;