import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchFilters } from '@/components/SearchFilters';
import { MeetingCard } from '@/components/MeetingCard';
import { mockMeetings } from '@/data/mockMeetings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Mic, Upload, FileText } from 'lucide-react';

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-primary">
              FinSight
            </h1>
            
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
        <SearchFilters 
          onSearch={setSearchQuery}
          onFilterChange={setFilters} 
        />

        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Recent Meetings 
            <Badge variant="secondary" className="ml-2">
              {filteredMeetings.length}
            </Badge>
          </h2>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Meeting
          </Button>
        </div>

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
      </div>
    </div>
  );
};

export default Index;