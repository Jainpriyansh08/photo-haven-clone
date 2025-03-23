
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const BottomNavigation = () => {
  const location = useLocation();
  const path = location.pathname;

  const navItems = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/explore", icon: Search, label: "Explore" },
    { to: "/create", icon: PlusSquare, label: "Create" },
    { to: "/activity", icon: Heart, label: "Activity" },
    { to: "/profile", icon: User, label: "Profile" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 glass-effect border-t border-gray-200 dark:border-gray-800">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "bottom-nav-item",
              path === item.to ? "bottom-nav-item-active" : "bottom-nav-item-inactive"
            )}
            aria-label={item.label}
          >
            <item.icon className={cn(
              "w-6 h-6 transition-transform duration-300",
              path === item.to ? "scale-110" : "scale-100"
            )} />
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
