import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  IconBell,
  IconBellFilled,
  IconLogout,
  IconMessage,
  IconMessageFilled,
  IconMenu2,
  IconX,
  IconUserStar,
  IconUser,
  IconQrcode,
} from "@tabler/icons-react";
import { useAuthStore } from "@/shared/store/useAuthStore";
import { useState, useEffect } from "react";
import { cn } from "@/shared/lib/utils";
import { useMediaQuery } from "@/shared/hooks/useMediaQuery";
import { toast } from "sonner";
import QRCodeModal from "../QRCodeModal";

type SidebarItem = {
  name: string;
  path: string;
  admin: string;
  icon: React.ReactNode;
  activeIcon: React.ReactNode;
};

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const { isAdmin, logout } = useAuthStore();
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  useEffect(() => {
    setIsSidebarOpen(!isMobile); 
  }, [isMobile]);

  const sidebarItems: SidebarItem[] = [
    {
      name: "Уведомления",
      path: "/notifications",
      admin: "/admin/notifications",
      icon: <IconBell className="h-6 w-6" />,
      activeIcon: <IconBellFilled className="h-6 w-6" />,
    },
    {
      name: "Обратная связь",
      path: "/feedback",
      admin: "/admin/feedback",
      icon: <IconMessage className="h-6 w-6" />,
      activeIcon: <IconMessageFilled className="h-6 w-6" />,
    },
  ];

  const handleNavigation = () => {
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    toast.success("Выход из системы", {
      description: "Вы успешно вышли из системы",
    });
    navigate("/login");
  };

  const handleAdminRedirect = () => {
    navigate("/admin/login");
    if (isMobile) setIsSidebarOpen(false);
  };

  const handleUserRedirect = () => {
    navigate("/");
    if (isMobile) setIsSidebarOpen(false);
  };

  return (
    <>
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 bg-sidebar p-2 rounded-lg shadow-lg"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Открыть меню"
        >
          <IconMenu2 className="h-6 w-6 text-sidebar-foreground" />
        </button>
      )}

      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "h-screen bg-sidebar border-r border-sidebar-border flex flex-col",
          "transition-transform duration-300 ease-in-out z-50",
          isMobile
            ? "fixed top-0 left-0 w-64 max-w-[320px] shadow-xl " +
              (isSidebarOpen ? "translate-x-0" : "-translate-x-full")
            : "w-64 relative"
        )}
      >
        <div className="p-4 relative h-full flex flex-col overflow-y-auto">
          {isMobile && (
            <button
              className="absolute top-2 right-2 p-2 rounded-lg hover:bg-sidebar-hover transition"
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Закрыть меню"
            >
              <IconX className="h-6 w-6 text-sidebar-foreground" />
            </button>
          )}

          <div className="flex items-center mb-8">
            <div className="h-12 w-12 rounded-md flex items-center justify-center shrink-0">
              <span className=" text-black font-bold text-xl">
                <img src="/logo.svg" alt="" />
              </span>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const path = isAdmin ? item.admin : item.path;
              const isActive = currentPath === path;
              return (
                <Link
                  key={item.path}
                  to={path}
                  onClick={handleNavigation}
                  className={cn(
                    "flex items-center px-3 py-3 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-hover"
                  )}
                >
                  <div className="shrink-0">
                    {isActive ? item.activeIcon : item.icon}
                  </div>
                  <span className="ml-3 font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {!isAdmin ? (
            <div className="mt-auto pt-4 flex justify-between items-center">
              <button
                onClick={() => setIsQRModalOpen(true)}
                className="flex items-center px-3 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-hover"
                aria-label="Показать QR-код"
              >
                <div className="shrink-0">
                  <IconQrcode className="h-6 w-6" />
                </div>
              </button>
              
              <button
                onClick={handleAdminRedirect}
                className="flex items-center px-3 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-hover"
                aria-label="Войти как администратор"
              >
                <div className="shrink-0">
                  <IconUserStar className="h-6 w-6" />
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-hover"
                aria-label="Выйти из системы"
              >
                <div className="shrink-0">
                  <IconLogout className="h-6 w-6" />
                </div>
              </button>
            </div>
          ) : (
            <div className="mt-auto pt-4 flex justify-between items-center">
              <button
                onClick={handleUserRedirect}
                className="flex items-center px-3 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-hover"
                aria-label="Перейти в режим пользователя"
              >
                <div className="shrink-0">
                  <IconUser className="h-6 w-6" />
                </div>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-3 rounded-lg transition-colors text-sidebar-foreground hover:bg-sidebar-hover"
                aria-label="Выйти из системы"
              >
                <div className="shrink-0">
                  <IconLogout className="h-6 w-6" />
                </div>
              </button>
            </div>
          )}
        </div>
      </aside>

      <QRCodeModal 
        open={isQRModalOpen} 
        onOpenChange={setIsQRModalOpen} 
      />
    </>
  );
};

export default Sidebar;