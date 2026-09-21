export interface ModuleData {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  notes: string;
  resources: Array<{ name: string; url: string; type: "pdf" | "link" | "zip" }>;
  assignment: {
    title: string;
    description: string;
    deliverable: string;
  };
}

export interface WeekData {
  id: string;
  weekNumber: number;
  title: string;
  subtitle: string;
  description: string;
  modules: ModuleData[];
}

export const COURSE_TITLE = "AI Engineering Program";
export const COURSE_SUBTITLE = "Master fullstack software engineering powered by artificial intelligence tools.";

// ─── BUMP THIS whenever video URLs or module content changes ───────────────────
// Format: "YYYY-MM-DD.rev" — increment rev if multiple changes on same day
export const COURSE_DATA_VERSION = "2026-05-23.2";

export const courseWeeks: WeekData[] = [
  {
    id: "week-1",
    weekNumber: 1,
    title: "AI + Developer Foundations",
    subtitle: "Establish terminal setups, modern developer workflows, and leverage AI code expansion.",
    description: "Deep dive into prompting automation, Cursor AI setups, Git branching strategies, and foundational application lifecycle telemetry.",
    modules: [
      {
        id: "w1-m1",
        title: "ChatGPT & Prompt Engineering",
        duration: "45 mins",
        videoUrl: "https://youtu.be/FmnXO-8yl8c",
        notes: "Master key prompting paradigms: System Prompting, Few-Shot Demonstrations, Chain-of-Thought reasoning, and output template validations. Learn how to construct deterministic prompt structures that prevent LLM model drift.",
        resources: [
          { name: "1 — Programming in Plain English.pdf", url: "/pdfs/1_Programming_in_Plain_English.pdf", type: "pdf" }
        ],
        assignment: {
          title: "Deterministic System Prompt Design",
          description: "Develop a comprehensive system prompt that forces an LLM to consistently output structured telemetry metrics in validated JSON format without adding conversational preambles.",
          deliverable: "Submit the raw system prompt text and 3 validation examples."
        }
      },
      {
        id: "w1-m2",
        title: "Cursor AI Basics",
        duration: "50 mins",
        videoUrl: "https://youtu.be/avFmXuz-o8o",
        notes: "Transition to Cursor, the industry-leading AI-first editor. Understand index parsing, Tab completions, Composer sessions (@-references), and inline command operations to speed up code delivery.",
        resources: [
          { name: "2 — Mastering Cursor AI.pdf", url: "/pdfs/2_Mastering_Cursor_AI.pdf", type: "pdf" }
        ],
        assignment: {
          title: "Cursor Refactoring Sprint",
          description: "Locate a legacy synchronous function, load it inside Cursor Composer, index your codebase, and use Cursor commands to refactor it to asynchronous patterns with robust error blocks.",
          deliverable: "Submit a Git diff showing code improvements before and after refactoring."
        }
      },
      {
        id: "w1-m3",
        title: "VS Code Setup",
        duration: "30 mins",
        videoUrl: "https://youtu.be/auehIEr8FBM",
        notes: "Configure your environment for maximum velocity. Install critical extensions (ESLint, Prettier, GitLens, Tailwind CSS IntelliSense) and customize keybindings, workspace parameters, and terminal configurations.",
        resources: [
          { name: "3 — The Professional Developer Workspace.pdf", url: "/pdfs/3_The_Professional_Developer_Workspace.pdf", type: "pdf" }
        ],
        assignment: {
          title: "Developer Environment Configuration",
          description: "Implement unified Prettier auto-formatting and ESLint code validation parameters inside your local VS Code workspace `settings.json` file.",
          deliverable: "Upload your workspace configuration file (.vscode/settings.json)."
        }
      },
      {
        id: "w1-m4",
        title: "GitHub Basics",
        duration: "40 mins",
        videoUrl: "https://youtu.be/UCM2Z2Xz8Hc",
        notes: "Learn the fundamentals of repository control. Practice remote origins setups, multi-branch code tracking, staging files, executing atomic commits, resolving merge conflicts, and writing pull requests.",
        resources: [
          { name: "4 — Mastering Version Control and GitHub.pdf", url: "/pdfs/4_Mastering_Version_Control_and_GitHub.pdf", type: "pdf" }
        ],
        assignment: {
          title: "Atomic Commit Git Branching Exercise",
          description: "Create a repository on GitHub, check out a local feature branch, commit three separate structured changes, and push the branch to initiate a clean pull request.",
          deliverable: "Submit the GitHub URL of your active Pull Request."
        }
      },
      {
        id: "w1-m5",
        title: "Modern Developer Workflow",
        duration: "35 mins",
        videoUrl: "https://youtu.be/CKTG4GzQBBk",
        notes: "Analyze the professional dev loop: write, test, format, and push. Introduce pre-commit hooks, automatic test runs, lint checks, and continuous code synchronization workflows.",
        resources: [
          { name: "5 — Modern Developer Workflow.pdf", url: "/pdfs/5_Modern_Developer_Workflow.pdf", type: "pdf" }
        ],
        assignment: {
          title: "Husky Hook Setup",
          description: "Initialize a local project, install husky pre-commit hooks, and configure it to automatically run formatting and lint checks on staged files before allowing a git commit.",
          deliverable: "Submit a screenshot of a blocked commit due to linting warnings."
        }
      },
      {
        id: "w1-m6",
        title: "How Websites & Apps Work",
        duration: "45 mins",
        videoUrl: "https://youtu.be/5T8NYQyoMiI",
        notes: "Demystify fullstack infrastructure. Explore DNS mapping, HTTP handshakes, REST API methods (GET, POST, PUT, DELETE), browser DOM compilation, and client-side rendering engines.",
        resources: [
          { name: "6 — Web Architecture Blueprint.pdf", url: "/pdfs/6_Web_Architecture_Blueprint.pdf", type: "pdf" }
        ],
        assignment: {
          title: "Request-Response Lifecycle Telemetry",
          description: "Open browser developer tools, record network traffic during a standard login request, and document the headers, payload parameters, and server response codes.",
          deliverable: "Submit a detailed architectural flowchart tracing the lifecycle."
        }
      },
      {
        id: "w1-m7",
        title: "Mini Project",
        duration: "90 mins",
        videoUrl: "https://youtu.be/2CqjuS0B_Oc",
        notes: "Consolidate Week 1 learnings by engineering a terminal-based automated project outline builder utility leveraging Cursor AI and committing it securely to your remote repository.",
        resources: [
          { name: "7 — Modern Landing Page Blueprint.pdf", url: "/pdfs/7_Modern_Landing_Page_Blueprint.pdf", type: "pdf" }
        ],
        assignment: {
          title: "CLI Auto-Project Prompt Builder",
          description: "Construct a complete, clean Python or Node.js CLI utility that takes inputs and auto-generates optimized prompt matrices for fullstack projects.",
          deliverable: "Submit your final public GitHub repository link."
        }
      }
    ]
  },
  {
    id: "week-2",
    weekNumber: 2,
    title: "Frontend Development",
    subtitle: "Build modern, highly responsive user interfaces using HTML, Tailwind CSS, and React.",
    description: "Learn component composition, state orchestration, layout algorithms, micro-animations, and dynamic frontend telemetry.",
    modules: [
      {
        id: "w2-m1",
        title: "HTML & CSS",
        duration: "50 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Study semantic HTML structures, flexbox alignment matrices, grid systems, custom property tokens, and custom scrollbar styles.",
        resources: [
          { name: "Flexbox and CSS Grid Blueprints.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Semantic UI Scaffold Challenge",
          description: "Scaffold a clean, responsive layout using Flexbox and Grid, making sure the DOM matches HTML5 accessibility standards.",
          deliverable: "Submit raw index.html and style.css files."
        }
      },
      {
        id: "w2-m2",
        title: "Tailwind CSS",
        duration: "40 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Integrate Tailwind CSS version 4. Configure tailwind presets, dark mode classes, HSL tailored gradients, backdrop blur cards, and theme variables.",
        resources: [
          { name: "Tailwind Premium Layout Presets.md", url: "#", type: "link" }
        ],
        assignment: {
          title: "Glassmorphism Card Interface",
          description: "Build a beautiful dashboard bento grid using Tailwind's layout, backdrop-blur, and border-accent classes.",
          deliverable: "Upload your utility class layout markup."
        }
      },
      {
        id: "w2-m3",
        title: "JavaScript Basics",
        duration: "60 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Deep dive into JS syntax: asynchronous functions, array filter methods, map operators, fetch promises, and event tracking.",
        resources: [
          { name: "Async ES6 Cheatsheet.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Asynchronous Telemetry Fetcher",
          description: "Write a JavaScript module that queries an external public REST API asynchronously, parses it, filters items dynamically, and displays it in a grid.",
          deliverable: "Submit JS file containing clean asynchronous logic."
        }
      },
      {
        id: "w2-m4",
        title: "React Basics",
        duration: "55 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Explore the virtual DOM, functional components, JSX rendering parameters, state hooks (useState), and effect hooks (useEffect).",
        resources: [
          { name: "React State Lifecycle.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Interactive State Dashboard",
          description: "Create a standard React component containing a custom search input that filters a state array dynamically upon keystrokes.",
          deliverable: "Submit the React component source code."
        }
      },
      {
        id: "w2-m5",
        title: "Components & Props",
        duration: "45 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Master clean component composition: passing props, destructuring data types, child rendering, and component reusability structures.",
        resources: [
          { name: "Component Composition Models.md", url: "#", type: "link" }
        ],
        assignment: {
          title: "Reusable Data Card Component",
          description: "Build a highly customizable Card component that accepts styling variants and displays custom title/body elements.",
          deliverable: "Submit parent and child React component code."
        }
      },
      {
        id: "w2-m6",
        title: "Responsive Design",
        duration: "40 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Implement mobile-first viewports. Understand layout breaks (sm, md, lg, xl), interactive drawer mechanics, and touch-screen accessibility layouts.",
        resources: [
          { name: "Responsive Viewports CheatSheet.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Mobile-First Adaptive Navbar",
          description: "Design a header navigation bar that collapses into an off-canvas drawer on mobile screens and adjusts list spacing for wide viewports.",
          deliverable: "Upload responsive CSS/Tailwind classes."
        }
      },
      {
        id: "w2-m7",
        title: "Portfolio Project",
        duration: "120 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Develop a premium personal portfolio website. Apply glassmorphism styling, responsive layouts, micro-animations, and deploy details.",
        resources: [
          { name: "Premium Portfolio Guide Brief.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Premium Responsive Developer Portfolio",
          description: "Build, polish, and host a highly responsive, modern glassmorphism portfolio site showcasing week 1 and week 2 achievements.",
          deliverable: "Submit portfolio live URL and GitHub link."
        }
      }
    ]
  },
  {
    id: "week-3",
    weekNumber: 3,
    title: "Backend + AI Integration",
    subtitle: "Integrate database storage, user authentication, and stateful AI API responses.",
    description: "Connect frontend applications to database storage layers (Supabase), secure dashboard routes, and stateful AI APIs.",
    modules: [
      {
        id: "w3-m1",
        title: "APIs",
        duration: "45 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Analyze API protocols: REST vs GraphQL, JSON structures, authentication headers, error codes, and request bodies.",
        resources: [
          { name: "API Reference Guideline.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Fetch API Request Integration",
          description: "Query an authenticated API using custom fetch headers and handle all common error response ranges (400, 401, 500) gracefully.",
          deliverable: "Submit code handling the REST integration."
        }
      },
      {
        id: "w3-m2",
        title: "Supabase Basics",
        duration: "50 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Introduce Supabase backend-as-a-service. Set up projects, configure client libraries, and trace direct client queries.",
        resources: [
          { name: "Supabase Starter Document.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Supabase Project Connection",
          description: "Initialize a Supabase project, integrate the JS SDK, and verify the client credentials handshake.",
          deliverable: "Upload Supabase initialization client code."
        }
      },
      {
        id: "w3-m3",
        title: "Authentication",
        duration: "55 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Configure authorization workflows: JWT session cookies, password validation protocols, login scopes, and secure middleware routes.",
        resources: [
          { name: "Session Auth Blueprint.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Client Route Authentication Guard",
          description: "Construct a React higher-order component or route guard that blocks dashboard access unless a valid JWT token is stored.",
          deliverable: "Submit route validation code."
        }
      },
      {
        id: "w3-m4",
        title: "Database Basics",
        duration: "50 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Study SQL database design. Model schema tables, configure relationship columns, enforce RLS policies, and run basic CRUD requests.",
        resources: [
          { name: "SQL Schema Modelling Blueprint.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Database CRUD Schema Scaffolding",
          description: "Write SQL statements to create tables for a custom application, complete with foreign keys and Row Level Security (RLS) configurations.",
          deliverable: "Submit the clean SQL script."
        }
      },
      {
        id: "w3-m5",
        title: "Forms & Dashboards",
        duration: "60 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Orchestrate complex dashboard forms. Implement dynamic validation, submit payloads asynchronously to databases, and reflect state edits instantly.",
        resources: [
          { name: "Dashboard UI Best Practices.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Dynamic Student Admin Form",
          description: "Create an administrative dashboard form that saves record entries to your Supabase PostgreSQL table on validation.",
          deliverable: "Upload dashboard form code."
        }
      },
      {
        id: "w3-m6",
        title: "AI API Integration",
        duration: "70 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Establish robust connections to the OpenAI/Gemini API keys. Handle chat sessions, specify model hyperparameters (temperature, top_p), and parse streaming responses.",
        resources: [
          { name: "OpenAI API SDK Handbook.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Stateful Chat Completion API Query",
          description: "Build a server-side route that accepts prompt threads, formats them for model evaluation, and returns responses.",
          deliverable: "Submit integration route code."
        }
      },
      {
        id: "w3-m7",
        title: "AI Chatbot Project",
        duration: "150 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Integrate frontend UI and dynamic AI routes to launch a fully stateful custom AI chatbot that retains chat history and has a custom system behavior prompt.",
        resources: [
          { name: "AI Chatbot Project Guidelines.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Fullstack Custom-Tuned AI Chatbot",
          description: "Construct, launch, and host a highly interactive AI Chatbot displaying custom prompt characteristics and persistent chat lists.",
          deliverable: "Submit live chatbot URL and open GitHub repository."
        }
      }
    ]
  },
  {
    id: "week-4",
    weekNumber: 4,
    title: "Deployment + Real Workflow",
    subtitle: "Master developer collaboration, professional deployment, and career profile optimizations.",
    description: "Launch production applications, coordinate developer environments, and refine professional branding.",
    modules: [
      {
        id: "w4-m1",
        title: "GitHub Collaboration",
        duration: "45 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Demystify Git workflows in development teams: rebasing, squashing commits, code reviews, status approvals, and automated checks.",
        resources: [
          { name: "Git Team Collaboration Handbook.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Feature Rebase Conflict Resolution",
          description: "Simulate a branch out-of-sync error, rebase it against a mock main branch, resolve conflicts locally, and force push safely.",
          deliverable: "Submit terminal command logs of the resolution."
        }
      },
      {
        id: "w4-m2",
        title: "Team Workflow",
        duration: "40 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Manage sprint boards: ticket assignment, release tagging, hotfix procedures, and review standards in elite technology environments.",
        resources: [
          { name: "Sprint Delivery Checklist.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Sprint Ticket Scaffolding",
          description: "Outline a complete technical feature into 3 distinct, granular sprint tasks complete with acceptance criteria.",
          deliverable: "Submit the markdown task outlines."
        }
      },
      {
        id: "w4-m3",
        title: "Deployment with Vercel",
        duration: "45 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Explore zero-config hosting on Vercel. Set up environment variables, check automated build scripts, specify serverless route allocations, and configure domains.",
        resources: [
          { name: "SaaS Deployment Guide.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Production Release Configuration",
          description: "Deploy a full Next.js stack, configure secure environment variables on the hosting platform, and map a subdomain.",
          deliverable: "Upload deployment screenshot and domain configuration."
        }
      },
      {
        id: "w4-m4",
        title: "Resume Optimization",
        duration: "40 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Structure a premium software engineer resume. Frame project experiences around business impact, highlight technical competencies, and optimize keywords for ATS tools.",
        resources: [
          { name: "ATS Optimized Resume Template.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Resume Revision Challenge",
          description: "Incorporate the newly acquired AI Engineering capabilities into your professional experiences using impact-oriented action verbs.",
          deliverable: "Submit your revised resume file."
        }
      },
      {
        id: "w4-m5",
        title: "LinkedIn Optimization",
        duration: "40 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Polish your professional presence. Create clean LinkedIn headers, optimize technical summaries, present verified certifications, and draft technical articles.",
        resources: [
          { name: "Professional LinkedIn Branding Kit.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "LinkedIn Technical Profile Makeover",
          description: "Revise your LinkedIn summary section to highlight AI engineering capabilities and write a post summarizing a portfolio project.",
          deliverable: "Submit a screenshot and link to your updated profile."
        }
      },
      {
        id: "w4-m6",
        title: "Real-world Development Workflow",
        duration: "50 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Understand standard code review metrics, build health monitoring, automatic bug reporting pipelines, and server load balancing in enterprise applications.",
        resources: [
          { name: "Enterprise Operations Guide.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Production Incident Analysis",
          description: "Review a mock production build crash log and draft a step-by-step incident resolution report.",
          deliverable: "Upload incident resolution document."
        }
      },
      {
        id: "w4-m7",
        title: "Final Project",
        duration: "180 mins",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
        notes: "Consolidate all skills acquired throughout the course. Build a production-ready fullstack AI SaaS application, complete with secure authentication, database persistence, and optimized UI components.",
        resources: [
          { name: "Final Capstone Guideline Brief.pdf", url: "#", type: "pdf" }
        ],
        assignment: {
          title: "Capstone Fullstack AI SaaS Application",
          description: "Successfully build, test, deploy, and host your final capstone AI SaaS project.",
          deliverable: "Submit your live capstone application URL and the public GitHub repository."
        }
      }
    ]
  }
];
