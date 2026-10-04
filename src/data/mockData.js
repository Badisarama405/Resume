// CareerPilot Realistic Indian IT Mock Data & ATS Matching Engine

export const SAMPLE_CANDIDATES = [
  {
    id: "candidate-1",
    name: "Rahul Sharma",
    headline: "Backend Engineer / Python & Cloud Specialist",
    summary: "Results-driven Backend Engineer with 3.5+ years of experience designing and scaling RESTful APIs, microservices, and asynchronous event architectures using Python, FastAPI, and PostgreSQL. Experienced with AWS cloud infrastructure, Docker, and CI/CD pipelines.",
    email: "rahul.sharma@example.com",
    phone: "+91 98765 43210",
    experienceYears: 3.5,
    education: "B.Tech in Computer Science, VTU Bangalore (2021)",
    currentCompany: "Accenture India",
    currentRole: "Software Engineer",
    currentLocation: "Bangalore",
    targetLocations: ["Bangalore", "Hyderabad", "Pune", "Remote"],
    skills: [
      "Python", "FastAPI", "Django", "PostgreSQL", "Docker", "AWS", 
      "Redis", "Celery", "REST APIs", "Git", "Linux", "Microservices", "SQL"
    ],
    targetTitles: ["Backend Engineer", "Python Developer", "Software Engineer - SDE II"],
    workModes: ["Remote", "Hybrid"],
    expectedSalaryLpa: 18,
    noticePeriodDays: 30,
    resumeFileName: "Rahul_Sharma_Resume_Backend_2026.pdf"
  },
  {
    id: "candidate-2",
    name: "Priya Patel",
    headline: "Frontend & Fullstack Engineer / React & TypeScript",
    summary: "Frontend-focused Software Engineer with 4 years building reactive, high-performance web applications using React, Next.js, TypeScript, and Tailwind CSS. Solid understanding of state management, design systems, and frontend optimization.",
    email: "priya.patel@example.com",
    phone: "+91 91234 56789",
    experienceYears: 4,
    education: "B.E. Information Technology, Pune University (2020)",
    currentCompany: "TCS Digital",
    currentRole: "Systems Engineer",
    currentLocation: "Pune",
    targetLocations: ["Pune", "Bangalore", "Mumbai", "Remote"],
    skills: [
      "React", "TypeScript", "JavaScript", "Next.js", "Tailwind CSS", 
      "HTML5", "CSS3", "Redux Toolkit", "GraphQL", "REST APIs", "Jest", "Git"
    ],
    targetTitles: ["Frontend Engineer", "UI Engineer", "Fullstack Developer"],
    workModes: ["Remote", "Hybrid"],
    expectedSalaryLpa: 20,
    noticePeriodDays: 60,
    resumeFileName: "Priya_Patel_Frontend_Dev.pdf"
  },
  {
    id: "candidate-3",
    name: "Amit Verma",
    headline: "DevOps & Cloud Platform Engineer",
    summary: "Platform & DevOps Engineer with 5 years experience managing Kubernetes clusters, Terraform infrastructure-as-code, and AWS cloud setups for high-traffic financial applications.",
    email: "amit.verma@example.com",
    phone: "+91 97890 12345",
    experienceYears: 5,
    education: "B.Tech Electrical & Electronics, NIT Trichy (2019)",
    currentCompany: "Wipro Technologies",
    currentRole: "Senior DevOps Specialist",
    currentLocation: "Hyderabad",
    targetLocations: ["Hyderabad", "Bangalore", "Remote"],
    skills: [
      "Kubernetes", "Docker", "Terraform", "AWS", "CI/CD", 
      "GitHub Actions", "Prometheus", "Grafana", "Python", "Bash", "Linux", "ArgoCD"
    ],
    targetTitles: ["DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer"],
    workModes: ["Remote", "Hybrid"],
    expectedSalaryLpa: 24,
    noticePeriodDays: 30,
    resumeFileName: "Amit_Verma_DevOps_Platform.pdf"
  }
];

export const MOCK_JOBS = [
  {
    id: "job-101",
    title: "Senior Backend Engineer (Python/FastAPI)",
    company: "Razorpay",
    companyLogo: "💳",
    location: "Bangalore",
    workMode: "Hybrid",
    experienceRequired: "3–6 Years",
    minExp: 3,
    maxExp: 6,
    salaryRange: "₹22 – 32 LPA",
    portalSource: "Direct Careers",
    sourceBadge: "Razorpay Careers API",
    postedDate: "2 hours ago",
    description: "Razorpay is seeking an experienced Backend Engineer to scale our core payments processing pipelines. You will architect high-throughput transaction engines using Python, FastAPI, PostgreSQL, and Kafka. Experience with Docker and AWS is critical.",
    requiredSkills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "Microservices"],
    preferredSkills: ["Kafka", "Redis", "Distributed Systems", "Kubernetes"],
    autoApplySupported: true,
    applyUrl: "https://razorpay.com/careers/backend-eng-101"
  },
  {
    id: "job-102",
    title: "SDE-2 (Backend Services)",
    company: "Swiggy",
    companyLogo: "🍔",
    location: "Bangalore",
    workMode: "Remote",
    experienceRequired: "2–5 Years",
    minExp: 2,
    maxExp: 5,
    salaryRange: "₹24 – 35 LPA",
    portalSource: "LinkedIn",
    sourceBadge: "LinkedIn Verified",
    postedDate: "5 hours ago",
    description: "Swiggy is looking for SDE-2 engineers for the Logistics & Delivery platform team. You will write high-throughput Python and Go microservices handling over 5 million orders daily. Strong grasp of SQL, Celery/Redis caching, and REST APIs required.",
    requiredSkills: ["Python", "FastAPI", "Redis", "Celery", "PostgreSQL", "REST APIs"],
    preferredSkills: ["Go", "RabbitMQ", "Kafka", "Docker"],
    autoApplySupported: true,
    applyUrl: "https://swiggy.careers/job/sde2-backend-102"
  },
  {
    id: "job-103",
    title: "Backend Platform Engineer",
    company: "CRED",
    companyLogo: "💎",
    location: "Bangalore",
    workMode: "On-site",
    experienceRequired: "3–5 Years",
    minExp: 3,
    maxExp: 5,
    salaryRange: "₹26 – 40 LPA",
    portalSource: "Instahire",
    sourceBadge: "Instahire Fast-Track",
    postedDate: "1 day ago",
    description: "Work on CRED's financial rewards and neo-banking microservices architecture. Require proficiency in Python/Django/FastAPI, cloud event loops, Redis distributed locks, and robust relational database tuning.",
    requiredSkills: ["Python", "Django", "PostgreSQL", "AWS", "Redis", "SQL"],
    preferredSkills: ["gRPC", "Docker", "Elasticsearch", "FastAPI"],
    autoApplySupported: true,
    applyUrl: "https://cred.club/careers/backend-eng-103"
  },
  {
    id: "job-104",
    title: "Software Engineer - Payments Gateway",
    company: "PhonePe",
    companyLogo: "📱",
    location: "Hyderabad",
    workMode: "Hybrid",
    experienceRequired: "2–4 Years",
    minExp: 2,
    maxExp: 4,
    salaryRange: "₹20 – 28 LPA",
    portalSource: "Naukri.com",
    sourceBadge: "Naukri Featured",
    postedDate: "1 day ago",
    description: "Join PhonePe's Merchant Payments core team. Develop asynchronous transaction routers using Python, SQL databases, and containerized deployments. Knowledge of Linux internals and Git workflows required.",
    requiredSkills: ["Python", "SQL", "REST APIs", "Git", "Linux", "Docker"],
    preferredSkills: ["FastAPI", "PostgreSQL", "Apache Flink"],
    autoApplySupported: false, // requires manual portal application
    applyUrl: "https://phonepe.com/careers/swe-payments-104"
  },
  {
    id: "job-105",
    title: "Systems Software Engineer (Python)",
    company: "Zerodha",
    companyLogo: "📈",
    location: "Bangalore",
    workMode: "Remote",
    experienceRequired: "2–5 Years",
    minExp: 2,
    maxExp: 5,
    salaryRange: "₹18 – 28 LPA",
    portalSource: "Direct Careers",
    sourceBadge: "Zerodha Tech Portal",
    postedDate: "2 days ago",
    description: "Build clean, pragmatic, bloat-free backend software at India's largest retail brokerage. We value deep understanding of Python, Linux, PostgreSQL, and network socket programming without unnecessary complexity.",
    requiredSkills: ["Python", "PostgreSQL", "Linux", "Git", "REST APIs"],
    preferredSkills: ["FastAPI", "Go", "C", "Docker"],
    autoApplySupported: true,
    applyUrl: "https://zerodha.com/careers/systems-python-105"
  },
  {
    id: "job-106",
    title: "Full Stack Engineer (React + Python)",
    company: "Groww",
    companyLogo: "🌱",
    location: "Bangalore",
    workMode: "Hybrid",
    experienceRequired: "3–5 Years",
    minExp: 3,
    maxExp: 5,
    salaryRange: "₹22 – 30 LPA",
    portalSource: "LinkedIn",
    sourceBadge: "LinkedIn Verified",
    postedDate: "2 days ago",
    description: "Groww mutual funds and stocks investment platform needs versatile engineers capable of writing backend Python APIs and intuitive React client interfaces. High focus on speed, performance, and reliability.",
    requiredSkills: ["Python", "FastAPI", "React", "PostgreSQL", "JavaScript"],
    preferredSkills: ["TypeScript", "Docker", "AWS", "Redis"],
    autoApplySupported: true,
    applyUrl: "https://groww.in/careers/fullstack-106"
  },
  {
    id: "job-107",
    title: "Cloud Infrastructure Engineer",
    company: "Flipkart",
    companyLogo: "🛍️",
    location: "Bangalore",
    workMode: "Hybrid",
    experienceRequired: "3–6 Years",
    minExp: 3,
    maxExp: 6,
    salaryRange: "₹25 – 36 LPA",
    portalSource: "Direct Careers",
    sourceBadge: "Flipkart Careers",
    postedDate: "3 days ago",
    description: "Scale Flipkart's private and public cloud hybrid systems for the Big Billion Days shopping festival. Hands-on experience with Docker, Linux, Python automation scripts, and Prometheus/Grafana monitoring.",
    requiredSkills: ["Docker", "Linux", "Python", "AWS", "Git"],
    preferredSkills: ["Kubernetes", "Terraform", "Prometheus"],
    autoApplySupported: false,
    applyUrl: "https://flipkart.com/careers/cloud-infra-107"
  },
  {
    id: "job-108",
    title: "Backend Developer (Django / FastAPI)",
    company: "Zomato",
    companyLogo: "🛵",
    location: "Gurgaon",
    workMode: "On-site",
    experienceRequired: "2–4 Years",
    minExp: 2,
    maxExp: 4,
    salaryRange: "₹18 – 26 LPA",
    portalSource: "Naukri.com",
    sourceBadge: "Naukri Verified",
    postedDate: "3 days ago",
    description: "Zomato Gold & Dining team is looking for a Python Backend developer with expertise in Django, FastAPI, Celery background workers, and Redis cache invalidation strategies.",
    requiredSkills: ["Python", "Django", "Celery", "Redis", "SQL"],
    preferredSkills: ["FastAPI", "Docker", "PostgreSQL"],
    autoApplySupported: true,
    applyUrl: "https://zomato.com/careers/backend-zomato-108"
  }
];

// ATS Compatibility Scoring Engine (5 Dimensions)
export function calculateAtsMatchScore(candidate, job) {
  if (!candidate || !job) return { totalScore: 0, breakdown: {}, matchedSkills: [], missingSkills: [] };

  const candidateSkillsUpper = (candidate.skills || []).map(s => s.toLowerCase());
  
  // 1. Required Skills Match (Weight: 40%)
  const required = job.requiredSkills || [];
  const matchedRequired = required.filter(skill => candidateSkillsUpper.includes(skill.toLowerCase()));
  const missingRequired = required.filter(skill => !candidateSkillsUpper.includes(skill.toLowerCase()));
  const skillScore = required.length > 0 ? (matchedRequired.length / required.length) * 40 : 35;

  // 2. Preferred Skills Match (Weight: 15%)
  const preferred = job.preferredSkills || [];
  const matchedPreferred = preferred.filter(skill => candidateSkillsUpper.includes(skill.toLowerCase()));
  const missingPreferred = preferred.filter(skill => !candidateSkillsUpper.includes(skill.toLowerCase()));
  const preferredScore = preferred.length > 0 ? (matchedPreferred.length / preferred.length) * 15 : 10;

  // 3. Experience Match (Weight: 25%)
  const candExp = candidate.experienceYears || 0;
  let expScore = 15;
  if (candExp >= job.minExp && candExp <= job.maxExp + 1) {
    expScore = 25; // Perfect fit
  } else if (candExp >= job.minExp - 0.5) {
    expScore = 20; // Very close
  } else {
    expScore = 10;
  }

  // 4. Location & Work Mode Fit (Weight: 10%)
  let locationScore = 4;
  const isRemote = job.workMode?.toLowerCase() === "remote";
  const userWantsRemote = (candidate.workModes || []).includes("Remote");
  const candLocations = (candidate.targetLocations || []).map(l => l.toLowerCase());
  const jobLoc = (job.location || "").toLowerCase();

  if (isRemote && userWantsRemote) {
    locationScore = 10;
  } else if (candLocations.includes(jobLoc)) {
    locationScore = 10;
  } else if (candLocations.includes("remote")) {
    locationScore = 7;
  }

  // 5. Title & Education Relevance (Weight: 10%)
  let titleScore = 8;
  const targetTitles = (candidate.targetTitles || []).map(t => t.toLowerCase());
  const jobTitle = (job.title || "").toLowerCase();
  const titleMatches = targetTitles.some(t => jobTitle.includes(t) || t.includes("backend") && jobTitle.includes("backend") || t.includes("python") && jobTitle.includes("python"));
  if (titleMatches) {
    titleScore = 10;
  }

  const rawTotal = Math.round(skillScore + preferredScore + expScore + locationScore + titleScore);
  const totalScore = Math.min(98, Math.max(25, rawTotal));

  let tier = "Low Match";
  if (totalScore >= 75) tier = "Strong Match";
  else if (totalScore >= 50) tier = "Potential Match";

  return {
    totalScore,
    tier,
    matchedSkills: [...matchedRequired, ...matchedPreferred],
    missingSkills: [...missingRequired, ...missingPreferred],
    breakdown: {
      requiredSkillsScore: Math.round(skillScore),
      preferredSkillsScore: Math.round(preferredScore),
      experienceScore: Math.round(expScore),
      locationScore: Math.round(locationScore),
      titleRelevanceScore: Math.round(titleScore)
    }
  };
}
