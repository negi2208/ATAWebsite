import React, { useState, useEffect } from "react";
import axios from "axios";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import toast from "react-hot-toast";
import { logoutAdminAPI } from "../../pages/AdminAuth/LogoutAdmin";
import { useAuthStore } from "../../store/authStore";

const ProfileSettings = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    newPassword: "",
  });

  const [originalAdmin, setOriginalAdmin] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const { logout } = useAuthStore();

  /* ---------------- FETCH PROFILE ---------------- */

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/admin/profile`,
          { withCredentials: true }
        );

        if (data.success) {
          setAdmin({
            name: data.data.name || "",
            email: data.data.email || "",
            newPassword: "",
          });

          setOriginalAdmin({
            name: data.data.name || "",
            email: data.data.email || "",
          });
        }
      } catch {
        toast.error("Failed to load profile");
      }
    };

    fetchAdmin();
  }, []);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {};
    let passwordChanged = false;

    if (admin.name !== originalAdmin.name) updates.name = admin.name;
    if (admin.email !== originalAdmin.email) updates.email = admin.email;

    if (admin.newPassword) {
      updates.password = admin.newPassword;
      passwordChanged = true;
    }

    if (Object.keys(updates).length === 0) {
      toast("No changes detected");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/admin/profile`,
        updates,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("Profile updated successfully");

        // 🔥 logout ONLY if password changed
        if (passwordChanged) {
          toast("Password changed. Please login again.");

          logoutAdminAPI();
          logout();
          localStorage.removeItem("admin-store");

          setTimeout(() => {
            window.location.replace("/admin/login");
          }, 800);
        } else {
          setEditMode(false);
          setOriginalAdmin({
            name: admin.name,
            email: admin.email,
          });
          setAdmin({ ...admin, newPassword: "" });
        }
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-14">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Profile Settings
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* NAME */}
          <Field label="Name">
            <input
              type="text"
              name="name"
              disabled={!editMode}
              value={admin.name}
              onChange={handleChange}
              className={inputClass(editMode)}
            />
          </Field>

          {/* EMAIL */}
          <Field label="Email">
            <input
              type="email"
              name="email"
              disabled={!editMode}
              value={admin.email}
              onChange={handleChange}
              className={inputClass(editMode)}
            />
          </Field>

          {/* PASSWORD */}
          {editMode && (
            <Field label="New Password">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={admin.newPassword}
                  onChange={handleChange}
                  placeholder="Leave blank if not changing"
                  className={inputClass(true)}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </span>
              </div>
            </Field>
          )}

          {/* ACTION BUTTONS */}
          <div className="pt-4">
            {!editMode ? (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setAdmin({ ...admin, newPassword: "" });
                  }}
                  className="w-1/2 border rounded-md py-2"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

/* ---------------- SMALL COMPONENTS ---------------- */

const Field = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
  </div>
);

const inputClass = (editable) =>
  `w-full border rounded-md px-3 py-2 transition
   ${editable
     ? "bg-white focus:ring-2 focus:ring-blue-500"
     : "bg-gray-100 text-gray-500 cursor-not-allowed"
   }`;

export default ProfileSettings;
