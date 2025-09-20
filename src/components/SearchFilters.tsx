import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Filter, Calendar as CalendarIcon, X } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

export const SearchFilters = ({ onSearch, onFilterChange }: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});

  const filterOptions = [
    { value: 'stock', label: 'Stocks', color: 'stock-primary' },
    { value: 'industry', label: 'Industries', color: 'industry-primary' },
    { value: 'contact', label: 'Contacts', color: 'contact-primary' },
  ];

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const toggleFilter = (filter: string) => {
    const newFilters = selectedFilters.includes(filter)
      ? selectedFilters.filter(f => f !== filter)
      : [...selectedFilters, filter];
    
    setSelectedFilters(newFilters);
    onFilterChange({ filters: newFilters, dateRange });
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setDateRange({});
    onFilterChange({ filters: [], dateRange: {} });
  };

  return (
    <div className="space-y-4 p-6 bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by contact, stock ticker, company, or keywords..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10 bg-background/50"
          />
        </div>

        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="processed">Processed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-32">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Date Range
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => {
                  setDateRange(range || {});
                  onFilterChange({ filters: selectedFilters, dateRange: range });
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filterOptions.map((option) => (
          <Button
            key={option.value}
            variant={selectedFilters.includes(option.value) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFilter(option.value)}
            className={selectedFilters.includes(option.value) 
              ? `bg-${option.color}/20 text-${option.color} border-${option.color}/40 hover:bg-${option.color}/30` 
              : ''
            }
          >
            <Filter className="h-3 w-3 mr-1" />
            {option.label}
          </Button>
        ))}

        {(selectedFilters.length > 0 || dateRange.from) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="text-xs">
              {filterOptions.find(opt => opt.value === filter)?.label}
              <button
                onClick={() => toggleFilter(filter)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};