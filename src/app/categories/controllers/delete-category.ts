import { Request, Response } from "@warlock.js/core";
import { query } from "@warlock.js/cascade";

export const deleteCategory = async (request: Request, response: Response) => {
  return response.success();
};

deleteCategory.validation = {
  validate: async (request: Request, response: Response) => {
    
    const category = await query.deleteOne("categories",{
        id:request.number("id")
    });

    if (!category) {
      return response.notFound();
    }
  
  },
};
