import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div
      className="bg-cover bg-bottom relative h-screen w-screen font-poppins flex sm:flex-row-reverse flex-col tracking-widest"
      style={{
        backgroundImage: `url(https://img.freepik.com/free-photo/galaxy-night-landscape_23-2148895321.jpg?ga=GA1.1.1773950046.1726106664&semt=ais_hybrid)`,
      }}
    >
      <div className="my-auto mx-auto w-1/2">
        <img src="/astronot.png" className="float" />
      </div>
      <div className="text-center my-auto flex flex-col w-1/2 mx-auto">
        <p className="text-amber-500 font-bold text-2xl">
          Disuruh Alan <br />
          bikin begini
        </p>
        <h1 className="text-9xl text-white font-bold">404</h1>
        <p className="text-amber-500 font-bold text-3xl">Page not found</p>
        <Link to={"/"}>
          <Button
            variant="solid"
            color="warning"
            className="w-fit mx-auto font-bold mt-8 rounded-full"
          >
            Kembali
          </Button>
        </Link>
      </div>
    </div>
  );
};
