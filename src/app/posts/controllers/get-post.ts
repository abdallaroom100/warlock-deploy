
import {  Request, Response, validate } from "@warlock.js/core";
import { Posts } from "../models/post.model";


export const getSpecificPost =  async (request:Request,response:Response) => {
  response.success({post:request.currentPost})   
}
getSpecificPost.validation = {
    
    validate: async (request:Request,response:Response) => {
         const curretnPost = await Posts.find(request.number("id"))
         if(!curretnPost){
            return response.notFound()
         }
         request.currentPost = curretnPost
    }

}


