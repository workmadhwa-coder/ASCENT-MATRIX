import { Speaker, Guest, Event } from './types';

export const POLICY_MAKERS: Guest[] = [
  {
    id: 'pm1',
    name: 'Mr. D K Shivakumar',
    designation: 'Deputy Chief Minister, Govt of Karnataka',
    bio: 'Dynamic leader and businessman driving Karnataka\'s growth story.',
    image: 'https://picsum.photos/seed/dkshivakumar/800/800'
  },
  {
    id: 'pm2',
    name: 'Dr. Abhay Karandikar',
    designation: 'Secretary, DST, Govt. of India',
    bio: 'Leading the Department of Science & Technology with visionary policies.',
    image: 'https://picsum.photos/seed/abhay/800/800'
  },
  {
    id: 'pm3',
    name: 'Mr. K Annamalai',
    designation: 'BJP Vice President, TN',
    bio: 'Former IPS Officer known for his principled leadership.',
    image: 'https://picsum.photos/seed/annamalai/800/800'
  },
  {
    id: 'pm4',
    name: 'Mr. Murugesh Nirani',
    designation: 'Minister of Industries, Karnataka',
    bio: 'Industrialist and minister fostering industrial growth.',
    image: 'https://picsum.photos/seed/murugesh/800/800'
  },
  {
    id: 'pm5',
    name: 'Mr. Priyank Kharge',
    designation: 'Minister of IT & BT, Karnataka',
    bio: 'Championing technology and rural development in the state.',
    image: 'https://picsum.photos/seed/priyank/800/800'
  },
  {
    id: 'pm6',
    name: 'Mr. M B Patil',
    designation: 'Minister for Commerce & Industries',
    bio: 'Infrastructure and commerce visionary for Karnataka.',
    image: 'https://picsum.photos/seed/mbpatil/800/800'
  },
  {
    id: 'pm7',
    name: 'Dr. Ashwath Narayan',
    designation: 'Former Deputy CM, Karnataka',
    bio: 'Key figure in modernizing Karnataka\'s education and IT sectors.',
    image: 'https://picsum.photos/seed/ashwath/800/800'
  },
  {
    id: 'pm8',
    name: 'Mrs. Revathi Kamath',
    designation: 'Educationist & Philanthropist',
    bio: 'Dedicated to educational reform and social welfare.',
    image: 'https://picsum.photos/seed/revathi/800/800'
  },
  {
    id: 'pm9',
    name: 'Dr. Manjula. N, IAS',
    designation: 'Secretary, Dept of IT/BT, Karnataka',
    bio: 'Driving administrative excellence in technology departments.',
    image: 'https://picsum.photos/seed/manjula/800/800'
  },
  {
    id: 'pm10',
    name: 'Dr. S Selva Kumar',
    designation: 'Principal Secretary, Commerce & Ind.',
    bio: 'Strategic administrator for commerce and industrial development.',
    image: 'https://picsum.photos/seed/selva/800/800'
  },
  {
    id: 'pm11',
    name: 'Ms. Nivruti Rai',
    designation: 'MD & CEO, Invest India',
    bio: 'Tech leader spearheading investment initiatives for India.',
    image: 'https://picsum.photos/seed/nivruti/800/800'
  }
];

export const FOUNDERS: Speaker[] = [
  {
    id: 'f1',
    name: 'Mr. Hari',
    title: 'Co-Founder & CTO, HackerRank',
    expertise: 'Tech Hiring & Coding',
    description: 'Revolutionizing technical recruitment globally.',
    image: 'https://picsum.photos/seed/hari/400/400'
  },
  {
    id: 'f2',
    name: 'Mr. Sridhar Vembu',
    title: 'Founder, ZOHO Corp',
    expertise: 'SaaS & Rural Tech',
    description: 'Pioneer of the rural IT revolution in India.',
    image: 'https://picsum.photos/seed/vembu/400/400'
  },
  {
    id: 'f3',
    name: 'Mr. Nikhil Kamat',
    title: 'Co-Founder, Zerodha',
    expertise: 'Fintech & Investment',
    description: 'Disrupting the Indian brokerage industry.',
    image: 'https://picsum.photos/seed/nikhil/400/400'
  },
  {
    id: 'f4',
    name: 'Mr. Naganand Doraswamy',
    title: 'Founder, IdeaSpring Capital',
    expertise: 'Venture Capital',
    description: 'Backing the next generation of deep-tech startups.',
    image: 'https://picsum.photos/seed/naganand/400/400'
  },
  {
    id: 'f5',
    name: 'Mr. Narendra Bhandari',
    title: 'General Partner, SeaFund',
    expertise: 'Early Stage Investing',
    description: 'Empowering startups with capital and mentorship.',
    image: 'https://picsum.photos/seed/narendra/400/400'
  },
  {
    id: 'f6',
    name: 'Dr. H N Suma',
    title: 'Director, BIG Foundation',
    expertise: 'Innovation & Incubation',
    description: 'Fostering innovation ecosystems.',
    image: 'https://picsum.photos/seed/suma/400/400'
  },
  {
    id: 'f7',
    name: 'Dr. Piyush Kumar Soni',
    title: 'Dean, GATCIIE',
    expertise: 'Academic Leadership',
    description: 'Bridging academia and industry through education.',
    image: 'https://picsum.photos/seed/piyush/400/400'
  }
];

export const MENTORS: Speaker[] = [
  {
    id: 'm1',
    name: 'Dr. Hemang Shah',
    title: 'Sr. Director, Applied Materials',
    expertise: 'Semiconductors',
    description: 'Leading government affairs and business development.',
    image: 'https://picsum.photos/seed/hemang/400/400'
  },
  {
    id: 'm2',
    name: 'Siddesh HM Revana',
    title: 'VP, AMD India',
    expertise: 'Computing Hardware',
    description: 'Driving engineering excellence at AMD.',
    image: 'https://picsum.photos/seed/siddesh/400/400'
  },
  {
    id: 'm3',
    name: 'Mr. Arun Shetty',
    title: 'Sr. Director, Cisco',
    expertise: 'Networking Solutions',
    description: 'Expert in solutions engineering and digital transformation.',
    image: 'https://picsum.photos/seed/arun/400/400'
  },
  {
    id: 'm4',
    name: 'Dr. S R Mahadev Prasanna',
    title: 'Director, IIIT Dharwad',
    expertise: 'Technical Education',
    description: 'Shaping the future of IT education.',
    image: 'https://picsum.photos/seed/mahadev/400/400'
  },
  {
    id: 'm5',
    name: 'Dr. Anbarasu',
    title: 'Professor, IIT Madras',
    expertise: 'Research & Development',
    description: 'Advancing scientific research and mentorship.',
    image: 'https://picsum.photos/seed/anbarasu/400/400'
  },
  {
    id: 'm6',
    name: 'Dr. S Asokan',
    title: 'Dean, IISc Bangalore',
    expertise: 'Science & Research',
    description: 'Leading academic excellence at India\'s premier institute.',
    image: 'https://picsum.photos/seed/asokan/400/400'
  },
  {
    id: 'm7',
    name: 'Mr. Vishnuvarshan B S',
    title: 'Director, Bosch',
    expertise: 'Automotive Tech',
    description: 'Innovation leader in mobility solutions.',
    image: 'https://picsum.photos/seed/vishnu/400/400'
  },
  {
    id: 'm8',
    name: 'Mr. Manjunath',
    title: 'Director, MOOG Control',
    expertise: 'Control Systems',
    description: 'Specialist in motion control technology.',
    image: 'https://picsum.photos/seed/manjunath/400/400'
  },
  {
    id: 'm9',
    name: 'Dr. Balakrishna Shetty',
    title: 'Chief Consultant, ISHA',
    expertise: 'Healthcare',
    description: 'Pioneer in diagnostic medicine.',
    image: 'https://picsum.photos/seed/balakrishna/400/400'
  },
  {
    id: 'm10',
    name: 'Dr. Rajaram Shastri',
    title: 'CTO, Premedai labs',
    expertise: 'MedTech',
    description: 'Innovating at the intersection of medicine and AI.',
    image: 'https://picsum.photos/seed/rajaram/400/400'
  }
];

export const FACILITATORS = [
  { name: 'ARTPARK', logo: 'ARTPARK' },
  { name: 'nasscom', logo: 'nasscom' }
];

export const BANKERS = [
  'SBI', 'ICICI Bank', 'HDFC Bank', 'YES Bank', 'HSBC', 'Axis Bank', 'IndusInd Bank', 'Karnataka Bank Ltd.'
];

export const UPCOMING_EVENTS: Event[] = [
  {
    id: 'e1',
    title: 'AI & Robotics Workshop',
    date: 'March 15, 2026',
    description: 'Hands-on session with industry leaders on the future of automation.',
    image: 'https://picsum.photos/800/400?random=20',
    benefits: ['Certificate of Completion', 'Networking Lunch', 'Access to Codebase']
  },
  {
    id: 'e2',
    title: 'Startup Pitch Fest',
    date: 'April 10, 2026',
    description: 'Pitch your idea to top VCs and Angel Investors.',
    image: 'https://picsum.photos/800/400?random=21',
    benefits: ['Investor Access', 'Mentorship Hour', 'Media Coverage']
  }
];

export const TICKET_PRICE = 4999;