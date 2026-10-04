<div align="center">

<img src="public/images/logo.png" alt="Neurospire AI Logo" width="120" />

# Neurospire LMS

**The student, partner, and admin portal for Neurospire AI Technologies, an MSME-registered AI and software education organization.**

[Live Site](https://neuro-spire.vercel.app/) · [Student Portal](https://neuro-spire.vercel.app/login) · [Partner Hub](https://neuro-spire.vercel.app/partner-login) · [Verify a Certificate](https://neuro-spire.vercel.app/verify)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?logo=vercel)

</div>

---

## Overview

Neurospire AI Technologies trains college students in practical AI and software engineering through a structured, project-first internship program. This repository contains the web platform behind it: the public marketing site, the learning management system (LMS) for students, a hub for corporate partners, and admin tooling for provisioning learners and verifying credentials.

**Think fast, build faster.**

## Features

- **Public landing site** with program details, curriculum, pricing tiers, and the end-to-end project workflow.
- **Student Portal** for accessing the curriculum, tracking weekly progress, submitting project repositories, and claiming certificates.
- **Enterprise Partner Hub** where sponsors, project coordinators, and hiring managers can monitor cohort metrics and evaluate candidates.
- **Certificate verification** so anyone can confirm that a credential issued by Neurospire is authentic.
- **Admin provisioning** for registering and onboarding students.
- **Application flow** for internship registration.
- **Responsive, modern UI** built with Tailwind CSS and the Geist font via `next/font`.

## Programs

The flagship offering is the **5-Week AI Industry Readiness** program:

| Phase | What happens |
| --- | --- |
| **Week 1: Core Training** | Intensive guided sessions, resources, mentorship, and practical assignments. |
| **Weeks 2 to 5: Project Internship** | Merit-based admission to a 4-week hands-on internship building real projects. |

Three tiers are offered: **Lite**, **Regular**, and **Pro**, ranging from live sessions and community access up to lifetime LMS access, 1-on-1 mentorship, and career services. See the [live site](https://neuro-spire.vercel.app/#pricing) for current details.

### Curriculum at a glance

| Week | Focus |
| --- | --- |
| 1 | ChatGPT and prompt engineering, Cursor AI, VS Code and GitHub basics, a first mini project |
| 2 | HTML, CSS, Tailwind CSS and JavaScript, React fundamentals, responsive design |
| 3 | APIs, Supabase and authentication, databases and forms, AI API integration |
| 4 | GitHub collaboration, deployment, resume and LinkedIn optimization, final evaluation |

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

### Prerequisites

- [Node.js](https://nodejs.org) 20 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/omermohammedfarooq/neurospire-lms.git
cd neurospire-lms

# Install dependencies
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page hot-reloads as you edit files.

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
neurospire-lms/
├── public/          # Static assets (logo, images)
├── src/             # Application source (App Router pages, components)
├── next.config.ts   # Next.js configuration
├── postcss.config.mjs
├── eslint.config.mjs
├── tsconfig.json
└── package.json
```

## Deployment

The project is deployed on Vercel. To deploy your own copy:

1. Push the repository to your GitHub account.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Vercel detects Next.js automatically; click **Deploy**.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## Contributing

Contributions, issues, and suggestions are welcome.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## Author

**Mohammed Omer Farooq**
GitHub: [@omermohammedfarooq](https://github.com/omermohammedfarooq)

---

<div align="center">

Built by **Neurospire AI Technologies** · Government of India MSME Registered

</div>
