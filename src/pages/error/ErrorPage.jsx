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
        <p
          className="text-amber-500 font-bold text-4xl"
          style={{
            color: "orange",
            // textShadow: '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.5)',
          }}
        >
          Disuruh Alan <br />
          bikin begini
        </p>
        <h1
          className="text-8xl text-white font-bold"
          style={{
            color: "white",
            // textShadow: '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.5)',
          }}
        >
          404
        </h1>
        <p
          className="text-amber-500 font-bold text-6xl"
          style={{
            color: "orange",
            // textShadow: '0 0 15px rgba(255, 255, 0, 0.8), 0 0 30px rgba(255, 255, 0, 0.5)',
          }}
        >
          Page not found
        </p>
        <Link to={"/"}>
          <Button
            variant="solid"
            color="warning"
            className="w-fit mx-auto font-bold mt-16 rounded-full px-12 py-6"
            style={{ color: "white", fontSize: "1.5rem", fontWeight: "800" }}
          >
            Kembali
          </Button>
        </Link>
      </div>
    </div>
  );
};
