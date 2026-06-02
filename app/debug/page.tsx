import { Accordion } from "@/app/zazz/components/accordion";
import { Badge } from "@/app/zazz/components/badge";
import { Button } from "@/app/zazz/components/button";
import { Dialog } from "@/app/zazz/components/dialog";
import { Popover } from "@/app/zazz/components/dropdown";
import { Form } from "@/app/zazz/components/form";
import { NavigationMenu } from "@/app/zazz/components/navigation-menu";
import { redirect } from "next/navigation";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  redirect("/docs");
}

export default function DebugPage() {
  return (
    <main className="flex flex-col w-full">
      <section className="grid py-xl">
        <div className="container grid">
          <NavigationMenu />
        </div>
      </section>
      <section className="grid py-xl border-t">
        <div className="article grid">
          <Accordion />
        </div>
      </section>
      <section className="grid py-xl border-t">
        <div className="article grid justify-start">
          <Popover />
        </div>
      </section>
      <section className="grid py-xl border-t gap-lg">
        <div className="article grid grid-cols-2 gap-sm">
          <Button />
          <Badge />
        </div>
      </section>
      <section className="grid py-xl border-t">
        <div className="article flex flex-col items-start">
          <Dialog />
        </div>
      </section>
      <section className="grid py-xl border-t">
        <div className="article grid">
          <Form />
        </div>
      </section>
    </main>
  );
}
