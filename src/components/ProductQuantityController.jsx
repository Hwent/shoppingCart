import { TextField } from "@mui/material";

export default function ProductQuantityController({ amount, setAmount }) {
  return (
    <div>
      <TextField
        label="Quantity"
        type="number"
        id="amount"
        min={1}
        value={amount}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setAmount(Number.isNaN(value) ? 1 : Math.max(1, value));
        }}
      />
    </div>
  );
}
