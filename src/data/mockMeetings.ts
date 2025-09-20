import { Meeting, TranscriptSegment, MeetingOverview } from '@/types/Meeting';

export const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'NVIDIA Earnings Discussion - Q3 Analysis',
    date: '2024-09-18T14:00:00Z',
    duration: 45,
    participants: [
      { name: 'Sarah', role: 'Senior Analyst', company: 'Goldman Sachs' },
      { name: 'James', role: 'Portfolio Manager', company: 'BlackRock' },
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
      'AI chip demand creating unprecedented backlog',
      'Intel losing market share in data center processors to AMD'
    ],
    status: 'processed',
    stockTickers: ['NVDA', 'INTC'],
    industries: ['Semiconductors', 'Technology'],
    transcript: [
      {
        id: '1',
        speaker: 'Sarah',
        timestamp: '00:02:15',
        text: 'Welcome everyone to our NVIDIA Q3 earnings discussion. The numbers came in significantly above expectations.'
      },
      {
        id: '2',
        speaker: 'James',
        timestamp: '00:02:45',
        text: 'Absolutely, Sarah. The data center revenue growth of 206% year-over-year is unprecedented. This is driven entirely by AI demand.'
      },
      {
        id: '3',
        speaker: 'You',
        timestamp: '00:03:12',
        text: 'What are your thoughts on the sustainability of this growth? Can NVIDIA maintain this momentum?'
      },
      {
        id: '4',
        speaker: 'Sarah',
        timestamp: '00:03:35',
        text: 'The backlog is substantial. Fortune 500 companies are just starting their AI infrastructure buildouts. I see at least 18 months of strong demand.'
      },
      {
        id: '5',
        speaker: 'James',
        timestamp: '00:04:20',
        text: 'However, we should watch Intel closely. They are losing market share rapidly in data centers to AMD and ARM-based solutions.'
      }
    ],
    overview: {
      summary: 'In-depth analysis of NVIDIA\'s Q3 earnings performance, focusing on exceptional data center growth driven by AI demand. Discussion covered competitive dynamics with Intel and AMD, gaming segment recovery prospects, and supply chain improvements.',
      keyTopics: ['AI Infrastructure Demand', 'Data Center Revenue Growth', 'Gaming Recovery', 'Supply Chain Optimization'],
      actionItems: ['Monitor Intel market share trends', 'Track gaming segment Q4 performance', 'Assess supply chain constraint improvements'],
      conclusions: ['NVIDIA positioned for continued AI-driven growth', 'Gaming showing early recovery signs', 'Intel facing structural challenges in data center market']
    }
  },
  {
    id: '2',
    title: 'Healthcare Sector Outlook 2024',
    date: '2024-09-17T10:30:00Z',
    duration: 60,
    participants: [
      { name: 'Soheil', role: 'Healthcare Analyst', company: 'JP Morgan' },
      { name: 'Sarah', role: 'Biotech Specialist', company: 'Fidelity' },
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
      { name: 'James', role: 'Auto Analyst', company: 'Morgan Stanley' },
      { name: 'Soheil', role: 'EV Specialist', company: 'ARK Invest' }
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
      { name: 'Soheil', role: 'Chief Economist', company: 'Deutsche Bank' },
      { name: 'Sarah', role: 'Fixed Income Strategist', company: 'Vanguard' },
      { name: 'James', role: 'Macro Analyst', company: 'Bridgewater' }
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
      { name: 'Sarah', role: 'Energy Analyst', company: 'Goldman Sachs' },
      { name: 'Soheil', role: 'Commodities Trader', company: 'Shell Trading' }
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
  },
  {
    id: '6',
    title: 'Intel Foundry Strategy & Semiconductor Outlook',
    date: '2024-09-13T15:30:00Z',
    duration: 55,
    participants: [
      { name: 'James', role: 'Semiconductor Analyst', company: 'Credit Suisse' },
      { name: 'Soheil', role: 'Tech Hardware Specialist', company: 'T. Rowe Price' },
      { name: 'Sarah', role: 'Industry Expert', company: 'McKinsey' }
    ],
    tags: [
      { name: 'INTC', category: 'stock' },
      { name: 'Semiconductors', category: 'industry' },
      { name: 'Foundry', category: 'topic' }
    ],
    keyInsights: [
      'Intel 18A process node showing promising early results',
      'Government CHIPS Act funding providing crucial support',
      'Competition with TSMC intensifying in advanced nodes',
      'PC market recovery slower than anticipated',
      'Data center losses to AMD and ARM-based chips continuing'
    ],
    status: 'processed',
    stockTickers: ['INTC', 'TSM', 'AMD'],
    industries: ['Semiconductors', 'Technology']
  }
];