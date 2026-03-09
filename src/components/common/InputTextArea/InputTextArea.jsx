import './InputTextArea.css';

function InputTextArea({ value, onChange, placeholder = '', className = '' }) {
  return (
    <textarea
      className={`input-textarea ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}

export default InputTextArea;
