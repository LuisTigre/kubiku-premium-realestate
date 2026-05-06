# 🧠 Stitch Skills Registry (Recreated)

This is your **UI generation + design intelligence layer** for React (Vite + Tailwind + Keycloak stack).

---

# 📦 CORE SKILLS SYSTEM

## 1. 🧩 `stitch-design`

### Purpose

Generate full UI systems from product intent.

### Input

* Page idea
* Feature description
* UX goal

### Output

* Layout structure
* Component breakdown
* Design system direction

### Use cases

* New pages (Home, Search, Dashboard)
* Redesign existing flows
* Defining UI architecture

---

## 2. ⚛️ `react-components`

### Purpose

Convert design intent into production-ready React components.

### Output

* Functional React (Vite-ready)
* Tailwind styling
* Component composition

### Use cases

* PropertyCard
* ListingGrid
* FilterPanel
* MapSidebar
* ListingForm

---

## 3. 🎨 `shadcn-ui`

### Purpose

Integrate and align UI with shadcn/ui patterns.

### Output

* shadcn-compatible components
* consistent UI primitives

### Use cases

* Buttons, modals, dialogs
* Forms
* Layout primitives

---

## 4. 💎 `taste-design`

### Purpose

Upgrade UI to premium, non-generic aesthetic.

### Focus

* spacing harmony
* typography refinement
* visual hierarchy
* “real estate trust feel”

### Use cases

* UI feels too basic
* need premium marketplace look
* polish before production

---

## 5. 🔁 `stitch-loop`

### Purpose

Generate full multi-page flows.

### Output

* connected user journeys
* page transitions
* system-level UX

### Use cases

* Search → Listing → Contact flow
* Agent onboarding flow
* Dashboard workflows

---

## 6. 🧠 `enhance-prompt`

### Purpose

Transform vague UI ideas into structured design instructions.

### Input

* “make listing page better”
* “improve search UI”

### Output

* structured UI spec
* component breakdown
* layout instructions

---

## 7. 📄 `design-md`

### Purpose

Extract or generate design system documentation.

### Output

* typography rules
* spacing system
* component guidelines

### Use cases

* maintaining consistency
* scaling design system
* onboarding agents/devs

---

## 8. 🎬 `remotion`

### Purpose

Generate UI walkthrough videos.

### Output

* animated flows
* product demos
* onboarding videos

### Use cases

* investor demos
* product presentation
* onboarding UX explanation

---

# 🧱 SYSTEM BEHAVIOR RULES

## 🧭 Execution order (recommended)

When building UI:

```txt id="skillflow1"
enhance-prompt
   ↓
stitch-design
   ↓
react-components
   ↓
taste-design
```

For full flows:

```txt id="skillflow2"
stitch-loop
```

---

# 🏠 REAL ESTATE PROJECT MAPPING

## Home Page

→ stitch-design

## Search Page (core)

→ stitch-loop + react-components

## Listing Card

→ react-components + shadcn-ui

## Listing Detail Page

→ stitch-design → react-components → taste-design

## Dashboard (Agent)

→ stitch-loop

---

# ⚙️ STACK ASSUMPTION (your system)

* React 19 + Vite
* Tailwind CSS 4
* Keycloak auth
* API via Axios
* Mapbox (optional UI integration)
* Supabase or backend later

---

# 🔥 DESIGN PHILOSOPHY

These skills enforce:

* no generic SaaS UI
* no template-looking layouts
* real estate trust aesthetics
* fast iteration over perfection
* component-first architecture

