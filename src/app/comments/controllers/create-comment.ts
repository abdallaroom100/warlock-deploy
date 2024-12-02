import { Request, Response } from "@warlock.js/core";
import { Posts } from "app/posts/models/post.model";
import { Comment } from "../models/comment.model";

export const createComment = async (request: Request, response: Response) => {
  const { id, name } = request.user.data;
  const newComment = await Comment.create({
    content: request.string("content"),
    commentOwner: { id, name },
    postId: request.number("postId"),
    parentId: request.number("parentId") || null,
  });

  const currentPost = request.currentPost;
  currentPost.associate(
    "comments",
    newComment.only(["commentOwner", "content", "id", "parentId"]),
  );
  currentPost.save();
  return response.success();
};

createComment.validation = {
  rules: {
    content: ["required", "string"],
    postId: ["required"],
    parentId: ["number"],
  },
  validate: async (request: Request, response: Response) => {
    const currentPost = await Posts.find(request.input("postId"));
    if (!currentPost) {
      return response.badRequest({ error: "post not found" });
    }

    const parentId = request.number("parentId");
    if (parentId) {
      const parentComment = currentPost.data.comments.some(
        (comment: Comment) => comment.id == parentId,
      );

      if (!parentComment) {
        return response.notFound({ error: "parent comment not found" });
      }
    }

    request.currentPost = currentPost;
  },
};



