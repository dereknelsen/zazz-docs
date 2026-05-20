export default function CheckboxDefault() {
  return (
    <label className="checkbox-group">
      <input className="checkbox" type="checkbox" defaultChecked />
      <span className="form-label">I agree to the terms</span>
    </label>
  );
}
