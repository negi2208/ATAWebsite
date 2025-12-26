import { Category } from "../../models/category.model.js";

export const CategoryService = {
  async getAll() {
    return await Category.findAll({
      where: { is_active: 1 },
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "name",
        "slug",
        "parent_id",
        "depth",
        "path",
        "is_active",
      ],
    });
  },
};
