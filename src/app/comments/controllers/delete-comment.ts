import { Request, Response } from "@warlock.js/core";
import { Comment } from "../models/comment.model";
import { Posts } from "app/posts/models/post.model";

export const deleteComment = async (request: Request, response: Response) => {
  
  // const comment =  await Comment.delete({ id: request.number("id") })
   request.post.disassociate("comments",request.comment)
   request.post.save()
   request.comment.destroy()
  response.success();
};

deleteComment.validation = {
  validate: async (request: Request, response: Response) => {
    const currentPost = await Posts.find(request.number("postId"))
    if(!currentPost){
      return response.notFound({error:"post not found"})
    }

    const currentComment = await Comment.find(request.number("id"))
    if (!currentComment) {
      return response.notFound({error:"comment not found"});
    }

    if (currentComment.data.commentOwner.id !== request.user.data.id) {
      return response.badRequest({
        error: "you can't have access to delete that post",
      });
    }

    request.comment = currentComment
    request.post = currentPost
  },
};
