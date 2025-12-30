import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { ProductVariant } from "../../models/productVariant.model.js";
import { ProductImage } from "../../models/productImage.model.js";
import { sequelize } from "../../config/database.js";
import { Op, fn, col, where } from "sequelize";

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

  async searchProducts(query) {
  const terms = query.toLowerCase().split(/\s+/);

  const andConditions = terms.map(term => {
    const like = `%${term}%`;

    return {
      [Op.or]: [
        // PRODUCT FIELDS
        where(fn("LOWER", col("Product.name")), { [Op.like]: like }),
        where(fn("LOWER", col("Product.brand")), { [Op.like]: like }),
        where(fn("LOWER", col("Product.model_year")), { [Op.like]: like }),

        // CATEGORY
        where(fn("LOWER", col("category.name")), { [Op.like]: like }),
        where(fn("LOWER", col("category.slug")), { [Op.like]: like }),

        // VARIANTS
        where(fn("LOWER", col("ProductVariants.variant_name")), { [Op.like]: like }),
        where(fn("LOWER", col("ProductVariants.color")), { [Op.like]: like }),
        where(fn("LOWER", col("ProductVariants.part_no")), { [Op.like]: like }),

        // PRICE (numeric but searchable)
        where(col("Product.price"), { [Op.like]: like }),
      ],
    };
  });

  return await Product.findAll({
    where: {
      is_active: 1,
      [Op.and]: andConditions,
    },
    attributes: ["id", "name", "price", "brand", "model_year"],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
      {
        model: ProductVariant,
        required: false,
        attributes: ["id", "variant_name", "color", "part_no"],
        where: { is_active: 1 },
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
    distinct: true,
  });
},

  async getRelatedProducts({ productId, limit = 10 }) {
  const product = await Product.findByPk(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  return Product.findAll({
    where: {
      category_id: product.category_id,
      is_active: 1,
      id: { [Op.ne]: productId },
    },
    attributes: ["id", "name", "price", "brand", "created_at"],
    include: [
      {
        model: Category,
        as: "category",
        attributes: ["id", "name", "slug"],
      },
      {
        model: ProductVariant,
        attributes: ["id"],
        include: [
          {
            model: ProductImage,
            attributes: ["front_img", "left_img", "right_img"],
          },
        ],
      },
    ],
    limit,
    order: [["created_at", "DESC"]],
  });
}
};
