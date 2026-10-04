<div align="center">

<img src="public/images/logo.png" alt="Neurospire AI Logo" width="120" />

# Neurospire LMS

**Student, partner, and admin portal for Neurospire AI Technologies, an MSME-registered AI and software education organization.**

[Live Site](https://neuro-spire.vercel.app/) · [Student Portal](https://neuro-spire.vercel.app/login) · [Partner Hub](https://neuro-spire.vercel.app/partner-login) · [Verify a Certificate](https://neuro-spire.vercel.app/verify)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Programs](#programs)
- [Tech Stack](#tech-stack)
- [Routes](#routes)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Author](#author)

## Overview

Neurospire AI Technologies trains college students in practical AI and software engineering through a project-first internship program. This repository is the web platform behind it: the public site, the LMS for students, a hub for corporate partners, and admin tooling for onboarding learners and verifying credentials.

> **Think fast, build faster.**

## Features

- **Public landing site** covering programs, curriculum, pricing tiers, and the project workflow
- **Student Portal** for curriculum access, weekly progress tracking, project repository submissions, and certificates
- **Enterprise Partner Hub** for sponsors and hiring managers to monitor cohort metrics and evaluate candidates
- **Certificate verification** so anyone can confirm a credential is authentic
- **Admin provisioning** for registering and onboarding students
- **Application flow** for internship registration
- **Responsive UI** built with Tailwind CSS and the Geist font via `next/font`

## Programs

The flagship offering is the **5-Week AI Industry Readiness** program.

| Phase | What happens |
| --- | --- |
| **Week 1: Core Training** | Guided sessions, resources, mentorship, and practical assignments |
| **Weeks 2 to 5: Project Internship** | Merit-based admission to a 4-week hands-on internship building real projects |

Three tiers are available (**Lite**, **Regular**, **Pro**), from live sessions and community access up to lifetime LMS access and 1-on-1 mentorship. See the [live site](https://neuro-spire.vercel.app/#pricing) for current details.

<details>
<summary><b>Curriculum at a glance</b></summary>

| Week | Focus |
| --- | --- |
| 1 | ChatGPT and prompt engineering, Cursor AI, VS Code and GitHub basics, first mini project |
| 2 | HTML, CSS, Tailwind CSS and JavaScript, React fundamentals, responsive design |
| 3 | APIs, Supabase and authentication, databases and forms, AI API integration |
| 4 | GitHub collaboration, deployment, resume and LinkedIn optimization, final evaluation |

</details>

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | [Next.js](https://nextjs.org) 16 (App Router) |
| UI library | [React](https://react.dev) 19 |
| Language | [TypeScript](https://www.typescriptlang.org) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) 4 with PostCSS |
| Linting | ESLint 9 with `eslint-config-next` |
| Hosting | [Vercel](https://vercel.com) |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/apply` | Internship application and registration |
| `/login` | Student Portal sign-in |
| `/partner-login` | Enterprise Partner Hub sign-in |
| `/verify` | Certificate verification |
| `/admin/register-student` | Admin student provisioning |

## Getting Started

**Prerequisites:** [Node.js](https://nodejs.org) 20+ and npm, yarn, pnpm, or bun.

```bash
# Clone and install
git clone https://github.com/omermohammedfarooq/neurospire-lms.git
cd neurospire-lms
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads as you edit.

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
neurospire-lms/
├── public/            # Static assets (logo, images)
├── src/               # Application source (pages, components)
├── next.config.ts
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## Deployment

Deployed on Vercel. To deploy your own copy, push the repo to GitHub, import it at [vercel.com/new](https://vercel.com/new), and click **Deploy**. Vercel detects Next.js automatically. Other options are covered in the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit: `git commit -m "Add your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a pull request

## Author

**Mohammed Omer Farooq** · [@omermohammedfarooq](https://github.com/omermohammedfarooq)

---

<div align="center">

Built by **Neurospire AI Technologies** · Government of India MSME Registered

</div>
