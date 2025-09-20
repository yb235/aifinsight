import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { SearchFilters } from '@/components/SearchFilters';
import { MeetingCard } from '@/components/MeetingCard';
import { mockMeetings } from '@/data/mockMeetings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Mic, Upload, Zap } from 'lucide-react';

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
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-8">

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mic className="h-4 w-4 mr-2" />
                  Record New Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Audio File
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Manual Entry
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Top Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Technology</span>
                    <Badge variant="secondary">42</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Healthcare</span>
                    <Badge variant="secondary">28</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Energy</span>
                    <Badge variant="secondary">19</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Financial Services</span>
                    <Badge variant="secondary">15</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Processing Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Queue:</span>
                    <span className="text-primary">2 pending</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing:</span>
                    <span className="text-primary">1 active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completed:</span>
                    <span className="text-primary">244 total</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;