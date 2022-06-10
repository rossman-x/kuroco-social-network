import avatarImage from "~/assets/avatar.png";
import sendImage from "~/assets/send-icon.png";
import favOffImage from "~/assets/fav-off.png";
import favOnImage from "~/assets/fav-on.png";
import { useEffect, useMemo, useRef, useState } from "react";
import PostComment from "./post-comment";
import Post from "~/declarations/post";
import User from "~/declarations/user";
import {
  addToFavorites,
  removeFromFavorites,
  commentPost,
  getSinglePost,
} from "~/services/post.service";
import PostHashtag from "./post-hashtag";
import useInfo from "~/hooks/useInfo";
type props = {
  post: Post;
  updatePost: (post: Post) => void;
};

const InPostSpinner = () => (
  <svg
    role="status"
    className="inline w-4 h-4 mx-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
    viewBox="0 0 100 101"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
      fill="currentColor"
    />
    <path
      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
      fill="currentFill"
    />
  </svg>
);

const PostComponent = ({ post, updatePost }: props) => {
  const currentUser = useInfo();

  useEffect(() => {}, []);
  const isLiked = useMemo(
    () =>
      !!(
        currentUser &&
        post.likers &&
        post.likers.find((liker) => liker === currentUser.memberId)
      ),
    [post]
  );

  const [isLikeLoading, setIsLikeLoading] = useState(false);

  const [isSendingComment, setIsSendingComment] = useState(false);
  const commentRef = useRef<HTMLInputElement | null>(null);

  const reloadPost = async () => {
    try {
      const p = await getSinglePost(post.id);
      updatePost(p);
    } catch (error) {
      console.error(error);
    }
  };

  const onSendComment = async () => {
    try {
      if (!commentRef || !commentRef.current) return;
      const commentValue = commentRef.current.value;
      if (!commentValue) return;
      setIsSendingComment(true);
      await commentPost(post.id, commentValue);
      commentRef.current.value = "";
      await reloadPost();
      setIsSendingComment(false);
    } catch (error) {
      console.error("Cannot send comment !", error);
    }
  };

  const updateLike = async () => {
    if (!isLiked) {
      try {
        setIsLikeLoading(true);
        await addToFavorites(post.id);
        await reloadPost();
        setIsLikeLoading(false);
      } catch (error) {
        console.error(error);
        setIsLikeLoading(false);
      }
      return;
    }
    try {
      setIsLikeLoading(true);
      await removeFromFavorites(post.id);
      await reloadPost();
      setIsLikeLoading(false);
    } catch (error) {
      console.error(error);
      setIsLikeLoading(false);
    }
  };
  return (
    <div className="w-2/5 md:w-8/12 sm:w-10/12 mx-auto rounded-lg bg-white mb-4">
      <div className="post-main p-4">
        <div className="post-header flex items-center h-12">
          <img
            className="h-12 w-12 mr-4 rounded-full"
            src={post.poster.avatar ? post.poster.avatar : avatarImage}
          />
          <div>
            <h3 className="text-lg">
              {post.poster.firstName} {post.poster.lastName}
            </h3>
            <span className="text-sm">{post.poster.email}</span>
          </div>
        </div>
        <div className="post-body mt-4 mb-2">
          <h2 className="text-lg font-bold mb-2">{post.title.toUpperCase()}</h2>
          {!!post.content && <div className="mb-2">{post.content}</div>}
          {!!post.image && (
            <img className="w-full mx-auto my-4 rounded-lg" src={post.image} />
          )}
          {
            /* Hashtags goes here */
            <div className="flex flex-wrap">
              <PostHashtag hashtag="FirstHashtag" />
              <PostHashtag hashtag="secondHashtag" />
              <PostHashtag hashtag="thirdHashtag" />
            </div>
          }
          {/* Comments section here */}
          <div className="">
            {/* HERE GOES THE LIST OF <PostComment ... /> */}
            {!!post.comments &&
              post.comments.map((comment) => <PostComment comment={comment} />)}
          </div>
        </div>
        <div className="post-footer flex flex-col ">
          <div className="flex flex-row items-center justify-between">
            <div className="inline-flex items-center mr-4 relative">
              {isLikeLoading ? (
                <InPostSpinner />
              ) : (
                <>
                  <img
                    src={isLiked ? favOnImage : favOffImage}
                    className={`w-8 cursor-pointer ${
                      isLiked ? "bg-red-300 rounded-full p-[6px]" : ""
                    }`}
                    onClick={updateLike}
                  />
                  <span className="rounded-full text-center text-[14px] px-[5px] text-red-900 bg-red-300 absolute left-[18px] top-[16px]">
                    {post.likers ? post.likers.length : 0}
                  </span>
                </>
              )}
            </div>
            <div className="flex flex-row items-center justify-end grow">
              <input
                className="block w-full p-2 bg-gray-100 border-gray-700 rounded-md placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                id="comment"
                ref={commentRef}
                type="text"
                placeholder="Insert your comment"
              />
              {isSendingComment ? (
                <InPostSpinner />
              ) : (
                <img
                  src={sendImage}
                  className="ml-2 w-8 cursor-pointer"
                  onClick={onSendComment}
                />
              )}
            </div>
          </div>
          <div className="">
            <span className="text-sm text-right text-gray-600 flex justify-end mt-2">
              Posted on {post.createdAt.substring(0, 16).replace("T", " at ")}.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
