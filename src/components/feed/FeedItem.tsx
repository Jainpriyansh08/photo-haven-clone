
import { useState } from "react";
import { Heart, MessageCircle, Bookmark, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FeedItemProps {
  id: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  commentCount: number;
  timestamp: string;
}

const FeedItem = ({
  username,
  userAvatar,
  imageUrl,
  caption,
  likes,
  commentCount,
  timestamp
}: FeedItemProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(isLiked ? currentLikes - 1 : currentLikes + 1);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <article className="feed-card mb-6 animate-fade-in">
      <div className="flex items-center px-4 py-3">
        <div className="story-ring mr-3">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img 
              src={userAvatar} 
              alt={`${username}'s avatar`} 
              className="w-full h-full object-cover"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">{username}</p>
        </div>
        <button className="text-gray-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </button>
      </div>

      <div className="relative overflow-hidden bg-gray-100 aspect-square">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt="Post"
          className={cn(
            "w-full h-full object-cover",
            imageLoaded ? "opacity-100" : "opacity-0",
            "transition-opacity duration-300"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      <div className="px-4 pt-4">
        <div className="flex justify-between mb-2">
          <div className="flex space-x-4">
            <button 
              onClick={handleLike}
              className={cn(
                "focus:outline-none transition-transform duration-200 active:scale-125",
                isLiked ? "text-red-500" : "text-black dark:text-white"
              )}
            >
              <Heart className={cn("w-6 h-6", isLiked ? "fill-current" : "")} />
            </button>
            <button className="focus:outline-none transition-transform duration-200 active:scale-125">
              <MessageCircle className="w-6 h-6" />
            </button>
            <button className="focus:outline-none transition-transform duration-200 active:scale-125">
              <Send className="w-6 h-6" />
            </button>
          </div>
          <button 
            onClick={handleSave}
            className={cn(
              "focus:outline-none transition-transform duration-200 active:scale-125",
              isSaved ? "text-black dark:text-white" : "text-black dark:text-white"
            )}
          >
            <Bookmark className={cn("w-6 h-6", isSaved ? "fill-current" : "")} />
          </button>
        </div>

        <div className="font-semibold text-sm mb-1">{currentLikes.toLocaleString()} likes</div>
        
        <div className="mb-2">
          <span className="font-semibold text-sm">{username}</span>
          <span className="text-sm ml-2">{caption}</span>
        </div>

        {commentCount > 0 && (
          <button className="text-gray-500 text-sm mb-1 focus:outline-none">
            View all {commentCount} comments
          </button>
        )}

        <p className="text-gray-500 text-xs uppercase tracking-wide mt-1">{timestamp}</p>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-800 mt-4 px-4 py-3">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Add a comment..."
            className="text-sm flex-1 focus:outline-none bg-transparent"
          />
          <button className="text-blue-500 font-semibold text-sm ml-2 focus:outline-none opacity-50">
            Post
          </button>
        </div>
      </div>
    </article>
  );
};

export default FeedItem;
