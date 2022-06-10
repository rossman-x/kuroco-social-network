import User from "./user";

export default interface Comment {
    id: number;
    postId: number;
    user: User;
    content: string;
    createdAt: string;
}
