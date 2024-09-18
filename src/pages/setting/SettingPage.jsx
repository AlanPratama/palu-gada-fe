import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/users/usersSlice";
import { Link } from "react-router-dom";
import { Input, Button } from '@nextui-org/react';

export const SettingPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const defaultProfilePicture = "https://i.pravatar.cc/150?u=a042581f4e29026704d";

  const currentUser = items[0] || {
    id: 1,
    name: user.sub || "John Doe",
    phone: "123456789",
    email: "john.doe@example.com",
    username: "johndoe",
    address: "123 Main St",
    balance: 5000,
    bankAccount: "123-456-789",
    birthDate: "1990-01-01",
    gender: "male",
    profilePicture: user.photoUrl || defaultProfilePicture,
  };

  const [formData, setFormData] = useState({
    name: currentUser.name,
    phone: currentUser.phone,
    email: currentUser.email,
    username: currentUser.username,
    address: currentUser.address,
    balance: currentUser.balance,
    bankAccount: currentUser.bankAccount,
    birthDate: currentUser.birthDate,
    gender: currentUser.gender,
    profilePicture: currentUser.profilePicture,
  });

  const [previewImage, setPreviewImage] = useState(currentUser.profilePicture);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        profilePicture: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      profilePicture: defaultProfilePicture,
    });
    setPreviewImage(defaultProfilePicture);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("id", currentUser.id);
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("email", formData.email);
    data.append("username", formData.username);
    data.append("address", formData.address);
    if (formData.profilePicture instanceof File) {
      data.append("profilePicture", formData.profilePicture);
    }

    dispatch(updateUser(data));
    alert("User data updated successfully!");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-8"> {/* Wrapper with max-width */}
        <div className="flex flex-col justify-center bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center relative">
              <label htmlFor="profilePicture" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Foto Profil
              </label>
              {previewImage && (
                <div className="flex justify-center mt-4">
                  <div className="relative">
                    <img
                      src={previewImage}
                      alt="Pratinjau Gambar"
                      className="h-24 w-24 rounded-full object-cover cursor-pointer"
                      onClick={() => document.getElementById('profilePicture').click()}
                    />
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              )}
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Klik untuk update, ukuran max 2mb</p>
              <Button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 bg-red-500 text-white hover:bg-red-600"
                color="error"
              >
                Hapus Foto
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Pengguna</p>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Nama yang ditampilkan</p>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap</p>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              
              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">Nomor hp</p>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Contoh: 6281212341234</p>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</p>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="text-center mt-6">
              <Button
                type="submit"
                color="primary"
                className="px-4 py-2"
              >
                Perbaharui
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <Link to="/reset-password" className="text-sm text-primary underline-offset-4 transition-colors hover:underline">
                Ubah Kata Sandi
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
