import localforage from "localforage";
export default function AddCartbtn({ product, amount = 1 }) {
  return (
    <button
      onClick={() => {
        // Get the cart from local storage
        localforage.getItem("cart").then((cart) => {
          // If the cart is empty, create a new cart
          if (!cart) {
            cart = [];
          }
          // Check if the product is already in the cart
          const productInCart = cart.find((p) => p.id === product.id);
          if (productInCart) {
            // If the product is already in the cart, update the amount
            productInCart.amount += amount;
          } else {
            // If the product is not in the cart, add it
            cart.push({ ...product, amount });
          }
          // Save the cart to local storage
          localforage.setItem("cart", cart).then(() => {
            alert("Product added to cart");
          });
        });
      }}
    >
      Add to cart
    </button>
  );
}
