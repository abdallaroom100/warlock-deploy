import { Request, Response } from "@warlock.js/core";
import { Comment } from "app/comments/models/comment.model";

export const getPostComments = async (
  request: Request,
  response: Response,
) => {
    response.success()
};

getPostComments.validation = {
    rules:{
        page:["number"],
        limit:["number"],
    },
  validate: async (request: Request, response: Response) => {
    const page = request.number("page")
    const limit = request.number("limit")
    
    if(page+limit){
        console.log(page , limit)
        const postComments = await Comment.aggregate()
        .where("postId", "=", request.number("postId"))
        .paginate(request.number("page"), request.number("limit"))
        console.log(postComments.documents[0].data)
    }
    console.log("page or limit are not exist")
  },
};
