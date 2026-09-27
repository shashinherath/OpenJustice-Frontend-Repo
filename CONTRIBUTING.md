# Contributing to OpenJustice Frontend

Thank you for your interest in contributing to OpenJustice! This guide will help you get started.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. **Create a branch** for your changes
4. **Make your changes** and test them
5. **Submit a Pull Request**

## Development Setup

### Prerequisites

- Node.js v18+
- npm
- A running instance of the [OpenJustice Backend](https://github.com/shashinherath/OpenJustice-Backend-Repo)

### Setup

```bash
# Clone your fork
git clone https://github.com/<your-username>/OpenJustice-Frontend-Repo.git
cd OpenJustice-Frontend-Repo

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Edit .env if your backend runs on a different port

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

## Making Changes

### Branch Naming

Use descriptive branch names:

- `feat/add-voice-recorder-ui` — New features
- `fix/chat-scroll-position` — Bug fixes
- `docs/update-component-docs` — Documentation updates
- `refactor/extract-chat-hooks` — Code refactoring

### Project Structure

The codebase follows a feature-organized structure. Please maintain these conventions:

- **`components/`** — Reusable UI components, organized by feature
- **`pages/`** — Page-level components (one per route)
- **`services/`** — API service layer (Axios-based)
- **`stores/`** — Zustand state management stores
- **`hooks/`** — Custom React hooks
- **`types/`** — TypeScript type definitions
- **`locales/`** — i18n translation files (EN, SI, TA)

### Commit Messages

Write clear, concise commit messages:

```
feat: add dark mode toggle in settings panel
fix: prevent chat input overflow on mobile
docs: add component prop documentation
style: improve admin dashboard card layout
```

## Pull Request Process

1. **Update your branch** with the latest `main`:
   ```bash
   git fetch origin
   git rebase origin/main
   ```
2. **Ensure the build passes**: `npm run build`
3. **Lint your code**: `npm run lint`
4. **Write a clear PR description** explaining:
   - What the change does
   - Why it's needed
   - Screenshots for UI changes
5. **Link related issues** if applicable

### PR Review Criteria

- Code follows the project's architecture and TypeScript conventions
- UI changes are responsive (mobile + desktop)
- No hardcoded API URLs or credentials
- Translations are added for all three languages (EN, SI, TA) where applicable
- The PR is focused — one feature or fix per PR

## Coding Standards

- **Language**: TypeScript (strict mode)
- **Styling**: TailwindCSS 4
- **State Management**: Zustand (not Context for global state)
- **Linting**: ESLint 9 with TypeScript plugin
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for utilities and hooks

## Reporting Bugs

When reporting bugs, please include:

1. **Description**: What happened vs. what you expected
2. **Steps to Reproduce**: Minimal steps to trigger the bug
3. **Browser & OS**: Browser name/version, operating system
4. **Screenshots**: Especially for visual issues
5. **Console Errors**: Any relevant browser console output

Use the [GitHub Issues](https://github.com/shashinherath/OpenJustice-Frontend-Repo/issues) page to report bugs.

## Suggesting Features

Feature suggestions are welcome! Please open a [GitHub Issue](https://github.com/shashinherath/OpenJustice-Frontend-Repo/issues) with:

1. **Problem**: What problem does the feature solve?
2. **Proposed Solution**: How should it work?
3. **Mockups/Wireframes**: Visual ideas if applicable

---

Thank you for helping make OpenJustice better! ⚖️
