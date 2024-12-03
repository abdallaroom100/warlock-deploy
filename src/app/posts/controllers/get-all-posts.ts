 import { query } from "@warlock.js/cascade"
import {type  Response, type Request } from "@warlock.js/core"

export const getAllPosts = async (request:Request,response:Response)=>{
 const posts = await query.list("posts")
 response.success({posts})
} 