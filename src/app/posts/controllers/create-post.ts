import { query } from "@warlock.js/cascade"
import {type  Response, type Request, type RequestHandler, validate } from "@warlock.js/core"
import { Posts } from "../models/post.model"
import { Categories } from "app/categories/models/category.model"

export const createPost = async (request:Request,response:Response)=>{
    
    const {id,name} = request.user.data
    const newPost = await Posts.create({
        title:request.string("title"),
        category:request.string("categoryId"),
        postOwner:{id,name},
        likes:[],
        comments:[]
    })

 response.success(newPost.data)
} 


createPost.validation = {
    rules:{
        title:["required","string"],
        categoryId:["required"],
    },
    validate:async (request:Request,response:Response)=>{
        const category = await Categories.find(request.number("categoryId"))
        if(!category){
            return response.badRequest({error:"category not found"})
        }
    }
}