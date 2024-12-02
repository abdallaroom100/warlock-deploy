import { query } from "@warlock.js/cascade";
import { Request, Response } from "@warlock.js/core";
import { Comment } from "../models/comment.model";

export const updateComment = async (request: Request, response: Response) => {
  return response.success(request.comment);
};

updateComment.validation = {
  rules: {
    content: ["required", "string"],
    id: ["required"],
  },
  validate: async (request: Request, response: Response) => {


    const currentComment = await Comment.find(request.number("id"));
    if (!currentComment) {
      return response.notFound();
    }
    
    if (currentComment.data.commentOwner.id != request.user.data.id) {
      return response.badRequest("you don't have permission to update this comment");
    }
    
    const updatedComment =  await query.update(
      "comments",
      { id: request.number("id") },
      { content: request.string("content") },
    )
    request.comment = updatedComment
  },
};
