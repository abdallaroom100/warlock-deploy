import { query } from "@warlock.js/cascade";
import { Request, Response } from "@warlock.js/core";
import { Posts } from "app/posts/models/post.model";

export const getPostComments = async (request: Request, response: Response) => {
  const postComments = await query.list("comments", {
    postId: request.number("id"),
  });
  response.success(postComments);
};

getPostComments.validation = {
  rules: {
    postId: ["number"],
  },
  validate: async (request: Request, response: Response) => {
    const currentPost = await Posts.find(request.number("id"));
    if (!currentPost) {
      return response.notFound();
    }
  },
};
