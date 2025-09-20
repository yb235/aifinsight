import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { RelatedContent } from '@/components/RelatedContent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { mockMeetings } from '@/data/mockMeetings';
import { Meeting } from '@/types/Meeting';
import { ArrowLeft, Clock, Users, FileText, TrendingUp, Play, Pause } from 'lucide-react';

const MeetingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const foundMeeting = mockMeetings.find(m => m.id === id);
    setMeeting(foundMeeting || null);
  }, [id]);

  if (!meeting) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Meeting not found</h1>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'stock':
        return 'bg-stock-primary/10 text-stock-primary border-stock-primary/20';
      case 'industry':
        return 'bg-industry-primary/10 text-industry-primary border-industry-primary/20';
      case 'contact':
        return 'bg-contact-primary/10 text-contact-primary border-contact-primary/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-title-black font-styrene">{meeting.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{new Date(meeting.date).toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{meeting.participants.length} participants</span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>{meeting.duration} min recording</span>
              </div>
              <Badge variant="outline">{meeting.status}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {meeting.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className={getCategoryColor(tag.category)}>
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Meeting Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {meeting.overview?.summary || 'This meeting covered key developments and strategic insights across various market sectors, with detailed analysis of company performance and industry trends.'}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Key Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {meeting.keyInsights.map((insight, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span>{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {meeting.overview?.actionItems && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Action Items</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {meeting.overview.actionItems.map((item, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <div className="h-2 w-2 rounded-full bg-warning mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Participants</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {meeting.participants.map((participant, index) => (
                        <div key={index} className="space-y-1">
                          <div className="font-medium">{participant.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {participant.role}
                            {participant.company && ` • ${participant.company}`}
                          </div>
                          {index < meeting.participants.length - 1 && (
                            <Separator className="mt-3" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {meeting.stockTickers && meeting.stockTickers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Stocks Discussed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {meeting.stockTickers.map((ticker, index) => (
                          <Badge key={index} variant="secondary" className="bg-stock-primary/10 text-stock-primary">
                            {ticker}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {meeting.industries && meeting.industries.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Industries</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {meeting.industries.map((industry, index) => (
                          <Badge key={index} variant="secondary" className="bg-industry-primary/10 text-industry-primary">
                            {industry}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Meeting Transcript</CardTitle>
                  <Button variant="outline" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isPlaying ? 'Pause' : 'Play'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {meeting.transcript ? (
                    meeting.transcript.map((segment, index) => (
                      <div key={segment.id} className="flex space-x-4 py-2 hover:bg-muted/50 rounded-lg px-2">
                        <div className="text-sm text-muted-foreground font-mono min-w-[60px]">
                          {segment.timestamp}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm mb-1">{segment.speaker}</div>
                          <div className="text-muted-foreground">{segment.text}</div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Transcript is being processed...</p>
                      <p className="text-sm mt-2">This feature will be available once the meeting analysis is complete.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Content Section */}
        <RelatedContent
          currentItemId={meeting.id}
          currentItemType="meeting"
          tags={meeting.tags.map(tag => tag.name)}
          industries={meeting.industries}
          stockTickers={meeting.stockTickers}
        />
      </div>
    </div>
  );
};

export default MeetingDetail;