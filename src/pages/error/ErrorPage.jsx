import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spacer,
} from "@nextui-org/react";
import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-4 w-[500px]">
        <CardHeader>
          <div className="mx-auto">
            <ion-icon name="warning" style={{ fontSize: 64 }} color="warning" />
          </div>
        </CardHeader>
        <CardBody>
          <h2 className="text-center text-2xl font-bold -mt-4">
            Ups! Terjadi kesalahan!
          </h2>
          <Spacer />
          <h4 className="text-center text-lg mb-2">
            Harap laporkan masalah ini.
          </h4>
          <Spacer className="text-center" />
          {error && (
            <div className="bg-neutral-200 rounded-lg p-4 h-20 overflow-y-auto">
              <p className="text-black">Pesan error: </p>
              <p className="text-red-500 font-bold">
                {error.statusText || error.message}
              </p>
            </div>
          )}
        </CardBody>
        <CardFooter>
          <div className="flex flex-row mx-auto gap-4 justify-center">
            <Link to={"/"}>
              <Button
                color="primary"
                variant="solid"
                className="mx-auto font-bold"
              >
                Kembali
              </Button>
            </Link>
            <Button
              color="danger"
              variant="solid"
              onClick={() => console.log("Report Clicked")}
              className="mx-auto font-bold"
            >
              Laporkan
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
