# eCommerce Page Patterns

Design pattern library for composing Zazz eCommerce pages. Each section has layout variants, implementation guidance, and archetype-specific notes. Not every page needs every section — select based on brand goals and conversion priorities.

> **🔍 Search Placement**: Search must always be present — either in the header (persistent) or prominently within the hero. Never bury search or make it secondary. On mobile, search can collapse to an icon that expands but must remain in the header or hero area.

---

## Header & Navigation

The global header appears on every page and anchors the browsing experience.

| Element              | Guidance                                                                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Logo**             | Left-aligned, links to homepage. Use appropriate size for brand prominence.                                                                                                                             |
| **Search**           | Prominent placement — either inline in header or as a hero-level feature. Icon + expandable input on mobile is acceptable. For catalog-heavy B2B sites, search may be the most-used navigation element. |
| **Navigation**       | Primary categories as horizontal links (desktop) or hamburger menu (mobile). Keep to 5-7 top-level items max. B2B sites with deep catalogs may use mega-menus with category thumbnails.                 |
| **Utility nav**      | Account, cart/quote cart, and wishlist icons. Cart should show item count badge. B2B sites: include "Sign In" / "Create Account" prominently — account creation IS conversion for gated commerce.       |
| **Announcement bar** | Optional thin banner above header for promotions, shipping thresholds, or alerts. Uses `--primary` or `--secondary` background.                                                                         |
| **Return link**      | For subsidiary storefronts: a link back to the parent corporate site (often top-left or in announcement bar area).                                                                                      |

---

## Hero Section

The first impression — establishes brand atmosphere and drives primary conversion action.

| Layout Option          | When to Use                                                                                                                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Full-bleed imagery** | Strong lifestyle photography, brand storytelling. Text overlay with headline + CTA.                                                                                                                                                            |
| **Split hero**         | Product on one side, messaging on other. Good for featured launches or seasonal campaigns.                                                                                                                                                     |
| **Video hero**         | Brand films, product demos. Autoplay muted with poster frame. Overlay text positioned asymmetrically — not centered. Use editorial taglines ("Old-world craft reimagined for contemporary spaces").                                            |
| **Carousel hero**      | Multiple campaigns or promotions. Limit to 3-5 slides max with clear navigation dots/arrows.                                                                                                                                                   |
| **Hotspot hero**       | Full-bleed lifestyle/project image with interactive `+` markers positioned over visible products. Each hotspot links to a product page. Combines storytelling imagery with immediate product discovery. Include an "Explore This Project" CTA. |
| **Search-first hero**  | For catalog-dense distributors: large search input as the hero's primary element, with category shortcuts below. Minimal imagery — function over atmosphere.                                                                                   |

- Hero headlines should use `text-display` or `text-h1` with optional serif-italic accent words
- Always include a primary CTA button (`.button` with `data-variant="primary"`)
- Search can be integrated directly into hero for catalog-heavy sites
- Mobile: Stack layout vertically, reduce image height, maintain CTA prominence
- For B2B: hero messaging often speaks to business outcomes ("Put you in control of your throughput") rather than lifestyle aspiration

---

## Featured Product Categories

Guides customers to browse by category — essential for large catalogs.

| Layout Option       | Description                                                                                                                                                                                                                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Carousel**        | Horizontal scroll of category cards. Good for 6+ categories. Include nav arrows and touch swipe.                                                                                                                                      |
| **Bento grid**      | Mixed-size tiles in a mosaic layout. Creates visual interest, highlights priority categories with larger tiles.                                                                                                                       |
| **Grid**            | Equal-size cards in 3-4 column grid. Clean and balanced, works well for 4-8 categories.                                                                                                                                               |
| **Banner stack**    | Full-width horizontal banners stacked vertically. Each banner = one category with imagery + text overlay.                                                                                                                             |
| **Tabbed showcase** | Horizontal tab bar revealing one category at a time with heading, description, gallery CTA, and supporting image. Compact — avoids overwhelming scroll. Best for 3-7 distinct product families (e.g., material types, service areas). |

- Each category card needs: image, category name, optional product count or tagline
- Use `--radius-lg` for cards, `--shadow-sm` on hover
- Link entire card (not just text) for better mobile tap targets
- Consider "Shop All" link at section end
- For large B2B catalogs: showing product count per category helps buyers gauge depth ("Boxes & Corrugated · 2,400+ products")

---

## Featured Products

Highlights specific products — new arrivals, bestsellers, or curated picks.

| Layout Option    | Description                                                                                   |
| ---------------- | --------------------------------------------------------------------------------------------- |
| **Carousel**     | Most common. Horizontal scroll with 4-6 visible products (desktop), 1-2 (mobile).             |
| **Grid**         | 3-4 column static grid. Good for smaller featured sets (4-8 products).                        |
| **Hero product** | Single product spotlight with large imagery and detailed callout. For launches or hero items. |

- Product cards include: image, product name, price (sale price styling if applicable), quick-add or wishlist action
- Use `--gap-sm` between cards
- Include section heading with optional "View All" link
- Consider adding product badges (New, Sale, Bestseller) using `badge` component

---

## New Arrivals / Just Dropped

- Typically carousel format, similar to Featured Products
- Section heading should emphasize newness: "Just In", "New Arrivals", "Fresh Drops"
- Consider date-based filtering for dynamic freshness
- Optional: "New" badge on product cards

---

## Bestsellers / Popular Products

- Carousel or grid format
- Can include "Bestseller" badges or ranking numbers (1, 2, 3...)
- Section heading: "Bestsellers", "Customer Favorites", "Top Picks"
- Pull from actual sales data when possible

---

## Sale / Promotional Section

| Layout Option         | Description                                                       |
| --------------------- | ----------------------------------------------------------------- |
| **Banner + products** | Full-width promotional banner followed by carousel of sale items. |
| **Grid with callout** | Sale products in grid with prominent discount callout card.       |
| **Countdown timer**   | For limited-time sales, include countdown component.              |

- Use `--secondary` or `--tertiary` for sale pricing and badges
- Strikethrough original prices, highlight discount percentage
- Clear "Shop Sale" CTA

---

## Trust Signals & Social Proof

| Element                    | Placement & Style                                                                                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Supplier/partner logos** | Horizontal row, muted (`--muted-foreground`) or grayscale. "Our Partners", "Trusted Brands", "Active Suppliers" heading. For distributors: emphasize supplier network size ("1,800+ active suppliers"). |
| **Customer reviews**       | Carousel of testimonial cards. Include star rating, customer name, company name, optional photo.                                                                                                        |
| **Ratings summary**        | Aggregate star rating with review count. Can appear near products or as standalone callout.                                                                                                             |
| **Trust badges**           | Security, payment, guarantee, certification icons. Often near footer or in checkout.                                                                                                                    |
| **Project gallery / UGC**  | Grid of completed project photos or customer installations. Links to case studies or product pages.                                                                                                     |
| **Team members**           | Photo grid or carousel of team members — signals real people and accessibility. Common for local/regional B2B.                                                                                          |

- Testimonials should feel authentic — real names, company names, specific product/project mentions
- Style quotes with serif-italic for editorial feel
- Keep logo rows subtle — they support trust without dominating
- For B2B: project photography and case studies are often more powerful than star ratings

---

## Benefits / Value Props

- Typically 3-5 items in a horizontal row
- Icon + short headline + optional description
- Common B2B props: Competitive Pricing, Expert Support, Fast Shipping, Custom Solutions, Dedicated Account Manager, Full-Service Department
- Common D2C props: Free shipping, Easy returns, Secure checkout, Quality guarantee
- Uses `--gap-md` spacing, icons sized to `--step-6` or `--step-8`
- Can appear below hero or above footer

---

## Brand Story / About Section

- Full-bleed section with `--shade-50` or `--primary-50` background
- Emotive imagery (founder, craftsmanship, heritage)
- Editorial headline with serif-italic accents
- Brief paragraph + "Learn More" link
- Keep concise on homepage — this is a teaser, not the full story
- For heritage brands: can include founding year, core values, or generational narrative
- Split layout works well: imagery on one side, story on the other

---

## Core Values / Heritage Grid

- 3-5 items in a responsive grid (3 columns desktop, stacked mobile)
- Each item: icon/illustration + heading (`text-h4` or `text-h5`) + brief paragraph
- Icons use `--primary` or brand color; sized to `--step-6` or `--step-8`
- Common values: Integrity, Quality, Safety, Customer Experience, Innovation, Reliability
- Section heading often community-oriented: "Let's Build Together", "Our Promise", "What Drives Us"
- Centered text alignment with generous vertical spacing (`--gap-md` between items)
- Optional: `--muted` background to visually distinguish from product-focused sections

---

## Brand Family / Sub-Brand Showcase

| Layout Option         | Description                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Brand grid**        | 3-4 column grid of brand cards. Each card: brand logo/image + positioning statement + "Browse [Brand]" link. |
| **Split feature**     | Larger featured brand with full description alongside a grid of secondary brands.                            |
| **Horizontal scroll** | Brand cards in a carousel format for 5+ brands.                                                              |

- Each brand should have: logo/wordmark, brief differentiating statement, CTA to that brand's collection
- For manufacturers with sub-brands: explain positioning ("Main brand for all lighting types" vs. "Promotional price points")
- Include product counts per brand when available to signal catalog depth
- Can also be used for "Collections" in studio-archetype sites — each collection as its own visual identity

---

## Craft / Process Storytelling

For brands where materials, manufacturing process, or artisan origin IS the value proposition.

- Full-bleed product photography at hero scale (single product, detail shot, or process image)
- Adjacent editorial text describing materials, techniques, or origin story
- Italic emphasis on craft terminology and material names for editorial texture
- This pattern can repeat multiple times on a page — each product family gets its own story moment
- Split layout: large image (60-70% width) + text (30-40% width), alternating sides
- Creates a gallery-exhibition feel — appropriate for editorial studio archetype
- Best for: artisan goods, custom manufacturing, premium materials, heritage processes

---

## Audience Segmentation

Helps different buyer personas find their path — common in B2B/B2C hybrid businesses.

- Typically 2-4 audience cards in a row
- Each card: lifestyle/persona image + heading ("Contractors", "Homeowners", "Architects", "Purchasing Managers") + aspirational CTA ("Advance Your Business", "Build Your Imagination")
- Cards link to audience-specific landing pages or filtered catalogs
- Uses `--radius-lg` for cards, generous image ratio (16:9 or 3:2)
- Section heading: "How Can We Help?", "Find Your Path", "Built for Your Business"
- Works as wayfinding for varied B2B audiences who have different needs from the same catalog

---

## Quote Request / Account CTA

Drives B2B-specific conversions — quote requests and account creation.

| Pattern                   | Description                                                                                                                                               |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Quote banner**          | Full-width `card-inverted` background with headline ("Need a Quote?"), brief value prop, and primary CTA button. Often mid-page between product sections. |
| **Account benefits card** | Lists specific account perks: Easy Checkout, Order History, Invoice Access, Shipment Tracking, Volume Pricing. Clear "Create Account" CTA.                |
| **Split CTA**             | Two CTAs side by side — one for quote request, one for account creation. Each with distinct heading and value prop.                                       |

- Quote request is often the #1 conversion action for B2B — give it prominence equal to or greater than "Add to Cart"
- Account benefits should be specific and tangible — not generic "Sign up for more"
- Can use `--primary` background for quote CTA, `--card` with border for account CTA
- Position mid-page (after categories/products) or just above footer

---

## Trade / Wholesale Program

- Visually distinguished with `--muted` or `--neutral-100` background band
- Left-label layout works well: "Trade Program" label on left, details on right
- Content: eligibility criteria, pricing benefits, dedicated support, application CTA
- Can include testimonial from existing trade partner
- Clear "Apply for Trade Account" or "Become a Customer" CTA button
- Keep requirements concise — bullet points, not paragraphs
- For manufacturers selling through distributors: explain the relationship clearly

---

## Catalog / Lookbook Downloads

- Split-section layout: CTA text on one half, catalog cover imagery on other
- Or: horizontal row of catalog covers with titles and download/browse links
- Common CTAs: "Browse Catalogs", "Download PDF", "Request Print Copy"
- Include seasonal or year identifiers on catalogs ("Spring 2026", "Q2 Catalog")
- For digital catalogs: link to flipbook viewer; for PDFs: include file size

---

## Showroom / Physical Location

- Full mid-page section (not just footer content) — signals legitimacy and invites visits
- Interior/exterior photography of the location
- Address, hours, phone number, "Get Directions" link
- Optional: "Book an Appointment" or "Schedule a Visit" CTA
- For multi-location businesses: card grid or map with location pins
- For service-area businesses: "Find a Location Near You" with search/zip lookup
- Uses `--gap-md` internal padding, can use left-label layout for editorial feel

---

## CTA Banner

| Placement           | Typically above footer, but can appear mid-page                              |
| ------------------- | ---------------------------------------------------------------------------- |
| **Newsletter**      | Email input + submit button. Value prop: "Get 10% off", "Early access", etc. |
| **Contact**         | Brief message + contact button. For B2B or high-consideration purchases.     |
| **App download**    | App store badges + phone mockup.                                             |
| **Loyalty program** | Sign-up CTA with benefits preview.                                           |

- Uses `--primary` or accent background for visual break
- Centered text, constrained width (`.article`)
- Single focused CTA — don't compete with multiple actions
- Include privacy/unsubscribe note for email signups

---

## Recently Viewed

- Carousel format, similar to Featured Products
- Only displays if customer has browsing history
- Heading: "Recently Viewed", "Pick Up Where You Left Off"
- Consider "Clear history" option for privacy

---

## Footer

| Element                | Guidance                                                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Navigation columns** | 3-4 columns of links: Shop, Help, Company, Connect. B2B sites with large catalogs may include full category taxonomy as an alternative sitemap. |
| **Newsletter**         | Can duplicate CTA banner signup if not placed above                                                                                             |
| **Social icons**       | Row of social media links                                                                                                                       |
| **Payment icons**      | Accepted payment methods                                                                                                                        |
| **Legal links**        | Privacy, Terms, Accessibility                                                                                                                   |
| **Copyright**          | Year + company name                                                                                                                             |
| **Location info**      | For businesses with showrooms: address, hours, contact. Can include multiple locations in columns.                                              |
| **Return/parent link** | For subsidiary storefronts: prominent link back to parent corporate site                                                                        |

**Footer variants by archetype:**

- **Distributor:** Dark footer (`--neutral-900` or `--neutral-950`), full category taxonomy in columns, customer service phone/email prominently displayed
- **Lifestyle Brand:** Dark or light footer, balanced nav columns, brand story teaser, newsletter signup
- **Editorial Studio:** Minimal footer — contact info, physical location(s) with hours, social links, newsletter. Often lighter/simpler than typical eCommerce footers

---

## Section Rhythm Guidelines

Alternate section types for visual rhythm. Typical flows by archetype:

**Industrial Distributor:**
Hero (search-first) → Categories (grid/bento) → Featured Products/Brands → Quote Request CTA → Account Benefits → Footer (mega-nav)

**Lifestyle Brand:**
Hero (carousel/full-bleed) → Categories (grid/tabbed) → Featured Products → Brand Family → Trust Signals → Brand Story → CTA Banner → Footer

**Editorial Studio:**
Hero (video/hotspot) → Catalog (grid with counts) → Craft Story → Featured Product → Craft Story → Trade Program → Collections → Showroom → Newsletter → Footer (minimal)

**Prioritize sections based on:**
- Archetype and visual personality
- Catalog size (larger = stronger category nav + search)
- Business model (B2B = quote/account CTAs; D2C = cart flows)
- Brand maturity (new = more trust signals; established = heritage)
- Conversion goals (account creation, quotes, newsletter, or purchase)

Use `--gap-xl` (6rem) between major sections. Use `1px solid var(--border)` for lighter separation in editorial layouts.
