# Alexandria Design System

## 1. Visual Philosophy
The Alexandria platform blends the timeless elegance of **Editorial Design** with modern **Glassmorphism** and a **Sleek Vintage** aesthetic. It feels like a luxury logistics ledger from the future.

## 2. Color Palette
- **Parchment (Primary BG):** `#F9F7F2` - A warm, vintage off-white.
- **Ebony (Text):** `#1A1A1A` - Deep, near-black for high-contrast legibility.
- **Antique Gold (Accent):** `#C5A059` - Used for status highlights and active elements.
- **Glass (Surfaces):** `rgba(255, 255, 255, 0.4)` with `backdrop-filter: blur(12px)`.
- **Border:** `rgba(26, 26, 26, 0.1)` - Ultra-thin, subtle definition.

## 3. Typography
- **Headings (Editorial):** `Playfair Display` (Serif)
  - Used for titles, major headers, and branding.
  - Characterized by high contrast and elegant curves.
- **Body & Data (Minimalist):** `Inter` (Sans-serif)
  - Used for tracking numbers, status updates, and form inputs.
  - Focus on precision and readability.

## 4. Design Tokens
### Surfaces
- **Base:** Solid Parchment.
- **Card:** Glassmorphic, 1px Ebony border (10% opacity), 16px border radius.
- **Shadow:** Soft, diffused shadows to create depth without bulk.

### Interaction
- **Hover:** Subtle scale increase (1.02x) and increased glass opacity.
- **Active:** Antique Gold highlight on borders or underlines.

## 5. UI Components
- **Tracking Search:** A single, large, elegant input field with a serif placeholder.
- **Status Timeline:** A thin vertical line in Antique Gold with glassmorphic nodes.
- **Admin Dashboard:** A structured, grid-based layout reminiscent of a broadsheet newspaper.
