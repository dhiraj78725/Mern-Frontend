import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "Delete",
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const handleSearch = async (e) => {
    let val = e.target.value;
    let output;
    if (val) {
      if (output) {
        clearTimeout(output);
      }
      output = setTimeout(async () => {
        let result = await fetch(`http://localhost:5000/search/${val}`);
        result = await result.json();
        setProducts(result);
      }, 2000);
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h3>Products</h3>
      <input
        type="text"
        placeholder="Search Product"
        className="search"
        onChange={(e) => {
          handleSearch(e);
        }}
      />
      <ul>
        <li>Name</li>
        <li>Company</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operations</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => {
          return (
            <ul key={item._id}>
              <li>{item.name}</li>
              <li>{item.company}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>
                <button type="button" onClick={() => deleteProduct(item._id)}>
                  Delete
                </button>
                <Link to={`/update/${item._id}`}>Update</Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h2>Record not found</h2>
      )}
    </div>
  );
}
