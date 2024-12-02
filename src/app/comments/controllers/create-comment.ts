import { notExists, query } from "@warlock.js/cascade"

import { ExistsRule, Request,Response, UniqueRule, validate } from "@warlock.js/core"
import { isString } from "@mongez/supportive-is"
import { Comment } from "../models/comment.model"
import { Posts } from "app/posts/models/post.model"

export const createComment = async (request:Request, response:Response)=>{
   
    return response.success()
}

createComment.validation = { 
    rules:{
        content:["required","string"],
        postId:["required"],
        parentId:["number"]   
        
    },
    validate: async (request:Request,response:Response) =>{
         const currentPost = await Posts.find(request.input("postId"))
         if(!currentPost){
            return response.badRequest({error:"post not found"})
         }

         if(request.number("parentId")){
            const commentReplied =  await Comment.find(request.number("parentId"))
            if(!commentReplied){
              return  response.badRequest({error:"The comment you are trying to reply to does not exist"})
            }
         }

         const {id,name} = request.user.data
         const newComment = await Comment.create({
            content:request.string("content"),
            commentOwner:{id,name},
            postId:request.number("postId"),
            parentId: request.number("parentId")
            })
            
            currentPost.associate("comments",newComment.only(["commentOwner","content","id","parentId"]))
            currentPost.save()
    }
   
}

