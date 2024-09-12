import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LOGIN:", { email, password });
  };

  return (
    <div className="w-full max-w-md px-8 mx-auto">
      <h1 className="text-red-500 font-bold top-0 right-0 mb-10">
        PaluGada Admin
      </h1>
      <div className="space-y-1 flex flex-col mb-4">
        <h1 className="text-2xl font-bold">Selamat Datang Kembali! 👋</h1>
        <p className="font-light text-gray-500 text-sm">
          Masukan email dan kata sandi untuk masuk ke akun anda.
        </p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                variant="underlined"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  variant="underlined"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
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
