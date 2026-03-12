# Festivo — Design Guide

> Editorial festival discovery for the curious traveler.

---

## Brand Identity

**Name**: Festivo
**Tagline**: *Discover the world through celebration.*
**Voice**: Sophisticated yet warm. Curated, not cluttered. Inspire wanderlust.

---

## Color Palette

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Primary | Deep Amber | `#C8741A` | CTAs, active states, highlights |
| Background | Off-White | `#F7F4EF` | Page background — warm & editorial |
| Surface | White | `#FFFFFF` | Cards, modals, input fields |
| Text Primary | Charcoal | `#1C1C1C` | Headings, body copy |
| Text Secondary | Stone | `#6B6B6B` | Subtext, labels, metadata |
| Text Tertiary | Mist | `#A8A8A8` | Placeholders, disabled |
| Accent Light | Honey | `#FFF3E0` | Hover states, tags, subtle fills |
| Border | Linen | `#E8E3DC` | Dividers, card borders |
| Dark BG | Midnight | `#111111` | Dark mode background |
| Dark Surface | Iron | `#1E1E1E` | Dark mode cards |

### Usage Rules
- Use **Deep Amber** sparingly — it should draw the eye.
- **Off-White** gives warmth; never use pure white as the page background.
- Text on images always uses `#FFFFFF` with `text-shadow` or dark overlay.

---

## Typography

### Fonts
| Role | Font | Fallback |
|------|------|----------|
| Display / Headline | Playfair Display (serif) | Georgia, serif |
| Body / UI | Inter (sans-serif) | system-ui, sans-serif |

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display` | 72px | 700 | 1.1 | Hero headline |
| `headline-1` | 48px | 700 | 1.15 | Section headlines |
| `headline-2` | 36px | 600 | 1.2 | Card featured title |
| `headline-3` | 28px | 600 | 1.3 | Sub-section heads |
| `title` | 20px | 600 | 1.4 | Card titles, nav |
| `body` | 16px | 400 | 1.6 | Default body copy |
| `small` | 14px | 400 | 1.5 | Labels, captions |
| `caption` | 12px | 500 | 1.4 | Tags, badges |

### Typography Rules
- Headlines use **Playfair Display** — always italic for editorial feel on key titles.
- Body uses **Inter** — keep line-height generous (1.6) for readability.
- Letter-spacing on all-caps labels: `0.1em`.
- Never use more than 2 font weights on a single screen.

---

## Spacing & Grid System

### Base Unit
`8px` — all spacing is a multiple of 8.

### Spacing Scale
| Token | Size |
|-------|------|
| `xs` | 4px |
| `sm` | 8px |
| `md` | 16px |
| `lg` | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |
| `4xl` | 96px |

### Grid
- **Max content width**: 1280px
- **Gutter**: 24px (mobile) / 40px (desktop)
- **Columns**: 4 (mobile) / 8 (tablet) / 12 (desktop)

### Breakpoints
| Name | Min Width | Description |
|------|-----------|-------------|
| `mobile` | 0px | Stack layout, single column |
| `sm` | 640px | 2 columns |
| `md` | 768px | Navigation visible |
| `lg` | 1024px | 3 columns, full layout |
| `xl` | 1280px | Full editorial grid |

---

## Component Patterns

### Festival Card
```
┌─────────────────────────┐
│                         │  ← 16:9 image, overflow hidden
│     [IMAGE]             │     hover: scale(1.05), 400ms ease
│                         │
├─────────────────────────┤
│  ● CATEGORY  · MONTH    │  ← caption, amber + stone
│  Festival Name          │  ← title, Playfair Display
│  City, Country          │  ← small, stone
│  ★ 4.8  (324 reviews)  │  ← rating row
└─────────────────────────┘
```
- **Hover state**: image scale + card shadow elevation
- **Aspect ratio**: 16:9 for standard, 3:4 for featured hero cards

### Button
| Variant | Style |
|---------|-------|
| Primary | bg-amber, white text, rounded-full, px-6 py-3 |
| Secondary | border-charcoal, charcoal text, rounded-full |
| Ghost | No border, amber text, hover underline |
| Icon | 40×40 circle, border, icon centered |

### Badge / Tag
- Background: `#FFF3E0` (Honey)
- Text: `#C8741A` (Deep Amber)
- Border-radius: `9999px`
- Font: caption (12px, 500, uppercase, 0.08em spacing)
- Padding: `4px 10px`

### Navigation Bar
- Background: `rgba(247, 244, 239, 0.92)` + `backdrop-blur(12px)`
- Height: 64px
- Logo: Playfair Display, 22px, charcoal
- Links: Inter, 14px, medium — hover with amber underline
- Mobile: hamburger → full-screen overlay menu

### Category Filter
- Horizontal scroll on mobile
- Pill-shaped buttons (rounded-full)
- Active: amber fill, white text
- Inactive: linen border, stone text

---

## Motion Principles

### Timing
| Type | Duration | Easing |
|------|----------|--------|
| Micro (hover, toggle) | 150–200ms | `ease-out` |
| Component enter | 300–400ms | `ease-out` |
| Page transition | 400–500ms | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Hero parallax | continuous | `linear` |

### Animation Rules
1. **Fade + translate** is the standard entry: `opacity: 0→1, y: 20→0`
2. Cards stagger on list render: `delay = index × 50ms`
3. Never animate more than 3 elements simultaneously
4. Respect `prefers-reduced-motion` — all animations should be skippable

### Framer Motion Variants (reusable)
```ts
// Page enter
pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } }
}

// Card hover
cardHover = {
  scale: 1.02,
  transition: { duration: 0.3, ease: "easeOut" }
}

// Stagger container
staggerContainer = {
  animate: { transition: { staggerChildren: 0.05 } }
}
```

---

## Image Guidelines

### Ratios
| Context | Ratio | Min Resolution |
|---------|-------|----------------|
| Hero (full width) | 21:9 | 1920×820px |
| Featured card | 3:4 | 600×800px |
| Standard card | 16:9 | 800×450px |
| Thumbnail | 1:1 | 200×200px |

### Treatment
- All hero images use a **dark gradient overlay** bottom-to-top (30–60% opacity)
- Cards: subtle dark overlay appears on hover to ensure text legibility
- Always set `alt` text describing the festival and location
- Use `next/image` with `fill` and `object-cover` for all festival images

### Placeholder Strategy
- Development: Unsplash random URLs with `?q=festival&w=800`
- Production: Replace with AI-generated assets from Midjourney / Nanobanana

---

## Iconography

- Use **Lucide React** icon library (consistent stroke style)
- Stroke width: `1.5px`
- Size: 20px (UI), 24px (nav/actions), 16px (inline)
- Never fill icons — always use stroke-only for editorial consistency

---

## Dark Mode

Toggle available in Settings. CSS variables swap:
- Background: `#111111`
- Surface: `#1E1E1E`
- Text Primary: `#F0EDE8`
- Text Secondary: `#A8A8A8`
- Border: `#2E2E2E`
- Primary Amber: `#E8881F` (slightly brighter for dark contrast)

---

## Accessibility

- All interactive elements minimum **44×44px** touch target
- Color contrast AA minimum (4.5:1 for body, 3:1 for large text)
- Focus visible ring: `2px solid #C8741A, offset 2px`
- Skip-to-content link at page top
- All images have descriptive `alt` text

---

*Design System Version 1.0 — Festivo Demo, March 2026*
*Built with Claude Code*
