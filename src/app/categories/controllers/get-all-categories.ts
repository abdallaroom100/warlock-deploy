import {  Request,Response } from "@warlock.js/core"
import {  query } from "@warlock.js/cascade"
import { Categories } from "../models/category.model"


export const getAllCategories = async (request:Request, response:Response)=>{
const categories = await query.list("categories")
return response.success({categories})
}

