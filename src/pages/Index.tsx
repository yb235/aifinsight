import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { AIQueryBox } from '@/components/AIQueryBox';
import { MeetingCard } from '@/components/MeetingCard';
import { DocumentCard } from '@/components/DocumentCard';
import { NewsCard } from '@/components/NewsCard';
import { mockMeetings } from '@/data/mockMeetings';
import { mockDocuments } from '@/data/mockDocuments';
import { mockNews } from '@/data/mockNews';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Mic, Upload, FileText, TrendingUp, Download, Eye, Calendar, Newspaper } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ filters: [], dateRange: {} });

  const filteredMeetings = useMemo(() => {
    return mockMeetings.filter(meeting => {
      const matchesSearch = searchQuery === '' || 
        meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meeting.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        meeting.tags.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilters = filters.filters.length === 0 || 
        meeting.tags.some(tag => filters.filters.includes(tag.category));

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  const handleMeetingClick = (meetingId: string) => {
    navigate(`/meeting/${meetingId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* FinSight Logo Shape */}
              <div className="relative">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <TrendingUp className="h-7 w-7 text-white" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary border-2 border-white rounded-full"></div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-primary font-styrene">
                FinSight
              </h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="default" size="lg">
                <Mic className="h-5 w-5 mr-2" />
                Start Recording
              </Button>
              <Button variant="outline" size="lg">
                <Upload className="h-5 w-5 mr-2" />
                Upload Meeting
              </Button>
              <Button variant="outline" size="lg">
                <FileText className="h-5 w-5 mr-2" />
                Attach Document
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-8">
        <AIQueryBox />
        
        <SearchFilters 
          onSearch={setSearchQuery}
          onFilterChange={setFilters} 
        />

        <Tabs defaultValue="meetings" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-auto grid-cols-3">
              <TabsTrigger value="meetings" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Meetings
                <Badge variant="secondary" className="ml-1">
                  {filteredMeetings.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Documents
                <Badge variant="secondary" className="ml-1">
                  3
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="news" className="flex items-center gap-2">
                <Newspaper className="h-4 w-4" />
                News
                <Badge variant="secondary" className="ml-1">
                  {mockNews.length}
                </Badge>
              </TabsTrigger>
            </TabsList>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Meeting
            </Button>
          </div>

          <TabsContent value="meetings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {filteredMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  onClick={() => handleMeetingClick(meeting.id)}
                />
              ))}
            </div>

            {filteredMeetings.length === 0 && (
              <Card className="border-border/50 bg-card/30">
                <CardContent className="py-12 text-center">
                  <div className="space-y-3">
                    <div className="text-muted-foreground">No meetings found matching your criteria</div>
                    <Button variant="outline" onClick={() => {setSearchQuery(''); setFilters({ filters: [], dateRange: {} });}}>
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onClick={() => console.log('Document clicked:', document.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockNews.map((newsItem) => (
                <NewsCard
                  key={newsItem.id}
                  newsItem={newsItem}
                  onClick={() => console.log('News clicked:', newsItem.id)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;