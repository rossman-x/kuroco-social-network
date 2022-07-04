import { useEffect, useMemo, useState } from "react";
import PostComponent from "~/components/post-component";
import Spinner from "~/components/spinner";
import type Post from "~/declarations/post";
import { getPostsList } from "~/services/post.service";
import styles from "~/styles/post.css";
import NewPostComponent from "~/components/new-post-component";
import useInfo from "~/hooks/useInfo";
import Button from "~/components/button";
import { NumberOfPostsPerPage } from "~/R";
export const links = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const BackSVG = (
  <g xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#fff"
      d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225   c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"
    />
  </g>
);

const NextSVG = (
  <g xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#fff"
      d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5   c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z   "
    />
  </g>
);

const NewsComponent = () => {
  const [posts, updatePosts] = useState<Post[] | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const me = useInfo();

  //Create a function that return the total number of pages:
  const totalPages = useMemo(
    () => Math.ceil(totalCount / NumberOfPostsPerPage),
    [totalCount]
  );
  const isLastPage = useMemo(
    () => currentPage >= totalPages,
    [totalPages, currentPage]
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const postsList = await getPostsList(currentPage);
        updatePosts(postsList.posts);
        setTotalCount(postsList.totalCount);
      } catch (error) {
        console.error(error);
      }
    };
    updatePosts(undefined);
    fetch();
  }, [currentPage]);

  const updatePost = (post?: Post) => {
    if (!post) return;
    updatePosts(() => posts && posts.map((p) => (p.id === post.id ? post : p)));
  };

  const BackNextComponent = () => (
    <div className="flex items-center mx-auto w-2/5 justify-around">
      <div className="w-1/6">
        <Button
          path={BackSVG}
          text="Back"
          color={currentPage > 1 ? "#64bfff" : "#a2a2a2"}
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        ></Button>
      </div>
      <div className="rounded-full px-1 py-1 border-2 border-red-400 w-14">
        <h3 className="text-white font-extrabold text-center">
          {currentPage} / {totalPages}
        </h3>
      </div>
      <div className="w-1/6">
        <Button
          path={NextSVG}
          text="Next"
          color={isLastPage ? "#a2a2a2" : "#64bfff"}
          onClick={() => !isLastPage && setCurrentPage(currentPage + 1)}
        ></Button>
      </div>
    </div>
  );

  return (
    <div className="">
      <NewPostComponent poster={me || undefined} />
      {posts ? (
        <>
          <BackNextComponent />
          {posts.map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              updatePost={(x) => updatePost(x)}
              complete={false}
            />
          ))}
          <BackNextComponent />
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default NewsComponent;
