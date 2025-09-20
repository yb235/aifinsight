export interface Tag {
  name: string;
  category: 'stock' | 'industry' | 'contact' | 'topic';
}

export interface Participant {
  name: string;
  role: string;
  company?: string;
}

export interface TranscriptSegment {
  id: string;
  speaker: string;
  timestamp: string;
  text: string;
}

export interface MeetingOverview {
  summary: string;
  keyTopics: string[];
  actionItems: string[];
  conclusions: string[];
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  duration: number;
  participants: Participant[];
  tags: Tag[];
  keyInsights: string[];
  status: 'processed' | 'processing' | 'failed';
  transcriptUrl?: string;
  summary?: string;
  stockTickers?: string[];
  industries?: string[];
  transcript?: TranscriptSegment[];
  overview?: MeetingOverview;
}