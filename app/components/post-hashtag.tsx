const PostHashtag = ({ hashtag }: { hashtag: string }) => (
  <span className="bg-blue-500 text-white py-1 px-2 text-sm rounded-full mr-1 sm:m-2 mb-1">
    #{hashtag}
  </span>
);

export default PostHashtag;
