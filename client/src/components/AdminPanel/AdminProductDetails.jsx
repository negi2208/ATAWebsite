import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { resolveImageUrl } from "../../utils/ImagesUtils";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/management/product/${productId}`,
        { withCredentials: true }
      );

      const { success, data, message } = res?.data;

      console.log(data)

      if (success) setProduct(data);
      else toast.error(message || "Failed to fetch product details");
    } catch (err) {
      console.error(err);
      toast.error("Error fetching product details");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg">
        Loading product details...
      </div>
    );

  if (!product)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <p className="text-gray-600">No product found</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );

  // first variant (details + images)
  const variant = product?.variants?.[0];
  const images = variant?.ProductImage;

  const imgList = [];

  if (images?.front_img)
    imgList.push(resolveImageUrl(images.front_img));

  if (images?.left_img)
    imgList.push(resolveImageUrl(images.left_img));

  if (images?.right_img)
    imgList.push(resolveImageUrl(images.right_img));

  // 🔥 extra images array
  if (Array.isArray(images?.extra_images)) {
    images.extra_images.forEach((img) => {
      imgList.push(resolveImageUrl(img));
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-xl font-semibold text-gray-800">
          Product Details
        </h2>

        <span />
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow p-6 grid md:grid-cols-2 gap-6">
        {/* LEFT — IMAGES */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-800">Images</h3>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {imgList?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Product-${i}`}
                className="
                  w-full 
                  h-40 
                  object-contain 
                  bg-gray-100 
                  rounded-2xl 
                  border
                "
              />
            ))}
          </div>

          {imgList?.length === 0 && (
            <p className="text-sm text-gray-500">No images available</p>
          )}
        </div>

        {/* RIGHT — DETAILS */}
        <div className="space-y-3 text-gray-700">
          <h3 className="text-lg font-semibold mb-2">
            {product?.brand || "-"} — {product?.name || "-"}
          </h3>

          <p>
            <strong>Product ID:</strong> {product?.id}
          </p>

          <p>
            <strong>Product Name:</strong>{" "}
            {product?.name || "-"}
          </p>

          <p>
            <strong>Model Year:</strong>{" "}
            {product?.model_year || "-"}
          </p>

          {product?.brand && (
            <p>
              <strong>Brand:</strong>{" "}
              {product?.brand || "-"}
            </p>
          )}

          <p>
            <strong>Price:</strong> ₹{product?.price || "-"}
          </p>

          {variant && (
            <>
              <hr className="my-2" />
              <h4 className="font-semibold">Variant Details</h4>

              {variant?.variant_name && (
                <p>
                  <strong>SKU:</strong> {variant?.part_no || "-"}
                </p>
              )}

              {variant?.variant_name && (
                <p>
                  <strong>Variant:</strong>{" "}
                  {variant?.variant_name || "-"}
                </p>
              )}

              <p>
                <strong>Color:</strong> {variant?.color || "-"}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
