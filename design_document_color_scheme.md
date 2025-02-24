## Design Change Document: Apple iCloud–Inspired Light-Blue Color Scheme

### 1. Overview
- **Objective**: Refresh the current dashboard with a clean, minimal aesthetic reminiscent of Apple’s iCloud interface.
- **Key Theme**: Predominantly soft blues, whites, and subtle grays to convey a modern, airy feel.

### 2. Color Palette
Here’s a suggested set of colors. You can adjust the exact hex values to taste, but this palette aims for a light, crisp feel:

- **Primary Background**: `#F8FAFD`  
  (A very light, almost-white blue for the main page background.)

- **Secondary Background / Panel**: `#EBF2FA`  
  (Slightly darker than the main background, used for cards, panels, and other secondary sections.)

- **Accent Blue**: `#3A8DFF`  
  (A bright, friendly blue for buttons, highlights, and links.)

- **Light Accent Blue**: `#B5D5FF`  
  (A softer version of the accent color, useful for hover states or subtle highlights.)

- **Text Color (Dark Gray)**: `#333333`  
  (Maintain good contrast on the light backgrounds.)

- **Border / Divider Gray**: `#D0D0D0`  
  (Light gray for borders or dividing lines.)

### 3. Usage Guidelines

1. **Page Background**  
   - Use `#F8FAFD` as the global background (`body` or main container).

2. **Dashboard Panels**  
   - Apply `#EBF2FA` as the background for panel-like components (e.g., “Profile”, “Mail”, “Drive”, “Notes” blocks).

3. **Buttons and Links**  
   - Use `#3A8DFF` for primary calls-to-action.
   - On hover or focus, shift to `#B5D5FF` for a soft highlight effect.

4. **Typography**  
   - Keep the text color primarily `#333333` to ensure readability against light backgrounds.
   - Use additional shades of gray (e.g., `#555555`) for less prominent text or placeholders.

5. **Borders and Dividers**  
   - Use `#D0D0D0` for thin borders around panels or to separate sections.

### 4. Example CSS Snippet

```css
:root {
  --color-bg-primary: #F8FAFD;
  --color-bg-secondary: #EBF2FA;
  --color-accent: #3A8DFF;
  --color-accent-light: #B5D5FF;
  --color-text-primary: #333333;
  --color-border: #D0D0D0;
}

/* Global Styles */
body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  margin: 0;
  font-family: sans-serif;
}

/* Panel/Box */
.panel {
  background-color: var(--color-bg-secondary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 16px;
}

/* Buttons */
.button {
  background-color: var(--color-accent);
  color: #fff;
  border: none;
  padding: 10px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: var(--color-accent-light);
}

/* Links */
a {
  color: var(--color-accent);
  text-decoration: none;
}

a:hover {
  color: var(--color-accent-light);
}
```

### 5. Implementation Notes
- Update global styles in your main CSS or Tailwind configuration (if using Tailwind).
- Ensure that any existing color variables are replaced or overridden with these new values.
- Test accessibility (contrast and legibility) with tools like Lighthouse or other accessibility checkers to confirm the design remains user-friendly.

