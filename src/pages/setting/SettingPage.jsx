import {
  Avatar,
  Button,
  Card,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DistrictsApi from "../../apis/districtsApi";
import UsersApi from "../../apis/usersApi";
import AuthApi from "../../apis/authApi";

export const SettingPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.districts);
  const { isLoading } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    id: user.id,
    name: user.name ?? "",
    phone: user.phone ?? "",
    photoUrl: user.photoUrl,
    gender: user.userGender ?? "",
    district: user.district?.districtName ?? "",
  });

  const [previewImage, setPreviewImage] = useState(
    user.photoUrl ?? "/ava_placeholder.png"
  );
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(true);
  const [isFormEdited, setIsFormEdited] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024) {
      setFormData({
        ...formData,
        photoUrl: file,
      });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photoUrl: "Ukuran gambar terlalu besar.",
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      photoUrl: user.photoUrl,
    });
    setPreviewImage(user.photoUrl);
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /\d{9,13}$/;

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor hp harus diisi.";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Nomor hp tidak valid.";
    }

    if (!formData.gender) {
      newErrors.gender = "Jenis Kelamin harus diisi.";
    }

    if (!formData.district) {
      newErrors.district = "Kota harus diisi.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name, value) => {
    const valueArray = Array.from(value);
    const selectedValue = valueArray[0];

    setFormData({
      ...formData,
      [name]: selectedValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.append("id", formData.id);
    data.append("name", formData.name);
    data.append("phone", formData.phone);
    data.append("userGender", formData.gender);
    data.append("districtId", formData.district);

    if (formData.photoUrl instanceof File) {
      data.append("file", formData.photoUrl);
    }

    await UsersApi.updateAdminProfile(data);
    await AuthApi.getUserData();
  };

  const fetchDistricts = useCallback(async () => {
    await DistrictsApi.getAllDistricts();
  }, []);

  const checkIfEdited = () => {
    const isEdited =
      formData.name !== user.name ||
      formData.phone !== user.phone ||
      formData.gender !== user.userGender ||
      formData.district !== user.district?.districtName ||
      (formData.photoUrl instanceof File &&
        formData.photoUrl !== user.photoUrl);

    setIsFormEdited(isEdited);
  };

  useEffect(() => {
    fetchDistricts();
  }, [fetchDistricts]);

  useEffect(() => {
    checkIfEdited();
    setIsFormValid(validateForm());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return (
    <Card>
      <div className="mx-auto px-4 w-full">
        <div className="flex flex-col justify-center p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Pengaturan Profil
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center relative">
              <label
                htmlFor="profilePicture"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Foto Profil
              </label>
              {previewImage && (
                <div className="flex justify-center mt-4">
                  <div className="relative">
                    <Avatar
                      src={previewImage}
                      alt="Pratinjau Gambar"
                      className="h-24 w-24 rounded-full object-cover cursor-pointer"
                      onClick={() =>
                        document.getElementById("profilePicture").click()
                      }
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
              {errors.photoUrl && (
                <p className="text-red-500 text-sm">{errors.photoUrl}</p>
              )}
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Klik untuk update, ukuran max 2mb
              </p>
              <Button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 mb-2 text-white"
                color="danger"
                variant="light"
              >
                Hapus Foto
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nama Lengkap
                </p>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1"
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Nama yang ditampilkan
                </p>
              </div>

              <div>
                <p className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Nomor hp
                </p>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone}</p>
                )}
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Contoh: 6281212341234
                </p>
              </div>

              <div>
                <Select
                  label="Kota"
                  size="sm"
                  defaultSelectedKeys={[user.districtId]}
                  onSelectionChange={(value) =>
                    handleSelectChange("district", value)
                  }
                >
                  {items.map((district) => (
                    <SelectItem className="dark:text-white" key={district.id}>
                      {district.districtName}
                    </SelectItem>
                  ))}
                </Select>
                {errors.district && (
                  <p className="text-red-500 text-sm">{errors.district}</p>
                )}
              </div>
              <div>
                <Select
                  label="Gender"
                  size="sm"
                  defaultSelectedKeys={[
                    formData.gender === "MALE" ? "Male" : "Female",
                  ]}
                  onSelectionChange={(value) =>
                    handleSelectChange("gender", value)
                  }
                >
                  <SelectItem className="dark:text-white" key="Male">
                    Laki-laki
                  </SelectItem>
                  <SelectItem className="dark:text-white" key="Female">
                    Perempuan
                  </SelectItem>
                </Select>
                {errors.gender && (
                  <p className="text-red-500 text-sm">{errors.gender}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              color="primary"
              variant="flat"
              isDisabled={isLoading || !isFormValid || !isFormEdited}
            >
              Simpan
            </Button>
          </form>
        </div>
      </div>
    </Card>
  );
};
