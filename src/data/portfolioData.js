// Centralized Portfolio Data Configuration

export const personal = {
  name: "Avanindra Tiwari",
  title: "CSE Student | Web Developer | Data Analyst",
  degree: "BCA - Bachelor of Computer Application",
  college: "UNITED UNIVERSITY", // EDITABLE PLACEHOLDER
  location: "Prayagraj, India", // EDITABLE PLACEHOLDER
  email: "avanindratiwari9@gmail.com", // EDITABLE PLACEHOLDER
  phone: "+91 8858981961", // EDITABLE PLACEHOLDER
  github: "https://github.com/Avanindra-tiwari", // EDITABLE PLACEHOLDER
  linkedin: "https://www.linkedin.com/in/avanindra-tiwari-8ab19932a/", // EDITABLE PLACEHOLDER
  resume: "resume.pdf", // EDITABLE PLACEHOLDER
  // ─── PROFILE PHOTO ──────────────────────────────────────────────────────────
  // To use YOUR own photo: replace "/images/profile.jpg" with your image path.
  // Place your photo in the /public/images/ folder, then update the path below.
  // Example: avatar: "/images/your-photo.jpg"
  // Set to "" to show the animated initials fallback instead.
  avatar: "/images/my image.jpeg", // ← REPLACE WITH YOUR REAL PHOTO PATH
  shortIntro: "I build modern web experiences and transform data into meaningful insights using modern development and analytics tools."
};

export const socials = {
  github: personal.github,
  linkedin: personal.linkedin,
  email: `mailto:${personal.email}`
};

export const aboutStats = [
  { value: "03+", label: "Projects Completed" },
  { value: "13+", label: "Technologies" },
  { value: "04+", label: "Analytics Tools" },
  { value: "CSE", label: "Engineering Major" }
];

export const skills = [
  // FRONTEND
  { name: "HTML", level: 92, category: "FRONTEND", color: "#e34f26", icon: "html" },
  { name: "CSS", level: 90, category: "FRONTEND", color: "#1572b6", icon: "css" },
  { name: "JavaScript", level: 84, category: "FRONTEND", color: "#f7df1e", icon: "javascript" },
  { name: "React.js", level: 80, category: "FRONTEND", color: "#61dafb", icon: "react" },

  // PROGRAMMING & DATA
  { name: "Python", level: 88, category: "PROGRAMMING & DATA", color: "#3776ab", icon: "python" },
  { name: "Pandas", level: 86, category: "PROGRAMMING & DATA", color: "#150458", icon: "pandas" },
  { name: "NumPy", level: 82, category: "PROGRAMMING & DATA", color: "#4d77cf", icon: "numpy" },
  { name: "Matplotlib", level: 80, category: "PROGRAMMING & DATA", color: "#11557c", icon: "matplotlib" },
  { name: "Seaborn", level: 78, category: "PROGRAMMING & DATA", color: "#3792cb", icon: "seaborn" },

  // BUSINESS INTELLIGENCE
  { name: "Power BI", level: 76, category: "BUSINESS INTELLIGENCE", color: "#f2c811", icon: "powerbi" },
  { name: "Tableau", level: 76, category: "BUSINESS INTELLIGENCE", color: "#e97627", icon: "tableau" },

  // PRODUCTIVITY
  { name: "Excel", level: 88, category: "PRODUCTIVITY", color: "#217346", icon: "excel" },
  { name: "Google Sheets", level: 86, category: "PRODUCTIVITY", color: "#0f9d58", icon: "sheets" }
];

export const projects = [
  {
    id: "delivery-app",
    number: "01",
    title: "Online Delivery System",
    category: "WEB DEVELOPMENT",
    shortDescription: "A delivery-focused web application concept built around a clean user experience, intuitive flows and responsive interfaces.",
    image: "/images/delivery_app.jpg",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    icon: "code",
    githubUrl: personal.github,
    liveUrl: "#",
    details: {
      problem: "Traditional delivery systems often suffer from cluttered interfaces, delayed status tracking updates, and unintuitive order management workflows.",
      solution: "Engineered a modern single-page delivery dashboard with interactive order tracking status, real-time map indicators, and clean state management.",
      features: [
        "Interactive active order status dashboard",
        "Live trip route map visual indicator",
        "Responsive food item customization and cart flow",
        "Glassmorphism dark theme UI with high performance"
      ],
      role: "Frontend Developer & UI Designer"
    }
  },
  {
    id: "personal-portfolio",
    number: "02",
    title: "Personal Portfolio",
    category: "FRONTEND",
    shortDescription: "A responsive developer portfolio designed to present skills, projects and career goals with polished interactions.",
    image: "/images/portfolio_app.jpg",
    tags: ["React", "CSS", "Framer Motion"],
    icon: "zap",
    githubUrl: personal.github,
    liveUrl: "#",
    details: {
      problem: "Static resumes fail to showcase modern frontend animation mastery, interactive data visualization, or responsive design capabilities.",
      solution: "Created an animated 2026-grade personal portfolio using React, Framer Motion, and CSS Custom Properties with 3D mouse tracking tilt and glassmorphism.",
      features: [
        "Smooth Framer Motion entrance & scroll reveal animations",
        "Mouse-tracking 3D tilt interaction on project cards",
        "Categorized skill tabs with brand color glow halos",
        "Desktop custom cursor and responsive drawer menu"
      ],
      role: "Lead Frontend Architect"
    }
  },
  {
    id: "uber-analytics",
    number: "03",
    title: "Uber Data Analysis",
    category: "DATA ANALYTICS",
    shortDescription: "An exploratory data analysis project focused on discovering trends, patterns and useful insights from Uber trip data.",
    image: "/images/uber_analytics.jpg",
    tags: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    icon: "chart",
    githubUrl: personal.github,
    liveUrl: "#",
    details: {
      problem: "Raw ride-hailing trip data contains millions of unorganized entries, making it difficult for stakeholders to identify peak demand hours or high-revenue trip routes.",
      solution: "Developed Python data processing scripts using Pandas and NumPy to clean trip logs, analyze temporal patterns, and visualize pickup heatmaps with Seaborn.",
      features: [
        "Exploratory analysis of 1.48M+ trip pickup records",
        "Peak hour volume trends & hourly demand distribution",
        "Geographic pickup hotspot density visualization",
        "Average trip fare and distance trend modeling"
      ],
      role: "Data Analyst & Visualization Developer"
    }
  }
];

export const analyticsData = {
  title: "Uber Data Analysis Showcase",
  subtitle: "Exploratory trip data analytics & actionable insights derived using Python, Pandas & Seaborn",
  metrics: [
    { label: "Total Trip Logs Analyzed", value: "1,483,211", change: "+12.4% vs last period" },
    { label: "Total Revenue Processed", value: "$18.9M", change: "Peak NYC Region" },
    { label: "Average Ride Duration", value: "24.6 Min", change: "Optimal trip efficiency" },
    { label: "Active Drivers Tracked", value: "8,754", change: "99.4% Uptime" }
  ],
  insights: [
    { title: "Peak Demand Hours", value: "5:00 PM – 8:00 PM", desc: "Highest trip volume observed during evening commute hours with 38% surge." },
    { title: "Top Pickup Location", value: "Midtown Manhattan", desc: "Accounts for 42% of weekday trip starts with high density." },
    { title: "Weekend Trip Pattern", value: "+28% Night Rides", desc: "Late-night leisure trips spike between Friday 10 PM and Saturday 2 AM." },
    { title: "Fleet Distribution", value: "62% UberX / 22% Black", desc: "Economy tier drives maximum volume while premium tiers yield higher margin." }
  ]
};

export const educationTimeline = [
  {
    degree: "BCA — Bachelor of Computer Application",
    college: personal.college,
    year: "2024 — 2027", // EDITABLE PLACEHOLDER
    cgpa: "8.5 / 10.0", // EDITABLE PLACEHOLDER
    status: "In Progress",
    description: "Focusing on Software Engineering, Data Structures & Algorithms, Database Systems, Web Development, and Data Analytics."
  }
];

export const certifications = [
  {
    title: "Python for Data Science & Analytics",
    organization: "Coursera / IBM", // EDITABLE PLACEHOLDER
    date: "2025", // EDITABLE PLACEHOLDER
    credentialUrl: "#" // EDITABLE PLACEHOLDER
  },
  {
    title: "React & Modern Web Development",
    organization: "Udemy / Meta", // EDITABLE PLACEHOLDER
    date: "2025", // EDITABLE PLACEHOLDER
    credentialUrl: "#" // EDITABLE PLACEHOLDER
  },
  {
    title: "Business Intelligence & Data Visualization",
    organization: "Microsoft / Tableau", // EDITABLE PLACEHOLDER
    date: "2025", // EDITABLE PLACEHOLDER
    credentialUrl: "#" // EDITABLE PLACEHOLDER
  }
];
