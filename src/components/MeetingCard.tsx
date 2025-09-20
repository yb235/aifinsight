import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, TrendingUp, Play } from 'lucide-react';
import { Meeting } from '@/types/Meeting';

interface MeetingCardProps {
  meeting: Meeting;
  onClick?: () => void;
}

export const MeetingCard = ({ meeting, onClick }: MeetingCardProps) => {
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
    <Card 
      className="hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border/50 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {meeting.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{new Date(meeting.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{meeting.participants.length} participants</span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Play className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {meeting.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className={getCategoryColor(tag.category)}>
              {tag.name}
            </Badge>
          ))}
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Key Insights:</h4>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {meeting.keyInsights.slice(0, 2).map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <TrendingUp className="h-3 w-3 mt-1 text-primary" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <FileText className="h-4 w-4" />
            <span>{meeting.duration} min recording</span>
          </div>
          <Badge variant="outline" className="text-xs">
            {meeting.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};