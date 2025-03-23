
import { useState, useEffect } from "react";
import FeedItem, { FeedItemProps } from "@/components/feed/FeedItem";
import Stories from "@/components/feed/Stories";
import { Skeleton } from "@/components/ui/skeleton";

const Home = () => {
  const [feedItems, setFeedItems] = useState<FeedItemProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch feed data
    const fetchFeed = () => {
      setTimeout(() => {
        const mockFeedData: FeedItemProps[] = [
          {
            id: "1",
            username: "travel_enthusiast",
            userAvatar: "https://i.pravatar.cc/150?img=11",
            imageUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
            caption: "Exploring the mountains today! 🏔️ #nature #adventure",
            likes: 1245,
            commentCount: 42,
            timestamp: "2 HOURS AGO"
          },
          {
            id: "2",
            username: "food_lover",
            userAvatar: "https://i.pravatar.cc/150?img=12",
            imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
            caption: "Homemade pasta with fresh ingredients from the garden 🍝 #foodie #homecooking",
            likes: 879,
            commentCount: 28,
            timestamp: "5 HOURS AGO"
          },
          {
            id: "3",
            username: "urban_photographer",
            userAvatar: "https://i.pravatar.cc/150?img=13",
            imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785",
            caption: "City lights and urban vibes 🌃 #cityscape #nightphotography",
            likes: 2134,
            commentCount: 56,
            timestamp: "8 HOURS AGO"
          },
          {
            id: "4",
            username: "fitness_coach",
            userAvatar: "https://i.pravatar.cc/150?img=14",
            imageUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
            caption: "Morning workout routine completed! 💪 #fitness #motivation",
            likes: 1562,
            commentCount: 37,
            timestamp: "23 HOURS AGO"
          },
        ];
        
        setFeedItems(mockFeedData);
        setIsLoading(false);
      }, 1500); // Simulate network delay
    };

    fetchFeed();
  }, []);

  return (
    <div className="pb-6">
      <Stories />
      
      {isLoading ? (
        // Skeleton loading state
        Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="feed-card mb-6">
            <div className="px-4 py-3 flex items-center">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-32 ml-3" />
            </div>
            <Skeleton className="w-full aspect-square" />
            <div className="p-4">
              <div className="flex justify-between mb-2">
                <div className="flex space-x-4">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-4 w-full mb-1" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-3 w-16 mt-2" />
            </div>
          </div>
        ))
      ) : (
        feedItems.map((item) => (
          <FeedItem key={item.id} {...item} />
        ))
      )}
    </div>
  );
};

export default Home;
