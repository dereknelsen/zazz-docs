import Link from "next/link";
import { Logo } from "@/components/logo";
import ZazzLineartBg from "@/components/zazz-lineart-bg";

const links = [
  { label: "Read the docs", href: "/docs", external: false },
  { label: "Theme builder", href: "/theme", external: false },
  { label: "Foundations / tokens", href: "/docs/foundations", external: false },
  { label: "Primitives", href: "/docs/primitives", external: false },
  {
    label: "Figma kit",
    href: "https://www.figma.com/community/file/1468718708506413296/zazz-v0-4-3",
    external: true,
  },
  {
    label: "Webflow kit",
    href: "https://webflow.com/made-in-webflow/website/zazz-webflow-kit",
    external: true,
  },
] as const;

function Arrow() {
  return (
    <svg className="home__link-arrow" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3.5 10.5L10.5 3.5M10.5 3.5H4.6M10.5 3.5V9.4"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="home">
      <ZazzLineartBg className="home__bg" preserveAspectRatio="xMidYMid slice" aria-hidden />

      <div className="home__inner">
        <Logo variant="lockup" className="home__logo" />

        <p className="home__meta">v0.4.4 · A design framework</p>

        <ul className="home__links">
          {links.map((l) =>
            l.external ? (
              <a
                key={l.label}
                className="home__link"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Arrow />
                <span>{l.label}</span>
              </a>
            ) : (
              <Link key={l.label} className="home__link" href={l.href}>
                <Arrow />
                <span>{l.label}</span>
              </Link>
            ),
          )}
        </ul>

        <h1 className="home__title">
          <span className="home__title-line">Zazz</span>
          <span className="home__title-line">Design</span>
          <span className="home__title-line">Framework</span>
        </h1>

        <div className="home__footer">
          <span>
            Designed and maintained by{" "}
            <a
              className="home__footer-link"
              href="https://github.com/dereknelsen"
              target="_blank"
              rel="noopener noreferrer"
            >
              Derek Nelsen
            </a>
          </span>
          <span>v0.4.4</span>
        </div>
      </div>
    </div>
  );
}
