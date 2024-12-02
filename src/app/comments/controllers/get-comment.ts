import { Request, Response } from "@warlock.js/core";
import { Comment } from "../models/comment.model";

export const getComment = async (request: Request, response: Response) => {
  const comment = await Comment.find(request.number("id"));
  if (!comment) {
    return response.notFound();
  }
  response.success(comment.data);
};
