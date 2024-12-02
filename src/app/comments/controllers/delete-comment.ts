import { Request, Response } from "@warlock.js/core";
import { Comment } from "../models/comment.model";

export const deleteComment = async (request: Request, response: Response) => {
 
    await Comment.delete({ id: request.number("id") });
  response.success();
};




deleteComment.validation = {
  validate: async (request: Request, response: Response) => {
     
    const currentComment = await Comment.find(request.number("id"));
    if (!currentComment) {
      return response.notFound();
    }

  },
};


