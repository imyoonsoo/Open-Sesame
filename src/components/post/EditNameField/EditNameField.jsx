import SubmitButton from '@/components/home/SubmitButton/SubmitButton';
import InputField from '@/components/common/InputField/InputField';
import './EditNameField.css';

function EditingNameField({ username, onChange, onSave }) {
  return (
    <div className="post-name-field">
      <InputField
        className="post-name post-name-editing"
        value={username}
        onChange={onChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
        autoFocus
      />
      <SubmitButton onClick={onSave}>저장</SubmitButton>
    </div>
  );
}

export default EditingNameField;
