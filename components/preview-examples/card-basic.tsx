export default function CardBasic() {
  return (
    <a className="card" href="#">
      <div className="card__figure">
        <img
          className="card__image"
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=60"
          alt=""
        />
      </div>
      <div className="card__content">
        <div className="card__tags">
          <span className="badge" data-variant="link">
            Field notes
          </span>
        </div>
        <div className="card__body">
          <span className="card__title-link">
            <h3 className="card__title text-h6">How quickly zebras jump</h3>
          </span>
          <p className="card__description text-sm text-muted-foreground line-clamp-2">
            Short excerpt that wraps to two lines before truncating. Demonstrates the default card
            composition.
          </p>
        </div>
        <div className="card__footer">
          <div className="avatar-author">
            <div className="avatar">
              <div className="avatar__initials">DN</div>
            </div>
            <div className="avatar-author__info">
              <span className="avatar-author__name text-sm">Derek Nelsen</span>
              <span className="avatar-author__description text-xs text-muted-foreground">
                15 Mar 2025
              </span>
            </div>
          </div>
          <span className="card__button button" data-variant="muted">
            Read article
          </span>
        </div>
      </div>
    </a>
  );
}
