import { Op } from "sequelize";
import { User } from "../../models/user.model.js";
import { Product } from "../../models/product.model.js";
import { ProductVariant } from "../../models/productVariant.model.js";
import { ProductImage } from "../../models/productImage.model.js";
// import { Op, fn, col, literal } from "sequelize";
import { Order } from "../../models/order.model.js";
import { OrderItem } from "../../models/orderItem.model.js";
import { Payment } from "../../models/payment.model.js"
import { sequelize } from "../../config/database.js";


// admin dashboard Management
export const getAdminDashboardService = async () => {
  try {
    const totalUsers = await User.count();
    const totalProducts = await Product.count();
    const totalOrders = await Order.count();
    const totalVariants = await ProductVariant.count();   // ⭐ NEW

    const [results] = await sequelize.query(`
      SELECT 
        p.id AS product_id,
        p.name,
        p.brand,
        p.price,
        p.is_active,

        COUNT(DISTINCT oi.order_id) AS totalOrders,
        SUM(oi.quantity) AS totalQuantity,
        COUNT(DISTINCT pv.id) AS totalVariants

      FROM order_items oi
      JOIN product_variants pv ON oi.variant_id = pv.id
      JOIN products p ON pv.product_id = p.id
      
      GROUP BY p.id
      ORDER BY totalOrders DESC
      LIMIT 5;
    `);

    const topProducts = results.map(item => ({
      id: item.product_id,
      name: item.name,
      brand: item.brand,
      price: Number(item.price) || 0,
      sales: Number(item.totalOrders) || 0,
      quantity_sold: Number(item.totalQuantity) || 0,
      total_variants: Number(item.totalVariants) || 0,
      status: item.is_active ? "active" : "inactive",
    }));

    return {
      total_users: totalUsers,
      total_products: totalProducts,
      total_orders: totalOrders,
      total_variants: totalVariants,     // ⭐ SEND TO FRONTEND
      top_products: topProducts,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};



// user management Service
export const getAllUsers = async ({ search, page, limit }) => {
  const offset = (page - 1) * limit;

  const where = search
    ? {
      [Op.or]: [
        { full_name: { [Op.like]: `%${search}%` } },
        { phone: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } },
      ],
    }
    : {};

  const { count, rows } = await User.findAndCountAll({
    where,
    offset,
    limit,
    order: [["created_at", "DESC"]],
  });

  return { total: count, users: rows };
};


// product management Service
// Fetch all products with filters & pagination
export const getAllProductsService = async ({ search, status, page, limit }) => {
  const offset = (page - 1) * limit;

  const where = {};

  // Search across name / part_no / variant_name / brand
  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { brand: { [Op.like]: `%${search}%` } },
      { "$variants.part_no$": { [Op.like]: `%${search}%` } },
      { "$variants.variant_name$": { [Op.like]: `%${search}%` } },
    ];
  }

  // Status (is_active)
  if (status && status.toLowerCase() !== "all") {
    where.is_active = status.toLowerCase() === "active" ? 1 : 0;
  }

  const { count, rows } = await Product.findAndCountAll({
    where,
    offset,
    limit,
    order: [["id", "ASC"]],
    attributes: ["id", "name", "brand", "price"],

    include: [
      {
        model: ProductVariant,
        as: "variants",
        attributes: ["id", "part_no", "variant_name", "color"],
        include: [
          {
            model: ProductImage,
            as: "ProductImage",
            attributes: ["front_img", "left_img", "right_img"],
          },
        ],
      },
    ],
  });

  const totalVariants = rows.reduce(
    (sum, p) => sum + (p.variants?.length || 0),
    0
  );

  return { total: totalVariants, products: rows };
};

// Get product by ID
export const getProductByIdService = async (id) => {
  const product = await Product.findByPk(id, {
    attributes: [
      "id",
      "name",
      "brand",
      "price",
      "category_id",
      "model_year",
    ],
    include: [
      {
        model: ProductVariant,
        as: "variants",
        attributes: [
          "id",
          "part_no",
          "variant_name",
          "color",
        ],
        include: [
          {
            model: ProductImage,
            as: "ProductImage",
            attributes: ["front_img", "left_img", "right_img"],
          },
        ],
      },
    ],
  });

  return product;
};

// orders management Service
export const getAllOrdersService = async ({
  order_id,
  status,
  start_date,
  end_date,
  page = 1,
  limit = 10,
}) => {
  try {
    const offset = (page - 1) * limit;
    const where = {};

    if (order_id) where.id = order_id;

    if (status && status !== "all") {
      where.order_status = status;
    }

    if (start_date && end_date) {
      where.created_at = {
        [Op.between]: [
          new Date(`${start_date} 00:00:00`),
          new Date(`${end_date} 23:59:59`),
        ],
      };
    }

    const { count, rows } = await Order.findAndCountAll({
      where,
      offset,
      limit,
      order: [["created_at", "DESC"]],
      include: [
        {
          model: OrderItem,
          as: "items",
          attributes: ["id", "quantity", "price"],
          include: [
            {
              model: ProductVariant,
              as: "variant",
              attributes: ["id", "part_no", "variant_name", "color"],
              include: [
                {
                  model: Product,
                  as: "product",
                  attributes: ["id", "name", "brand", "price"],
                },
                {
                  model: ProductImage,
                  as: "ProductImage",
                  attributes: ["front_img", "left_img", "right_img"],
                },
              ],
            },
          ],
        },
      ],
    });

    // 👉 DASHBOARD COUNTS
    const counts = {
      total: await Order.count(),
      placed: await Order.count({ where: { order_status: "PLACED" } }),
      shipped: await Order.count({ where: { order_status: "SHIPPED" } }),
      delivered: await Order.count({ where: { order_status: "DELIVERED" } }),
      cancelled: await Order.count({ where: { order_status: "CANCELLED" } }),
    };

    return {
      orders: rows,
      counts,
      pagination: {
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};


export const getOrderDetailsService = async (id) => {
  const order = await Order.findOne({
    where: { id },
    include: [
      {
        model: OrderItem,
        as: "items",
        attributes: ["id", "quantity", "price"],
        include: [
          {
            model: ProductVariant,
            as: "variant",
            attributes: ["id", "part_no", "variant_name", "color"],
            include: [
              {
                model: Product,
                as: "product",
                attributes: ["id", "name", "brand", "price"],
              },
              {
                model: ProductImage,
                as: "ProductImage",
                attributes: ["front_img", "left_img", "right_img"],
              },
            ],
          },
        ],
      },
    ],
  });

  return order || null;
};


// payment management
export const getPaymentsWithFiltersService = async ({
  transaction_id,
  status,
  start_date,
  end_date,
  page = 1,
  limit = 10,
}) => {
  const where = {};

  if (transaction_id) {
    where.razorpay_payment_id = { [Op.like]: `%${transaction_id}%` };
  }

  if (status && status !== "all") {
    where.status = status;
  }

  // ---- FIXED DATE FILTER ----
  if (start_date || end_date) {
    const start = start_date
      ? new Date(start_date)
      : new Date("1970-01-01");

    start.setHours(0, 0, 0, 0);

    const end = end_date ? new Date(end_date) : new Date();
    end.setHours(23, 59, 59, 999);

    // IMPORTANT — use the SAME column everywhere
    where.created_at = {
      [Op.between]: [start, end],
    };
  }

  const offset = (page - 1) * limit;

  const { count, rows } = await Payment.findAndCountAll({
    where,
    offset,
    limit,
    order: [["created_at", "DESC"]], // same field
  });

  return {
    payments: rows,
    total: count,
    totalPages: Math.ceil(count / limit),
  };
};