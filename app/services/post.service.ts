import Post from "~/declarations/post";
import { HostUrl } from "~/R";
import { postConverter } from "./converter";
import { getData, postData } from "./fetch";

export const getPostsList = async (): Promise<Post[]> => {
  const response = await getData(`${HostUrl}/posts/list`);
  const posts = response.list.map(postConverter);
  return posts;
};

export const getSinglePost = async (postId: number): Promise<Post> => {
  const response = await getData(`${HostUrl}/posts/${postId}`);
  const post = postConverter(response.details);
  return post;
};

export const commentPost = async (postId: number, comment: string) => {
  const response = await postData(`${HostUrl}/comments/new`, {
    module_id: postId,
    name: "Comment" + Math.round(Math.random() * 10000),
    note: comment,
  });
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
