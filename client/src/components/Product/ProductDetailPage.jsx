// src/components/Product/ProductDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageGallery from "./ImageGallery";
import QuantitySelector from "./QuantitySelector";
import RelatedProducts from "./RelatedProducts";
import ReviewSection from "./ReviewSection"; // YE IMPORT KIYA
import { Heart, Truck, Shield, Loader2 } from "lucide-react";
import { addToWishlist } from "../../utils/Addwishlist";
import { toast } from "react-hot-toast";
import axios from "axios";
import { getGuestToken } from "../../utils/guest";
import { resolveImageUrl } from "../../utils/ImagesUtils"

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [adding, setAdding] = useState(false);
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/product/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        // console.log(data.data)
        if (data.success) {
          setProduct(data.data);
          setActiveVariantIndex(0);
        } else {
          throw new Error(data.message || 'Failed to fetch product');
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

  }, [id]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="animate-spin mx-auto w-8 h-8 text-primary-700" />
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </section>
    );
  }

  if (error || !product) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-600">Error: {error || 'Product not found'}</p>
        </div>
      </section>
    );
  }

  // Collect all images from variants
  const activeVariant = product.variants?.[activeVariantIndex];

  const allImages = [];

  if (activeVariant?.ProductImage) {
    const img = activeVariant.ProductImage;

    if (img.front_img) allImages.push(resolveImageUrl(img.front_img));
    if (img.left_img) allImages.push(resolveImageUrl(img.left_img));
    if (img.right_img) allImages.push(resolveImageUrl(img.right_img));

    // 🔥 EXTRA IMAGES (ARRAY)
    if (Array.isArray(img.extra_images)) {
      img.extra_images.forEach((extra) => {
        allImages.push(resolveImageUrl(extra));
      });
    }
  }

  const productData = {
    name: product.name,
    sku: product.id, // or some sku
    // rating: 4.3, // hardcoded for now
    // reviews: 124, // hardcoded
    price: product.price,
    oldPrice: null, // hardcoded
    discount: null, // hardcoded
    images: allImages.length > 0 ? allImages : ["/images/placeholder.webp"], // fallback
  };
  const handleWishlist = async () => {
    try {
      await addToWishlist(product.id);
      toast.success("Added to wishlist ❤️");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add to wishlist");
    }
  };
  const handleAddToCart = async () => {
    try {
      setAdding(true);

      const guest_token = getGuestToken();
      const user_id = localStorage.getItem("user_id");
      const activeVariant = product.variants?.[activeVariantIndex];

      const payload = {
        product_id: product.id,
        quantity: qty,
        ...(user_id ? { user_id } : { guest_token }),
      };

      if (activeVariant?.id) {
        payload.variant_id = activeVariant.id;
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/cart/add`,
        payload
      );

      // ✅ HANDLE BOTH CASES AS SUCCESS
      if (res.data?.success) {
        toast.success("Added to cart 🛒");
        navigate("/cart");
      } else {
        // already exists / quantity updated
        toast.success(res.data?.message || "Cart updated 🛒");
      }

    } catch (error) {
      console.error("Add to cart failed", error);

      const msg =
        error.response?.data?.message ||
        "Unable to add product to cart";

      toast.error(msg);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <section className="bg-gray-100 py-4 border-b">
        <div className="container mx-auto px-4 text-sm text-gray-600">
          <a href="/" className="hover:text-primary-600">Home</a> /
          <a href="/shop" className="hover:text-primary-600 ml-1">{product.category?.name || 'Shop'}</a> /
          <span className="ml-1 text-gray-900 font-medium">{productData.name}</span>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* MAIN GRID */}
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

            {/* LEFT: Image Gallery */}
            <div className="order-2 lg:order-1">
              <ImageGallery key={activeVariantIndex} images={productData.images} discount={productData.discount} />
            </div>

            {/* RIGHT: Product Details */}
            <div className="order-1 lg:order-2">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {productData.name}
              </h1>

              {/* Rating + SKU + Wishlist */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-sm">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    {/* <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(productData.rating) ? "fill-yellow-400" : ""}>★</span>
                      ))}
                    </div> */}
                    {/* <span className="font-medium text-gray-700">{productData.rating}</span>
                    <span className="text-gray-500">({productData.reviews} reviews)</span> */}
                  </div>
                  {/* <span className="text-gray-500">SKU: {productData.sku}</span> */}
                </div>

                {/* <button onClick={handleWishlist} className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition whitespace-nowrap">
                  <Heart className="w-5 h-5" />
                  <span className="font-medium hover:underline">Add to wishlist</span>
                </button> */}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ₹{productData.price.toLocaleString('en-IN')}
                </span>

                {/* Agar old price/discount ho to */}
                {productData.oldPrice && (
                  <span className="text-2xl text-gray-500 line-through">
                    ₹{productData.oldPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>

              {product.variants?.length > 0 && (
                <div className="mt-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Available Colors
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((variant, index) => (
                      <button
                        key={variant.id}
                        onClick={() => setActiveVariantIndex(index)}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition
            ${index === activeVariantIndex
                            ? "border-primary-600 bg-primary-50 text-primary-700"
                            : "border-gray-300 hover:border-gray-400"
                          }`}
                      >
                        {variant.color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category & Brand */}
              <div className="mt-8 text-sm text-gray-600 space-y-1 border-t pt-6">
                <p><strong>Category:</strong> {product.category?.name}</p>
                {product?.brand && <p><strong>Brand:</strong> {product.brand}</p>}
                {product?.exterior_finish && <p><strong>Exterior Finish:</strong> {product.exterior_finish}</p>}
                {product?.material && <p><strong>Material:</strong> {product.material}</p>}
                {product?.item_dimensions && <p><strong>Item Dimensions:</strong> {product.item_dimensions}</p>}
              </div>
              {/* Quantity + Add to Cart (MOVED HERE) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-4">
                <QuantitySelector qty={qty} setQty={setQty} />

                <button onClick={handleAddToCart}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 px-8 rounded-xl
                            flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Trust Badges WITH DIVIDER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 py-12 border-t bg-white rounded-2xl shadow-sm divide-x divide-gray-300">
            {[
              { icon: Truck, title: "Fast Shipping", desc: "Free shipping on orders over ₹1999" },
              { icon: Shield, title: "Easy Return", desc: "2 days hassle-free return policy" },
              { icon: Shield, title: "Warranty Policy", desc: "3-Year Paint Warranty" }
            ].map((item, i) => (
              <div key={i} className="text-center px-8 first:pl-0 last:pr-0">
                <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-9 h-9 text-primary-600" />
                </div>
                <h3 className="font-bold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tabs: Description & Reviews */}
          <div className="mt-16 bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("description")}
                  className={`px-8 py-5 font-bold text-lg transition-colors ${activeTab === "description"
                    ? "text-primary-600 border-b-4 border-primary-600"
                    : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Description
                </button>
                {/* <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-8 py-5 font-bold text-lg transition-colors ${activeTab === "reviews"
                      ? "text-primary-600 border-b-4 border-primary-600"
                      : "text-gray-600 hover:text-gray-900"
                    }`}
                >
                  Reviews ({product.reviews})
                </button> */}
              </div>
            </div>

            <div className="p-8">
              {/* DESCRIPTION TAB */}
              {activeTab === "description" && product.description && (
                <div className="text-gray-700 leading-relaxed">
                  <h3 className="text-xl font-bold mb-4">About this item</h3>

                  <ul className="list-disc pl-6 space-y-3">
                    {product.description
                      .split(/\n|\./) // newline ya full-stop se split
                      .map(point => point.trim())
                      .filter(point => point.length > 0)
                      .map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                  </ul>
                </div>
              )}

              {/* REVIEWS TAB – ALAG COMPONENT SE */}
              {/* {activeTab === "reviews" && <ReviewSection />} */}
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-20">
            <RelatedProducts />
          </div>
        </div>
      </section>
    </>
  );
}