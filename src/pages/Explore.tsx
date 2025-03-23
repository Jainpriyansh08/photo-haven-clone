
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExploreItem {
  id: string;
  imageUrl: string;
  likes: number;
  commentCount: number;
  isVideo?: boolean;
}

const Explore = () => {
  const [exploreItems, setExploreItems] = useState<ExploreItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockExploreData: ExploreItem[] = Array.from({ length: 15 }, (_, i) => ({
        id: `explore-${i}`,
        imageUrl: `https://picsum.photos/500/500?random=${i}`,
        likes: Math.floor(Math.random() * 10000),
        commentCount: Math.floor(Math.random() * 1000),
        isVideo: i % 5 === 0, // Make every 5th item a video
      }));
      
      setExploreItems(mockExploreData);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="pb-6">
      <div className="sticky top-0 z-10 px-4 py-2 glass-effect">
        <div className="relative">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-lg pl-10 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700"
          />
        </div>
      </div>

      <div className="mt-2">
        {isLoading ? (
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: 12 }).map((_, index) => (
              <div 
                key={index} 
                className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-1">
            {exploreItems.map((item) => (
              <div key={item.id} className="relative aspect-square">
                <img 
                  src={item.imageUrl} 
                  alt="Explore content" 
                  className="w-full h-full object-cover"
                />
                {item.isVideo && (
                  <div className="absolute top-2 right-2">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-6 w-6 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
