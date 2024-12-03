import { Request, Response, validate } from "@warlock.js/core";
import { Comment } from "../models/comment.model";

export const getComment = async (request: Request, response: Response) => {
  response.success({comment:request.comment});
};


getComment.validation = {
  validate: async (request:Request,response:Response)=>{
    const comment = await Comment.find(request.number("id"))
    if(!comment){
      return response.notFound({error:"comment not found"})
    }
    request.comment  = comment.data
  }
}