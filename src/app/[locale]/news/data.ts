import type { NewsCard } from './lib';

export const FEATURED_ARTICLES: NewsCard[] = [
  {
    id: 'featured-1',
    title: 'What Building for the U.S. Taught Us About Outbound Calling',
    slug: 'what-building-for-the-us-taught-us',
    excerpt:
      'See how solving real U.S. outbound calling challenges led Coldi to build automated local caller ID matching and TCPA-aware calling logic directly into its platform.',
    image: '/images/news/heroes/featured-us-calling.png',
    category: 'Use Cases',
    created_at: '2026-08-08',
  },
  {
    id: 'featured-2',
    title: 'The Impact of AI on the Life Insurance Industry',
    slug: 'impact-of-ai-on-life-insurance',
    excerpt:
      'Discover how AI is reshaping life insurance: from faster underwriting and automated workflows to smarter support for agents and customers.',
    image: '/images/news/heroes/life-insurance.png',
    category: 'Use Cases',
    created_at: '2026-08-08',
  },
  {
    id: 'featured-3',
    title: 'AI technology benefits for real estate brokerage operations efficiency',
    slug: 'ai-benefits-for-real-estate-brokerage',
    excerpt:
      'Explore how AI is transforming real estate brokerage operations, from automated prospecting and follow-ups to smarter lead qualification and more efficient sales teams.',
    image: '/images/news/heroes/real-estate-brokerage.png',
    category: 'Use Cases',
    created_at: '2026-08-08',
  },
];

const GRID_TEMPLATES: NewsCard[] = [
  {
    id: 'article-1',
    title: 'Is AI Safe?',
    slug: 'is-ai-safe',
    excerpt:
      'Explore the real risks and benefits of AI, from voice cloning and deepfakes to data privacy, misinformation, and AI hallucinations. See what makes different AI tools safe to use and where users need to stay cautious.',
    image: '/images/news/heroes/is-ai-safe.png',
    category: 'Industry Trends',
    created_at: '2026-09-06',
  },
  {
    id: 'article-2',
    title: 'Will AI Replace Real Estate Agents',
    slug: 'will-ai-replace-real-estate-agents',
    excerpt:
      'AI is transforming real estate from lead generation and property search to automated follow-ups and appointment booking. Discover why AI is more likely to augment real estate agents than replace them.',
    image: '/images/news/heroes/real-estate-city.png',
    category: 'Industry Trends',
    created_at: '2026-09-06',
  },
  {
    id: 'article-3',
    title: 'What Voice AI Works Best for Outbound Sales Calls',
    slug: 'voice-ai-for-outbound-sales',
    excerpt: '',
    image: '/images/news/heroes/outbound-sales.png',
    category: 'How AI Agents Work',
    created_at: '2026-08-15',
  },
  {
    id: 'article-4',
    title: 'What is an Inbound Call Center',
    slug: 'what-is-an-inbound-call-center',
    excerpt: '',
    image: '/images/news/heroes/inbound-center.png',
    category: 'How AI Agents Work',
    created_at: '2026-08-20',
  },
  {
    id: 'article-5',
    title: 'How AI Reduces Costs in Healthcare',
    slug: 'how-ai-reduces-costs-in-healthcare',
    excerpt: '',
    image: '/images/news/heroes/healthcare.png',
    category: 'How AI Agents Work',
    created_at: '2026-08-23',
  },
  {
    id: 'article-6',
    title: 'AI Car in Insurance: Everything You Need to Know',
    slug: 'ai-car-in-insurance',
    excerpt: '',
    image: '/images/news/heroes/car-insurance.png',
    category: 'Industry Trends',
    created_at: '2026-08-30',
  },
  {
    id: 'article-7',
    title: '10 Free and Unlimited LLM Ecosystems and Frameworks',
    slug: 'free-llm-ecosystems-and-frameworks',
    excerpt: '',
    image: '/images/news/heroes/llm-ecosystems.png',
    category: 'Industry Trends',
    created_at: '2026-08-27',
  },
  {
    id: 'article-8',
    title: 'Will AI Replace Real Estate Agents in 2026?',
    slug: 'will-ai-replace-real-estate-agents-2026',
    excerpt: '',
    image: '/images/news/heroes/real-estate-2026.png',
    category: 'How AI Agents Work',
    created_at: '2026-09-01',
  },
];

export const GRID_ARTICLES: NewsCard[] = GRID_TEMPLATES;

export const LISTING_ARTICLES: NewsCard[] = [...FEATURED_ARTICLES, ...GRID_TEMPLATES];
