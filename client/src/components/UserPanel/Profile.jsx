// src/components/UserPanel/Profile.jsx
import React, { useState, useEffect } from 'react';
import UserLayout from '../../Layout/UserLayout';
import { Camera, Mail, Phone, User, X, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const { user, updateProfile } = useAuthStore();

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || ''
      });
      setPreviewImage(user.photo || null);
    }
  }, [user]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateProfile({ ...editForm, photo: previewImage });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
    setPreviewImage(user.photo || null);
    setIsEditing(false);
  };

  const getInitial = (name) => {
    return name?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <UserLayout activePage="profile">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-2 text-black-600">My Profile</h1>
          <p className="text-gray-600">Manage your personal information</p>
        </div>

        {/* Profile Card */}
        <div className="max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-neutral-200">
            <div className="flex flex-col items-center gap-6">

              {/* Profile Photo / Initial - RED THEME */}
              <div className="relative group">
                {previewImage ? (
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-red-300 shadow-md">
                    <img 
                      src={previewImage} 
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-600 to-primary-700 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                    {getInitial(user?.name)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-full transition-all flex items-center justify-center">
                  <Camera className="w-7 h-7 text-white opacity-0 group-hover:opacity-100" />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center space-y-3 w-full">
                <h2 className="text-2xl font-bold text-gray-800">{user?.name || 'User'}</h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="w-4 h-4 text-red-500" />
                    <span>{user?.email || 'Not provided'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>{user?.phone || 'Not provided'}</span>
                  </div>
                  <div className="flex items-start justify-center gap-2 max-w-xs mx-auto">
                    <MapPin className="w-4 h-4 mt-0.5 text-red-500" />
                    <span className="text-left">{user?.address || 'No address added'}</span>
                  </div>
                </div>
              </div>

              {/* Edit Button - RED */}
              <button
                onClick={() => setIsEditing(true)}
                className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-primary-600 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <User className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative max-h-screen overflow-y-auto">
            <button onClick={handleCancel} className="absolute top-4 right-4 text-gray-400 hover:text-red-600">
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-2xl font-bold mb-6 text-center text-red-600">Edit Profile</h3>

            {/* Photo / Initial */}
            <div className="flex justify-center mb-6">
              <label className="cursor-pointer relative group">
                <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-dashed border-red-300 bg-red-50 flex items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl font-bold text-red-500">
                      {getInitial(editForm.name)}
                    </span>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-full flex items-center justify-center transition-all">
                  <Camera className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
                </div>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  value={editForm.phone}
                  onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea
                  rows="3"
                  value={editForm.address}
                  onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button onClick={handleSave} className="flex-1 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700">
                Save Changes
              </button>
              <button onClick={handleCancel} className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  );
}