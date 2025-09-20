import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, TrendingUp, Newspaper, Calendar, ExternalLink, Eye } from 'lucide-react';
import { mockMeetings } from '@/data/mockMeetings';
import { mockDocuments } from '@/data/mockDocuments';
import { mockNews } from '@/data/mockNews';

interface RelatedContentProps {
  currentItemId?: string;
  currentItemType: 'meeting' | 'document';
  tags?: string[];
  industries?: string[];
  stockTickers?: string[];
}

export const RelatedContent = ({ 
  currentItemId, 
  currentItemType, 
  tags = [], 
  industries = [], 
  stockTickers = [] 
}: RelatedContentProps) => {
  
  // Find related meetings based on tags, industries, or stock tickers
  const relatedMeetings = mockMeetings
    .filter(meeting => meeting.id !== currentItemId)
    .filter(meeting => {
      const hasRelatedTag = meeting.tags.some(tag => 
        tags.some(t => t.toLowerCase().includes(tag.name.toLowerCase()) || tag.name.toLowerCase().includes(t.toLowerCase()))
      );
      const hasRelatedIndustry = meeting.industries?.some(industry => 
        industries.some(i => i.toLowerCase().includes(industry.toLowerCase()) || industry.toLowerCase().includes(i.toLowerCase()))
      );
      const hasRelatedStock = meeting.stockTickers?.some(ticker => 
        stockTickers.some(s => s.toLowerCase() === ticker.toLowerCase())
      );
      return hasRelatedTag || hasRelatedIndustry || hasRelatedStock;
    })
    .slice(0, 2);

  // Find related documents based on tags
  const relatedDocuments = mockDocuments
    .filter(document => {
      const hasRelatedTag = document.tags.some(tag => 
        tags.some(t => t.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(t.toLowerCase()))
      );
      return hasRelatedTag;
    })
    .slice(0, 2);

  // Find related news based on tags or industries
  const relatedNews = mockNews
    .filter(newsItem => {
      const hasRelatedTag = newsItem.tags.some(tag => 
        tags.some(t => t.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(t.toLowerCase())) ||
        industries.some(i => i.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(i.toLowerCase())) ||
        stockTickers.some(s => s.toLowerCase().includes(tag.toLowerCase()) || tag.toLowerCase().includes(s.toLowerCase()))
      );
      return hasRelatedTag;
    })
    .slice(0, 2);

  if (relatedMeetings.length === 0 && relatedDocuments.length === 0 && relatedNews.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-title-black font-styrene">Related Content</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Related Meetings */}
        {relatedMeetings.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                Related Meetings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedMeetings.map((meeting) => (
                <div key={meeting.id} className="p-3 border border-border/30 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-title-black line-clamp-2">{meeting.title}</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-60">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(meeting.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{meeting.duration} min</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {meeting.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Related Documents */}
        {relatedDocuments.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-primary" />
                Related Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedDocuments.map((document) => (
                <div key={document.id} className="p-3 border border-border/30 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-title-black line-clamp-2">{document.title}</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-60">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span className="uppercase">{document.type}</span>
                    <span>•</span>
                    <span>{document.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {document.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Related News */}
        {relatedNews.length > 0 && (
          <Card className="border-border/50 bg-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-sm">
                <Newspaper className="h-4 w-4 text-primary" />
                Related News
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {relatedNews.map((newsItem) => (
                <div key={newsItem.id} className="p-3 border border-border/30 rounded-lg hover:bg-secondary/30 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-sm text-title-black line-clamp-2">{newsItem.title}</h4>
                    <Button variant="ghost" size="icon" className="h-6 w-6 opacity-60">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(newsItem.publishedDate).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{newsItem.source}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {newsItem.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};