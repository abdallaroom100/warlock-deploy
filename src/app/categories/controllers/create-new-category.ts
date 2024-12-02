import { notExists } from "@warlock.js/cascade"
import { Categories } from "../models/category.model"
import { ExistsRule, Request,Response, UniqueRule, validate } from "@warlock.js/core"
import { isString } from "@mongez/supportive-is"

export const createCategory = async (request:Request, response:Response)=>{

    const name = request.input("name")
    const newCategory = await Categories.create({
    name
    })
    return response.success(newCategory.data)
}

createCategory.validation = { 
    rules:{
        name:["required","string", new UniqueRule(Categories,"name").insensitive()]
    }
   
}

