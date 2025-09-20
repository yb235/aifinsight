import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ExternalLink, TrendingUp, Building, Scale, DollarSign } from 'lucide-react';
import { NewsItem } from '@/data/mockNews';

interface NewsCardProps {
  newsItem: NewsItem;
  onClick?: () => void;
}

export const NewsCard = ({ newsItem, onClick }: NewsCardProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'earnings':
        return DollarSign;
      case 'market':
        return TrendingUp;
      case 'technology':
        return Building;
      case 'regulation':
        return Scale;
      default:
        return TrendingUp;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'earnings':
        return 'bg-success/10 text-success border-success/30';
      case 'market':
        return 'bg-stock-primary/10 text-stock-primary border-stock-primary/30';
      case 'technology':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'regulation':
        return 'bg-industry-primary/10 text-industry-primary border-industry-primary/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const CategoryIcon = getCategoryIcon(newsItem.category);

  return (
    <Card 
      className="hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border/50 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          {/* Category Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${getCategoryColor(newsItem.category)}`}>
            <CategoryIcon className="h-6 w-6" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-lg text-title-black font-styrene leading-tight pr-2">
                {newsItem.title}
              </h3>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(newsItem.publishedDate).toLocaleDateString()}</span>
              </div>
              <span className="font-medium">{newsItem.source}</span>
              <Badge variant="outline" className={`text-xs uppercase ${getCategoryColor(newsItem.category)}`}>
                {newsItem.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed text-justify line-clamp-4">
          {newsItem.excerpt}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2 overflow-hidden">
          {newsItem.tags.slice(0, 5).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs truncate max-w-[110px]">
              {tag}
            </Badge>
          ))}
          {newsItem.tags.length > 5 && (
            <Badge variant="secondary" className="text-xs text-muted-foreground">
              +{newsItem.tags.length - 5}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};