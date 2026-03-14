import './SubmitButton.css';

function SubmitButton({ onClick, disabled, className, children }) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default SubmitButton;
