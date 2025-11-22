# Design System: "Cursor-Inspired"

This design system follows the aesthetic principles of Cursor.com (circa 2024/2025), adapted for a developer portfolio. It emphasizes minimalism, typography, clean lines, and content-first layouts.

## 1. Core Principles
-   **Minimalism:** White space is active content. Remove unnecessary borders, backgrounds, and decorative elements.
-   **Typography-Focused:** Large, sans-serif headings (Inter) carry the visual weight.
-   **Monochrome Palette:** The design relies almost exclusively on black, white, and grays. Color is used sparingly for interactions or status indicators.
-   **Subtle Interactions:** Hover states should be smooth (ease-in-out) and subtle (slight shifts, border color changes, or opacity adjustments) rather than loud.

## 2. Typography
**Font Family:** `Inter`, sans-serif.

-   **H1 (Hero):** `text-5xl md:text-7xl`, `font-medium`, `tracking-tight`, `text-gray-900`.
-   **H2 (Section Headings):** `text-2xl`, `font-medium`, `text-gray-900`.
-   **H3 (Card Titles):** `text-lg`, `font-medium`, `text-gray-900`.
-   **Body Text:** `text-gray-600`, `leading-relaxed`.
-   **Meta/Labels:** `text-xs`, `font-medium`, `uppercase`, `tracking-wide`, `text-gray-500`.

## 3. Color Palette

| Color Name | Tailwind Class | Hex Value | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas White** | `bg-white` | `#FFFFFF` | Main background, active cards. |
| **Off-White** | `bg-[#FCFCFC]` / `bg-gray-50` | `#FCFCFC` / `#F9FAFB` | Section backgrounds, card backgrounds (default). |
| **Subtle Gray** | `bg-gray-100` | `#F3F4F6` | Badges, inactive card backgrounds. |
| **Border Gray** | `border-gray-200` | `#E5E7EB` | Subtle borders, dividers. |
| **Text Muted** | `text-gray-400` / `text-gray-500` | `#9CA3AF` / `#6B7280` | Secondary text, meta info. |
| **Text Body** | `text-gray-600` | `#4B5563` | Paragraphs. |
| **Text Primary** | `text-gray-900` | `#111827` | Headings, primary actions. |
| **Primary Black** | `bg-black` | `#000000` | Primary buttons, logos. |

## 4. UI Components

### Buttons
-   **Primary:** Pill-shaped (`rounded-full`), solid black background, white text.
    -   *Classes:* `bg-black text-white rounded-full font-medium hover:bg-gray-800 transition`
-   **Secondary:** Pill-shaped, white background, gray border.
    -   *Classes:* `bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition`

### Cards (Projects/Blog)
-   **Structure:** Minimal padding, subtle border.
-   **Default State:** Light gray background (`bg-gray-100`), low contrast.
-   **Hover State:** White background (`bg-white`), shadow lift (`shadow-lg`), border definition.
-   **Layout:**
    -   Title (Top Left)
    -   Badge (Top Right)
    -   Summary (Middle)
    -   Date (Bottom)

### Badges
-   Small, pill-shaped indicators.
-   *Classes:* `bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded-full`

### Featured Work Preview
-   **Container:** `relative overflow-hidden rounded-2xl bg-gray-100`
-   **Default state:** Light gray background, low opacity
-   **Hover state:** `hover:bg-white hover:shadow-2xl transition-all duration-500`
-   **Image:** 
    -   Container: `relative aspect-video overflow-hidden rounded-2xl`
    -   Image: `w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]`
-   **Overlay gradient:** `absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`
    -   Default: `opacity-0`
    -   Hover: `group-hover:opacity-100 transition-opacity duration-300`
-   **Text overlay:** `absolute bottom-0 left-0 right-0 p-6`
    -   Default: `transform translate-y-full`
    -   Hover: `group-hover:translate-y-0 transition-transform duration-300`
-   **Text styling:** 
    -   Title: `text-white font-semibold text-xl mb-1`
    -   Label: `text-white/80 text-sm font-medium`

## 5. Layout Patterns

### The "Sidebar" Grid
Used for main content sections (Selected Works, Writing).
-   **Grid:** `grid-cols-1 lg:grid-cols-12 gap-12`
-   **Left Column (4 cols):** Sticky section title (`sticky top-32`). This acts as a navigation anchor.
-   **Right Column (8 cols):** Vertical list of cards or content.

### Hero Section
-   Centered layout.
-   Massive heading with line break.
-   **Featured Work Preview:** Single hero project image positioned below description, above CTAs
    -   **Layout:** Centered, max-width `max-w-2xl`, rounded corners
    -   **Hover effects:** Scale transform (`group-hover:scale-[1.02]`), shadow increase, gradient overlay
    -   **Image treatment:** `aspect-video`, `object-cover`, smooth transitions
    -   **Overlay:** Semi-transparent gradient with project title on hover
-   **CTA buttons:** View Work (primary), Contact Me (secondary)
-   `overflow-hidden` to ensure clean edges.

## 6. Implementation Notes
-   **React/Astro:** Components should be functional and composable.
-   **Tailwind:** Use utility classes for 99% of styling. Custom CSS in `global.css` is reserved for font-face and scrollbar normalization.
-   **Scrollbar:** Normalized to neutral gray (`scrollbar-color: #888 #f1f1f1`) to avoid distracting native styles.
