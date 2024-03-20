import { useAppContext } from "@/contexts";
import { PostService } from "@/services";
import { DeleteIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import Loader from "./Loader";

const UserFeed = () => {
  
  const { user } = useAppContext();
  const { data, isLoading, refetch } = useQuery("user_feed", async () => {
    return PostService.get_all_posts();
  });

  if (isLoading) return <Loader />;
  return (
    <div className="w-full h-full  overflow-scroll p-4">
      {data?.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-lg text-gray-500">No posts to show</p>
          <p className="text-lg text-gray-500">Be the first one to post</p>
        </div>
      ) : (
        <div className="mt-4 border-b flex flex-col gap-2">
          {data?.map((post: any) => {
            return (
              <div
                key={post.media_id}
                className="flex flex-col gap-3 relative rounded shadow-sm border p-4"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div>
                    <p className="text-lg font-semibold">{`${post?.user?.first_name} ${post?.user?.last_name}`}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(post?.created_at).toDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <img
                      src={`${import.meta.env.VITE_API_URI}/files/${
                        post?.media_id
                      }`}
                      width={200}
                      height={200}
                      className=" object-contain shadow-lg"
                      alt="post"
                    />
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{post?.text}</p>
                  </div>
                </div>
                {user?.id === post?.user?.id && (
                  <div className="absolute top-2 right-2">
                    <DeleteIcon
                      color={"red"}
                      className=" hover:scale-105 ease-in-out transform duration-300 cursor-pointer"
                      onClick={async () => {
                        await PostService.delete_post(post?.id);
                        refetch();
                      }}
                    />
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  <p className="text-sm text-gray-500">{post?.privacy}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserFeed;
