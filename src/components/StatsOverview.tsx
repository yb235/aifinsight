import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, FileText, Clock, BarChart3 } from 'lucide-react';

export const StatsOverview = () => {
  const stats = [
    {
      title: 'Total Meetings',
      value: '247',
      change: '+12%',
      icon: FileText,
      gradient: 'from-primary to-stock-secondary'
    },
    {
      title: 'Active Contacts',
      value: '89',
      change: '+5%',
      icon: Users,
      gradient: 'from-contact-primary to-contact-secondary'
    },
    {
      title: 'Hours Analyzed',
      value: '1,420',
      change: '+24%',
      icon: Clock,
      gradient: 'from-industry-primary to-industry-secondary'
    },
    {
      title: 'Key Insights',
      value: '1,847',
      change: '+18%',
      icon: TrendingUp,
      gradient: 'from-stock-primary to-primary'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
              {stat.title}
              <stat.icon className="h-4 w-4" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-2">
              <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className="text-sm text-success font-medium">
                {stat.change}
              </div>
            </div>
          </CardContent>
          <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${stat.gradient} opacity-60`} />
        </Card>
      ))}
    </div>
  );
};