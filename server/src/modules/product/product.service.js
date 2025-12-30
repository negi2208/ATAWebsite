import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { ProductVariant } from "../../models/productVariant.model.js";
import { ProductImage } from "../../models/productImage.model.js";

export const ProductService = {
  async getAll(categorySlug) {
    const where = { is_active: 1 };

    if (categorySlug && categorySlug !== "all") {
      where["$category.slug$"] = categorySlug;
    }

    return await Product.findAll({
      where,
      attributes: ["id", "name", "price", "brand"],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductVariant,
          attributes: ["id", "variant_name", "color"],
          where: { is_active: 1 },
          required: false, // product without variant should still show
          include: [
            {
              model: ProductImage,
              attributes: ["front_img", "left_img", "right_img"],
              required: false,
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });
  },
};
