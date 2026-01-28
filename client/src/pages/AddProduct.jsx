import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdAddBox, MdImage } from "react-icons/md";
import { FaBoxOpen, FaCubes } from "react-icons/fa";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: "",
    category_id: "",
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

  /* ---------------- FETCH CATEGORIES ---------------- */

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`,
          { withCredentials: true }
        );

        if (res.data?.success) {
          setCategories(res.data.data || []);
        } else {
          toast.error(res.data?.message || "Failed to load categories");
        }
      } catch {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct((p) => ({ ...p, [name]: value }));

    if (name === "product_type" && value === "single") {
      setProduct((p) => ({
        ...p,
        exterior_finish: "",
        material: "",
        item_dimensions: "",
      }));
      setImages((i) => ({ ...i, extra_images: [] }));
    }
  };

  const handleVariantChange = (e) =>
    setVariant((v) => ({ ...v, [e.target.name]: e.target.value }));

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    if (name === "extra_images") {
      setImages((i) => ({ ...i, extra_images: Array.from(files) }));
    } else {
      setImages((i) => ({ ...i, [name]: files[0] }));
    }
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const fd = new FormData();

      Object.entries(product).forEach(([k, v]) => {
        if (v) fd.append(k, v);
      });

      const variants = [
        {
          temp_id: "main",
          part_no: variant.part_no,
          variant_name: variant.variant_name,
          color: variant.color,
        },
      ];

      fd.append("variants", JSON.stringify(variants));

      if (!images.front_img || !images.left_img || !images.right_img) {
        toast.error("Front, Left and Right images are mandatory");
        setLoading(false);
        return;
      }

      fd.append("variant_main", images.front_img);
      fd.append("variant_main", images.left_img);
      fd.append("variant_main", images.right_img);

      if (product.product_type === "kit") {
        images.extra_images.forEach((img) =>
          fd.append("variant_main", img)
        );
      }

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/product`,
        fd,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      res.data?.success
        ? toast.success(res.data.message)
        : toast.error(res.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Server error"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <MdAddBox className="text-4xl text-blue-600" />
          <h1 className="text-3xl font-bold">Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PRODUCT */}
          <Section title="Product Information" icon={<FaBoxOpen />}>
            <Grid>
              <Input label="Product Name" name="name" onChange={handleProductChange} />
              <Input label="Brand" name="brand" onChange={handleProductChange} />
              <Input label="Price" name="price" onChange={handleProductChange} />
              <Input label="Model Year" name="model_year" onChange={handleProductChange} />

              <div>
                <label className="label">Product Type</label>
                <select
                  name="product_type"
                  value={product.product_type}
                  onChange={handleProductChange}
                  className="input"
                >
                  <option value="single">Single</option>
                  <option value="kit">Kit</option>
                </select>
              </div>

              <div>
                <label className="label">Category</label>
                <select
                  name="category_id"
                  value={product.category_id}
                  onChange={handleProductChange}
                  className="input"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </Grid>

            {product.product_type === "kit" && (
              <Grid className="mt-6">
                <Input label="Exterior Finish" name="exterior_finish" onChange={handleProductChange} />
                <Input label="Material" name="material" onChange={handleProductChange} />
                <Input label="Item Dimensions" name="item_dimensions" onChange={handleProductChange} />
              </Grid>
            )}

            <div className="mt-6">
              <label className="label">Description</label>
              <textarea
                rows="4"
                name="description"
                onChange={handleProductChange}
                className="input"
              />
            </div>
          </Section>

          {/* VARIANT */}
          <Section title="Variant Details" icon={<FaCubes />}>
            <Grid>
              <Input label="Part No" name="part_no" onChange={handleVariantChange} />
              <Input label="Variant Name" name="variant_name" onChange={handleVariantChange} />
              <Input label="Color" name="color" onChange={handleVariantChange} />
            </Grid>
          </Section>

          {/* IMAGES */}
          <Section title="Product Images" icon={<MdImage />}>
            <Grid>
              <FileInput label="Front Image" name="front_img" onChange={handleImageChange} />
              <FileInput label="Left Image" name="left_img" onChange={handleImageChange} />
              <FileInput label="Right Image" name="right_img" onChange={handleImageChange} />
            </Grid>

            {product.product_type === "kit" && (
              <div className="mt-6">
                <FileInput
                  label="Extra Images"
                  name="extra_images"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            )}
          </Section>

          <div className="flex justify-end">
            <button
              disabled={loading}
              className="px-10 py-3 rounded-xl bg-blue-600 text-white font-semibold"
            >
              {loading ? "Saving..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .label { font-weight: 600; font-size: 14px; margin-bottom: 6px; display:block }
        .input {
          width:100%; border:1px solid #d1d5db;
          padding:10px 14px; border-radius:12px;
        }
        .input:focus {
          outline:none; border-color:#2563eb;
          box-shadow:0 0 0 2px rgba(37,99,235,.2)
        }
      `}</style>
    </div>
  );
};

/* --------- SMALL COMPONENTS --------- */

const Section = ({ title, icon, children }) => (
  <div className="bg-white rounded-2xl shadow p-8">
    <h2 className="flex items-center gap-2 text-xl font-semibold mb-6">
      {icon} {title}
    </h2>
    {children}
  </div>
);

const Grid = ({ children, className = "" }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
    {children}
  </div>
);

const Input = ({ label, ...props }) => (
  <div>
    <label className="label">{label}</label>
    <input {...props} className="input" />
  </div>
);

/* 🔥 CLEAN FILE INPUT (NO TEXT OVERFLOW) */
const FileInput = ({ label, name, multiple = false, onChange }) => {
  const [text, setText] = useState("No file chosen");

  const handleChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setText("No file chosen");
    } else if (multiple) {
      setText(`${files.length} file(s) selected`);
    } else {
      setText(files[0].name);
    }
    onChange(e);
  };

  return (
    <div className="space-y-1">
      <label className="label">{label}</label>
      <div className="flex items-center gap-3">
        <input
          id={name}
          type="file"
          name={name}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />

        <label
          htmlFor={name}
          className="cursor-pointer px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 whitespace-nowrap"
        >
          Choose file
        </label>

        <span className="text-sm text-gray-600 truncate max-w-[180px]" title={text}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default AddProduct;