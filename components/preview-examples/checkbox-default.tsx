export default function CheckboxDefault() {
  return (
    <label className="field">
      <input type="checkbox" defaultChecked />
      <span className="field__label">I agree to the terms</span>
    </label>
  );
}
