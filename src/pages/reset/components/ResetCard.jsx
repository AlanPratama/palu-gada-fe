import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import AuthApi from "../../../apis/authApi";

export default function ResetCard() {
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
      {/* <h1 className="text-red-500 font-bold top-0 right-0 mb-8 animate__animated animate__fadeInDown">
        Kerjain Aja Admin
      </h1> */}
      <div className="space-y-1 flex flex-col mb-4 animate__animated animate__fadeInDown">
        <h1 className="text-2xl font-bold">Hallo admin! 👋</h1>
        <p className="font-light text-gray-500 text-sm">
          Lengkapi form untuk reset katasandi baru.
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
          </div>
          <Button
            className="w-full my-6 bg-primary text-white"
            type="submit"
            isLoading={isLoading}
          >
            Reset Katasandi Admin
          </Button>
        </form>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-sm">
          Sudah reset dan mau login?{" "}
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
