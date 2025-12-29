import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { ProductVariant } from "../../models/productVariant.model.js";
import { ProductImage } from "../../models/productImage.model.js";
import { sequelize } from "../../config/database.js";

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

  async getById(productId) {
    return await Product.findOne({
      where: { id: productId, is_active: 1 },
      attributes: ["id", "name", "price", "brand", "model_year"],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductVariant,
          attributes: ["id", "variant_name", "color", "part_no"],
          where: { is_active: 1 },
          required: false,
          include: [
            {
              model: ProductImage,
              attributes: ["front_img", "left_img", "right_img"],
              required: false,
            },
          ],
        },
      ],
    });
  },

  async getBestsellers(limit = 10) {
    try {
      const [results] = await sequelize.query(`
        SELECT 
          oi.product_id,
          p.name,
          p.brand,
          p.price,
          SUM(oi.quantity) AS totalSales,
          pi.front_img AS image
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        LEFT JOIN product_variants pv ON oi.variant_id = pv.id
        LEFT JOIN product_images pi ON pv.id = pi.variant_id
        WHERE p.is_active = 1
        GROUP BY oi.product_id, p.name, p.brand, p.price, pi.front_img
        ORDER BY totalSales DESC
        LIMIT ${limit};
      `);

      return results.map(item => ({
        id: item.product_id,
        title: item.name,
        subtitle: item.brand,
        price: parseFloat(item.price),
        image: item.image || "/images/placeholder.webp", // default image if no image
        sales: Number(item.totalSales),
      }));
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
