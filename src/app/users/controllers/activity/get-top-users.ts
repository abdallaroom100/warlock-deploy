import { Aggregate, query } from "@warlock.js/cascade";
import { type Request, type Response } from "@warlock.js/core";
import { Comment } from "app/comments/models/comment.model";
import { Posts } from "app/posts/models/post.model";

interface User {
    name: string;
    totalContributes: number;
  }
export default async function getTopUsers(
  request: Request,
  response: Response,
) {
  const getUserContributs = async (
    request: Request,
    response: Response,
    user: Record<string, any>,
  ) => {
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
  let contributers: any = [];
  users.map(async user => {
    contributers = [
      ...contributers,
      getUserContributs(request, response, user),
    ];
  });

  const sortedUsers =  Object.values(contributers)
  if (sortedUsers.length){
      sortedUsers.sort((a,b)=>(b as User).totalContributes - (a as User).totalContributes)
  }
  response.success(contributers);
}
