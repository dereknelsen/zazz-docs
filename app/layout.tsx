import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
