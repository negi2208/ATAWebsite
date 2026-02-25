import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";
import EditProductModal from "./EditProductModal";

const ProductManagement = () => {
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalVariants, setTotalVariants] = useState(0);

  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const itemsPerPage = 10;

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/management/product`,
        {
          params: { search, page: currentPage, limit: itemsPerPage },
          withCredentials: true,
        }
      );

      const { success, data, message } = res.data;
      console.log(data)

      if (success) {
        const flat = data.variants?.map((v) => ({
          id: v.id,
          product_id: v.product.id,
          sku: v.part_no,
          variant_name: v.variant_name,
          color: v.color,
          product_name: v.product.name,
          brand: v.product.brand,
          price: v.product.price,
        }));

        setVariants(flat);
        setTotalVariants(data.total);
        if (message) toast.success(message);
      } else {
        setVariants([]);
        setTotalVariants(0);
        toast.error(message || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const handleEdit = (row) => {
    setEditData(row);
    setEditOpen(true);
  };

  const exportExcel = () => {
    if (!variants.length) return;

    const ws = XLSX.utils.json_to_sheet(
      variants.map((v, index) => ({
        SR: (currentPage - 1) * itemsPerPage + index + 1,
        SKU: v.sku,
        Variant_Name: v.variant_name,
        Color: v.color,
        Product_Name: v.product_name,
        Brand: v.brand,
        Price: v.price,
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Variants");
    XLSX.writeFile(wb, "variants.xlsx");
  };

  const totalPages = Math.ceil(totalVariants / itemsPerPage);

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Product Management</h2>

        <button
          onClick={exportExcel}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="mb-4 flex gap-2 bg-white p-4 rounded-lg shadow-sm">
        <input
          type="text"
          placeholder="Search by SKU / Variant / Product"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg flex-1"
        />

        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 border">SR.</th>
              <th className="px-4 py-3 border">SKU</th>
              <th className="px-4 py-3 border">Variant Name</th>
              <th className="px-4 py-3 border">Color</th>
              <th className="px-4 py-3 border">Product</th>
              {/* <th className="px-4 py-3 border">Brand</th> */}
              <th className="px-4 py-3 border">Price</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : variants?.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6">
                  No data found
                </td>
              </tr>
            ) : (
              variants?.map((v, index) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 border">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>

                  <td className="px-4 py-3 border">{v.sku}</td>
                  <td className="px-4 py-3 border">{v.variant_name}</td>
                  <td className="px-4 py-3 border">{v.color}</td>
                  <td className="px-4 py-3 border">{v.product_name}</td>
                  {/* <td className="px-4 py-3 border">{v.brand}</td> */}
                  <td className="px-4 py-3 border">{v.price}</td>

                  <td className="px-4 py-3 border">
                    <div className="flex items-center gap-3">

                      {/* VIEW */}
                      <Link
                        to={`/admin/products/${v.product_id}`}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 transition"
                      >
                        View
                      </Link>

                      {/* EDIT */}
                      <button
                        onClick={() => handleEdit(v)}
                        className="px-4 py-1.5 rounded-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 hover:text-red-700 transition"
                      >
                        Edit
                      </button>

                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalVariants > itemsPerPage && (
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : ""
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((p) => Math.min(p + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
      {/* EDIT MODAL */}
      <EditProductModal
        open={editOpen}
        data={editData}
        onClose={() => setEditOpen(false)}
        onUpdated={fetchProducts}
      />
    </div>
  );
};

export default ProductManagement;
