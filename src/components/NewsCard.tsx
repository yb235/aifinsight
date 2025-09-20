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
        return 'bg-green-50 text-green-600 border-green-200';
      case 'market':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'technology':
        return 'bg-purple-50 text-purple-600 border-purple-200';
      case 'regulation':
        return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
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
              <h3 className="font-bold text-lg text-title-black font-styrene leading-tight">
                {newsItem.title}
              </h3>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity ml-2">
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
        <p className="text-sm text-muted-foreground leading-relaxed">
          {newsItem.excerpt}
        </p>

        <div className="flex flex-wrap gap-2">
          {newsItem.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};