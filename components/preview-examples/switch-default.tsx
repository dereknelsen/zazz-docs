export default function SwitchDefault() {
  return (
    <div className="switch-group">
      <label className="switch-base">
        <input className="switch" type="checkbox" defaultChecked />
        <span className="switch-toggle" />
      </label>
      <span className="form-label">Enable notifications</span>
    </div>
  );
}
