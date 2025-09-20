import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatState {
  query: string;
  provider: string;
  apiKey: string;
  context: string;
}

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatState, setChatState] = useState<ChatState | null>(null);

  const API_PROVIDERS = {
    groq: {
      endpoint: 'https://api.groq.com/openai/v1/chat/completions',
      model: 'llama3-70b-8192',
      defaultKey: '',
      keyUrl: 'https://console.groq.com/keys'
    },
    openai: {
      endpoint: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4o-mini',
      defaultKey: '',
      keyUrl: 'https://platform.openai.com/api-keys'
    },
    perplexity: {
      endpoint: 'https://api.perplexity.ai/chat/completions',
      model: 'llama-3.1-sonar-small-128k-online',
      defaultKey: '',
      keyUrl: 'https://www.perplexity.ai/settings/api'
    }
  };

  useEffect(() => {
    const state = location.state as ChatState;
    if (state) {
      setChatState(state);
      // Add initial user message and process it
      const initialMessage: Message = {
        id: Date.now().toString(),
        role: 'user',
        content: state.query,
        timestamp: new Date()
      };
      setMessages([initialMessage]);
      processQuery(state.query, state);
    } else {
      // Redirect back if no state
      navigate('/');
    }
  }, [location.state, navigate]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const processQuery = async (query: string, state: ChatState) => {
    setIsLoading(true);
    
    try {
      const providerKey = state.provider as keyof typeof API_PROVIDERS;
      const provider = API_PROVIDERS[providerKey];

      // Build a provider-aware request body
      const baseBody: any = {
        model: provider.model,
        messages: [
          { role: 'system', content: state.context },
          { role: 'user', content: query }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      };

      // Perplexity requires/additionally supports some fields; including them reduces 400s
      if (providerKey === 'perplexity') {
        Object.assign(baseBody, {
          top_p: 0.9,
          return_images: false,
          return_related_questions: false,
          search_domain_filter: undefined,
          search_recency_filter: 'month',
          frequency_penalty: 1,
          presence_penalty: 0,
        });
      }

      const response = await fetch(provider.endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(baseBody),
      });

      if (!response.ok) {
        // Try to extract a helpful error message
        let details = '';
        try {
          const errJson = await response.json();
          details = errJson?.error?.message || JSON.stringify(errJson);
        } catch {
          try {
            details = await response.text();
          } catch {
            // ignore
          }
        }
        throw new Error(`API error ${response.status}: ${details || 'Bad Request'}`);
      }

      const data = await response.json();
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: data.choices?.[0]?.message?.content || 'No response received',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Query error:', error);
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Failed to process query'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || !chatState) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    
    await processQuery(currentMessage, chatState);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h1 className="font-semibold text-title-black">FinSight AI Chat</h1>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6 mb-24">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-4",
                message.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <Card className={cn(
                "max-w-[80%] p-4",
                message.role === 'user' 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-card border-border/50"
              )}>
                <div className="prose prose-sm max-w-none">
                  <p className={cn(
                    "text-sm leading-relaxed whitespace-pre-wrap",
                    message.role === 'user' ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {message.content}
                  </p>
                </div>
                <div className={cn(
                  "text-xs mt-2 opacity-70",
                  message.role === 'user' ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </Card>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-secondary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <Card className="max-w-[80%] p-4 bg-card border-border/50">
                <div className="flex items-center gap-2">
                  <div className="animate-pulse flex space-x-1">
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </Card>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-border/50">
          <div className="max-w-4xl mx-auto p-4">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask a follow-up question..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isLoading}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;