import { Aggregate, query } from "@warlock.js/cascade";
import { type Request, type Response } from "@warlock.js/core";
import { Comment } from "app/comments/models/comment.model";
import { Posts } from "app/posts/models/post.model";


export default async function getTopUsers(
  request: Request,
  response: Response,
) {
  const getUserContributs = async (user: Record<string, any>) => {
    const aggregate = new Aggregate("posts");

    const userTotalComments = await Comment.aggregate()
      .where("commentOwner.id", user.id)
      .count();

    const userTotalPosts = await Posts.aggregate()
      .where("postOwner.id", user.id)
      .count();

    const totalLikes = await aggregate.where("likes", "=", user.id).count();
    return {
      user: { name: user.name, id: user.id },
      totalContributes: totalLikes + userTotalComments + userTotalPosts,
    };
  };

  const users = await query.list("users");
  const AllContributers =  await Promise.all(
    users.map(async user => getUserContributs(user))
  )
    AllContributers.sort()


    response.success({ topContributers: AllContributers });
  }

