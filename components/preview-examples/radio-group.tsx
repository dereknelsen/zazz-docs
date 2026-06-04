export default function RadioGroup() {
  return (
    <fieldset className="radio-group">
      <legend className="text-eyebrow text-muted-foreground">Options</legend>
      <label className="field">
        <input className="radio" type="radio" name="zazz-preview-radio" defaultChecked />
        <span className="field__label">Option A</span>
      </label>
      <label className="field">
        <input className="radio" type="radio" name="zazz-preview-radio" />
        <span className="field__label">Option B</span>
      </label>
      <label className="field">
        <input className="radio" type="radio" name="zazz-preview-radio" />
        <span className="field__label">Option C</span>
      </label>
    </fieldset>
  );
}
