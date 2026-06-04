import { Accordion } from "@/app/zazz/components/accordion";
import { Badge } from "@/app/zazz/components/badge";
import { Button } from "@/app/zazz/components/button";
import { Dialog } from "@/app/zazz/components/dialog";
import { Popover } from "@/app/zazz/components/dropdown";
import { NavigationMenu } from "@/app/zazz/components/navigation-menu";
import { redirect } from "next/navigation";
import { DialogForm } from "@/app/zazz/components/dialog-form";
import { DialogAlert } from "@/app/zazz/components/dialog-alert";
import { Tabs } from "@/app/zazz/components/tabs";
import { Input } from "@/app/zazz/components/input";
import { InputGroup } from "@/app/zazz/components/input-group";
import { Password } from "@/app/zazz/components/password-group";
import { Select } from "@/app/zazz/components/select";
import { Textarea } from "@/app/zazz/components/textarea";
import { Checkbox } from "@/app/zazz/components/checkbox";
import { Switch } from "@/app/zazz/components/switch";
import { Radio } from "@/app/zazz/components/radio";

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
          <Tabs />
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
        <div className="article flex gap-xs items-center">
          <Dialog />
          <DialogForm />
          <DialogAlert />
        </div>
      </section>
      <section className="grid py-xl border-t">
        <div className="article grid">
          <div className="flex flex-col gap-sm w-full">
            <Input />
            <hr className="my-sm" />
            <InputGroup />
            <hr className="my-sm" />
            <Password />
            <hr className="my-sm" />
            <Select />
            <hr className="my-sm" />
            <Textarea />
            <hr className="my-sm" />
            <Checkbox />
            <hr className="my-sm" />
            <Switch />
            <hr className="my-sm" />
            <Radio />
          </div>
        </div>
      </section>
    </main>
  );
}
