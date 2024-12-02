import { router } from "@warlock.js/core";
import { guarded } from "app/utils/router";
import { createComment } from "./controllers/create-comment";
import { updateComment } from "./controllers/update-comment";
import { getRepliedComments } from "./controllers/get-replied-comments";


router.get("/comment/replies/:id",getRepliedComments)

guarded(()=>{
    router.post("/comment",createComment)
    router.put("/comment/:id",updateComment)
})