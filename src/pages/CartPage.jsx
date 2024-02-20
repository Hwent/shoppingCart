import { useState } from "react";
import localforage from "localforage";
export default function CartPage() {
  const [cart, setCart] = useState([]);
  localforage.getItem("cart").then((cart) => {
    setCart(cart || []);
  });
  return (
    <div>
      <h1>Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              {product.title} - ${product.price}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() =>
          localforage
            .removeItem("cart")
            .then(function () {
              // Run this code once the key has been removed.
              console.log("Key is cleared!");
            })
            .catch(function (err) {
              // This code runs if there were any errors
              console.log(err);
            })
        }
      >
        clear
      </button>
    </div>
  );
}
