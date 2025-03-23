
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StoryProps {
  username: string;
  avatar: string;
  isViewed?: boolean;
}

const StoryItem = ({ username, avatar, isViewed = false }: StoryProps) => {
  return (
    <div className="flex flex-col items-center px-3">
      <div className={cn(
        "p-[2px] rounded-full mb-1",
        isViewed ? "bg-gray-300 dark:bg-gray-700" : "instagram-gradient"
      )}>
        <div className="bg-white dark:bg-black p-[2px] rounded-full">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
            <img
              src={avatar}
              alt={`${username}'s story`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <span className="text-xs truncate w-16 text-center">{username}</span>
    </div>
  );
};

const Stories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Sample story data
  const stories = [
    { username: "your_story", avatar: "https://i.pravatar.cc/150?img=1", isViewed: false },
    { username: "user_one", avatar: "https://i.pravatar.cc/150?img=2", isViewed: false },
    { username: "travel_guy", avatar: "https://i.pravatar.cc/150?img=3", isViewed: false },
    { username: "foodie", avatar: "https://i.pravatar.cc/150?img=4", isViewed: true },
    { username: "photographer", avatar: "https://i.pravatar.cc/150?img=5", isViewed: false },
    { username: "designer", avatar: "https://i.pravatar.cc/150?img=6", isViewed: true },
    { username: "coder", avatar: "https://i.pravatar.cc/150?img=7", isViewed: false },
    { username: "influencer", avatar: "https://i.pravatar.cc/150?img=8", isViewed: true },
    { username: "artist", avatar: "https://i.pravatar.cc/150?img=9", isViewed: false },
    { username: "musician", avatar: "https://i.pravatar.cc/150?img=10", isViewed: false },
  ];

  return (
    <div className="relative mb-4">
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto py-4 no-scrollbar"
        onScroll={handleScroll}
      >
        {stories.map((story, index) => (
          <StoryItem
            key={index}
            username={story.username}
            avatar={story.avatar}
            isViewed={story.isViewed}
          />
        ))}
      </div>
      
      {showLeftScroll && (
        <button 
          onClick={scrollLeft} 
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md focus:outline-none z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}
      
      {showRightScroll && (
        <button 
          onClick={scrollRight} 
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md focus:outline-none z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Stories;
