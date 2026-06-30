# Custom Rules and Context for Oliver Portfolio Development

## Git & Vercel Authentication Context
* **User Identity**: Always sign commits using the authorized Vercel/GitHub owner email:
  * **Email**: `estudianteveo@gmail.com`
  * **Name**: `Oliver`
* **Commit Guidelines**: Ensure commits in any portfolio repositories (`PORTAFOLIO AXIS`, `oliverportfolio`) are configured with this email. If not set, run `git config user.email "estudianteveo@gmail.com"` to avoid Vercel blockages.

## Workspaces & Repositories
1. **Axis Studio Portfolio**:
   * Path: `c:\Users\Oliver\.gemini\PORTAFOLIO AXIS`
   * Repo: `https://github.com/estudianteveo-sys/AXIS-PORTAFOLIO`
2. **Oliver Freelance Portfolio**:
   * Path: `c:\Users\Oliver\.gemini\oliverportfolio`
   * Repo: `https://github.com/estudianteveo-sys/oliver-portfolio`

## Visual & Design Decisions (Standardized)
* **Play Button**:
  * Style: Minimalist solid triangle play icon (no circle outline/background).
  * Color: 
    * Axis Studio: Gold (`var(--c-gold)`)
    * Oliver Portfolio: Cyan (`var(--c-accent)` / `#00D4AA`)
  * Layout: Vertically centered on the **left side** of video card previews (`left: 24px` on mobile, `left: 32px` on desktop).
  * Scale: `64px` on mobile, `80px` on desktop.
* **Services Grid Layout (Axis Studio)**:
  * Uses a checkerboard alternating layout:
    * Row 1: Negro, Amarillo, Negro
    * Row 2: Amarillo, Negro, Amarillo
  * Style Details:
    * **Negro**: Background `#0A0A0A`, gold border, light gold texts.
    * **Amarillo**: Background `var(--c-gold)` (solid), black text.
* **Language Selectors**:
  * Keep selector text compact (`0.72rem`) and tight padding on mobile sizes (`max-width: 768px`) to prevent page wrapper wrapping.
