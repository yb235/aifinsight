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
        return 'bg-red-50 text-red-600 border-red-200';
      case 'xlsx':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'docx':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'pptx':
        return 'bg-orange-50 text-orange-600 border-orange-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
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
        <div className="flex flex-wrap gap-2">
          {document.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {document.description}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="text-xs text-muted-foreground">
            Uploaded {new Date(document.uploadDate).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};