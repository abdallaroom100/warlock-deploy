import {  Request,Response } from "@warlock.js/core"
import { Categories } from "../models/category.model"
import { query } from "@warlock.js/cascade"


export const getAllCategories = async (request:Request, response:Response)=>{
const categories = await query.list("categories")
return response.success(categories)
}

