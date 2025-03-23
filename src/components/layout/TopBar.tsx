
import { Link } from "react-router-dom";
import { MessageCircle, Heart, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const TopBar = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 h-14 glass-effect border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4">
      <Link to="/" className="flex items-center">
        <h1 className="text-xl font-semibold">Instagram</h1>
      </Link>
      
      <div className="flex items-center space-x-4">
        <Link to="/create" aria-label="Create new post">
          <PlusSquare className={cn("w-6 h-6 transition-transform duration-300 hover:scale-110")} />
        </Link>
        <Link to="/activity" aria-label="Activity">
          <Heart className={cn("w-6 h-6 transition-transform duration-300 hover:scale-110")} />
        </Link>
        <Link to="/messages" aria-label="Messages">
          <MessageCircle className={cn("w-6 h-6 transition-transform duration-300 hover:scale-110")} />
        </Link>
      </div>
    </header>
  );
};

export default TopBar;
