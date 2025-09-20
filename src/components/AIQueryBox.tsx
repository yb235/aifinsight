import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, Key, AlertCircle } from 'lucide-react';
import { mockMeetings } from '@/data/mockMeetings';
import { mockDocuments } from '@/data/mockDocuments';
import { mockNews } from '@/data/mockNews';

interface AIQueryBoxProps {
  className?: string;
}

export const AIQueryBox = ({ className = '' }: AIQueryBoxProps) => {
  const [query, setQuery] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const prepareContext = () => {
    const meetingsContext = mockMeetings.map(meeting => ({
      type: 'meeting',
      title: meeting.title,
      date: meeting.date,
      participants: meeting.participants.map(p => p.name).join(', '),
      keyInsights: meeting.keyInsights,
      tags: meeting.tags.map(t => t.name).join(', '),
      industries: meeting.industries?.join(', ') || '',
      stockTickers: meeting.stockTickers?.join(', ') || ''
    }));

    const documentsContext = mockDocuments.map(doc => ({
      type: 'document',
      title: doc.title,
      docType: doc.type,
      uploadDate: doc.uploadDate,
      tags: doc.tags.join(', '),
      description: doc.description
    }));

    const newsContext = mockNews.map(news => ({
      type: 'news',
      title: news.title,
      source: news.source,
      publishedDate: news.publishedDate,
      category: news.category,
      excerpt: news.excerpt,
      tags: news.tags.join(', ')
    }));

    return {
      meetings: meetingsContext,
      documents: documentsContext,
      news: newsContext
    };
  };

  const handleQuery = async () => {
    if (!query.trim()) return;
    if (!apiKey.trim()) {
      setShowApiKey(true);
      return;
    }

    setIsLoading(true);
    setResponse('');

    try {
      const context = prepareContext();
      const contextString = `
Context: You are analyzing financial meetings, documents, and news. Here's the available data:

MEETINGS (${context.meetings.length} total):
${context.meetings.map(m => `- ${m.title} (${m.date}): ${m.keyInsights.join('; ')} | Tags: ${m.tags} | Industries: ${m.industries} | Stocks: ${m.stockTickers}`).join('\n')}

DOCUMENTS (${context.documents.length} total):
${context.documents.map(d => `- ${d.title} (${d.docType}): ${d.description} | Tags: ${d.tags}`).join('\n')}

NEWS (${context.news.length} total):
${context.news.map(n => `- ${n.title} (${n.source}): ${n.excerpt} | Category: ${n.category} | Tags: ${n.tags}`).join('\n')}

Answer the user's question based on this data. Be specific and reference the relevant meetings, documents, or news items.
      `;

      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: contextString
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data.choices[0]?.message?.content || 'No response received');
    } catch (error) {
      console.error('Query error:', error);
      setResponse(`Error: ${error instanceof Error ? error.message : 'Failed to process query'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      handleQuery();
    }
  };

  return (
    <Card className={`border-border/50 bg-card/30 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-title-black">
          <Bot className="h-5 w-5 text-primary" />
          AI Assistant
          <Badge variant="secondary" className="text-xs">Ask about your data</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!apiKey && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning">Perplexity API key required to use AI assistant</span>
          </div>
        )}
        
        {showApiKey && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Perplexity API Key</span>
            </div>
            <Input
              type="password"
              placeholder="Enter your Perplexity API key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href="https://perplexity.ai" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                perplexity.ai
              </a>
            </p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Ask a question</span>
            <span className="text-xs text-muted-foreground">Cmd/Ctrl + Enter to send</span>
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="What insights can you find about NVIDIA in my meetings?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 bg-background/50"
            />
            <Button 
              onClick={handleQuery} 
              disabled={isLoading || !query.trim()}
              size="sm"
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {response && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Response</span>
            </div>
            <div className="p-4 bg-background/50 border border-border/50 rounded-lg">
              <div className="text-sm whitespace-pre-wrap">{response}</div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted/50" onClick={() => setQuery("What are the key insights from my recent meetings?")}>
            Recent insights
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted/50" onClick={() => setQuery("Which stocks were discussed most frequently?")}>
            Stock mentions
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-muted/50" onClick={() => setQuery("Summarize the latest industry trends from my data")}>
            Industry trends
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};