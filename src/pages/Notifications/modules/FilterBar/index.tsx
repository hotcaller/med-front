import { IconSearch } from "@tabler/icons-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SortType } from "@/shared/types/notifications";

type FilterBarProps = {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortOption: SortType;
  setSortOption: (option: SortType) => void;
};

const FilterBar = ({ searchTerm, setSearchTerm, sortOption, setSortOption }: FilterBarProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <Select value={sortOption} onValueChange={setSortOption}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Сначала новые</SelectItem>
          <SelectItem value="oldest">Сначала старые</SelectItem>
          <SelectItem value="a-z">От А до Я</SelectItem>
          <SelectItem value="z-a">От Я до А</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="relative">
        <IconSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Поиск по названию"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-[250px] bg-muted"
        />
      </div>
    </div>
  );
};

export default FilterBar;