
import { useState, useEffect } from "react";
import { Settings, Grid, Bookmark, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

interface ProfileStats {
  posts: number;
  followers: number;
  following: number;
}

interface PostItem {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isSaved?: boolean;
  isTagged?: boolean;
}

const ProfileHeader = () => {
  const [stats, setStats] = useState<ProfileStats>({
    posts: 24,
    followers: 823,
    following: 162
  });

  return (
    <div className="px-4 py-6">
      <div className="flex items-center mb-6">
        <div className="story-ring mr-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full overflow-hidden">
            <img
              src="https://i.pravatar.cc/300?img=30"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div className="flex items-center mb-3">
            <h1 className="text-xl font-semibold mr-2">username</h1>
            <Button 
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              aria-label="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex space-x-5">
            <div className="text-center">
              <div className="font-semibold">{stats.posts}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{stats.followers.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">{stats.following.toLocaleString()}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <p className="font-semibold">Display Name</p>
        <p className="text-sm mb-1">Bio goes here. This is a short description about the user profile.</p>
        <p className="text-sm text-blue-500">website.com</p>
      </div>
      
      <div className="mt-4 flex">
        <Button className="flex-1 mr-1" variant="outline">Edit Profile</Button>
        <Button className="flex-1 ml-1" variant="outline">Share Profile</Button>
      </div>
    </div>
  );
};

const Profile = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [savedPosts, setSavedPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPosts: PostItem[] = Array.from({ length: 24 }, (_, i) => ({
        id: `post-${i}`,
        imageUrl: `https://picsum.photos/500/500?random=${100 + i}`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
      }));
      
      const mockSavedPosts: PostItem[] = Array.from({ length: 12 }, (_, i) => ({
        id: `saved-${i}`,
        imageUrl: `https://picsum.photos/500/500?random=${200 + i}`,
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        isSaved: true,
      }));
      
      setPosts(mockPosts);
      setSavedPosts(mockSavedPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const renderPosts = (postList: PostItem[]) => (
    <div className="grid grid-cols-3 gap-1">
      {postList.map((post) => (
        <div key={post.id} className="aspect-square relative">
          <img
            src={post.imageUrl}
            alt="Post"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="pb-6">
      <ProfileHeader />
      
      <Tabs defaultValue="posts">
        <TabsList className="w-full grid grid-cols-3 border-t border-b border-gray-200 dark:border-gray-800">
          <TabsTrigger value="posts" className="py-3">
            <Grid className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="saved" className="py-3">
            <Bookmark className="h-5 w-5" />
          </TabsTrigger>
          <TabsTrigger value="tagged" className="py-3">
            <Tag className="h-5 w-5" />
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="focus:outline-none">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 9 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            renderPosts(posts)
          )}
        </TabsContent>
        
        <TabsContent value="saved" className="focus:outline-none">
          {isLoading ? (
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: 6 }).map((_, index) => (
                <div 
                  key={index} 
                  className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse"
                />
              ))}
            </div>
          ) : (
            savedPosts.length > 0 ? (
              renderPosts(savedPosts)
            ) : (
              <div className="flex flex-col items-center justify-center p-8">
                <Bookmark className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-lg font-medium mb-2">Saved</p>
                <p className="text-gray-500 text-center mb-4">
                  Save photos and videos that you want to see again.
                </p>
              </div>
            )
          )}
        </TabsContent>
        
        <TabsContent value="tagged" className="focus:outline-none">
          <div className="flex flex-col items-center justify-center p-8">
            <Tag className="h-12 w-12 text-gray-400 mb-4" />
            <p className="text-lg font-medium mb-2">Photos of you</p>
            <p className="text-gray-500 text-center mb-4">
              When people tag you in photos, they'll appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
