import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, TrendingUp, Play, Building2, DollarSign, Phone, Cpu, Heart, Car, Landmark, Fuel, Microchip } from 'lucide-react';
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

  const getTitleSpecificIcon = (title: string) => {
    const titleLower = title.toLowerCase();
    
    if (titleLower.includes('nvidia') || titleLower.includes('ai')) return Cpu;
    if (titleLower.includes('healthcare') || titleLower.includes('biotech')) return Heart;
    if (titleLower.includes('tesla') || titleLower.includes('cybertruck') || titleLower.includes('automotive')) return Car;
    if (titleLower.includes('federal reserve') || titleLower.includes('fed') || titleLower.includes('policy')) return Landmark;
    if (titleLower.includes('oil') || titleLower.includes('gas') || titleLower.includes('energy')) return Fuel;
    if (titleLower.includes('intel') || titleLower.includes('semiconductor') || titleLower.includes('foundry')) return Microchip;
    
    // Fallback to category-based icons
    const hasStock = meeting.tags.some(tag => tag.category.toLowerCase() === 'stock');
    const hasIndustry = meeting.tags.some(tag => tag.category.toLowerCase() === 'industry');
    const hasContact = meeting.tags.some(tag => tag.category.toLowerCase() === 'contact');

    if (hasStock) return DollarSign;
    if (hasIndustry) return Building2;
    if (hasContact) return Phone;
    return FileText;
  };

  const ThumbnailIcon = getTitleSpecificIcon(meeting.title);

  return (
    <Card 
      className="hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border/50 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          {/* Minimal Thumbnail */}
          <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-lg flex items-center justify-center border border-border">
            <ThumbnailIcon className="h-6 w-6 text-primary" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-lg text-title-black font-styrene leading-tight">
                {meeting.title}
              </h3>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <Play className="h-4 w-4" />
              </Button>
            </div>
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
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {meeting.tags.slice(0, 6).map((tag, index) => (
            <Badge key={index} variant="secondary" className={`text-xs truncate max-w-[120px] ${getCategoryColor(tag.category)}`}>
              {tag.name}
            </Badge>
          ))}
          {meeting.tags.length > 6 && (
            <Badge variant="secondary" className="text-xs text-muted-foreground">
              +{meeting.tags.length - 6} more
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-sm text-title-black">Key Insights:</h4>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {meeting.keyInsights.slice(0, 2).map((insight, index) => (
              <li key={index} className="flex items-start space-x-2">
                <TrendingUp className="h-3 w-3 mt-1 text-primary flex-shrink-0" />
                <span className="line-clamp-2 text-justify leading-relaxed">{insight}</span>
              </li>
            ))}
          </ul>
        </div>

      </CardContent>
    </Card>
  );
};