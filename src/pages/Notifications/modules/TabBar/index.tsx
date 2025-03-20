import { Badge } from "@/components/ui/badge";
import { NotificationType } from "@/shared/types/notifications";

type TabBarProps = {
  activeTab: NotificationType;
  setActiveTab: (tab: NotificationType) => void;
  counts: {
    all: number;
    new: number;
    old: number;
    favourite: number;
  };
};

const TabBar = ({ activeTab, setActiveTab, counts }: TabBarProps) => {
  return (
    <div className="flex border-b mb-4">
      <TabButton
        label="Все"
        count={counts.all}
        isActive={activeTab === "all"}
        onClick={() => setActiveTab("all")}
      />
      <TabButton
        label="Новые"
        count={counts.new}
        isActive={activeTab === "new"}
        onClick={() => setActiveTab("new")}
      />
      <TabButton
        label="Прочитанные"
        count={counts.old}
        isActive={activeTab === "old"}
        onClick={() => setActiveTab("old")}
      />
      <TabButton
        label="Избранное"
        count={counts.favourite}
        isActive={activeTab === "favourite"}
        onClick={() => setActiveTab("favourite")}
      />
    </div>
  );
};

type TabButtonProps = {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
};

const TabButton = ({ label, count, isActive, onClick }: TabButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-2 mr-6 relative ${
        isActive ? "text-primary font-medium" : "text-muted-foreground"
      }`}
    >
      <Badge 
        className={`mr-2 ${isActive ? "bg-delete" : "bg-muted"}`}
        variant="outline"
      >
        {count}
      </Badge>
      {label}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></div>
      )}
    </button>
  );
};

export default TabBar;