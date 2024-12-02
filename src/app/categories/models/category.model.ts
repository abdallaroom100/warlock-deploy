
import { Casts, Model } from "@warlock.js/cascade";


export class Categories extends Model {

    public static collection = "categories"


    protected casts: Casts = {
        name:"string"
    }
}