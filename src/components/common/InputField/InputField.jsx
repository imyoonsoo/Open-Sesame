import './InputField.css';

function InputField({
  icon,
  value,
  onChange,
  placeholder = '',
  className = '',
}) {
  return (
    <div className={`input-field-wrapper ${className}`}>
      {icon && <img src={icon} alt="" className="input-field-icon" />}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
      />
    </div>
  );
}

export default InputField;
