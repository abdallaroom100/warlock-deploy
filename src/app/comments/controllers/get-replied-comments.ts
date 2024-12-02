import { query } from "@warlock.js/cascade";
import { Request, Response } from "@warlock.js/core";
import { Posts } from "app/posts/models/post.model";
import { Comment } from "../models/comment.model";

export const getRepliedComments = async (
  request: Request,
  response: Response,
) => {
  const commentReplies = await query.list("comments", {
    parentId: request.number("id"),
    postId: request.number("postId"),
  });
  response.success(commentReplies);
};

getRepliedComments.validation = {
  rules: {
    postId: ["required", "number"],
  },
  validate: async (request: Request, response: Response) => {
    const currentPost = await Posts.find(request.number("postId"));
    if (!currentPost) {
      return response.badRequest({ error: "post not found" });
    }

    const topComment = await Comment.find(request.number("id"));
    if (!topComment) {
      return response.notFound();
    }
  },
};
