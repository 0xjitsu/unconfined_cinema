# Contributing to The Unconfined Cinema

Thank you for your interest in contributing. This project is the digital home of a Filipino art collective. Contributions that honor the creative vision are welcome.

---

## Table of Contents

- [Development Setup](#development-setup)
- [Branch Strategy](#branch-strategy)
- [Commit Messages](#commit-messages)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Contributor License Agreement](#contributor-license-agreement-cla)
- [Code of Conduct](#code-of-conduct)

---

## Development Setup

1. Fork the repository and clone your fork.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Verify the production build passes before submitting:
   ```bash
   npm run build
   ```
5. Run the linter:
   ```bash
   npm run lint
   ```

This project requires Node.js 18+ and uses Next.js 16 with the App Router.

---

## Branch Strategy

All pull requests target the **`test`** branch, not `main`. The `main` branch is reserved for production releases.

Use descriptive branch names with one of these prefixes:

| Prefix   | Purpose                          |
|----------|----------------------------------|
| `feat/`  | New feature or section           |
| `fix/`   | Bug fix                          |
| `docs/`  | Documentation changes            |
| `refactor/` | Code restructuring without behavior change |
| `style/` | Visual or CSS-only changes       |

Examples: `feat/gallery-lightbox`, `fix/mobile-nav-overflow`, `docs/update-readme`.

---

## Commit Messages

Use present tense imperative. Explain **why** the change was made, not just what changed.

**Format:**

```
<short summary in imperative mood>

<optional body explaining the motivation and context>
```

**Good examples:**

```
Add smooth scroll offset for sticky nav

The fixed header obscures anchor targets. Apply scroll-mt-24
to all section anchors so they clear the nav on jump.
```

```
Fix hero video not autoplaying on Safari

Safari requires muted + playsinline attributes together.
Add both to the video element.
```

**Avoid:**

- `Updated stuff` (vague)
- `Fixed the bug` (no context)
- `Added gallery component and also fixed nav and updated footer` (too many changes in one commit)

One logical change per commit. If your PR contains multiple concerns, split them into separate commits.

---

## Code Style

### TypeScript

- Strict mode is enabled (`strict: true` in `tsconfig.json`).
- No `any` types unless absolutely necessary and documented with a comment.
- Use explicit return types on exported functions and components.

### Tailwind CSS v4

This project uses **Tailwind CSS v4** with the CSS-first configuration model. There is no `tailwind.config.js` file.

- Design tokens are defined as CSS custom properties in `src/app/globals.css` using the `cinema-*` namespace.
- Use the existing `cinema-*` tokens for colors, spacing, and typography. Do not introduce raw hex values or arbitrary values when a token exists.
- If a new token is needed, add it to `globals.css` and follow the existing naming convention.

### Framer Motion

- All animations use Framer Motion.
- Every animation must respect `prefers-reduced-motion`. Use the `useReducedMotion` hook or CSS media queries to disable motion.
- Keep animation durations subtle. This is an art collective site, not a theme park.

### General

- Test at 375px (mobile) and 1440px (desktop) minimum.
- All interactive elements must have 44px minimum touch targets.
- Use semantic HTML. Decorative elements get `aria-hidden="true"`.
- Image assets go through `next/image` for optimization.

---

## Pull Request Process

### Before Submitting

1. Run `npm run build` and `npm run lint` locally. The build must pass.
2. Test your changes at both mobile (375px) and desktop (1440px) viewports.

### PR Description Template

When opening a pull request, include:

```markdown
## What

Brief description of the change.

## Why

Motivation and context. Link to any related issues.

## Screenshots

Before/after screenshots for any visual changes (required).

## Testing

How you verified the change works correctly.
```

### Review Checklist

- PR targets the `test` branch.
- Build and lint pass without errors.
- Visual changes include before/after screenshots.
- New components use existing `cinema-*` design tokens.
- Animations respect `prefers-reduced-motion`.
- No hardcoded secrets, API keys, or PII.

---

## Contributor License Agreement (CLA)

By submitting a pull request to this repository, you agree to the following terms:

### Grant of License

You hereby grant to Erwin Romulo (GitHub: 0xJitsu), as the project maintainer, and their successors and assigns, a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable license to use, reproduce, prepare derivative works of, publicly display, publicly perform, sublicense, and distribute your contributions and any derivative works thereof.

### Relicensing Rights

You further grant the maintainer the right to relicense your contributions, in whole or in part, under any license terms the maintainer sees fit, including but not limited to proprietary or commercial licenses. This right is necessary to sustain the dual-licensing model under which the project operates (AGPL v3 for open source use, separate commercial license for proprietary use).

### Representations

You represent and warrant that:

1. Your contributions are your original work, or you have sufficient rights to submit them under these terms.
2. Your contributions do not infringe on the intellectual property rights of any third party.
3. You have the legal authority to enter into this agreement.
4. If your employer has rights to intellectual property that you create, you have received permission to submit contributions on behalf of your employer, or your employer has waived such rights.

### Scope

This CLA applies to all contributions submitted to this repository, including but not limited to code, documentation, configuration files, and design assets.

### Acceptance

Submitting a pull request constitutes acceptance of this CLA. No separate signature is required.

---

## Code of Conduct

Be respectful, constructive, and mindful that this project represents an art collective's creative vision. Contributions are collaborative — critique the work, not the person.
