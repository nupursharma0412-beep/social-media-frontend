import { getFeed, createPost } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, post, setPost, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data.post || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (img, caption) => {
    try {
      setLoading(true);

      const data = await createPost(img, caption);

      setFeed((prev) => [data.post, ...(prev || [])]);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    feed,
    post,
    handleGetFeed,
    handleCreatePost,
  };
};