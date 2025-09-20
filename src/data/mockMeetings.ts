import { Meeting } from '@/types/Meeting';

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'NVIDIA Earnings Discussion - Q3 Analysis',
    date: '2024-09-18T14:00:00Z',
    duration: 45,
    participants: [
      { name: 'Sarah Chen', role: 'Senior Analyst', company: 'Goldman Sachs' },
      { name: 'Michael Rodriguez', role: 'Portfolio Manager', company: 'BlackRock' },
      { name: 'You', role: 'Investor' }
    ],
    tags: [
      { name: 'NVDA', category: 'stock' },
      { name: 'Semiconductors', category: 'industry' },
      { name: 'AI/ML', category: 'topic' }
    ],
    keyInsights: [
      'Data center revenue growth accelerating beyond expectations',
      'Gaming segment showing signs of recovery in Q4',
      'Supply chain constraints improving but still present',
      'AI chip demand creating unprecedented backlog'
    ],
    status: 'processed',
    stockTickers: ['NVDA'],
    industries: ['Semiconductors', 'Technology']
  },
  {
    id: '2',
    title: 'Healthcare Sector Outlook 2024',
    date: '2024-09-17T10:30:00Z',
    duration: 60,
    participants: [
      { name: 'Dr. Emily Watson', role: 'Healthcare Analyst', company: 'JP Morgan' },
      { name: 'Robert Kim', role: 'Biotech Specialist', company: 'Fidelity' },
      { name: 'Anna Thompson', role: 'Regulatory Expert' }
    ],
    tags: [
      { name: 'Healthcare', category: 'industry' },
      { name: 'Biotech', category: 'industry' },
      { name: 'FDA', category: 'topic' }
    ],
    keyInsights: [
      'Medicare pricing reforms creating headwinds for pharma',
      'Biotech M&A activity expected to increase in H2',
      'GLP-1 drugs driving significant revenue growth',
      'AI drug discovery platforms gaining traction'
    ],
    status: 'processed',
    industries: ['Healthcare', 'Biotechnology', 'Pharmaceuticals']
  },
  {
    id: '3',
    title: 'Tesla Production Call - Cybertruck Update',
    date: '2024-09-16T16:15:00Z',
    duration: 35,
    participants: [
      { name: 'James Liu', role: 'Auto Analyst', company: 'Morgan Stanley' },
      { name: 'Lisa Park', role: 'EV Specialist', company: 'ARK Invest' }
    ],
    tags: [
      { name: 'TSLA', category: 'stock' },
      { name: 'Automotive', category: 'industry' },
      { name: 'EV', category: 'topic' }
    ],
    keyInsights: [
      'Cybertruck production ramping slower than expected',
      'Model 3/Y demand stabilizing in key markets',
      'Energy storage business showing strong growth',
      'Full self-driving progress accelerating'
    ],
    status: 'processed',
    stockTickers: ['TSLA'],
    industries: ['Automotive', 'Clean Energy']
  },
  {
    id: '4',
    title: 'Federal Reserve Policy Discussion',
    date: '2024-09-15T13:45:00Z',
    duration: 50,
    participants: [
      { name: 'David Foster', role: 'Chief Economist', company: 'Deutsche Bank' },
      { name: 'Maria Gonzalez', role: 'Fixed Income Strategist', company: 'Vanguard' },
      { name: 'Tom Wilson', role: 'Macro Analyst', company: 'Bridgewater' }
    ],
    tags: [
      { name: 'Fed Policy', category: 'topic' },
      { name: 'Interest Rates', category: 'topic' },
      { name: 'Inflation', category: 'topic' }
    ],
    keyInsights: [
      'Fed pivoting towards more dovish stance than expected',
      'Core PCE trending lower supporting rate cuts',
      'Labor market cooling but not breaking',
      'Housing market showing signs of stabilization'
    ],
    status: 'processed',
    industries: ['Banking', 'Real Estate', 'Fixed Income']
  },
  {
    id: '5',
    title: 'Oil & Gas Quarterly Review',
    date: '2024-09-14T11:20:00Z',
    duration: 40,
    participants: [
      { name: 'Ahmed Hassan', role: 'Energy Analyst', company: 'Goldman Sachs' },
      { name: 'Jennifer Smith', role: 'Commodities Trader', company: 'Shell Trading' }
    ],
    tags: [
      { name: 'Energy', category: 'industry' },
      { name: 'Oil', category: 'topic' },
      { name: 'Commodities', category: 'topic' }
    ],
    keyInsights: [
      'OPEC+ production cuts supporting price floor',
      'US shale production growth moderating',
      'Refining margins under pressure globally',
      'Energy transition creating structural headwinds'
    ],
    status: 'processing',
    industries: ['Energy', 'Oil & Gas']
  }
];