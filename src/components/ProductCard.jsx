/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

import AddCartbtn from "./AddCartbtn";
export default function ProductCard({ product }) {
  return (
    <div css={styles.card}>
      <Link to={`/product/${product.id}`}>
        <img css={styles.image} src={product.image} alt={product.name} />
      </Link>
      <h3 css={styles.title}>{product.name}</h3>
      <p css={styles.price}>${product.price}</p>
      <AddCartbtn product={product} css={styles.button} />
    </div>
  );
}

const styles = {
  card: css`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    margin: 20px;
    text-align: center;
  `,
  image: css`
    width: 100%;
    height: auto;
  `,
  title: css`
    margin: 0;
    padding: 0;
    font-size: 1.2em;
    color: #333;
  `,
  price: css`
    font-size: 1em;
    color: #666;
  `,
  button: css`
    background-color: #008cba; /* Blue */
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  `,
};
