export default function TabsDefault() {
  return (
    <div className="tabs">
      <div className="tabs__list" role="tablist">
        <div className="tabs__indicator" aria-hidden="true" />

        <input type="radio" name="zazz-preview-tabs" id="zazz-preview-tab-1" defaultChecked />
        <label htmlFor="zazz-preview-tab-1" className="tabs__label">
          <span className="tabs__label-text">Account</span>
        </label>

        <input type="radio" name="zazz-preview-tabs" id="zazz-preview-tab-2" />
        <label htmlFor="zazz-preview-tab-2" className="tabs__label">
          <span className="tabs__label-text">Billing</span>
        </label>

        <input type="radio" name="zazz-preview-tabs" id="zazz-preview-tab-3" />
        <label htmlFor="zazz-preview-tab-3" className="tabs__label">
          <span className="tabs__label-text">Notifications</span>
        </label>
      </div>

      <div className="tabs__panel">
        <h2 className="text-h5">Account</h2>
        <p>Manage your profile, email, and password.</p>
      </div>

      <div className="tabs__panel">
        <h2 className="text-h5">Billing</h2>
        <p>Review invoices and update your payment method.</p>
      </div>

      <div className="tabs__panel">
        <h2 className="text-h5">Notifications</h2>
        <p>Choose what we email you about and how often.</p>
      </div>
    </div>
  );
}
