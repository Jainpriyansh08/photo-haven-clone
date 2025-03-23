
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-white dark:bg-black">
      <div className="text-center max-w-md">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Sorry, this page isn't available.</p>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The link you followed may be broken, or the page may have been removed.
        </p>
        
        <Button asChild className="instagram-button">
          <Link to="/" className="flex items-center justify-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Go back to Instagram
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
