/*
  LIGHTBOX — .lightbox
  ─────────────────────────────────────────────────────────────────────────────
  Element:   Inline gallery + fullscreen dialog slideshow
  Gallery:   Main Embla carousel + linked thumb strip
  Opening:   Invoker Commands API — slide buttons with command="show-modal"
  Closing:   closedby="any" (backdrop click) + button[command="close"]
  Slideshow: Embla Carousel inside gallery and dialog (auto-initialized by embla.js)

  Structure:
    .lightbox                           — Gallery + dialog wrapper
      .lightbox__gallery                — Inline product-style gallery
        .lightbox__stage[data-embla=root]
          [data-embla="viewport"]       — Main image carousel
            button.lightbox__slide      — Clickable slide (opens dialog)
          .lightbox__thumbs[data-embla=thumbs]
            button.lightbox__thumbs-prev/next  — Main carousel nav
            [data-embla="viewport"]     — Thumb strip carousel
              button.lightbox__thumb    — Thumb slide buttons
      dialog.lightbox__dialog.dialog    — Fullscreen dark overlay
        .dialog__content
          [data-embla="root"]
            [data-embla="viewport"]     — Full-size slides
            button.lightbox__prev/next
            .lightbox__thumbs[data-embla=thumbs]
        button.lightbox__close

  Requires: embla.js (carousel + thumb sync via data attributes)
  Note: Gallery slides are <button command="show-modal"> — Embla only fires
        click on non-drag interactions, so swipe and click coexist cleanly.
  ─────────────────────────────────────────────────────────────────────────────
*/

const slides = [
  {
    alt: "Mountain landscape",
    id: "1506905925346-21bda4d32df4",
  },
  {
    alt: "Valley with sunlight",
    id: "1469474968028-56623f02e42e",
  },
  {
    alt: "Forest path",
    id: "1447752875215-b2761acb3c5d",
  },
  {
    alt: "Waterfall in forest",
    id: "1433086966358-54859d0ed716",
  },
  {
    alt: "Lake at sunset",
    id: "1501785888041-af3ef285b470",
  },
  {
    alt: "Foggy forest",
    id: "1470071459604-3b5ec3a7fe05",
  },
] as const;

function thumbSlide(index: number, slide: (typeof slides)[number]) {
  return /* html */ `
    <button type="button" class="lightbox__thumb" data-embla="slide" aria-label="Show image ${index + 1}">
      <img
        sizes="auto"
        src="https://images.unsplash.com/photo-${slide.id}?w=228&h=171&fit=crop"
        srcset="https://images.unsplash.com/photo-${slide.id}?w=228&h=171&fit=crop 228w,
        https://images.unsplash.com/photo-${slide.id}?w=456&h=342&fit=crop 456w"
        alt="${slide.alt}"
        loading="lazy"
        width="228"
        height="171"
      />
    </button>`;
}

function gallerySlide(slide: (typeof slides)[number]) {
  return /* html */ `
    <button class="lightbox__slide" data-embla="slide" type="button" command="show-modal" commandfor="lightbox-1">
      <img
        sizes="(max-width: 40rem) 100vw, 800px"
        src="https://images.unsplash.com/photo-${slide.id}?w=800&h=600&fit=crop"
        srcset="https://images.unsplash.com/photo-${slide.id}?w=456&h=342&fit=crop 456w,
        https://images.unsplash.com/photo-${slide.id}?w=800&h=600&fit=crop 800w"
        alt="${slide.alt}"
        loading="lazy"
        width="800"
        height="600"
      />
    </button>`;
}

function dialogSlide(slide: (typeof slides)[number]) {
  return /* html */ `
    <div class="lightbox__slide" data-embla="slide">
      <img
        sizes="(max-width: 40rem) 100vw, 800px"
        src="https://images.unsplash.com/photo-${slide.id}?w=800&h=600&fit=crop"
        srcset="https://images.unsplash.com/photo-${slide.id}?w=456&h=342&fit=crop 456w,
        https://images.unsplash.com/photo-${slide.id}?w=800&h=600&fit=crop 800w"
        alt="${slide.alt}"
        width="800"
        height="600"
      />
    </div>`;
}

const thumbsMarkup = slides.map((slide, index) => thumbSlide(index, slide)).join("");
const gallerySlidesMarkup = slides.map(gallerySlide).join("");
const dialogSlidesMarkup = slides.map(dialogSlide).join("");

const thumbsPrevButton = /* html */ `
  <button
    class="lightbox__thumbs-prev button"
    data-size="icon-sm"
    data-variant="ghost"
    data-embla="prev"
    type="button"
    aria-label="Previous image"
  >
    <svg class="size-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
      <rect width="256" height="256" fill="none"/>
      <polyline points="160 208 80 128 160 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/>
    </svg>
  </button>`;

const thumbsNextButton = /* html */ `
  <button
    class="lightbox__thumbs-next button"
    data-size="icon-sm"
    data-variant="ghost"
    data-embla="next"
    type="button"
    aria-label="Next image"
  >
    <svg class="size-sm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
      <rect width="256" height="256" fill="none"/>
      <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/>
    </svg>
  </button>`;

const galleryThumbsMarkup = /* html */ `
  ${thumbsPrevButton}
  <div data-embla="viewport">
    <div data-embla="container">
      ${thumbsMarkup}
    </div>
  </div>
  ${thumbsNextButton}`;

const html = /* html */ `
<!-- Lightbox START -->
<div class="lightbox">
  <div class="lightbox__gallery">
    <div class="lightbox__stage" data-embla="root" data-embla-classnames>
      <div data-embla="viewport">
        <div data-embla="container">
          ${gallerySlidesMarkup}
        </div>
      </div>
      <div
        class="lightbox__thumbs"
        data-embla="thumbs"
        data-embla-thumbs-contain-scroll="keepSnaps"
        data-embla-thumbs-drag-free="true"
      >
        ${galleryThumbsMarkup}
      </div>
    </div>
  </div>

  <dialog id="lightbox-1" class="lightbox__dialog dialog dark" data-size="screen" closedby="any">
    <div class="dialog__content">
      <div data-embla="root" data-embla-loop="true" data-embla-classnames>
        <div data-embla="viewport">
          <div data-embla="container">
            ${dialogSlidesMarkup}
          </div>
        </div>
        <button class="lightbox__prev button size-auto text-muted-foreground hover:text-foreground" data-size="icon" data-variant="ghost" data-embla="prev" type="button" aria-label="Previous image">
          <svg class="size-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <polyline points="160 208 80 128 160 48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/>
          </svg>
        </button>
        <button class="lightbox__next button size-auto text-muted-foreground hover:text-foreground" data-size="icon" data-variant="ghost" data-embla="next" type="button" aria-label="Next image">
          <svg class="size-md" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/>
          </svg>
        </button>
        <div
          class="lightbox__thumbs"
          data-embla="thumbs"
          data-embla-thumbs-contain-scroll="keepSnaps"
          data-embla-thumbs-drag-free="true"
        >
          <div data-embla="viewport">
            <div data-embla="container">
              ${thumbsMarkup}
            </div>
          </div>
        </div>
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
