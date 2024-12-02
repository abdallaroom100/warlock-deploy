import { router } from "@warlock.js/core";
import { getAllPosts } from "./controllers/get-all-posts";
import { createPost } from "./controllers/create-post";
import { guarded } from "app/utils/router";
import { likeThePost } from "./controllers/like-post";


router.get("/posts",getAllPosts)
guarded(()=>{
    router.post("/posts",createPost)
    router.put("/posts/like/:id",likeThePost)
})
 