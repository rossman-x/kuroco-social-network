import avatarImage from "~/assets/avatar.png";
import sendImage from "~/assets/send-icon.png";
import addImage from "~/assets/add-image.png";
import favOffImage from "~/assets/fav-off.png";
import favOnImage from "~/assets/fav-on.png";
import { useMemo, useRef, useState } from "react";
import PostComment from "./post-comment";
import {
  addToFavorites,
  removeFromFavorites,
  commentPost,
  getSinglePost,
  deletePostById,
} from "~/services/post.service";
import PostHashtag from "./post-hashtag";
import useInfo from "~/hooks/useInfo";
import type Post from "~/declarations/post";
type props = {
  post: Post;
  updatePost: (post?: Post) => void;
};

export const InPostSpinner = () => (
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

const DeleteSvg = (
  <svg
    version="1.1"
    x="0px"
    y="0px"
    viewBox="0 0 26 26"
    className="rounded-md"
    style={{ width: "16px", backgroundColor: "white" }}
  >
    <g>
      <path
        fill="#ff0000"
        d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25
		C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0
		L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467
		L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468
		c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467
		C19.033,16.725,19.033,17.138,18.78,17.394z"
      />
    </g>
  </svg>
);

const PostComponent = ({ post, updatePost }: props) => {
  const currentUser = useInfo();

  const inputRef = useRef<HTMLInputElement>(null);
  const [imageComment, setImageComment] = useState<string | undefined>();

  const isLiked = useMemo(
    () =>
      !!(
        currentUser &&
        post.likers &&
        post.likers.find((liker) => liker === currentUser.memberId)
      ),
    [post, currentUser]
  );

  const isComplete = useMemo(
    () =>
      !!(
        post.poster ||
        (post.comments && post.comments.length) ||
        (post.hashtags && post.hashtags.length)
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

  const expandPost = async () => {
    if (isComplete) return;
    window.location.href = `/news/${post.id}`;
  };

  const onSendComment = async () => {
    try {
      if (!commentRef || !commentRef.current) return;
      const commentValue = commentRef.current.value;
      if (!commentValue) return alert("Content is missing.");
      setIsSendingComment(true);
      await commentPost(post.id, commentValue, imageComment);
      commentRef.current.value = "";
      setImageComment(undefined);
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

  const addCommentImage = () => {
    if (imageComment) return setImageComment(undefined);

    if (!inputRef || !inputRef.current) return;

    inputRef.current.click();
  };

  const updateImage = () => {
    if (
      !inputRef ||
      !inputRef.current ||
      !inputRef.current.files ||
      !inputRef.current.files.length
    )
      return;

    if (
      ![
        "image/jpeg",
        "image/png",
        "image/svg+xml",
        "image/webp",
        "image/gif",
      ].includes(inputRef.current.files[0].type)
    ) {
      alert("Format not allowed.");
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      if (
        e &&
        e.target &&
        e.target.result &&
        !(e.target.result instanceof ArrayBuffer)
      )
        setImageComment(e.target.result);
    };
    reader.readAsDataURL(inputRef.current.files[0]);
  };

  const deletePost = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      updatePost(undefined);
      await deletePostById(post.id);
      window.location.href = "/news";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-2/5 md:w-8/12 sm:w-10/12 mx-auto rounded-lg bg-white mb-4">
      <div
        className={`post-main p-4 ${isComplete ? "" : "cursor-pointer"}`}
        onClick={expandPost}
      >
        {!!post.poster && (
          <div className="post-header flex justify-between h-12">
            <div className="flex items-center">
              <img
                className="h-12 w-12 mr-4 rounded-full"
                src={post.poster?.avatar ? post.poster.avatar : avatarImage}
                alt="avatar"
              />
              <div>
                <h3 className="text-lg">
                  {post.poster.firstName} {post.poster.lastName}
                </h3>

                <span className="text-sm">{post.poster.email}</span>
              </div>
            </div>
            {currentUser && post.poster && currentUser.id === post.poster.id && (
              <div
                onClick={deletePost}
                className="cursor-pointer"
                data-testid="delete_post"
              >
                {DeleteSvg}
              </div>
            )}
          </div>
        )}
        <div className="post-body mt-4 mb-2">
          <h2 className="text-lg font-bold mb-2">{post.title.toUpperCase()}</h2>
          {!!post.content && (
            <div className="mb-2">
              {post.content.split("\n").map((c) => (
                <>
                  <p>{c}</p>
                </>
              ))}
            </div>
          )}
          {!!post.image && (
            <img
              className="w-full mx-auto my-4 rounded-lg"
              src={`${post.image}?format=pjpg&auto=webp&quality=85,75`}
              alt="post"
            />
          )}
          {
            /* Hashtags goes here */
            <div className="flex flex-wrap">
              {!!post &&
                !!post.hashtags &&
                !!post.hashtags.length &&
                post.hashtags.map((h) => <PostHashtag hashtag={h} />)}
            </div>
          }
          {/* Comments section here */}
          <div className="">
            {!!post.comments &&
              post.comments.map((comment) => <PostComment comment={comment} />)}
          </div>
        </div>
        <div className="post-footer flex flex-col ">
          {post.poster && (
            <div className="flex flex-row items-center justify-between">
              {!imageComment && (
                <div
                  className="inline-flex items-center relative w-1/12"
                  onClick={() => !isLikeLoading && updateLike()}
                >
                  {isLikeLoading ? (
                    <InPostSpinner />
                  ) : (
                    <>
                      <img
                        src={isLiked ? favOnImage : favOffImage}
                        className={`w-8 cursor-pointer ${
                          isLiked ? "bg-red-300 rounded-full p-[6px]" : ""
                        }`}
                        alt="Favs"
                      />
                      <span className="rounded-full text-center text-[14px] px-[5px] text-red-900 bg-red-300 absolute left-[18px] top-[16px]">
                        {post.likers ? post.likers.length : 0}
                      </span>
                    </>
                  )}
                </div>
              )}
              <div className="flex flex-row items-center justify-end grow relative">
                <div className="block w-full p-2 bg-gray-100 border-gray-700 rounded-md placeholder-gray-400 text-black">
                  <input
                    className="w-full bg-transparent focus:outline-none"
                    id="comment"
                    ref={commentRef}
                    type="text"
                    placeholder="Insert your comment"
                  />
                  {imageComment && (
                    <div>
                      <img
                        src={imageComment}
                        className="w-full p-4"
                        alt="Comment"
                      />
                    </div>
                  )}
                </div>

                {isSendingComment ? (
                  <InPostSpinner />
                ) : (
                  <div className="flex flex-inline">
                    <img
                      src={sendImage}
                      className="ml-2 w-8 cursor-pointer"
                      onClick={onSendComment}
                      alt="Send Comment"
                    />
                    {imageComment ? (
                      <div
                        className="cursor-pointer absolute top-[40px] right-[52px]"
                        onClick={addCommentImage}
                        data-testid={`delete_comment_image`}
                      >
                        {DeleteSvg}
                      </div>
                    ) : (
                      <img
                        src={addImage}
                        className="ml-2 mr-[1rem] w-8 cursor-pointer"
                        onClick={addCommentImage}
                        alt="Send Comment"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="">
            <span className="text-sm text-right text-gray-600 flex justify-end mt-2">
              Posted on {post.createdAt.substring(0, 16).replace("T", " at ")}.
            </span>
          </div>
        </div>
      </div>
      <input
        type="file"
        onChange={updateImage}
        ref={inputRef}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default PostComponent;
