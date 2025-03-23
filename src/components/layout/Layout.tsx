
import { Outlet } from "react-router-dom";
import BottomNavigation from "./BottomNavigation";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";

const Layout = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {isMobile && <TopBar />}
      
      <main className="flex-1 overflow-y-auto no-scrollbar pb-16 md:pb-0 pt-14 md:pt-0 md:px-0">
        <div className="max-w-screen-md mx-auto">
          <Outlet />
        </div>
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default Layout;
