
import { castModel, Casts, Model } from "@warlock.js/cascade";
import { Categories } from "app/categories/models/category.model";
import { User } from "app/users/models/user";


export class Posts extends Model {

    public static collection = "posts"


    protected casts: Casts = {
        content:"string",
        likes:"array",
        userId:castModel(User,["name","id"]),
        comments:"array",
        category:castModel(Categories,["id","name"])
    }
}