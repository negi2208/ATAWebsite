import { ProductService } from "./product.service.js";

export const ProductController = {
  async getProducts(req, res) {
    try {
      const { category } = req.query;

      const products = await ProductService.getAll(category);

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
};
