import { CategoryService } from "./category.service.js";

export const CategoryController = {
  async getCategories(req, res) {
    try {
      const categories = await CategoryService.getAll();
      res.json({ success: true, data: categories });
    } catch (err) {
      console.error(err);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch categories" });
    }
  },
};
