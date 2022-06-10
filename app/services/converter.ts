import Comment from "~/declarations/comment";
import Post from "~/declarations/post";
import User from "~/declarations/user";

export const userConverter = (u: any) => {
  return {
    id: u.login_id,
    memberId: u.member_id,
    firstName: u.name1,
    lastName: u.name2,
    email: u.email,
    createdAt: u.inst_ymdhi,
    nickname: u.nickname,
    address: u.address1 + " " + u.address2,
    phone: u.tel,
    hireDate: u.hire_date,
    office: u?.pull_down?.label,
    avatar: u?.profileimage?.url,
  } as User;
};

export const commentConverter = (c: any) => {
  return {
    id: c.id,
    postId: c.post_id,
    user: userConverter(c.sender),
    content: c.comment,
    createdAt: c.created_at,
  } as Comment;
};

export const postConverter = (p: any) => {
  const comments = p.comments.map(commentConverter);
  return {
    id: p.topics_id,
    name: p.subject,
    title: p.title,
    content: p.content,
    image: p.image?.url,
    comments: comments,
    poster: userConverter(p.poster.details),
    likers: p?.favs?.list ?? [],
    createdAt: p.inst_ymdhi,
  } as Post;
};
