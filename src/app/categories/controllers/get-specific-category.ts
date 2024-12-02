import { Request, Response } from "@warlock.js/core";
import { Categories } from "../models/category.model";

export const getSpecificCategory = async (
  request: Request,
  response: Response,
) => {
  return response.success({category:request.category});
};

getSpecificCategory.validation = {
  rules: {
    id: ["required"],
  },
  validate: async (request: Request, response: Response) => {
    const category = await Categories.find(request.input("id"));

    if (!category) {
      return response.notFound({error:"category not found"});
    }
    request.category = category.data;
  },
};
