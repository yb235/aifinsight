import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, Calendar, Database } from 'lucide-react';
import { Document } from '@/data/mockDocuments';

interface DocumentCardProps {
  document: Document;
  onClick?: () => void;
}

export const DocumentCard = ({ document, onClick }: DocumentCardProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return FileText;
      case 'xlsx':
        return Database;
      case 'docx':
        return FileText;
      case 'pptx':
        return FileText;
      default:
        return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'bg-primary/10 text-primary border-primary/30';
      case 'xlsx':
        return 'bg-success/10 text-success border-success/30';
      case 'docx':
        return 'bg-stock-primary/10 text-stock-primary border-stock-primary/30';
      case 'pptx':
        return 'bg-industry-primary/10 text-industry-primary border-industry-primary/30';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const TypeIcon = getTypeIcon(document.type);

  return (
    <Card 
      className="hover:shadow-elevated transition-all duration-300 cursor-pointer group border-border/50 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          {/* Document Type Icon */}
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center border ${getTypeColor(document.type)}`}>
            <TypeIcon className="h-6 w-6" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-lg text-title-black font-styrene leading-tight">
                {document.title}
              </h3>
              <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
              </div>
              <span>{document.size}</span>
              <Badge variant="outline" className={`text-xs uppercase ${getTypeColor(document.type)}`}>
                {document.type}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-1.5 overflow-hidden">
          {document.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs truncate max-w-[100px]">
              {tag}
            </Badge>
          ))}
          {document.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs text-muted-foreground">
              +{document.tags.length - 4}
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3 text-justify leading-relaxed">
          {document.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="text-xs text-muted-foreground truncate">
            Uploaded {new Date(document.uploadDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};