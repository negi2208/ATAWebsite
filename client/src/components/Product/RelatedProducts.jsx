import React, { useEffect, useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { addToWishlist } from "../../utils/Addwishlist";
import { toast } from "react-hot-toast";
import { getGuestToken } from "../../utils/guest";


const getProductImage = (product) => {
  const variant = product.variants?.[0];
  const img = variant?.ProductImage;

  return (
    img?.front_img ||
    img?.left_img ||
    img?.right_img ||
    "/images/placeholder.webp"
  );
};

export default function RelatedProducts() {
  const { id } = useParams();

  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
    const navigate = useNavigate();
  

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/product/${id}/related?limit=10`
        );
        setProducts(res.data?.data || []);
      } catch {
        toast.error("Failed to load related products");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRelated();
  }, [id]);

  const handleWishlist = async (productId) => {
    try {
      await addToWishlist(productId);
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  if (loading || products.length === 0) return null;
  const handleAddToCart = async (product) => {
  try {
    setAdding(true);

    const guest_token = getGuestToken();
    const user_id = localStorage.getItem("user_id");

    const payload = {
      product_id: product.id,   // ✅ now defined
      quantity: 1,
      ...(user_id ? { user_id } : { guest_token }),
    };

    if (product.variants?.[0]?.id) {
      payload.variant_id = product.variants[0].id;
    }

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/cart/add`,
      payload
    );

    toast.success("Added to cart 🛒");
  } catch (error) {
    console.error("Add to cart failed", error);
    toast.error(error.response?.data?.message || "Failed to add product to cart");
    navigate("/cart");
  } finally {
    setAdding(false);
  }
};

  return (
    <div className="mt-20">
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >
            {/* IMAGE */}
            <div className="relative">
              <Link to={`/product/${p.id}`}>
                <img
                  src={getProductImage(p)}
                  alt={p.name}
                  className="w-full h-44 object-contain bg-white rounded-t-xl cursor-pointer"
                />
              </Link>

              {/* WISHLIST
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleWishlist(p.id);
                }}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow"
              >
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-600 hover:fill-red-600" />
              </button> */}
            </div>

            {/* DETAILS */}
            <div className="p-3">
              <Link
                to={`/product/${p.id}`}
                className="block text-sm line-clamp-2 mb-2 font-medium text-gray-800 hover:text-primary-700 transition"
              >
                {p.name}
              </Link>

              <p className="text-lg font-bold text-green-600">
                ₹{Number(p.price).toLocaleString("en-IN")}
              </p>

              <button onClick={() => handleAddToCart(p)}
                className="w-full mt-3 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
