import Comment from "~/declarations/comment";

type props = {
  comment: Comment;
};

const PostComment = ({ comment }: props) => {
  return (
    <div className="rounded-lg bg-gray-100 my-2 p-2">
      <span className="text-sm text-gray-600">
        On <span className="italic">{comment.createdAt}</span>, <span className="font-bold">{comment.user.firstName}</span> wrote:
      </span>
      <p className="ml-4">{comment.content}</p>
    </div>
  );
};

export default PostComment;
