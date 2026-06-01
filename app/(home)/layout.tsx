import "@/app/global.css";
import "./home.css";

export default function Layout({ children }: LayoutProps<"/">) {
  return <>{children}</>;
}
