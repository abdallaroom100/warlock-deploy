import { router } from "@warlock.js/core";
import { guarded, guardedGuest } from "app/utils/router";
import { createComment } from "./controllers/create-comment";
import { deleteComment } from "./controllers/delete-comment";
import { getComment } from "./controllers/get-comment";
import { getPostComments } from "./controllers/get-post-comments";
import { getRepliedComments } from "./controllers/get-replied-comments";
import { updateComment } from "./controllers/update-comment";

router.group(
  {
    prefix: "/comment",
  },
  () => {
    
    guardedGuest(() => {
      router.post("/replies/:id", getRepliedComments);
      router.get("/post/:id", getPostComments);
      router.get("/:id", getComment);
    });

    guarded(() => {
      router.post("/", createComment);
      router.put("/:id", updateComment);
      router.delete("/:id", deleteComment);
    });
  },
);
