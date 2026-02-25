import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBoxOpen, FaCubes } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { resolveImageUrl } from "../../utils/ImagesUtils";

const Section = ({ title, icon, children }) => (
  <div className="space-y-6">
    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children, className = "" }) => (
  <div className={`grid grid-cols-3 gap-6 ${className}`}>{children}</div>
);

const ImageGrid = ({ children }) => (
  <div className="grid grid-cols-3 gap-6">{children}</div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input {...props} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" />
  </div>
);

const Textarea = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <textarea {...props} rows="4" className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none" />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <select {...props} className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-red-500 outline-none">
      {children}
    </select>
  </div>
);

const ImageUpload = ({ label, name, preview, onChange, multiple }) => (
  <div>
    <label className="label">{label}</label>
    <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer hover:border-red-500 transition">
      <input type="file" name={name} multiple={multiple} onChange={onChange} className="hidden" id={name} />
      <label htmlFor={name} className="cursor-pointer">
        {preview ? (
          <img src={preview} className="w-full h-40 object-cover rounded-lg" />
        ) : (
          <p className="text-gray-400">Click to upload</p>
        )}
      </label>
    </div>
  </div>
);

const EditProductModel = ({ open, data, onClose, onUpdated }) => {
  if (!open) return null;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [existingExtraImages, setExistingExtraImages] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    product_type: "",
    brand: "",
    price: "",
    model_year: "",
    exterior_finish: "",
    material: "",
    item_dimensions: "",
    description: "",
  });

  const [variant, setVariant] = useState({
    id: "",
    part_no: "",
    variant_name: "",
    color: "",
  });

  const [images, setImages] = useState({
    front_img: null,
    left_img: null,
    right_img: null,
    extra_images: [],
  });

  const [preview, setPreview] = useState({
    front_img: "",
    left_img: "",
    right_img: "",
    extra_images: [],
  });

  /* ================= FETCH CATEGORIES ================= */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`,
          { withCredentials: true }
        );
        if (res.data?.success) {
          setCategories(res.data.data || []);
        }
      } catch {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  /* ================= FETCH PRODUCT ================= */

  useEffect(() => {
    if (open && data?.product_id) fetchProduct();
  }, [open, data]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/${data.product_id}`,
        { withCredentials: true }
      );

      const p = res.data.data;
      console.log(p)
      const v = p.variants.find((x) => x.id === data.id);
      console.log(v)

      setProduct({
        name: p.name || "",
        category_id: p.category?.id ? String(p.category.id) : "",
        product_type: p.product_type,
        brand: p.brand || "",
        price: p.price || "",
        model_year: p.model_year || "",
        exterior_finish: p.exterior_finish || "",
        material: p.material || "",
        item_dimensions: p.item_dimensions || "",
        description: p.description || "",
      });

      setVariant({
        id: v.id,
        part_no: v.part_no || "",
        variant_name: v.variant_name || "",
        color: v.color || "",
      });

      const dbExtraImages =
        p.product_type === "kit" && v.ProductImage?.extra_images
          ? (Array.isArray(v.ProductImage.extra_images)
            ? v.ProductImage.extra_images
            : String(v.ProductImage.extra_images).split(","))
          : [];

      setExistingExtraImages(dbExtraImages);

      setPreview({
        front_img: resolveImageUrl(v.ProductImage?.front_img),
        left_img: resolveImageUrl(v.ProductImage?.left_img),
        right_img: resolveImageUrl(v.ProductImage?.right_img),
        extra_images: dbExtraImages.map(resolveImageUrl),
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product");
    }
  };

  /* ================= HANDLERS ================= */

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));

    // same logic as AddProduct
    if (name === "product_type" && value === "single") {
      setProduct((p) => ({
        ...p,
        exterior_finish: "",
        material: "",
        item_dimensions: "",
      }));
      setImages((i) => ({ ...i, extra_images: [] }));
      setPreview((p) => ({ ...p, extra_images: [] }));
    }
  };

  const handleVariantChange = (e) =>
    setVariant((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files.length) return;

    if (name === "extra_images") {
      const imgs = Array.from(files);
      setImages((i) => ({
        ...i,
        extra_images: [...i.extra_images, ...imgs],
      }));

      setPreview((p) => ({
        ...p,
        extra_images: [
          ...p.extra_images,
          ...imgs.map((f) => URL.createObjectURL(f)),
        ],
      }));
    }
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const fd = new FormData();

      Object.entries(product).forEach(([k, v]) => v && fd.append(k, v));
      
      const variantsPayload = [
        {
          id: variant.id,
          part_no: variant.part_no,
          variant_name: variant.variant_name,
          color: variant.color,
        },
      ];

      fd.append("variants", JSON.stringify(variantsPayload));


      if (images.front_img) fd.append("front_img", images.front_img);
      if (images.left_img) fd.append("left_img", images.left_img);
      if (images.right_img) fd.append("right_img", images.right_img);

      if (product.product_type === "kit") {
        images.extra_images.forEach((img) =>
          fd.append("extra_images", img)
        );
      }

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/product/${data.product_id}`,
        fd,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        onUpdated();
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]">
        <form onSubmit={handleSubmit} className="space-y-10">

          {/* PRODUCT */}
          <Section title="Product Information" icon={<FaBoxOpen />}>
            <Grid>
              <Input label="Product Name" name="name" value={product.name} onChange={handleProductChange} />
              <Input label="Brand" name="brand" value={product.brand} onChange={handleProductChange} />
              <Input label="Price" name="price" value={product.price} onChange={handleProductChange} />
              <Input label="Model Year" name="model_year" value={product.model_year} onChange={handleProductChange} />

              <Select label="Product Type" name="product_type" value={product.product_type} onChange={handleProductChange}>
                <option value="single">Single</option>
                <option value="kit">Kit</option>
              </Select>

              <Select label="Category" name="category_id" value={product.category_id} onChange={handleProductChange}>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </Select>
            </Grid>

            {product.product_type === "kit" && (
              <Grid className="mt-6">
                <Input label="Exterior Finish" name="exterior_finish" value={product.exterior_finish} onChange={handleProductChange} />
                <Input label="Material" name="material" value={product.material} onChange={handleProductChange} />
                <Input label="Item Dimensions" name="item_dimensions" value={product.item_dimensions} onChange={handleProductChange} />
              </Grid>
            )}

            <Textarea label="Description" value={product.description} onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            } />
          </Section>

          {/* VARIANT */}
          <Section title="Variant Details" icon={<FaCubes />}>
            <Grid>
              <Input label="Part No" name="part_no" value={variant.part_no} onChange={handleVariantChange} />
              {product.product_type === "single" && (
                <Input label="Variant Name" name="variant_name" value={variant.variant_name} onChange={handleVariantChange} />
              )}
              <Input label="Color" name="color" value={variant.color} onChange={handleVariantChange} />
            </Grid>
          </Section>

          {/* IMAGES */}
          <Section title="Product Images" icon={<MdImage />}>
            <ImageGrid>
              <ImageUpload label="Front Image" name="front_img" preview={preview.front_img} onChange={handleImageChange} />
              <ImageUpload label="Left Image" name="left_img" preview={preview.left_img} onChange={handleImageChange} />
              <ImageUpload label="Right Image" name="right_img" preview={preview.right_img} onChange={handleImageChange} />
            </ImageGrid>

            {product.product_type === "kit" && (
              <div className="grid grid-cols-3 gap-6 mt-6">
                {preview.extra_images.map((img, i) => (
                  <ImageUpload key={i} label="Extra Image" preview={img} />
                ))}
                <ImageUpload
                  label="Add Extra Images"
                  name="extra_images"
                  onChange={handleImageChange}
                  multiple
                />
              </div>
            )}
          </Section>

          {/* ACTIONS */}
          <div className="flex justify-end gap-4">
            <button type="button" onClick={onClose} className="px-6 py-3 rounded-full border">
              Cancel
            </button>
            <button disabled={loading} className="bg-red-600 text-white px-10 py-3 rounded-full font-bold">
              {loading ? "Saving..." : "UPDATE"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default EditProductModel;