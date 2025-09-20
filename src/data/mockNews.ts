export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedDate: string;
  category: 'market' | 'technology' | 'regulation' | 'earnings';
  excerpt: string;
  imageUrl?: string;
  tags: string[];
  url: string;
}

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'NVIDIA Reports Record Q3 Earnings Driven by AI Demand',
    source: 'Reuters',
    publishedDate: '2024-09-18T16:30:00Z',
    category: 'earnings',
    excerpt: 'NVIDIA Corporation reported exceptional third-quarter earnings, with data center revenue growing 206% year-over-year as artificial intelligence demand continues to surge across enterprise customers.',
    tags: ['NVIDIA', 'Earnings', 'AI', 'Data Centers'],
    url: '#'
  },
  {
    id: '2',
    title: 'Federal Reserve Signals Potential Rate Cuts in December Meeting',
    source: 'Wall Street Journal',
    publishedDate: '2024-09-17T14:15:00Z',
    category: 'market',
    excerpt: 'Fed officials indicated a more dovish stance following recent inflation data showing core PCE trending lower than expected, raising speculation about potential rate cuts in the upcoming December meeting.',
    tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy'],
    url: '#'
  },
  {
    id: '3',
    title: 'Tesla Cybertruck Production Faces Supply Chain Challenges',
    source: 'Bloomberg',
    publishedDate: '2024-09-16T11:45:00Z',
    category: 'technology',
    excerpt: 'Tesla\'s ambitious Cybertruck production timeline encounters obstacles as the company works through complex manufacturing processes and component sourcing for the electric pickup truck.',
    tags: ['Tesla', 'Cybertruck', 'Manufacturing', 'EV'],
    url: '#'
  },
  {
    id: '4',
    title: 'Healthcare Sector Braces for Medicare Drug Price Negotiations',
    source: 'Financial Times',
    publishedDate: '2024-09-15T09:20:00Z',
    category: 'regulation',
    excerpt: 'Pharmaceutical companies prepare for the impact of expanded Medicare drug price negotiations, with analysts projecting significant revenue implications for major biotech firms.',
    tags: ['Healthcare', 'Medicare', 'Drug Pricing', 'Regulation'],
    url: '#'
  },
  {
    id: '5',
    title: 'Oil Prices Stabilize as OPEC+ Maintains Production Strategy',
    source: 'CNBC',
    publishedDate: '2024-09-14T13:10:00Z',
    category: 'market',
    excerpt: 'Crude oil futures find support around current levels as OPEC+ coalition signals commitment to existing production cuts through Q4, despite pressure from consuming nations.',
    tags: ['Oil', 'OPEC', 'Energy', 'Commodities'],
    url: '#'
  },
  {
    id: '6',
    title: 'Intel Foundry Services Secures Major Government Contract',
    source: 'TechCrunch',
    publishedDate: '2024-09-13T10:30:00Z',
    category: 'technology',
    excerpt: 'Intel\'s foundry division wins significant CHIPS Act funding for advanced semiconductor manufacturing, positioning the company to compete more effectively with TSMC in cutting-edge process nodes.',
    tags: ['Intel', 'Semiconductors', 'CHIPS Act', 'Manufacturing'],
    url: '#'
  }
];