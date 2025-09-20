export interface Document {
  id: string;
  title: string;
  type: 'pdf' | 'xlsx' | 'docx' | 'pptx';
  size: string;
  uploadDate: string;
  tags: string[];
  description: string;
  status: 'processed' | 'processing' | 'draft';
}

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Q3 2024 Market Analysis Report',
    type: 'pdf',
    size: '2.4 MB',
    uploadDate: '2024-09-18',
    tags: ['Market Analysis', 'Q3 2024', 'Research'],
    description: 'Comprehensive market analysis covering technology, healthcare, and energy sectors for Q3 2024.',
    status: 'processed'
  },
  {
    id: '2', 
    title: 'Investment Portfolio Summary',
    type: 'xlsx',
    size: '856 KB',
    uploadDate: '2024-09-17',
    tags: ['Portfolio', 'Investments', 'Performance'],
    description: 'Detailed breakdown of current investment positions, performance metrics, and allocation strategies.',
    status: 'processed'
  },
  {
    id: '3',
    title: 'Due Diligence - TechCorp Acquisition',
    type: 'docx',
    size: '1.8 MB',
    uploadDate: '2024-09-16',
    tags: ['Due Diligence', 'M&A', 'Technology'],
    description: 'Due diligence report for potential TechCorp acquisition including financial analysis and risk assessment.',
    status: 'processing'
  }
];