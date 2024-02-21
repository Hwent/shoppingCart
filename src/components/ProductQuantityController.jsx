export default function ProductQuantityController({ amount, setAmount }) {
  return (
    <div>
      <input
        type="number"
        id="amount"
        min={1}
        value={amount}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setAmount(Number.isNaN(value) ? 1 : Math.max(1, value));
        }}
      />
      <button onClick={() => setAmount(amount + 1)}>+</button>
      <button onClick={() => setAmount(Math.max(1, amount - 1))}>-</button>
    </div>
  );
}
