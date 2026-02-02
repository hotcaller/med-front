import { IconSearch } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SortType } from "@/shared/types/feedback";

type FilterBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortType;
  setSortOption: (option: SortType) => void;
};

const FilterBar = ({ searchTerm, setSearchTerm, sortOption, setSortOption }: FilterBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-left md:items-center justify-between mb-4">
      <div className="flex gap-6 items-center"> 
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Сортировка" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Сначала новые</SelectItem>
            <SelectItem value="oldest">Сначала старые</SelectItem>
            <SelectItem value="a-z">От А до Я</SelectItem>
            <SelectItem value="z-a">От Я до А</SelectItem>
          </SelectContent>
        </Select>

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