import { router } from "@warlock.js/core";
import { guarded, guardedGuest } from "app/utils/router";
import { createComment } from "./controllers/create-comment";
import { getPostComments } from "./controllers/get-post-comments";
import { getRepliedComments } from "./controllers/get-replied-comments";
import { updateComment } from "./controllers/update-comment";


guardedGuest(() => {
  router.get("/comment/replies/:id", getRepliedComments);
  router.get("/comment/post/:id", getPostComments);
});


// for authenticated users
guarded(() => {
  router.post("/comment", createComment);
  router.put("/comment/:id", updateComment);
});
