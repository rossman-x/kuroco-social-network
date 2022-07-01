import Comment from "~/declarations/comment";
import useInfo from "~/hooks/useInfo";
import { deleteComment } from "~/services/post.service";

type props = {
  comment: Comment;
};

const DeleteSvg = () => (
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

const PostComment = ({ comment }: props) => {
  const currentUser = useInfo();

  const deletePostComment = async () => {
    try {
      await deleteComment(comment.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-lg bg-gray-100 my-2 p-2 relative">
      <span className="text-sm text-gray-600">
        On <span className="italic">{comment.createdAt}</span>,
        <span className="font-bold">{comment.user.firstName}</span> wrote:
      </span>
      <p className="ml-4">{comment.content}</p>
      {comment.extData && (
        <div>
          <img src={comment.extData} className="w-full p-4" alt="Comment" />
        </div>
      )}
      {currentUser && currentUser.id === comment.user.id && (
        <div
          onClick={deletePostComment}
          className="top-2 right-2 absolute cursor-pointer"
          data-testid="delete-comment"
        >
          <DeleteSvg />
        </div>
      )}
    </div>
  );
};

export default PostComment;
