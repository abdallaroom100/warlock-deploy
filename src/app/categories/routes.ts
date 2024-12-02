import { router } from "@warlock.js/core";
import { guarded, guardedGuest } from "app/utils/router";
import { createCategory } from "./controllers/create-new-category";
import { deleteCategory } from "./controllers/delete-category";
import { getAllCategories } from "./controllers/get-all-categories";
import { getSpecificCategory } from "./controllers/get-specific-category";
import { updateCategory } from "./controllers/update-category";

guardedGuest(() => {
  router.get("/categories", getAllCategories);
  router.get("/categories/:id", getSpecificCategory);
});

guarded(() => {
  router.post("/categories", createCategory);
  router.put("/categories/:id", updateCategory);
  router.delete("/categories/:id", deleteCategory);
});
