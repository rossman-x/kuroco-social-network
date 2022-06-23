import { useEffect, useState } from "react";
import PostComponent from "~/components/post-component";
import Spinner from "~/components/spinner";
import Post from "~/declarations/post";
import { getPostsList } from "~/services/post.service";
import styles from "~/styles/post.css";
import NewPostComponent from "~/components/new-post-component";
import useInfo from "~/hooks/useInfo";
export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const NewsComponent = () => {
  const [posts, updatePosts] = useState<Post[] | undefined>();
  const me = useInfo();
  useEffect(() => {
    const fetch = async () => {
      try {
        const postsList = await getPostsList();
        updatePosts(postsList);
        console.log(postsList);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const updatePost = (post: Post) => {
    updatePosts(() => posts && posts.map((p) => (p.id === post.id ? post : p)));
  };

  return (
    <div className="">
      <NewPostComponent poster={me || undefined} />
      {posts ? (
        posts.map((post) => (
          <PostComponent post={post} updatePost={updatePost} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default NewsComponent;
