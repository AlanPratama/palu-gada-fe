import { Button, Checkbox, Image, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import AuthApi from "../../apis/authApi";
import bg from "/login_bg.jpg";
import bgLight from "/login_bg_light.jpg";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { darkMode } = useSelector((state) => state.theme);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.rememberAccount) {
      localStorage.setItem("rememberedAccount", "1");
    }

    try {
      await AuthApi.login(data.usernameOrEmail, data.password);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
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
            Anda. Login untuk mempermudah pencarian, pengelolaan, dan
            penyelesaian berbagai proyek secara efisien dan aman.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-12 overflow-y-auto bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
          Masuk
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("usernameOrEmail", {
              required: "Email atau username harus diisi",
            })}
            id="usernameOrEmail"
            type="usernameOrEmail"
            variant="underlined"
            label="Email atau Username"
          />
          {errors.usernameOrEmail && (
            <p className="text-red-500 text-xs">
              {errors.usernameOrEmail.message}
            </p>
          )}
          <Input
            {...register("password", {
              required: "Kata sandi harus diisi",
            })}
            id="password"
            type={showPassword ? "text" : "password"}
            variant="underlined"
            label="Kata sandi"
            endContent={
              <Button
                isIconOnly
                type="button"
                variant="light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <ion-icon
                    name="eye-outline"
                    size="small"
                    className="h-4 w-4"
                  />
                ) : (
                  <ion-icon
                    name="eye-off-outline"
                    size="small"
                    className="h-4 w-4"
                  />
                )}
              </Button>
            }
            className="dark:text-white"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
          <div className="flex justify-between items-center">
            <Checkbox
              {...register("rememberAccount")}
              className="text-sm text-gray-600 dark:text-gray-300"
            >
              Ingat Saya
            </Checkbox>
            <a
              href="#"
              className="text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Lupa kata sandi?
            </a>
          </div>
          <Button
            color="primary"
            type="submit"
            className="mx-auto w-2/4 flex-1 flex font-bold"
          >
            Masuk
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Belum punya akun?
          <Link
            to="/register"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {" "}
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
