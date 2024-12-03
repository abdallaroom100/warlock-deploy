import { router } from "@warlock.js/core";
import { guarded, guardedGuest } from "app/utils/router";
import { createPost } from "./controllers/create-post";
import { getAllPosts } from "./controllers/get-all-posts";
import { getSpecificPost } from "./controllers/get-post";
import { likeThePost } from "./controllers/like-post";

router.group(
  {
    prefix: "/posts",
  },
  () => {
    guardedGuest(() => {
      router.get("/", getAllPosts);
      router.get("/:id", getSpecificPost);
    });

    guarded(() => {
      router.post("/", createPost);
      router.put("/like/:id", likeThePost);
    });
  },
);
