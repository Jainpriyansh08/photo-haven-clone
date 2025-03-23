
import { useEffect, useState } from "react";
import { Check, Heart, User, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ActivityItem {
  id: string;
  username: string;
  avatar: string;
  action: "like" | "follow" | "comment" | "mention" | "tag";
  content?: string;
  timestamp: string;
  isFollowing?: boolean;
}

const ActivityItem = ({ item }: { item: ActivityItem }) => {
  const [isFollowing, setIsFollowing] = useState(item.isFollowing || false);

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const renderActionText = () => {
    switch (item.action) {
      case "like":
        return "liked your photo.";
      case "follow":
        return "started following you.";
      case "comment":
        return `commented: ${item.content}`;
      case "mention":
        return `mentioned you in a comment: ${item.content}`;
      case "tag":
        return "tagged you in a photo.";
      default:
        return "";
    }
  };

  const renderActionIcon = () => {
    switch (item.action) {
      case "like":
        return <Heart className="h-5 w-5 text-red-500 fill-current" />;
      case "follow":
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center py-3 px-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <div className="mr-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
          <img
            src={item.avatar}
            alt={`${item.username}'s avatar`}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start">
          <p className="text-sm truncate">
            <span className="font-semibold">{item.username}</span>{" "}
            {renderActionText()}
          </p>
        </div>
        <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
      </div>
      {item.action === "follow" && (
        <Button
          onClick={handleFollowToggle}
          variant={isFollowing ? "outline" : "default"}
          size="sm"
          className={cn(
            "ml-2 whitespace-nowrap",
            isFollowing 
              ? "border border-gray-300 text-black dark:text-white dark:border-gray-700" 
              : "instagram-button"
          )}
        >
          {isFollowing ? (
            <span className="flex items-center gap-1">
              <Check className="h-4 w-4" /> Following
            </span>
          ) : (
            "Follow"
          )}
        </Button>
      )}
      {(item.action === "like" || item.action === "comment" || item.action === "mention" || item.action === "tag") && (
        <div className="ml-2 w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-md">
          {renderActionIcon()}
        </div>
      )}
    </div>
  );
};

const Activity = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching activity data
    setTimeout(() => {
      const mockActivities: ActivityItem[] = [
        {
          id: "1",
          username: "photography_lover",
          avatar: "https://i.pravatar.cc/150?img=21",
          action: "like",
          timestamp: "1h",
        },
        {
          id: "2",
          username: "travel_addict",
          avatar: "https://i.pravatar.cc/150?img=22",
          action: "follow",
          timestamp: "3h",
          isFollowing: true,
        },
        {
          id: "3",
          username: "food_blogger",
          avatar: "https://i.pravatar.cc/150?img=23",
          action: "comment",
          content: "This looks amazing! Where was this photo taken?",
          timestamp: "5h",
        },
        {
          id: "4",
          username: "fitness_coach",
          avatar: "https://i.pravatar.cc/150?img=24",
          action: "mention",
          content: "Check out this workout by @username!",
          timestamp: "8h",
        },
        {
          id: "5",
          username: "tech_geek",
          avatar: "https://i.pravatar.cc/150?img=25",
          action: "follow",
          timestamp: "10h",
        },
        {
          id: "6",
          username: "art_enthusiast",
          avatar: "https://i.pravatar.cc/150?img=26",
          action: "like",
          timestamp: "12h",
        },
        {
          id: "7",
          username: "book_worm",
          avatar: "https://i.pravatar.cc/150?img=27",
          action: "tag",
          timestamp: "1d",
        },
        {
          id: "8",
          username: "nature_lover",
          avatar: "https://i.pravatar.cc/150?img=28",
          action: "like",
          timestamp: "1d",
        },
      ];
      
      setActivities(mockActivities);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="pb-6">
      <h1 className="text-xl font-semibold p-4">Activity</h1>
      
      <Tabs defaultValue="all">
        <TabsList className="w-full border-b border-gray-200 dark:border-gray-800 px-4">
          <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
          <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="focus:outline-none">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center py-3 px-4 animate-pulse">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-full mr-3"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
                </div>
                <div className="h-8 w-16 bg-gray-200 dark:bg-gray-800 rounded ml-2"></div>
              </div>
            ))
          ) : (
            activities.map(activity => (
              <ActivityItem key={activity.id} item={activity} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="following" className="focus:outline-none">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="h-8 w-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8">
              <User className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg font-medium mb-2">Activity from people you follow</p>
              <p className="text-gray-500 text-center mb-4">When people you follow interact with posts, you'll see it here.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Activity;
