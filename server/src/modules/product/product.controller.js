import { ProductService, createProductService } from "./product.service.js";

export const ProductController = {
  async getProducts(req, res) {
    try {
      const { category, type = "all" } = req.query;

      const products = await ProductService.getAll(category, type);

      res.json({
        success: true,
        data: products,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch products",
      });
    }
  },

  async getBestsellers(req, res) {
    try {
      const { limit } = req.query;
      const limitNum = limit ? parseInt(limit) : 10;

      const bestsellers = await ProductService.getBestsellers(limitNum);

      res.json({
        success: true,
        data: bestsellers,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch bestsellers",
      });
    }
  },

  async searchProducts(req, res) {
    try {
      const { q } = req.query;

      if (!q || !q.trim()) {
        return res.status(400).json({
          success: false,
          message: "Search query is required",
        });
      }

      const products = await ProductService.searchProducts(q);

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error("SEARCH ERROR:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to search products",
      });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await ProductService.getById(id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Failed to fetch product",
      });
    }
  },

  async getRelatedProducts(req, res) {
    try {
      const { productId } = req.params;
      const { limit } = req.query;

      const products = await ProductService.getRelatedProducts({
        productId,
        limit: Number(limit) || 10,
      });

      res.json({
        success: true,
        message: "Related products fetched successfully",
        data: products,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};

export const createProductController = async (req, res) => {
  try {
    const product = await createProductService(req.body, req.files);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await updateProductService(
      productId,
      req.body,
      req.files
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
