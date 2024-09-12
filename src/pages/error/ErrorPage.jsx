import { Button, Image } from "@nextui-org/react";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-6">
          Oops! Page not found
        </p>
        <p className="text-lg text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-1 justify-center">
          <Image
            src="/404.png"
            alt="404 Illustration"
            height={200}
            className="mb-8"
          />
        </div>
        <Link to={"/"}>
          <Button color="primary" size="lg" className="font-semibold">
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};
