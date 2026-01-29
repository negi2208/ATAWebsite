import { Product } from "../../models/product.model.js";
import { Category } from "../../models/category.model.js";
import { ProductVariant } from "../../models/productVariant.model.js";
import { ProductImage } from "../../models/productImage.model.js";
import { sequelize } from "../../config/database.js";
import { Op, fn, col, where } from "sequelize";
import { logger } from "../../utils/logger.js"

export const ProductService = {
  async getAll(categorySlug, productType) {
    const where = { is_active: 1 };

    if (categorySlug && categorySlug !== "all") {
      where["$category.slug$"] = categorySlug;
    }

    // product_type filter (IMPORTANT)
    if (productType && productType !== "all") {
      where.product_type = productType; // single | kit
    }

    return await Product.findAll({
      where,
      attributes: ["id", "name", "price", "brand", "product_type"],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductVariant,
          as: "variants",
          attributes: ["id", "variant_name", "color"],
          where: { is_active: 1 },
          required: false, // product without variant should still show
          include: [
            {
              model: ProductImage,
              as: "ProductImage",
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
      attributes: ["id", "name", "price", "brand", "product_type", "model_year", "exterior_finish", "material", "item_dimensions", "description"],
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["id", "name", "slug"],
        },
        {
          model: ProductVariant,
          attributes: ["id", "variant_name", "color", "part_no"],
          as: "variants",
          where: { is_active: 1 },
          required: false,
          include: [
            {
              model: ProductImage,
              as: "ProductImage",
              attributes: ["front_img", "left_img", "right_img", "extra_images"],
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
          where(fn("LOWER", col("variants.variant_name")), { [Op.like]: like }),
          where(fn("LOWER", col("variants.color")), { [Op.like]: like }),
          where(fn("LOWER", col("variants.part_no")), { [Op.like]: like }),

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
          as: "variants",
          required: false,
          attributes: ["id", "variant_name", "color", "part_no"],
          where: { is_active: 1 },
          include: [
            {
              model: ProductImage,
              as: "ProductImage",
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
          as: "variants",
          include: [
            {
              model: ProductImage,
              as: "ProductImage",
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

export const createProductService = async (payload, files) => {
  const transaction = await sequelize.transaction();

  try {
    // 1️⃣ Create Product
    const product = await Product.create(
      {
        name: payload.name,
        category_id: payload.category_id,
        product_type: payload.product_type,
        brand: payload.brand,
        price: payload.price,
        model_year: payload.model_year,
        exterior_finish: payload.exterior_finish,
        material: payload.material,
        item_dimensions: payload.item_dimensions,
        description: payload.description,
      },
      { transaction }
    );

    logger.info("Product created", { productId: product.id });

    // 2️⃣ Parse variants (multipart rule)
    const variants = JSON.parse(payload.variants);

    for (const variant of variants) {
      // 3️⃣ Create Variant
      const createdVariant = await ProductVariant.create(
        {
          product_id: product.id,
          part_no: variant.part_no,
          variant_name: variant.variant_name,
          color: variant.color,
        },
        { transaction }
      );

      logger.info("Variant created", { variantId: createdVariant.id });

      // 4️⃣ Filter images for this variant
      const variantImages = files.filter(
        (file) => file.fieldname === `variant_${variant.temp_id}`
      );

      if (variantImages.length < 3) {
        throw new Error(
          `Minimum 3 images required for variant ${variant.variant_name}`
        );
      }

      // 5️⃣ Create Product Images
      await ProductImage.create(
        {
          variant_id: createdVariant.id,

          front_img: variantImages[0].path,
          left_img: variantImages[1].path,
          right_img: variantImages[2].path,

          // Remaining images go here
          extra_images: variantImages.slice(3).map((img) => img.path),
        },
        { transaction }
      );

      logger.info("Variant images saved", {
        variantId: createdVariant.id,
      });
    }

    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    logger.error("Create product failed", { error });
    throw new Error(error.message);
  }
};

export const updateProductService = async (id, payload, files) => {
  const transaction = await sequelize.transaction();

  try {
    // 1️⃣ Find product
    const product = await Product.findByPk(id, { transaction });
    if (!product) throw new Error("Product not found");

    // 2️⃣ Update product fields
    await product.update(
      {
        name: payload.name,
        category_id: payload.category_id,
        product_type: payload.product_type,
        brand: payload.brand,
        price: payload.price,
        model_year: payload.model_year,
        exterior_finish: payload.exterior_finish,
        material: payload.material,
        item_dimensions: payload.item_dimensions,
        description: payload.description,
      },
      { transaction }
    );

    logger.info("Product updated", { id });

    // 3️⃣ Parse variants
    const variants = JSON.parse(payload.variants);

    for (const variant of variants) {
      let createdVariant;

      // 4️⃣ Update or create variant
      if (variant.id) {
        createdVariant = await ProductVariant.findByPk(variant.id, {
          transaction,
        });

        if (!createdVariant) {
          throw new Error("Variant not found");
        }

        await createdVariant.update(
          {
            part_no: variant.part_no,
            variant_name: variant.variant_name,
            color: variant.color,
          },
          { transaction }
        );

        logger.info("Variant updated", { variantId: createdVariant.id });
      } else {
        createdVariant = await ProductVariant.create(
          {
            product_id: product.id,
            part_no: variant.part_no,
            variant_name: variant.variant_name,
            color: variant.color,
          },
          { transaction }
        );

        logger.info("Variant created", { variantId: createdVariant.id });
      }

      // 5️⃣ Handle images (if uploaded)
      const variantImages = files.filter(
        (file) =>
          file.fieldname ===
          `variant_${variant.temp_id || createdVariant.id}`
      );

      if (variantImages.length > 0) {
        if (variantImages.length < 3) {
          throw new Error(
            `Minimum 3 images required for variant ${variant.variant_name}`
          );
        }

        // Delete old images
        await ProductImage.destroy({
          where: { variant_id: createdVariant.id },
          transaction,
        });

        // Create new images
        await ProductImage.create(
          {
            variant_id: createdVariant.id,
            front_img: variantImages[0].path,
            left_img: variantImages[1].path,
            right_img: variantImages[2].path,
            extra_images: variantImages.slice(3).map((img) => img.path),
          },
          { transaction }
        );

        logger.info("Variant images updated", {
          variantId: createdVariant.id,
        });
      }
    }

    await transaction.commit();
    return product;
  } catch (error) {
    await transaction.rollback();
    logger.error("Update product failed", { error });
    throw new Error(error.message);
  }
};
