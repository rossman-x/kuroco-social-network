import Post from "~/declarations/post";
import { HostUrl, NumberOfPostsPerPage } from "~/R";
import { postConverter } from "./converter";
import { getData, postData } from "./fetch";

export const getPostsList = async (
  pageId: number
): Promise<{ posts: Post[]; totalCount: number }> => {
  const response = await getData(
    `${HostUrl}/posts/list?cnt=${NumberOfPostsPerPage}&pageID=${pageId}`
  );
  const posts = response.list.map(postConverter);
  return {
    posts,
    totalCount: response.pageInfo?.totalCnt ?? 0,
  };
};

export const getSinglePost = async (postId: number): Promise<Post> => {
  const response = await getData(`${HostUrl}/posts/${postId}`);
  const post = postConverter(response.details);
  return post;
};

export const commentPost = async (
  postId: number,
  comment: string,
  imageUri?: string
) => {
  const response = await postData(`${HostUrl}/comments/new`, {
    module_id: postId,
    name: "Comment" + Math.round(Math.random() * 10000),
    note: comment,
    ext_data: imageUri,
  });
};

export const deleteComment = async (commentId: number) => {
  const response = await postData(
    `${HostUrl}/comments/delete/${commentId}`,
    {}
  );
};

export const addToFavorites = async (postId: number) => {
  const response = await postData(`${HostUrl}/fav/new`, {
    module_type: "topics",
    module_id: postId,
    action_type: 0,
  });
};

export const removeFromFavorites = async (postId: number) => {
  const response = await postData(`${HostUrl}/fav/delete`, {
    module_type: "topics",
    module_id: postId,
    action_type: 0,
  });
};

export const createPost = async (
  title: string,
  content: string,
  hashtags: string[],
  fileId?: string
) => {
  const response = await postData(`${HostUrl}/posts/create`, {
    title,
    content,
    hashtags,
    fileId,
  });
  return response;
};

export const deletePostById = async (postId: number) => {
  const response = await postData(`${HostUrl}/posts_delete`, {
    id: postId,
  });
  return response;
};
