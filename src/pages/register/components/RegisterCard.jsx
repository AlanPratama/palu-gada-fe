import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AuthApi from "../../../apis/authApi";

export default function RegisterCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);
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
    <div className="w-full max-w-md lg:pl-8 pl-0 mx-auto">
      <h1 className="text-red-500 font-bold top-0 right-0 mb-8 animate__animated animate__fadeInDown">
        Kerjain Aja Admin
      </h1>
      <div className="space-y-1 flex flex-col mb-4 animate__animated animate__fadeInDown">
        <h1 className="text-2xl font-bold">Hallo admin! 👋</h1>
        <p className="font-light text-gray-500 text-sm">
          Lengkapi form untuk membuat akun baru.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
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
            </div>
            <div className="space-y-2">
              <Input
                {...register("username", { required: "Username harus diisi" })}
                id="username"
                type="username"
                variant="underlined"
                label="Username"
              />
              {errors.username && (
                <p className="text-red-500 text-xs">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register("password", {
                    required: "Password harus diisi",
                  })}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  variant="underlined"
                  label="Password"
                />
                <Button
                  isIconOnly
                  type="button"
                  variant="light"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <ion-icon name="eye-outline" className="h-4 w-4" />
                  ) : (
                    <ion-icon name="eye-off-outline" className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register("confirmPassword", {
                    required: "Konfirmasi Password harus diisi",
                    validate: (val) => {
                      if (watch("password") != val) {
                        return "Your passwords do no match";
                      }
                    },
                  })}
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  variant="underlined"
                  label="Konfirmasi Password"
                />
                <Button
                  isIconOnly
                  type="button"
                  variant="light"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <ion-icon name="eye-outline" className="h-4 w-4" />
                  ) : (
                    <ion-icon name="eye-off-outline" className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  {...register("secretKey", {
                    required: "Secret Key harus diisi",
                  })}
                  id="secretKey"
                  type={showSecretKey ? "text" : "password"}
                  variant="underlined"
                  label="Secret Key"
                />
                <Button
                  isIconOnly
                  type="button"
                  variant="light"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowSecretKey(!showSecretKey)}
                >
                  {showSecretKey ? (
                    <ion-icon name="eye-outline" className="h-4 w-4" />
                  ) : (
                    <ion-icon name="eye-off-outline" className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.secretKey && (
                <p className="text-red-500 text-xs mt-2">
                  {errors.secretKey.message}
                </p>
              )}
            </div>
          </div>
          <Button
            className="w-full my-6 bg-primary text-white"
            type="submit"
            isLoading={isLoading}
          >
            Daftar sebagai Admin
          </Button>
        </form>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-primary underline-offset-4 transition-colors hover:underline"
          >
            Klik disini
          </Link>
        </span>
      </div>
    </div>
  );
}
