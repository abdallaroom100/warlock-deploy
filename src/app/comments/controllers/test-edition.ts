

import { Request,Response, validate } from "@warlock.js/core";
import { User } from "app/users/models/user";


const getCurrentUser = async (request:Request,response:Response) =>{


     return response.success({
        user:request.currentUser
     })

}


getCurrentUser.validation = {
    rules:{
        userId:["required"],
        postId:["required"]
    },
    validate:async (request:Request,response:Response)=>{

        const currentUser = await User.find(request.number("id"))
        if(!currentUser){
            return response.notFound()
        }
        request.currentUser = currentUser
    }
    
}



