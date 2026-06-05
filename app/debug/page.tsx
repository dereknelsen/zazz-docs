import Script from "next/script";

import { Accordion } from "@/app/zazz/components/accordion";
import { Badge } from "@/app/zazz/components/badge";
import { Button } from "@/app/zazz/components/button";
import { Dialog } from "@/app/zazz/components/dialog";
import { Popover } from "@/app/zazz/components/dropdown";
import { NavigationMenu } from "@/app/zazz/components/navigation-menu";
import { MobileMenu } from "@/app/zazz/components/mobile-menu";
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
import { Prose } from "@/app/zazz/components/prose";
import { Lightbox } from "@/app/zazz/components/lightbox";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  redirect("/docs");
}

export default function DebugPage() {
  return (
    <>
      <main className="flex flex-col w-full">
        <section className="hidden md:grid py-md">
          <div className="container grid">
            <NavigationMenu />
          </div>
        </section>
        <section className="grid md:hidden py-md">
          <div className="container grid">
            <MobileMenu />
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
          <div className="article grid">
            <Lightbox />
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
        <section className="grid py-xl border-t">
          <div className="article grid">
            <Prose />
          </div>
        </section>
      </main>

      {/* Popover polyfill */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@oddbird/popover-polyfill@latest"
        integrity="sha384-Gl/j23IcIIiDfqcDI5gpHCxd5EuslCYvs07HAw3KHGx5UcbxizoF/deDnkeEcFXW"
        crossOrigin="anonymous"
      />

      {/* Embla Carousel Scripts */}
      <Script
        src="https://unpkg.com/embla-carousel/embla-carousel.umd.js"
        integrity="sha384-XGqLM9+dJ+PFOMZn6IuZgRRIoxcAT5fx4eIZCx7K3O2Dj5RA7EOlJ3yOS8Jd+kiY"
        crossOrigin="anonymous"
      />
      <Script
        src="https://unpkg.com/embla-carousel-autoplay/embla-carousel-autoplay.umd.js"
        integrity="sha384-rs7pDLCh+QtEjJg2VChAoKZHaaz7apuon6rM57E3FdzC83xaJH4n9mQZn4E2s3f4"
        crossOrigin="anonymous"
      />
      <Script
        src="https://unpkg.com/embla-carousel-auto-scroll/embla-carousel-auto-scroll.umd.js"
        integrity="sha384-5x3y2MLuLA5c1LQceYM+lo59GGkQmLzQGzbuHhDUDbnOJkFeTl5jUSdBy3JehMcM"
        crossOrigin="anonymous"
      />
      <Script
        src="https://unpkg.com/embla-carousel-class-names/embla-carousel-class-names.umd.js"
        integrity="sha384-nZNIZhV6WSQVCeWMj8JFfOgQZyzPoGSTh0eohtAOu5aluevIpIblZcupMSdl/EEH"
        crossOrigin="anonymous"
      />
      <Script
        src="https://unpkg.com/embla-carousel-ssr/embla-carousel-ssr.umd.js"
        integrity="sha384-apu0WDHR0c+4Z5qNk7egPNoCxXkYq80e+Qh6xJ6f67S53mSyYdKE6tIeXxvKJ6x9"
        crossOrigin="anonymous"
      />

      {/* Zazz Scripts */}
      <Script src="/zazz/scripts/reveal.js" strategy="beforeInteractive" />
      <Script src="/zazz/scripts/utils.js" />
      <Script src="/zazz/scripts/embla.js" />
    </>
  );
}
