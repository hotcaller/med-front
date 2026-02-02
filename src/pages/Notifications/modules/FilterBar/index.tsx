import { IconSearch } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NotificationType, SortType } from "@/shared/types/notifications";

type FilterBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortType;
  setSortOption: (option: SortType) => void;
  typeOption: NotificationType | "all";
  setTypeOption: (option: NotificationType | "all") => void;
};

const FilterBar = ({ searchTerm, setSearchTerm, sortOption, setSortOption, typeOption, setTypeOption }: FilterBarProps) => {
  const isFiltered = searchTerm !== "" || typeOption !== "all";
  
  const handleResetFilters = () => {
    setSearchTerm("");
    setTypeOption("all");
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
      <div className="flex flex-col md:flex-row gap-6 items-center w-full"> 
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="oldest">Сначала старые</SelectItem>
            <SelectItem value="a-z">От А до Я</SelectItem>
            <SelectItem value="z-a">От Я до А</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeOption} onValueChange={setTypeOption}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="news">Новости</SelectItem>
            <SelectItem value="reminder">Напоминания</SelectItem>
            <SelectItem value="warning">Предупреждения</SelectItem>
            <SelectItem value="important">Важные</SelectItem>
          </SelectContent>
        </Select>
        
        {isFiltered && (
          <Button 
            variant="outline" 
            onClick={handleResetFilters}
            className="text-sm"
          >
            Сбросить фильтры
          </Button>
        )}
      </div>
      
      <div className="relative w-full md:w-[250px]">
        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-full md:w-[250px] bg-muted"
        />
      </div>
    </div>
  );
};

export default FilterBar;