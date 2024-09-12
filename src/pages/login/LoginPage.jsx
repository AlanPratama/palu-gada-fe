import LoginCard from "./components/LoginCard";

export const LoginPage = () => {
  return (
    <div className="bg-white flex flex-1 min-h-screen">
      <div className="my-auto px-4 py-16 mx-auto w-3/4 md:px-24 lg:px-4 lg:py-10">
        <div className="flex flex-col overflow-hidden bg-white border rounded-xl shadow-md lg:flex-row sm:mx-auto">
          <div className="relative lg:w-1/2 bg-gradient-to-br from-[#4f6def] to-purple-500">
            <img
              src="/login_illust.png"
              alt=""
              className="object-scale-down animate__animated animate__fadeInRight pr-8 lg:absolute lg:h-full mx-auto"
            />
            <svg
              className="absolute top-0 -right-2 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2 z-10">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};
