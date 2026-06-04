export default function SwitchDefault() {
  return (
    <label className="field">
      <input type="checkbox" role="switch" defaultChecked />
      <span className="field__label">Enable notifications</span>
    </label>
  );
}
