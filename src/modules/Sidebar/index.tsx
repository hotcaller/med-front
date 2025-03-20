import { Link, useLocation } from "react-router-dom";
import { 
  Bell, 
  BellRing, 
  MessageSquare, 
  MessageSquareDashed, 
  ShieldCheck, 
  ShieldAlert 
} from "lucide-react";

type SidebarItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const sidebarItems: SidebarItem[] = [
    {
      name: "Notifications",
      path: "/notifications",
      icon: <Bell className="h-6 w-6" />,
      activeIcon: <BellRing className="h-6 w-6" />,
    },
    {
      name: "Feedback",
      path: "/feedback",
      icon: <MessageSquare className="h-6 w-6" />,
      activeIcon: <MessageSquareDashed className="h-6 w-6" />,
    },
    {
      name: "Admin",
      path: "/admin",
      icon: <ShieldCheck className="h-6 w-6" />,
      activeIcon: <ShieldAlert className="h-6 w-6" />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6">
        <div className="flex items-center justify-center mb-8">
          <div className="h-12 w-12 bg-sidebar-primary rounded-md flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-xl">Logo</span>
          </div>
        </div>

        <div className="space-y-2">
          {sidebarItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/10"
                }`}
              >
                <div className="mr-3">
                  {isActive ? item.activeIcon : item.icon}
                </div>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;