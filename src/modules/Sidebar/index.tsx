import { Link, useLocation } from "react-router-dom";
import { 
  IconBell, 
  IconBellFilled, 
  IconMessage, 
  IconMessageFilled, 
  IconShield, 
  IconShieldFilled 
} from "@tabler/icons-react";

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
      name: "Уведомления",
      path: "/notifications",
      icon: <IconBell className="h-6 w-6" />,
      activeIcon: <IconBellFilled className="h-6 w-6" />,
    },
    {
      name: "Обратная связь",
      path: "/feedback",
      icon: <IconMessage className="h-6 w-6" />,
      activeIcon: <IconMessageFilled className="h-6 w-6" />,
    },
    // {
    //   name: "Admin",
    //   path: "/admin",
    //   icon: <IconShield className="h-6 w-6" />,
    //   activeIcon: <IconShieldFilled className="h-6 w-6" />,
    // }, 
    // ! руты /admin/notifications, /admin/feedback
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
                    : "text-sidebar-foreground "
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