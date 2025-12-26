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
};
