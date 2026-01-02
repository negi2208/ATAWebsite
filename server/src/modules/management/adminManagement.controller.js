// import { getAdminDashboardService, getAllUsers, getPaymentsWithFiltersService, getAllProductsService, getProductByIdService, updateProductStatusService, getVendorByIdService, updateVendorStatusService, getAllVendorsService, getAllOrdersService, getOrderDetailsService, getPaymentCommissionService } from "../../services/admin/adminManagementService.js";
import { successResponse, errorResponse } from "../../utils/helper.js";
import logger from "../../config/logger.js";
import { getAdminDashboardService, getAllUsers, getAllProductsService, getProductByIdService, getAllOrdersService, getOrderDetailsService, getPaymentsWithFiltersService } from "./adminManagement.service.js"

// admin dashboard Management
export const getAdminDashboardController = async (req, res) => {
  try {
    const data = await getAdminDashboardService();
    return successResponse(res, 200, "Dashboard data fetched successfully", data);
  } catch (error) {
    logger.error(`Dashboard fetch failed: ${error.message}`);
    return errorResponse(res, 500, error);
  }
};

// user management Controller
export const getAllUsersController = async (req, res) => {
    try {
        const search = req.query.search || req.query.full_name || req.query.phone || req.query.address || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const result = await getAllUsers({ search, page, limit });

        const filteredUsers = result?.users?.map(user => ({
            id: user.id,
            name: user.full_name,
            phone: user.phone,
            city: user.address,
            created_at: user.created_at
        }));

        logger.info(`Fetched ${result?.users?.length} users (Page: ${page}, Limit: ${limit}, Search: "${search}")`);
        return successResponse(res, 200, "Fetched all users successfully", {
            total: result.total,
            page: parseInt(page),
            limit: parseInt(limit),
            users: filteredUsers,
        });
    } catch (error) {
        logger.error("Error fetching users:", error);
        return errorResponse(res, 500, error);
    }
};

// product management Controller
export const getAllProductsController = async (req, res) => {
  try {
    // Accept both search or model_name param
    const search = req.query.search || req.query.model_name || req.query.sku || "";
    const status = req.query.status || "all";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await getAllProductsService({ search, status, page, limit });

    return successResponse(res, 200, "Fetched products successfully", {
      total: result.total,
      page,
      limit,
      products: result.products,
    });
  } catch (error) {
    logger.error("Error fetching products:", error);
    return errorResponse(res, 500, error.message || "Error fetching products");
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdService(id);
    if (!product) return successResponse(res, 200, "No product found", null);

    return successResponse(res, 200, "Product details fetched", product);
  } catch (error) {
    logger.error("Error fetching product details:", error);
    return errorResponse(res, 500, error.message || "Error fetching product details");
  }
};

// orders management Controller
export const getAllOrders = async (req, res) => {
  try {
    const filters = {
      order_id: req.query.order_id || null,
      status: req.query.status || "all",
      start_date: req.query.start_date || null,
      end_date: req.query.end_date || null,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const result = await getAllOrdersService(filters);

    return successResponse(res, 200, "Orders fetched", result);

  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    // 👉 POSTMAN ME CLEAR ERROR DIKHEGA
    return errorResponse(
      res,
      500,
      error?.message || "Failed to fetch orders"
    );
  }
};


export const getOrderDetails = async (req, res) => {
  try {
    const order = await getOrderDetailsService(req.params.id);

    if (!order) {
      return errorResponse(res, 404, "Order not found");
    }

    return successResponse(res, 200, "Order details fetched", order);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


// payment Managemnet Controller
export const getPaymentsController = async (req, res) => {
  try {
    const filters = {
      status: req.query.status || "all",
      start_date: req.query.start_date || null,
      end_date: req.query.end_date || null,
      transaction_id: req.query.transaction_id || null,
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    const result = await getPaymentsWithFiltersService(filters);

    logger.info("Fetched filtered payments");

    return successResponse(res, 200, "Payments fetched successfully", {
      data: result.payments,
      pagination: {
        totalItems: result.total,
        totalPages: result.totalPages,
        currentPage: filters.page,
        limit: filters.limit,
      },
    });
  } catch (err) {
    logger.error("Error fetching payments:", err.message);
    return errorResponse(res, 500, err);
  }
};

