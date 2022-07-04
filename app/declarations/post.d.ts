import Comment from "~/declarations/comment";
import User from "./user";

export default interface Post {
  id: number;
  name: string;
  title: string;
  content?: string;
  image?: string;
  createdAt: string;
  comments?: Comment[];
  likers?: number[];
  poster?: User;
  hashtags?: string[];
  favCount?: number;
}
