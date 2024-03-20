import UserFeed from "@/components/UserFeed";
import PostModal from "@/components/Layout/PostModal";

const LandingPage = () => {
 
  return (
    <div>
      <div className="flex gap-2 h-[80vh]">
        {/* <div className="flex-1 border rounded-sm shadow-md p-4 "></div> */}
        <div className="flex-1 border rounded-sm shadow-md p-4 overflow-scroll">
          <PostModal />
          <UserFeed />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
