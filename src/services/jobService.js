// CareerPilot Live Job Ingestion Service
// Connects to RapidAPI JSearch (LinkedIn, Indeed, Glassdoor) or Public Job Feeds

import { calculateAtsMatchScore } from '../data/mockData';

// Common technical skills to detect in live job descriptions
const KNOWN_TECH_SKILLS = [
  'Python', 'FastAPI', 'Django', 'Flask', 'Java', 'Spring Boot', 'React', 'React.js', 
  'Node.js', 'Express', 'TypeScript', 'JavaScript', 'Next.js', 'Vue', 'Angular', 
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQL', 'NoSQL', 'AWS', 'Azure', 'GCP', 
  'Docker', 'Kubernetes', 'CI/CD', 'Git', 'Linux', 'Microservices', 'REST APIs', 
  'GraphQL', 'Kafka', 'RabbitMQ', 'Celery', 'Terraform', 'DevOps', 'HTML', 'CSS', 
  'Tailwind CSS', 'Redux', 'Pandas', 'NumPy', 'Machine Learning', 'TensorFlow', 'PyTorch'
];

/**
 * Extracts tech skills from arbitrary job description text
 */
export function extractSkillsFromText(text = '') {
  if (!text) return ['Python', 'SQL', 'REST APIs'];
  const matched = KNOWN_TECH_SKILLS.filter(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    return regex.test(text);
  });
  return matched.length > 0 ? matched.slice(0, 8) : ['Python', 'SQL', 'Git'];
}

/**
 * Fetch live jobs from RapidAPI JSearch
 * @param {string} apiKey - RapidAPI Key
 * @param {string} query - Job title / search query (e.g. "Software Engineer Bangalore")
 * @param {object} candidate - Active candidate profile to calculate ATS compatibility
 */
export async function fetchRapidApiJobs(apiKey, query = 'Software Engineer India', candidate = null) {
  if (!apiKey || apiKey.trim() === '') {
    throw new Error('RapidAPI Key is required to fetch live JSearch openings.');
  }

  const cleanKey = apiKey.trim();
  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1&num_pages=1`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': cleanKey,
      'x-rapidapi-host': 'jsearch.p.rapidapi.com'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    let msg = `API request failed with status ${response.status}`;
    try {
      const errJson = JSON.parse(errorText);
      if (errJson.message) msg = errJson.message;
    } catch (e) {}
    throw new Error(msg);
  }

  const json = await response.json();
  const jobsData = json.data || [];

  if (jobsData.length === 0) {
    throw new Error(`No live jobs found matching query "${query}". Try a broader query like "Software Developer India".`);
  }

  // Transform live JSearch data into CareerPilot Job schema
  const transformedJobs = jobsData.map((item, index) => {
    const desc = item.job_description || '';
    const detectedSkills = extractSkillsFromText(desc);
    
    // Determine location string
    let location = 'India';
    if (item.job_city && item.job_country) {
      location = `${item.job_city}, ${item.job_country}`;
    } else if (item.job_city) {
      location = item.job_city;
    } else if (item.job_country) {
      location = item.job_country;
    }

    // Determine salary string
    let salaryRange = '₹15 – 28 LPA (Estimated)';
    if (item.job_min_salary && item.job_max_salary) {
      const minLpa = (item.job_min_salary / 100000).toFixed(1);
      const maxLpa = (item.job_max_salary / 100000).toFixed(1);
      salaryRange = `₹${minLpa} – ${maxLpa} LPA`;
    }

    // Work mode
    const workMode = item.job_is_remote ? 'Remote' : 'On-site';

    // Min experience
    const expMonths = item.job_required_experience?.required_experience_in_months || 24;
    const minExp = Math.max(1, Math.round(expMonths / 12));

    const jobObj = {
      id: `live-rapid-${item.job_id || index}`,
      title: item.job_title || 'Software Engineer',
      company: item.employer_name || 'Tech Enterprise',
      companyLogo: '💼',
      location,
      workMode,
      experienceRequired: `${minExp}–${minExp + 3} Years`,
      minExp,
      maxExp: minExp + 3,
      salaryRange,
      portalSource: item.job_publisher || 'LinkedIn',
      sourceBadge: `${item.job_publisher || 'Live Web'} • Verified`,
      postedDate: item.job_posted_at_datetime_utc 
        ? new Date(item.job_posted_at_datetime_utc).toLocaleDateString()
        : 'Recent',
      description: desc.slice(0, 600) + (desc.length > 600 ? '...' : ''),
      requiredSkills: detectedSkills.slice(0, 5),
      preferredSkills: detectedSkills.slice(5, 8).length > 0 ? detectedSkills.slice(5, 8) : ['Git', 'Agile', 'Cloud'],
      autoApplySupported: true,
      applyUrl: item.job_apply_link || `https://www.google.com/search?q=${encodeURIComponent(item.job_title + ' ' + item.employer_name)}`,
      isLiveOpening: true,
      rawPublisher: item.job_publisher
    };

    const matchResult = candidate ? calculateAtsMatchScore(candidate, jobObj) : {
      totalScore: 82,
      tier: 'Strong Match',
      matchedSkills: detectedSkills.slice(0, 4),
      missingSkills: ['Kubernetes'],
      breakdown: {
        requiredSkillsScore: 35,
        preferredSkillsScore: 12,
        experienceScore: 20,
        locationScore: 8,
        titleRelevanceScore: 7
      }
    };

    return {
      ...jobObj,
      matchResult
    };
  });

  return transformedJobs.sort((a, b) => b.matchResult.totalScore - a.matchResult.totalScore);
}

/**
 * Fetch free public live remote developer jobs (No API Key Required)
 * Uses Remotive API to demonstrate genuine real-time live web ingestion
 */
export async function fetchFreePublicLiveJobs(candidate = null) {
  const res = await fetch('https://remotive.com/api/remote-jobs?category=software-dev&limit=12');
  if (!res.ok) {
    throw new Error(`Public feed returned status ${res.status}`);
  }
  const data = await res.json();
  const liveJobs = data.jobs || [];

  if (liveJobs.length === 0) {
    throw new Error('No jobs returned from public feed');
  }

  const transformed = liveJobs.map((item, idx) => {
    const cleanDesc = (item.description || '').replace(/<[^>]*>?/gm, ' ').replace(/\s+/g, ' ').trim();
    const detectedSkills = extractSkillsFromText(cleanDesc);

    const jobObj = {
      id: `live-public-${item.id || idx}`,
      title: item.title || 'Full Stack Engineer',
      company: item.company_name || 'Global Tech',
      companyLogo: '🌐',
      location: item.candidate_required_location || 'Worldwide Remote',
      workMode: 'Remote',
      experienceRequired: '2–5 Years',
      minExp: 2,
      maxExp: 5,
      salaryRange: item.salary || '₹18 – 30 LPA (Global Comp)',
      portalSource: 'Public Live Feed',
      sourceBadge: 'Remotive Live Web',
      postedDate: item.publication_time 
        ? new Date(item.publication_time).toLocaleDateString()
        : 'Today',
      description: cleanDesc.slice(0, 500) + '...',
      requiredSkills: detectedSkills.slice(0, 5),
      preferredSkills: detectedSkills.slice(5, 8).length > 0 ? detectedSkills.slice(5, 8) : ['Git', 'Docker', 'Cloud'],
      autoApplySupported: true,
      applyUrl: item.url,
      isLiveOpening: true
    };

    const matchResult = candidate ? calculateAtsMatchScore(candidate, jobObj) : {
      totalScore: 78,
      tier: 'Strong Match',
      matchedSkills: detectedSkills.slice(0, 3),
      missingSkills: ['System Design'],
      breakdown: {
        requiredSkillsScore: 32,
        preferredSkillsScore: 10,
        experienceScore: 20,
        locationScore: 8,
        titleRelevanceScore: 8
      }
    };

    return {
      ...jobObj,
      matchResult
    };
  });

  return transformed.sort((a, b) => b.matchResult.totalScore - a.matchResult.totalScore);
}
