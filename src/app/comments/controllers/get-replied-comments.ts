import { Request, Response } from "@warlock.js/core";
import { Comment } from "../models/comment.model";
import { query } from "@warlock.js/cascade";

export const getRepliedComments = async (
  request: Request,
  response: Response,
) => {
    const commentReplies = await query.list("comments",{
        parentId:request.number("id")
    })
    response.success(commentReplies)
};

getRepliedComments.validation = {
  validate: async (request: Request, response: Response) => {
    const topComment = await Comment.find(request.number("id"));
    if (!topComment) {
      return response.notFound();
    }
  },
};
