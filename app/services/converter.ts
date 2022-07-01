import type Comment from "~/declarations/comment";
import type Post from "~/declarations/post";
import type User from "~/declarations/user";

export const userConverter = (u: any) => {
  let image = u.profileimage?.url;

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
    avatar: !!image && image.split("/t=")[0] + "/ext" + image.split("/ext")[1],
  } as User;
};

export const commentConverter = (c: any) => {
  return {
    id: c.id,
    postId: c.post_id,
    user: userConverter(c.sender),
    content: c.comment,
    createdAt: c.created_at,
    extData: c.ext_data && c.ext_data.length != 0 ? c.ext_data : undefined,
  } as Comment;
};

export const postConverter = (p: any) => {
  const comments =
    p.comments && p.comments.length ? p.comments.map(commentConverter) : [];
  return {
    id: p.topics_id,
    name: p.subject,
    title: p.title,
    content: p.content,
    image: p.image.url,
    comments: comments,
    poster: p.poster && p.poster.details && userConverter(p.poster.details),
    likers: p?.favs?.list ?? [],
    createdAt: p.inst_ymdhi,
    hashtags:
      p.hashtags &&
      p.hashtags.length &&
      p.hashtags[0].list &&
      p.hashtags[0].list.length
        ? p.hashtags[0].list.map((h: any) => h.ext_col_01)
        : [],
  } as Post;
};
