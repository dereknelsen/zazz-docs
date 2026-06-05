import "@/app/zazz/styles/load";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debug",
  description: "Debug page for testing components.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
