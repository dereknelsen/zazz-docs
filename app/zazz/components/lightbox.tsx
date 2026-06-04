/*
  LIGHTBOX — .lightbox
  ─────────────────────────────────────────────────────────────────────────────
  Element:   Gallery grid of thumbnails + fullscreen dialog slideshow
  Opening:   Invoker Commands API — button[command="show-modal"][commandfor="id"]
  Closing:   closedby="any" (backdrop click) + button[command="close"]
  Slideshow: Embla Carousel inside the dialog (auto-initialized by embla.js)

  Structure:
    .lightbox                           — Grid container for thumbnails
      button.lightbox__trigger          — command="show-modal" wrapping thumbnail
        img                             — Thumbnail image
      dialog.lightbox__dialog.dialog    — Fullscreen dark overlay
        .dialog__content                — Content wrapper
          [data-embla="root"]
            [data-embla="viewport"]
              [data-embla="container"]
                .lightbox__slide[data-embla="slide"]
                  img                   — Full-size image
            button.embla-nav-btn--prev[data-embla="prev"]
            button.embla-nav-btn--next[data-embla="next"]
        button.lightbox__close          — command="close" icon

  Data attributes:
    data-columns="2|3|4|5"             — Gallery column count (default: 3)

  Requires: embla.js (carousel auto-init via data attributes)
  Note: NO JavaScript required for open/close. Uses Invoker Commands API.
  ─────────────────────────────────────────────────────────────────────────────
*/

const html = /* html */ `
<!-- Lightbox START -->
<div class="lightbox" data-columns="3">
  <button class="lightbox__trigger" type="button" command="show-modal" commandfor="lightbox-1" data-embla-start="0">
    <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" alt="Mountain landscape" loading="lazy" />
  </button>
  <button class="lightbox__trigger" type="button" command="show-modal" commandfor="lightbox-1" data-embla-start="1">
    <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" alt="Valley with sunlight" loading="lazy" />
  </button>
  <button class="lightbox__trigger" type="button" command="show-modal" commandfor="lightbox-1" data-embla-start="2">
    <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=300&fit=crop" alt="Forest path" loading="lazy" />
  </button>
  <button class="lightbox__trigger" type="button" command="show-modal" commandfor="lightbox-1" data-embla-start="3">
    <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=300&fit=crop" alt="Waterfall in forest" loading="lazy" />
  </button>
  <button class="lightbox__trigger" type="button" command="show-modal" commandfor="lightbox-1" data-embla-start="4">
    <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=300&fit=crop" alt="Lake at sunset" loading="lazy" />
  </button>
  <button class="lightbox__trigger" type="button" command="show-modal" commandfor="lightbox-1" data-embla-start="5">
    <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=300&fit=crop" alt="Foggy forest" loading="lazy" />
  </button>

  <dialog id="lightbox-1" class="lightbox__dialog dialog" data-size="screen" closedby="any">
    <div class="dialog__content">
      <div data-embla="root" data-embla-loop="true">
        <div data-embla="viewport">
          <div data-embla="container">
            <div class="lightbox__slide" data-embla="slide">
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=900&fit=crop" alt="Mountain landscape" />
            </div>
            <div class="lightbox__slide" data-embla="slide">
              <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=900&fit=crop" alt="Valley with sunlight" />
            </div>
            <div class="lightbox__slide" data-embla="slide">
              <img src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1200&h=900&fit=crop" alt="Forest path" />
            </div>
            <div class="lightbox__slide" data-embla="slide">
              <img src="https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200&h=900&fit=crop" alt="Waterfall in forest" />
            </div>
            <div class="lightbox__slide" data-embla="slide">
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=900&fit=crop" alt="Lake at sunset" />
            </div>
            <div class="lightbox__slide" data-embla="slide">
              <img src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&h=900&fit=crop" alt="Foggy forest" />
            </div>
          </div>
        </div>
        <button class="lightbox__prev button" data-size="icon" data-variant="ghost" data-embla="prev" type="button" aria-label="Previous image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <polyline points="160 208 80 128 160 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
          </svg>
        </button>
        <button class="lightbox__next button" data-size="icon" data-variant="ghost" data-embla="next" type="button" aria-label="Next image">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
          </svg>
        </button>
      </div>
    </div>
    <button class="lightbox__close button" data-size="icon" data-variant="ghost" type="button" commandfor="lightbox-1" command="close" aria-label="Close lightbox">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"/>
        <line x1="200" y1="56" x2="56" y2="200" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
        <line x1="200" y1="200" x2="56" y2="56" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/>
      </svg>
    </button>
  </dialog>
</div>
<!-- Lightbox END -->
`;

export function Lightbox() {
  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
