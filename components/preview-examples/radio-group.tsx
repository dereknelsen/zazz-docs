export default function RadioGroup() {
  return (
    <div className="flex flex-col gap-xs">
      <label className="radio-group">
        <input className="radio" type="radio" name="zazz-preview-radio" defaultChecked />
        <span className="form-label">Option A</span>
      </label>
      <label className="radio-group">
        <input className="radio" type="radio" name="zazz-preview-radio" />
        <span className="form-label">Option B</span>
      </label>
      <label className="radio-group">
        <input className="radio" type="radio" name="zazz-preview-radio" />
        <span className="form-label">Option C</span>
      </label>
    </div>
  );
}
