import type Comment from "~/declarations/comment";
import type Post from "~/declarations/post";
import type User from "~/declarations/user";

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
    hashtags:
      p.hashtags &&
      p.hashtags.length &&
      p.hashtags[0].list &&
      p.hashtags[0].list.length
        ? p.hashtags[0].list.map((h: any) => h.ext_col_01)
        : [],
  } as Post;
};

/*----------------------------------------------------------------

hashtags: [{module_id: 6,…}]
0: {module_id: 6,…}
list: [{tag_id: 2, tag_nm: "POST_1", open_contents_cnt: 1, all_contents_cnt: 1, open_flg: 1,…}]
0: {tag_id: 2, tag_nm: "POST_1", open_contents_cnt: 1, all_contents_cnt: 1, open_flg: 1,…}
all_contents_cnt: 1

*/
