function Button({ children, onClick, type = "primary" }) {
  return (
    <button className={`hfButton ${type}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
