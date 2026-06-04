import "@/app/zazz/styles/load";
import Script from "next/script";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    {children}

    {/* Embla Carousel Scripts */}
    <Script src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"></Script>
    <Script src="https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js"></Script>
    <Script src="https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js"></Script>
    <Script src="https://unpkg.com/embla-carousel-class-names/embla-carousel-class-names.umd.js"></Script>
    <Script src="https://unpkg.com/embla-carousel-ssr/embla-carousel-ssr.umd.js"></Script>

    {/* Zazz Scripts */}
    <Script src="/zazz/scripts/reveal.js" strategy="beforeInteractive" />
    <Script src="/zazz/scripts/utils.js" strategy="beforeInteractive" />
    <Script src="/zazz/scripts/embla.js" strategy="beforeInteractive" />
  </>;
}
