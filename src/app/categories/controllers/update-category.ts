import { query } from "@warlock.js/cascade";
import { Request, Response } from "@warlock.js/core";

export const updateCategory = async (request: Request, response: Response) => {
  return response.success();
};

updateCategory.validation = {
  rules: {
    name: ["required", "string"],
  },
  validate: async (request: Request, response: Response) => {
    const category = await query.update(
      "categories",
      { id: request.number("id") },
      { name:request.string("name") },
    )

    if (!category) {
      return response.notFound();
    }
  },
};
