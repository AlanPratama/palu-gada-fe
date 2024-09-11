import LoginCard from "./components/LoginCard";
import illust from "/login_illust.png";

export const LoginPage = () => {
  return (
    <div className="bg-white">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col overflow-hidden bg-white border rounded-xl shadow-md lg:flex-row sm:mx-auto">
          <div className="relative lg:w-1/2 bg-gradient-to-br from-blue-300 to-purple-300">
            <img
              src={illust}
              alt=""
              className="object-cover lg:absolute h-80 lg:h-full"
            />
            <svg
              className="absolute top-0 right-0 hidden h-full text-white lg:inline-block"
              viewBox="0 0 20 104"
              fill="currentColor"
            >
              <polygon points="17.3036738 5.68434189e-14 20 5.68434189e-14 20 104 0.824555778 104" />
            </svg>
          </div>
          <div className="flex flex-col justify-center p-8 bg-white lg:p-16 lg:pl-10 lg:w-1/2">
            <LoginCard />
          </div>
        </div>
      </div>
    </div>
  );
};
