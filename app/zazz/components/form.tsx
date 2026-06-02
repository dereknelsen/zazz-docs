"use client";

import { useEffect } from "react";

/*
  FORM FIELDS — .input · .textarea · .select · .input-group · checkbox · switch · .radio
  ─────────────────────────────────────────────────────────────────────────────
  A family of native form controls styled from Zazz tokens. No JavaScript drives
  behaviour — the browser handles validation, the customizable <select> picker,
  field-sizing growth, and checked/indeterminate states. (The lone effect below
  only sets the demo checkbox's `indeterminate` DOM property, which has no HTML
  attribute equivalent; it is not interaction logic.)

  Controls
    .input            — every text-like type (text, email, tel, url, search,
                        password, number, date, …). The type only swaps the
                        keyboard/picker; the box is identical.
    .textarea         — auto-grows via `field-sizing: content`, clamped 3–12 lines.
    .select           — customizable <select> (`appearance: base-select`): a
                        <button><selectedcontent></button> trigger + styled
                        ::picker(select), options, ::picker-icon, ::checkmark.
                        Degrades to the native OS dropdown where unsupported.
    .input-group      — one bordered shell fusing an input with addons/buttons;
                        __addon holds leading/trailing icons or text.
    checkbox / switch — native input[type="checkbox"] / input[role="switch"];
                        appearance: none redraws. Checkbox fills with --primary plus
                        a check / dash glyph; switch is a pill track with a gradient
                        knob that slides on :checked.
    .radio            — appearance: none redraws; checked dot via radial-gradient.

  Validation
    Wrap a control in .field with a .field__error; :user-invalid reveals the
    message only after the user commits (blur/submit), not while typing.
  ─────────────────────────────────────────────────────────────────────────────
*/

// Markup is authored as raw HTML so the docs mirror the vanilla markup exactly.
const html = /* html */ `
<!-- Form fields START -->
<div class="flex flex-col gap-lg w-full">

  <!-- INPUTS — text-like types all share .input -->
  <div class="flex flex-col gap-sm">
    <span class="text-eyebrow text-muted-foreground">Inputs</span>
    <div class="grid grid-cols-2 gap-sm">
      <div class="field">
        <label class="field__label" for="f-name">Name</label>
        <input class="input" id="f-name" type="text" placeholder="Ada Lovelace" />
      </div>
      <div class="field">
        <label class="field__label" for="f-email">Email</label>
        <input class="input" id="f-email" type="email" required placeholder="you@example.com" autocomplete="email" aria-describedby="f-email-hint" />
        <span class="field__hint" id="f-email-hint">We'll only use this to send receipts.</span>
        <span class="field__error" role="alert">Please enter a valid email address.</span>
      </div>
      <div class="field">
        <label class="field__label" for="f-phone">Phone</label>
        <input class="input" id="f-phone" type="tel" placeholder="+1 (555) 012-3456" />
      </div>
      <div class="field">
        <label class="field__label" for="f-date">Date</label>
        <input class="input" id="f-date" type="date" />
      </div>
    </div>
  </div>

  <!-- INPUT GROUPS — control + addons (data-align), shadcn composition.
       Addons come AFTER the control in the DOM; data-align positions them. -->
  <div class="flex flex-col gap-sm">
    <span class="text-eyebrow text-muted-foreground">Input groups</span>

    <!-- Leading icon + trailing icon-button.
         <label> wrapper: clicking a non-interactive addon focuses the input. -->
    <label class="input-group">
      <input class="input" type="search" placeholder="Placeholder" aria-label="Search" />
      <span class="input-group__addon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <rect width="256" height="256" fill="none" />
          <circle cx="112" cy="112" r="80" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
          <line x1="168.57" y1="168.57" x2="224" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
        </svg>
      </span>
      <span class="input-group__addon" data-align="inline-end">
        <button class="button" data-variant="ghost" data-size="icon-sm" type="button" aria-label="Submit search">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none" />
            <polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
          </svg>
        </button>
      </span>
    </label>

    <!-- Leading text addon + trailing button -->
    <label class="input-group">
      <input class="input" type="url" placeholder="zazz.design" aria-label="Website" />
      <span class="input-group__addon">
        <span class="input-group__text">https://</span>
      </span>
      <span class="input-group__addon" data-align="inline-end">
        <button class="button" data-variant="muted" data-size="sm" type="button">Save</button>
      </span>
    </label>

    <!-- Textarea with a toolbar docked below it (block-end) -->
    <label class="input-group">
      <textarea id="f-prompt" class="textarea" placeholder="Ask anything…" aria-label="Prompt"></textarea>
      <span class="input-group__addon" data-align="block-end">
        <button class="button ml-auto" type="button">
          <span>Send</span> <kbd>↵</kbd>
        </button>
      </span>
    </label>
  </div>

  <!-- SELECT — customizable <select>, styled trigger + picker -->
  <div class="flex flex-col gap-sm">
    <span class="text-eyebrow text-muted-foreground">Select</span>
    <div class="field">
      <label class="field__label" for="f-sort">Sort by</label>
      <select class="select" id="f-sort" name="sort">
        <button>
          <selectedcontent></selectedcontent>
        </button>
        <option value="recent" selected>Most recent</option>
        <option value="popular">Most popular</option>
        <option value="price-asc">Price: low to high</option>
        <option value="price-desc">Price: high to low</option>
      </select>
    </div>
  </div>

  <!-- TEXTAREA — auto-resizing -->
  <div class="flex flex-col gap-sm">
    <span class="text-eyebrow text-muted-foreground">Textarea</span>
    <div class="field">
      <label class="field__label" for="f-message">Message</label>
      <textarea class="textarea" id="f-message" placeholder="Your message"></textarea>
    </div>
  </div>

  <!-- SWITCHES -->
  <div class="flex flex-col gap-sm">
    <span class="text-eyebrow text-muted-foreground">Switches</span>
    <div class="flex flex-col gap-xs">
      <label class="field" data-inline>
        <input type="checkbox" role="switch" />
        <span class="field__label">Email notifications</span>
      </label>
      <label class="field" data-inline>
        <input type="checkbox" role="switch" checked />
        <span class="field__label">Two-factor authentication</span>
      </label>
    </div>
  </div>

  <!-- CHECKBOXES — unchecked, checked, indeterminate -->
  <div class="flex flex-col gap-sm">
    <span class="text-eyebrow text-muted-foreground">Checkboxes</span>
    <div class="flex flex-col gap-xs">
      <label class="field" data-inline>
        <input type="checkbox" />
        <span class="field__label">Subscribe to the newsletter</span>
      </label>
      <label class="field" data-inline>
        <input type="checkbox" checked />
        <span class="field__label">Accept terms &amp; conditions</span>
      </label>
      <label class="field" data-inline>
        <!-- indeterminate has no HTML attribute — set it in JS: el.indeterminate = true -->
        <input type="checkbox" id="f-select-all" />
        <span class="field__label">Select all (some selected)</span>
      </label>
    </div>
  </div>

  <!-- RADIOS — grouped by name -->
  <div class="flex flex-col gap-sm">
    <fieldset class="radio-group">
      <legend class="text-eyebrow text-muted-foreground mb-xs">Radios</legend>
      <label class="field" data-inline>
        <input class="radio" type="radio" name="plan" value="monthly" />
        <span class="field__label">Monthly billing</span>
      </label>
      <label class="field" data-inline>
        <input class="radio" type="radio" name="plan" value="annual" checked />
        <span class="field__label">Annual billing</span>
      </label>
    </fieldset>
  </div>

</div>
<!-- Form fields END -->
`;

export function Form() {
  // `indeterminate` is a DOM property with no HTML attribute, so it can't live in
  // the markup above — set it after mount, exactly as you would in vanilla JS.
  useEffect(() => {
    const checkbox = document.getElementById("f-select-all") as HTMLInputElement | null;
    if (checkbox) checkbox.indeterminate = true;
  }, []);

  return <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />;
}
