import { useEffect, useState } from "react";
import PostComponent from "~/components/post-component";
import Spinner from "~/components/spinner";
import Post from "~/declarations/post";
import { getPostsList } from "~/services/post.service";
import styles from "~/styles/post.css";

export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const NewsComponent = () => {
  const [posts, updatePosts] = useState<Post[] | undefined>();

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
