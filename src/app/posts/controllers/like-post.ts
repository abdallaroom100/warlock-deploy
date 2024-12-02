import { Request, Response } from "@warlock.js/core";
import { Posts } from "../models/post.model";

export const likeThePost = async (request: Request, response: Response) => {
  response.success();
};

likeThePost.validation = {

  validate: async (request: Request, response: Response) => {

    const userId = request.user.data.id;

    const currentPost = await Posts.find(request.number("id"));
    if (!currentPost) {
      return response.badRequest("post not found");
    }

    const set = new Set(currentPost.data.likes);
    set.has(userId) ?
    set.delete(userId):
    set.add(userId)
    
    currentPost.data.likes = Array.from(set);

    currentPost.save();
  },
};
