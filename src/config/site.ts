export const SITE_CONFIG = {
  name: "Uzma Portfolio",
  description: "Full-stack Developer specializing in AI Command Centers and Complex API Integrations",
  email: "03312436713aa@gmail.com",
  phone: "03312436713",
  emails: ["03312436713aa@gmail.com", "techexav@gmail.com"],
  social: {
    github: "https://github.com/Ujk-droid",
    linkedin: "https://www.linkedin.com/in/uzma-khan-4818b42b4",
    facebook: "https://www.facebook.com/profile.php?id=61575998109049",
    instagram: "https://www.instagram.com/_techexavision_official_",
  },
};

export const NAVIGATION = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const SERVICES = [
  {
    title: "Full-stack Development",
    description: "End-to-end web applications using modern frameworks and best practices",
    icon: "Code",
    tech: ["Next.js", "React", "Node.js", "TypeScript"],
  },
  {
    title: "AI Command Centers",
    description: "Intelligent dashboards and automation systems powered by AI",
    icon: "Brain",
    tech: ["FastAPI", "Python", "AI/ML", "Real-time"],
  },
  {
    title: "API Integrations",
    description: "Complex integrations with Odoo, n8n, Twilio, and enterprise systems",
    icon: "Api",
    tech: ["n8n", "REST API", "Webhooks", "Automation"],
  },
  {
    title: "Cloud Deployment",
    description: "Containerized applications deployed on AWS ECS/Fargate",
    icon: "Cloud",
    tech: ["AWS", "Docker", "ECS", "Fargate"],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  video?: string;
  tags: string[];
  link: string;
  type?: "video" | "image" | "external";
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "digital-fte",
    title: "Digital FTE Command Center",
    description: "Autonomous business automation dashboard featuring real-time system monitoring, financial tracking (125k PKR Revenue tracking), and social media AI automation.",
    longDescription: "A comprehensive business automation solution that combines real-time monitoring, financial analytics, and AI-powered social media management into a single unified dashboard.",
    image: "/Media Player 17_03_2026 4_13_25 pm.png",
    video: "/Video Project.mp4",
    tags: ["Next.js", "FastAPI", "AI Automation", "Real-time"],
    link: "#",
    type: "video",
    featured: true,
  },
  {
    id: "social-media-automation",
    title: "Social Media Automation with n8n",
    description: "Full AI-powered workflow using n8n, Tavily, and Hugging Face. Automates Google Sheets reading, AI image generation, and direct LinkedIn publishing.",
    longDescription: "An intelligent automation system that reads content from Google Sheets, generates AI-powered images using Hugging Face, and publishes directly to LinkedIn with optimized engagement.",
    image: "/(1) Activity _ Uzma Khan _ LinkedIn and 2 more pages - Personal - Microsoft Edge 17_03_2026 4_02_42 pm.png",
    tags: ["n8n", "Tavily", "Hugging Face", "LinkedIn API"],
    link: "https://www.linkedin.com/in/uzma-khan-4818b42b4",
    type: "image",
    featured: true,
  },
  {
    id: "aws-cloud-deployment",
    title: "AWS Cloud Deployment (ECS/Docker)",
    description: "Successfully containerized Node.js applications using Docker and deployed on Amazon Elastic Container Service (ECS) with Fargate.",
    longDescription: "Enterprise-grade cloud infrastructure with Docker containerization, AWS ECS orchestration, and Fargate serverless compute for scalable, cost-effective deployments.",
    image: "/(1) Activity _ Uzma Khan _ LinkedIn and 2 more pages - Personal - Microsoft Edge 17_03_2026 4_02_24 pm.png",
    tags: ["AWS", "Docker", "ECS", "Fargate"],
    link: "#",
    type: "image",
    featured: true,
  },
  {
    id: "tropical-tasks",
    title: "Tropical Tasks Management",
    description: "A sleek Task Management dashboard with real-time stats and 100% completion tracking analytics.",
    longDescription: "A modern task management solution featuring real-time statistics, completion analytics, and an intuitive tropical-themed UI for enhanced productivity.",
    image: "/(1) Activity _ Uzma Khan _ LinkedIn and 2 more pages - Personal - Microsoft Edge 17_03_2026 4_02_04 pm.png",
    tags: ["Next.js", "Analytics", "Task Management", "Real-time"],
    link: "#",
    type: "image",
    featured: true,
  },
  {
    id: "ai-command-center",
    title: "AI Command Center",
    description: "Autonomous business dashboard (Next.js & FastAPI)",
    longDescription: "Advanced AI-powered command center for business automation and monitoring.",
    image: "/Media Player 17_03_2026 4_13_25 pm.png",
    tags: ["Next.js", "FastAPI", "AI", "Dashboard"],
    link: "#",
    type: "video",
    video: "/Video Project.mp4",
    featured: false,
  },
  {
    id: "inventory-system",
    title: "Inventory Control System",
    description: "Real-time inventory management system with stock tracking and analytics.",
    longDescription: "A comprehensive inventory management solution with real-time stock tracking, low-stock alerts, and detailed analytics.",
    image: "/invetory.jpg",
    tags: ["Streamlit", "Python", "SQL", "Analytics"],
    link: "https://inventorysystemuzma.streamlit.app/",
    type: "external",
    featured: false,
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Secure password generation tool with customizable complexity options.",
    longDescription: "A security-focused password generator with customizable length, character types, and strength indicators.",
    image: "/pass.jpg",
    tags: ["Streamlit", "Python", "Security"],
    link: "https://passwordgeneratbyuzma.streamlit.app/",
    type: "external",
    featured: false,
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Multi-purpose unit conversion tool for various measurement types.",
    longDescription: "A comprehensive unit converter supporting length, weight, temperature, currency, and more.",
    image: "/scale.avif",
    tags: ["Streamlit", "Python", "Utilities"],
    link: "https://unitconverterbykhan.streamlit.app/",
    type: "external",
    featured: false,
  },
  {
    id: "library-manager",
    title: "Personal Library Manager",
    description: "Digital library management system for book tracking and organization.",
    longDescription: "A personal library management tool for cataloging books, tracking reading progress, and managing collections.",
    image: "/lib.jpg",
    tags: ["Streamlit", "Python", "Database"],
    link: "https://personalmanagerlibrarybyujk.streamlit.app/",
    type: "external",
    featured: false,
  },
  {
    id: "timezone-app",
    title: "Timezone App",
    description: "World timezone converter with meeting scheduler.",
    longDescription: "A timezone management tool for converting times across zones and scheduling international meetings.",
    image: "/time.jpg",
    tags: ["Streamlit", "Python", "Timezone API"],
    link: "https://timezonebyuzma.streamlit.app/",
    type: "external",
    featured: false,
  },
  {
    id: "php-blog",
    title: "PHP & MySQL Blog",
    description: "Full-featured blog platform with admin panel and comment system.",
    longDescription: "A dynamic blog platform built with PHP and MySQL featuring user authentication, admin dashboard, and comment management.",
    image: "/blog.jpg",
    tags: ["PHP", "MySQL", "Bootstrap"],
    link: "#",
    type: "image",
    featured: false,
  },
  {
    id: "ecommerce-figma",
    title: "Ecommerce & Figma Hacks",
    description: "Modern e-commerce UI with advanced Figma design techniques.",
    longDescription: "A cutting-edge e-commerce platform showcasing advanced UI/UX design patterns and Figma prototyping skills.",
    image: "/e.jpg",
    tags: ["Next.js", "Figma", "E-commerce", "UI/UX"],
    link: "https://figmahakathon.vercel.app",
    type: "external",
    featured: false,
  },
];
