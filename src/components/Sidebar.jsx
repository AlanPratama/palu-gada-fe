import { Button, Divider, Image } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import store from "../redux/store";
import { useSelector } from "react-redux";

export const SidebarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.theme);

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    store.dispatch(logout());
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("rememberedAccount");
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform sticky lg:translate-x-0 lg:ml-0 -ml-64 top-0 left-0 z-40 w-64 min-h-screen border-r-divider border-r-1 bg-gradient-to-b from-blue-200 to-cyan-200 dark:from-purple-950 dark:to-blue-950 h-screen overflow-y-auto`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className="flex flex-col gap-6 p-4 mt-16 lg:mt-0">
            <Image src="/kerjain light.png" alt="logo" className="w-full" />
          </div>
          <Divider />
          <div className="flex flex-col gap-6 px-4 mt-4">
            <Button
              variant={location.pathname == "/" ? "solid" : "light"}
              color={
                location.pathname == "/"
                  ? darkMode
                    ? "secondary"
                    : "primary"
                  : "default"
              }
              className=" active:bg-none max-w-full justify-start rounded-md"
              onClick={() => handleNavigate("/")}
              startContent={<ion-icon name="home-outline"></ion-icon>}
            >
              <span>Beranda</span>
            </Button>
            <div className="flex gap-2 flex-col">
              <span className="text-xs font-bold">Menu Utama</span>
              <Button
                variant={location.pathname == "/posts" ? "solid" : "light"}
                color={
                  location.pathname == "/posts"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/posts")}
                startContent={
                  <ion-icon name="document-text-outline"></ion-icon>
                }
              >
                <span>Postingan</span>
              </Button>
              <Button
                variant={location.pathname == "/users" ? "solid" : "light"}
                color={
                  location.pathname == "/users"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/users")}
                startContent={<ion-icon name="people-outline"></ion-icon>}
              >
                <span>Pengguna</span>
              </Button>
              <Button
                variant={location.pathname == "/bids" ? "solid" : "light"}
                color={
                  location.pathname == "/bids"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/bids")}
                startContent={
                  <ion-icon name="document-lock-outline"></ion-icon>
                }
              >
                <span>Tawaran</span>
              </Button>
              <Button
                variant={
                  location.pathname == "/report-post" ? "solid" : "light"
                }
                color={
                  location.pathname == "/report-post"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/report-post")}
                startContent={<ion-icon name="alert-circle-outline"></ion-icon>}
              >
                <span>Laporan Postingan</span>
              </Button>
            </div>
            <div className="flex gap-2 flex-col">
              <span className="text-xs font-bold">Umum</span>
              <Button
                variant={location.pathname == "/categories" ? "solid" : "light"}
                color={
                  location.pathname == "/categories"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/categories")}
                startContent={<ion-icon name="pricetags-outline"></ion-icon>}
              >
                <span>Kategori</span>
              </Button>
              <Button
                variant={location.pathname == "/cities" ? "solid" : "light"}
                color={
                  location.pathname == "/cities"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/cities")}
                startContent={<ion-icon name="location-outline"></ion-icon>}
              >
                <span>Kota</span>
              </Button>
            </div>
            <div className="flex gap-2 flex-col">
              <span className="text-xs font-bold">Perawatan</span>
              <Button
                variant={
                  location.pathname == "/error-report" ? "solid" : "light"
                }
                color={
                  location.pathname == "/error-report"
                    ? darkMode
                      ? "secondary"
                      : "primary"
                    : "default"
                }
                className=" active:bg-none max-w-full justify-start rounded-md"
                onClick={() => handleNavigate("/error-report")}
              >
                <ion-icon name="bug-outline"></ion-icon>
                <span>Laporan Error</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <Button
            variant="flat"
            color="danger"
            className=" active:bg-none max-w-full justify-start rounded-md"
            onClick={handleLogout}
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Keluar</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

SidebarComponent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
