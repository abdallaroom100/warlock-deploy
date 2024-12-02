import { castModel, Casts, Document, Model } from "@warlock.js/cascade";
import { User } from "app/users/models/user";
import { ObjectId } from "bson";

export class Comment extends Model {

    public static collection = "comments"


     public defaultValue: Document ={
        parentId:null
     }
    protected casts: Casts ={
        commentOwner:castModel(User,["id,name"]),
        content:"string",
        postId:"number"
    }
}

