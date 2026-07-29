# HER COLLAB — PROJECT STYLE MAP

## 1. Purpose
This document serves as the central, human-readable maintenance map for the HER COLLAB web platform. It provides a direct guide for non-developers making content or design adjustments and serves as architectural context for future coding agents.

This document applies exclusively to the four public micro-pages: `index.html`, `solutions.html`, `partners.html`, and `investors.html`, along with their shared CSS, JS, and public modules.

> **Notice:** The Gatekeeper system (`gatekeeper.html` and all restricted area assets) is frozen and explicitly excluded from this map.

---

## 2. Quick Editing Guide
Use this guide to instantly find where to edit common visual and functional attributes.

| I want to change... | Change this file | Selector / Variable / Module | Purpose / Notes |
| :--- | :--- | :--- | :--- |
| **Global accent colour** | `css/global.css` | `--color-accent` | Primary brand accent colour used across components. |
| **Main background** | `css/global.css` | `:root` → `--color-bg-main`, `body` | Main site-wide background colour. |
| **Main text colour** | `css/global.css` | `:root` → `--color-text-main`, `body` | Base body text color. |
| **Muted text colour** | `css/global.css` | `:root` → `--color-text-muted` | Subtitles, secondary labels, metadata text. |
| **Border colour** | `css/global.css` | `:root` → `--color-border-main` | Shared card, container, and frame borders. |
| **Main font** | `css/global.css` | `:root` → `--font-family-base` | Primary body typography stack. |
| **Main display heading** | `css/global.css` | `.display-heading`, `.hero-title` | Hero and main landing titles. |
| **Section heading** | `css/global.css` | `.section-title`, `h2` | Page section header typography. |
| **Card title** | `css/global.css` | `.card-title`, `.feature-card-title` | Header text inside content cards. |
| **Body text** | `css/global.css` | `body`, `p` | Default body copy styling. |
| **Shared frame** | `css/global.css` | `.shared-frame`, `.content-wrapper` | Outer structural container framing. |
| **Primary button** | `css/global.css` | `.btn-primary` | Main call-to-action button styling. |
| **Secondary button** | `css/global.css` | `.btn-secondary` | Secondary action button styling. |
| **Global navigation** | `css/global.css`, `js/shell.js` | `header.site-header`, `.nav-link` | Global header header bar and links. |
| **Solutions cards** | `css/global.css` | `.solutions-card`, `.solution-item` | Feature & offering grid cards on Solutions page. |
| **Partners cards** | `css/global.css` | `.partner-card`, `.partner-profile` | Entity/partner showcase cards on Partners page. |
| **Investors components**| `css/global.css` | `.investor-card`, `.metrics-block` | Capital & investor metrics displays. |
| **Asset Slot** | `js/asset-slot.js` | `[data-asset-slot]` | Dynamic media slot loader and placeholder engine. |

---

## 3. Project Structure
High-level overview of the public site directory layout and responsibilities:

```
hercollab-agency/
├── index.html            # Main landing page for HER COLLAB
├── solutions.html        # Solutions & Services breakdown page
├── partners.html         # Network & Strategic Partners directory page
├── investors.html        # Investor relations & financial metrics page
├── PROJECT_STYLE_MAP.md  # Central human-readable maintenance & architecture map
├── css/
│   └── global.css       # Unified design tokens, global reset, and component styles
└── js/
    ├── shell.js          # Global header, navigation, and mobile menu toggle controller
    └── asset-slot.js     # Reusable dynamic asset loader for image/slot rendering
```

---

## 4. Design Tokens

### Colours
Defined in `css/global.css → :root`:
* `--color-bg-main`: Base background colour.
* `--color-surface`: Container & card background colour.
* `--color-text-main`: Primary high-contrast text colour.
* `--color-text-muted`: Low-contrast secondary/subtitle text colour.
* `--color-accent`: Core brand accent colour.
* `--color-border-main`: Shared border and dividing line colour.

### Typography
* `font-family`: Inherited custom font stack defined on `:root` / `body`.
* `base-font-size`: `16px` (`1rem`).
* `major-heading-sizes`: `2.25rem` to `3rem` (`h1`), `1.75rem` to `2rem` (`h2`).
* `body-text`: `1rem` with `1.5` line-height.
* `small-text`: `0.875rem` (`small`, `.meta-text`).

### Spacing & Layout
* Layout max width: `1200px`.
* Container padding: `1.5rem` mobile / `3rem` desktop.
* Card gap spacing: `1.5rem` to `2rem`.

### Borders / Radius / Shadows
* `--radius-sm`: `4px`
* `--radius-md`: `8px`
* `--radius-lg`: `16px`
* `--shadow-card`: `0 4px 12px rgba(0, 0, 0, 0.08)`

---

## 5. Typography Map

| Visual role | CSS class / selector | File | Purpose | Notes / Status |
| :--- | :--- | :--- | :--- | :--- |
| **Display Heading** | `.display-heading`, `.hero-title` | `css/global.css` | Main landing page hero headline | Standard |
| **Section Heading** | `.section-title`, `.solutions-title` | `css/global.css` | Section header across pages | `RENAME CANDIDATE` (`.solutions-title`) |
| **Card Title** | `.card-title`, `.partner-headline` | `css/global.css` | Title inside component cards | `RENAME CANDIDATE` (`.partner-headline`) |
| **Body Text** | `body`, `p` | `css/global.css` | Standard copy across all pages | Standard |
| **Muted Text** | `.text-muted`, `.small-grey-text` | `css/global.css` | Subtext and captions | `RENAME CANDIDATE` (`.small-grey-text`) |
| **Accent Text** | `.text-accent` | `css/global.css` | Highlighted inline text spans | Standard |

---

## 6. Component Map

| Component | CSS class / selector | CSS location | JS dependency | Used on | Scope / Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary Button** | `.btn-primary` | `css/global.css` | None | All public pages | Globally Reusable |
| **Secondary Button**| `.btn-secondary` | `css/global.css` | None | All public pages | Globally Reusable |
| **Shared Frame** | `.shared-frame`, `.partners-frame` | `css/global.css` | None | All public pages | `RENAME CANDIDATE` (`.partners-frame`) |
| **Content Card** | `.card`, `.solutions-card` | `css/global.css` | None | `solutions.html`, `index.html` | Page-Specific Duplication Candidate |
| **Partner Card** | `.partner-card` | `css/global.css` | None | `partners.html` | Page-Specific |
| **Investor Block** | `.investor-card` | `css/global.css` | None | `investors.html` | Page-Specific |
| **Asset Slot** | `[data-asset-slot]` | `css/global.css` | `js/asset-slot.js` | All public pages | Reusable Module |

---

## 7. JavaScript Map

| Behaviour | File | Scope | Purpose |
| :--- | :--- | :--- | :--- |
| **Global navigation** | `js/shell.js` | Global | Controls header state, active link styling, mobile toggle. |
| **Page navigation** | `js/shell.js` | Global / Page | Handles smooth scroll and anchor targeting. |
| **Asset Slot** | `js/asset-slot.js` | Reusable component | Injects and renders dynamic media slot assets. |
| **Solutions interaction** | Inline / `js/shell.js` | Page-specific | Collapsible feature items and modal interactions. |
| **Partners interaction** | Inline / `js/shell.js` | Page-specific | Partner filter and tab selectors. |
| **Investors interaction** | Inline / `js/shell.js` | Page-specific | Financial metrics / data toggle displays. |

---

## 8. Page Map

### INDEX (`index.html`)
* **Major Sections:** Hero Banner, Overview Summary, Featured Solutions Teaser, Call to Action.
* **Reusable Components Used:** Primary Button, Secondary Button, Shared Frame, Global Header/Footer, Asset Slot.
* **Page-Specific Components:** Hero grid container.
* **Dependencies:** `css/global.css`, `js/shell.js`, `js/asset-slot.js`.

### SOLUTIONS (`solutions.html`)
* **Major Sections:** Header Title, Solutions Grid, Feature Details, Contact CTA.
* **Reusable Components Used:** Shared Frame, Solutions Card, Primary Button, Asset Slot.
* **Page-Specific Components:** Solution breakdown cards.
* **Dependencies:** `css/global.css`, `js/shell.js`, `js/asset-slot.js`.

### PARTNERS (`partners.html`)
* **Major Sections:** Partner Hero, Network Ecosystem Grid, Strategic Alignment Callout.
* **Reusable Components Used:** Shared Frame, Partner Card, Asset Slot.
* **Page-Specific Components:** `.partners-frame`, `.partner-card`.
* **Dependencies:** `css/global.css`, `js/shell.js`, `js/asset-slot.js`.

### INVESTORS (`investors.html`)
* **Major Sections:** Investor Overview, Metrics & Highlights, Governance & Contact.
* **Reusable Components Used:** Shared Frame, Investor Card, Primary Button, Asset Slot.
* **Page-Specific Components:** `.investor-card`, `.metrics-block`.
* **Dependencies:** `css/global.css`, `js/shell.js`, `js/asset-slot.js`.

---

## 9. Naming Review

| Current class | Suggested future name | Reason |
| :--- | :--- | :--- |
| `.solutions-title` | `.section-title--solutions` | Content-specific section title class. |
| `.partners-frame` | `.shared-frame--partners` | Page-context-bound variation of generic frame. |
| `.partner-headline` | `.card-title--partner` | Content-bound title class. |
| `.small-grey-text` | `.text-muted-sm` | Colour/appearance-based name instead of semantic role. |

---

## 10. Consolidation Opportunities

1. **Card Component Styling:**
   * *Current Situation:* `.solutions-card`, `.partner-card`, and `.investor-card` duplicate base container padding, background tokens, and border-radius rules.
   * *Suggested Consolidation:* Unify under base `.card` with BEM modifiers (`.card--solution`, `.card--partner`, `.card--investor`).
   * *Priority:* `HIGH`

2. **Frame Outer Wrappers:**
   * *Current Situation:* `.partners-frame` duplicates `.shared-frame` layout rules.
   * *Suggested Consolidation:* Standardize all section frames under `.shared-frame`.
   * *Priority:* `MEDIUM`

3. **Text Muted Utility Classes:**
   * *Current Situation:* Mixed usage of `.small-grey-text` and `.text-muted`.
   * *Suggested Consolidation:* Standardize on `.text-muted` with typography size modifiers.
   * *Priority:* `LOW`

---

## 11. Manual Editing Guide

* **Global background?** `css/global.css` → `:root` (`--color-bg-main`) → Set main site background.
* **Accent colour?** `css/global.css` → `:root` (`--color-accent`) → Change brand highlight colour.
* **Main text colour?** `css/global.css` → `:root` (`--color-text-main`) → Base text colour.
* **Muted text?** `css/global.css` → `:root` (`--color-text-muted`) → Secondary subtext colour.
* **Main heading?** `css/global.css` → `.display-heading` / `.hero-title` → Hero title typography.
* **Section heading?** `css/global.css` → `.section-title` → Section title styling.
* **Card text?** `css/global.css` → `.card-title`, `.card p` → Card header and paragraph styling.
* **Shared frame?** `css/global.css` → `.shared-frame` → Container wrapper styling.
* **Frame border?** `css/global.css` → `:root` (`--color-border-main`) → Container border colour.
* **Primary button?** `css/global.css` → `.btn-primary` → Main CTA styling.
* **Secondary button?** `css/global.css` → `.btn-secondary` → Secondary CTA styling.
* **Global navigation?** `css/global.css` → `.site-header`, `.nav-link` → Header styling.
* **Solutions cards?** `css/global.css` → `.solutions-card` → Solutions grid item card styling.
* **Partners cards?** `css/global.css` → `.partner-card` → Partner item card styling.
* **Investors components?** `css/global.css` → `.investor-card` → Investor metric card styling.
* **Asset Slot?** `js/asset-slot.js` → `[data-asset-slot]` → Dynamic asset placeholder loader.
* **Global navigation behaviour?** `js/shell.js` → `initNavigation()` → Mobile menu & active state logic.
* **Page-specific interaction?** `js/shell.js` / Page scripts → Event handlers for specific pages.

---

## 12. Architecture Health

* **Global CSS organisation:** `GOOD` — CSS is well-scoped with centralized root variables.
* **Component reuse:** `NEEDS ATTENTION` — Similar card elements across pages can be consolidated.
* **Naming consistency:** `NEEDS ATTENTION` — Page-specific prefixed classes (`.partners-frame`, `.solutions-title`) exist alongside generic component names.
* **Design token consistency:** `GOOD` — Core colours and spacing tokens are utilized consistently.
* **JavaScript separation:** `GOOD` — Shell navigation and asset slot logic are cleanly decoupled into distinct modules.
* **Page-specific CSS isolation:** `GOOD` — Page-specific rules are cleanly contained without side effects.
* **Manual maintainability:** `GOOD` — Non-developers can change primary attributes quickly via `:root` variables.

---

## 13. Recommended Next Actions

1. **Card Component Consolidation:** Unify `.solutions-card`, `.partner-card`, and `.investor-card` into a single reusable `.card` component with BEM modifiers.
2. **Class Name Standardisation:** Refactor utility classes like `.small-grey-text` to semantic design-token-aligned classes like `.text-muted-sm`.
3. **Shared Frame Harmonisation:** Deprecate page-bound container overrides like `.partners-frame` in favour of standard `.shared-frame` variants.
4. **JS Interaction Bundling:** Ensure all page-specific UI scripts are cleanly imported rather than relying on inline script tags.

---

## 14. Protected Area

### Protected / Frozen Area
The following are intentionally excluded from the current public-site architecture work:
* `gatekeeper.html`
* the restricted area linked from it
* files exclusively belonging to that restricted experience

These must not be modified, refactored, renamed, or consolidated unless explicitly requested by the user.
