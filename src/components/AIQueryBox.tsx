import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send, Bot, Key, AlertCircle, ChevronDown } from 'lucide-react';
import { mockMeetings } from '@/data/mockMeetings';
import { mockDocuments } from '@/data/mockDocuments';
import { mockNews } from '@/data/mockNews';

interface AIQueryBoxProps {
  className?: string;
}

const API_PROVIDERS = {
  groq: {
    name: 'Groq',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    model: 'llama3-8b-8192',
    defaultKey: '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',
    keyUrl: 'https://console.groq.com/keys',
    description: 'Fast and free (100 requests/hour)',
  },
  openai: {
    name: 'OpenAI',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o-mini',
    defaultKey: '',
    keyUrl: 'https://platform.openai.com/api-keys',
    description: 'GPT-4o-mini (Free tier: $5/month)',
  },
  perplexity: {
    name: 'Perplexity',
    endpoint: 'https://api.perplexity.ai/chat/completions',
    model: 'llama-3.1-sonar-small-128k-online',
    defaultKey: '',
    keyUrl: 'https://perplexity.ai',
    description: 'Online search capabilities',
  }
};

export const AIQueryBox = ({ className = '' }: AIQueryBoxProps) => {
  const [query, setQuery] = useState('');
  const [provider, setProvider] = useState<keyof typeof API_PROVIDERS>('groq');
  const [apiKey, setApiKey] = useState(API_PROVIDERS.groq.defaultKey);
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

  const handleProviderChange = (newProvider: keyof typeof API_PROVIDERS) => {
    setProvider(newProvider);
    setApiKey(API_PROVIDERS[newProvider].defaultKey);
    setShowApiKey(!API_PROVIDERS[newProvider].defaultKey);
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

      const currentProvider = API_PROVIDERS[provider];
      const requestBody: any = {
        model: currentProvider.model,
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
        max_tokens: 1000,
      };

      // Add provider-specific parameters
      if (provider === 'perplexity') {
        requestBody.top_p = 0.9;
        requestBody.return_images = false;
        requestBody.return_related_questions = false;
        requestBody.frequency_penalty = 1;
        requestBody.presence_penalty = 0;
      }

      const response = await fetch(currentProvider.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
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
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">AI Provider</span>
          </div>
          <Select value={provider} onValueChange={handleProviderChange}>
            <SelectTrigger className="bg-background/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(API_PROVIDERS).map(([key, config]) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center justify-between w-full">
                    <span>{config.name}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {config.description}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!apiKey && (
          <div className="flex items-center gap-2 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <AlertCircle className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning">{API_PROVIDERS[provider].name} API key required</span>
          </div>
        )}
        
        {(showApiKey || !API_PROVIDERS[provider].defaultKey) && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Key className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{API_PROVIDERS[provider].name} API Key</span>
            </div>
            <Input
              type="password"
              placeholder={`Enter your ${API_PROVIDERS[provider].name} API key...`}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="bg-background/50"
            />
            <p className="text-xs text-muted-foreground">
              Get your API key from{' '}
              <a 
                href={API_PROVIDERS[provider].keyUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {API_PROVIDERS[provider].name}
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