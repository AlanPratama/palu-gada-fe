import { Button, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthApi from "../../apis/authApi";
import bg from "/login_bg.jpg";
import bgLight from "/login_bg_light.jpg";

export function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);
  const { isLoading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    const res = await toast.promise(AuthApi.registerAdmin(data), {
      pending: "Register...",
      success: "Register successful 👌",
      error: "Register failed 🤯",
    });
    if (res) {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className="hidden relative lg:flex lg:w-1/2 bg-blue-600 dark:bg-blue-800 text-white p-12 flex-col justify-between"
        style={{
          backgroundImage: darkMode ? `url(${bg})` : `url(${bgLight})`,
          backgroundSize: "cover",
        }}
      >
        <div>
          <Image
            src="./kerjain light.png"
            width={200}
            className="fixed left-10 top-5"
          />
          <h1 className="text-4xl font-bold mb-4 mt-12">
            Selamat Datang di Kerjain Admin!
          </h1>
          <p className="text-xl">
            Platform all-in-one untuk mengelola pekerjaan freelance dan odd jobs
            Anda. Daftar sekarang untuk mempermudah pencarian, pengelolaan, dan
            penyelesaian berbagai proyek secara efisien dan aman.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-12 overflow-y-auto bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Daftar
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email", { required: "Email harus diisi" })}
            id="email"
            type="email"
            variant="underlined"
            label="Email"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <Input
            {...register("username", { required: "Username harus diisi" })}
            id="username"
            type="text"
            variant="underlined"
            label="Username"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}

          <Input
            {...register("password", { required: "Password harus diisi" })}
            id="password"
            type={showPassword ? "text" : "password"}
            variant="underlined"
            label="Password"
            endContent={
              <Button
                isIconOnly
                type="button"
                variant="light"
                onClick={() => setShowPassword(!showPassword)}
              >
                <ion-icon
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size="small"
                  className="h-4 w-4"
                />
              </Button>
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <Input
            {...register("confirmPassword", {
              required: "Konfirmasi Password harus diisi",
              validate: (val) => {
                if (watch("password") != val) {
                  return "Your passwords do not match";
                }
              },
            })}
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            variant="underlined"
            label="Konfirmasi Password"
            endContent={
              <Button
                isIconOnly
                type="button"
                variant="light"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <ion-icon
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  size="small"
                  className="h-4 w-4"
                />
              </Button>
            }
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">
              {errors.confirmPassword.message}
            </p>
          )}

          <Input
            {...register("secretKey", { required: "Secret Key harus diisi" })}
            id="secretKey"
            type={showSecretKey ? "text" : "password"}
            variant="underlined"
            label="Secret Key"
            endContent={
              <Button
                isIconOnly
                type="button"
                variant="light"
                onClick={() => setShowSecretKey(!showSecretKey)}
              >
                <ion-icon
                  name={showSecretKey ? "eye-outline" : "eye-off-outline"}
                  size="small"
                  className="h-4 w-4"
                />
              </Button>
            }
          />
          {errors.secretKey && (
            <p className="text-red-500 text-xs">{errors.secretKey.message}</p>
          )}

          <Button
            color="primary"
            type="submit"
            className="mx-auto w-2/4 flex-1 flex font-bold"
            isLoading={isLoading}
          >
            Daftar
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
