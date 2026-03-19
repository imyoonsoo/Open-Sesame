import './SubmitButton.css';

function SubmitButton({
  onClick,
  disabled,
  className = 'submit-button',
  children,
}) {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default SubmitButton;
