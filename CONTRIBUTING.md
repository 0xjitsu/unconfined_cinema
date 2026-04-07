# Contributing to The Unconfined Cinema

Thank you for your interest in contributing. This project is the digital home of a Filipino art collective — contributions that honor the creative vision are welcome.

## Getting Started

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Make your changes
4. Run `npm run build && npm run lint` to verify
5. Submit a pull request targeting the `test` branch

## Guidelines

- Follow the existing code style and design system
- Use the cinema-* design tokens defined in `globals.css`
- Test at 375px (mobile) and 1440px (desktop) minimum
- Ensure all interactive elements have 44px minimum touch targets
- Respect `prefers-reduced-motion` — all animations must be disableable

## Contributor License Agreement (CLA)

By submitting a pull request, you agree to the following:

1. You grant the maintainer (0xJitsu) a perpetual, worldwide, non-exclusive, royalty-free, irrevocable license to use, reproduce, modify, distribute, sublicense, and relicense your contributions.
2. You represent that your contributions are your original work and do not infringe on the rights of any third party.
3. This CLA enables dual-licensing: the project is open source under AGPL v3, with a separate commercial license available.

## Pull Request Process

- PRs target the `test` branch, not `main`
- Include a clear description of changes
- Reference any related issues
- Ensure the build passes before requesting review

## Code of Conduct

Be respectful, constructive, and mindful that this project represents an art collective's creative vision.
