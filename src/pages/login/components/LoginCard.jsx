import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import AuthApi from "../../../apis/authApi";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await AuthApi.login(data.usernameOrEmail, data.password);
    } catch (error) {
      console.error(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };

  return (
    <div className="w-full max-w-md sm:pl-8 pl-0 mx-auto">
      <h1 className="text-red-500 font-bold top-0 right-0 mb-8 animate__animated animate__fadeInDown">
        Kerjain Aja Admin
      </h1>
      <div className="space-y-1 flex flex-col mb-4 animate__animated animate__fadeInDown">
        <h1 className="text-2xl font-bold">Selamat Datang Kembali! 👋</h1>
        <p className="font-light text-gray-500 text-sm">
          Masukan email dan kata sandi untuk masuk ke akun anda.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("usernameOrEmail", {
                  required: "Email atau username harus diisi",
                })}
                id="usernameOrEmail"
                type="usernameOrEmail"
                variant="underlined"
                placeholder="Email atau Username"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
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
                  placeholder="Password"
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
          </div>
          <Button className="w-full my-6 bg-[#4f6def] text-white" type="submit">
            Masuk
          </Button>
        </form>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <a
          href="#"
          className="text-sm text-primary underline-offset-4 transition-colors hover:underline"
        >
          Lupa kata sandi?
        </a>
      </div>
    </div>
  );
}
