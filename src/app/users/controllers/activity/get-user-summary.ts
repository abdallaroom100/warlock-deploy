import { Aggregate } from "@warlock.js/cascade";
import { type Request, type Response } from "@warlock.js/core";
import { Comment } from "app/comments/models/comment.model";
import { Posts } from "app/posts/models/post.model";

export default async function getUserSummary(
  request: Request,
  response: Response,
) {
  const aggregate = new Aggregate("posts");

  const userId = request.number("id");
  const userComments = await Comment.aggregate()
    .where("commentOwner.id", userId)
    .count();

  const userPosts = await Posts.aggregate()
    .where("postOwner.id", userId)
    .count();

  const totalLikes = await aggregate.where("likes", "=", userId).count();


  response.success({
    totlaComments: userComments,
    totalPosts: userPosts,
    totalLikes: totalLikes,
  });
}
