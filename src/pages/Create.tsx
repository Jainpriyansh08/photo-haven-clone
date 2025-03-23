
import { useState, useRef } from "react";
import { Image, Video, X, Upload } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Create = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(files);
      
      // Create preview URLs
      const newPreviewUrls = files.map(file => URL.createObjectURL(file));
      setPreviewUrls(newPreviewUrls);
    }
  };

  const handleReset = () => {
    // Clean up existing preview URLs
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    setCaption("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = () => {
    // In a real app, this would upload the files and caption to a server
    console.log("Files to upload:", selectedFiles);
    console.log("Caption:", caption);
    
    // Show success message (would typically use a toast)
    alert("Your post has been shared!");
    
    // Reset the form
    handleReset();
  };

  return (
    <div className="px-4 py-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 text-center">Create New Post</h1>
      
      <Tabs defaultValue="post" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="story">Story</TabsTrigger>
        </TabsList>
        
        <TabsContent value="post" className="focus:outline-none">
          {previewUrls.length > 0 ? (
            <div className="mb-6">
              <div className="relative rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square">
                <img 
                  src={previewUrls[0]} 
                  alt="Preview" 
                  className="w-full h-full object-contain"
                />
                <button 
                  onClick={handleReset}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-1"
                  aria-label="Remove image"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <textarea
                placeholder="Write a caption..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full mt-4 p-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800"
                rows={4}
              />
              
              <Button 
                onClick={handlePost}
                className="w-full mt-4 instagram-button"
              >
                Share
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
              <Upload className="h-16 w-16 text-gray-400 mb-4" />
              <p className="text-xl font-medium mb-2">Drag photos and videos here</p>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
                Share your moments with friends and followers
              </p>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
                multiple
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="instagram-button"
              >
                Select from device
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="story" className="focus:outline-none">
          <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
            <div className="flex gap-4 mb-6">
              <div className="text-center">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-2">
                  <Image className="h-8 w-8 text-blue-500" />
                </div>
                <span className="text-sm">Image</span>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full mb-2">
                  <Video className="h-8 w-8 text-purple-500" />
                </div>
                <span className="text-sm">Video</span>
              </div>
            </div>
            <p className="text-xl font-medium mb-2">Create a story</p>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-center">
              Stories disappear after 24 hours
            </p>
            <input
              type="file"
              accept="image/*,video/*"
              className="hidden"
              id="story-file"
            />
            <Button 
              onClick={() => document.getElementById('story-file')?.click()}
              className="instagram-button"
            >
              Select from device
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Create;
