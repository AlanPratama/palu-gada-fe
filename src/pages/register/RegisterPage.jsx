import RegisterCard from "./components/RegisterCard";

export const RegisterPage = () => {
  return (
    <div className="bg-white dark:bg-gray-800 flex flex-1 min-h-screen">
      <div className="my-auto px-4 mx-auto sm:w-3/4 md:px-24 lg:px-4 max-lg:py-4 py-2">
        <div className="flex flex-col overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md lg:flex-row-reverse sm:mx-auto">
          <div className="relative lg:w-1/2 bg-gradient-to-br from-primary to-purple-500">
            <svg
              className="absolute top-0 -left-1 hidden -scale-100 h-full dark:text-gray-900 text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
            <img
              src="/login_illust.png"
              alt="image pemanis"
              className="object-scale-down animate__animated animate__fadeInRight lg:pl-8 lg:absolute lg:h-full mx-auto"
            />
          </div>
          <div className="flex flex-col justify-center p-8 bg-white dark:bg-gray-900 lg:p-16 lg:pl-10 lg:w-1/2 z-10">
            <RegisterCard />
          </div>
        </div>
      </div>
    </div>
  );
};
