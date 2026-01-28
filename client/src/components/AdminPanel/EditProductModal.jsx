import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBoxOpen, FaCubes } from "react-icons/fa";
import { MdImage } from "react-icons/md";
import { resolveImageUrl } from "../../utils/ImagesUtils";

const EditProductModel = ({ open, data, onClose, onUpdated }) => {
  if (!open) return null;

  const [loading, setLoading] = useState(false);

  const [product, setProduct] = useState({
    name: "",
    product_type: "single",
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

  /* ================= GET PRODUCT ================= */

  useEffect(() => {
    if (open && data?.product_id) {
      fetchProduct();
    }
  }, [open, data]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/product/${data.product_id}`,
        { withCredentials: true }
      );

      const p = res.data.data;
      const v = p.variants.find((x) => x.id === data.id);

      setProduct({
        name: p.name || "",
        product_type: p.product_type || "single",
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

      setPreview({
        front_img: resolveImageUrl(v.images?.front_img),
        left_img: resolveImageUrl(v.images?.left_img),
        right_img: resolveImageUrl(v.images?.right_img),
        extra_images: Array.isArray(v.images?.extra_images)
          ? v.images.extra_images.map(resolveImageUrl)
          : [],
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load product");
    }
  };

  /* ================= IMAGE CHANGE ================= */

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    if (!files || !files.length) return;

    if (name === "extra_images") {
      const imgs = Array.from(files);

      setImages((prev) => ({
        ...prev,
        extra_images: imgs,
      }));

      setPreview((prev) => ({
        ...prev,
        extra_images: imgs.map((f) => URL.createObjectURL(f)),
      }));
    } else {
      setImages((prev) => ({
        ...prev,
        [name]: files[0],
      }));

      setPreview((prev) => ({
        ...prev,
        [name]: URL.createObjectURL(files[0]),
      }));
    }
  };

  /* ================= UPDATE ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      Object.entries(product).forEach(([k, v]) => v && fd.append(k, v));
      Object.entries(variant).forEach(([k, v]) => v && fd.append(k, v));

      if (images.front_img) fd.append("front_img", images.front_img);
      if (images.left_img) fd.append("left_img", images.left_img);
      if (images.right_img) fd.append("right_img", images.right_img);

      images.extra_images.forEach((img) =>
        fd.append("extra_images", img)
      );

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/products/${data.product_id}`,
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

  /* ================= UI ================= */

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl p-10 overflow-y-auto max-h-[90vh]">

        <form onSubmit={handleSubmit} className="space-y-10">

          {/* PRODUCT */}
          <Section title="Product Information" icon={<FaBoxOpen />}>
            <Grid>
              <Input label="Product Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
              <Input label="Brand" value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })} />
              <Input label="Price" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
              <Input label="Model Year" value={product.model_year} onChange={(e) => setProduct({ ...product, model_year: e.target.value })} />
            </Grid>

            <Textarea
              label="Description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
            />
          </Section>

          {/* VARIANT */}
          <Section title="Variant Details" icon={<FaCubes />}>
            <Grid>
              <Input label="Part No" value={variant.part_no} onChange={(e) => setVariant({ ...variant, part_no: e.target.value })} />
              <Input label="Variant Name" value={variant.variant_name} onChange={(e) => setVariant({ ...variant, variant_name: e.target.value })} />
              <Input label="Color" value={variant.color} onChange={(e) => setVariant({ ...variant, color: e.target.value })} />
            </Grid>
          </Section>

          {/* IMAGES */}
          <Section title="Product Images" icon={<MdImage />}>
            <ImageGrid>
              <ImageUpload label="Front Image" name="front_img" preview={preview.front_img} onChange={handleImageChange} />
              <ImageUpload label="Left Image" name="left_img" preview={preview.left_img} onChange={handleImageChange} />
              <ImageUpload label="Right Image" name="right_img" preview={preview.right_img} onChange={handleImageChange} />
            </ImageGrid>

            {/* EXTRA IMAGES */}
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

/* ================= UI COMPONENTS ================= */

const Section = ({ title, icon, children }) => (
  <div className="space-y-6">
    <h2 className="flex items-center gap-2 text-xl font-bold text-gray-800">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-3 gap-6">{children}</div>
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

export default EditProductModel;
