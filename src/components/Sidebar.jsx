import { Button } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import store from "../redux/store";

export const SidebarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    store.dispatch(logout());
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate(0);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform sticky lg:translate-x-0 lg:ml-0 -ml-64 top-0 left-0 z-40 w-64 min-h-screen border-r-divider border-r-1 bg-white dark:bg-gray-950 h-screen overflow-y-auto`}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <div className={`flex flex-col gap-6 p-4 mt-16 lg:mt-0`}>
            <img src="/kerjain light.png" alt="logo" className="w-full" />
          </div>
          <div className={`flex flex-col gap-6 px-4`}>
            <Button
              variant={location.pathname == "/" ? "flat" : "light"}
              color={location.pathname == "/" ? "primary" : "default"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/")}
            >
              <ion-icon name="home-outline"></ion-icon>
              <span>Beranda</span>
            </Button>
            <div className="flex gap-2 flex-col">
              <span className="text-xs font-normal">Menu Utama</span>
              <Button
                variant={location.pathname == "/post" ? "flat" : "light"}
                color={location.pathname == "/post" ? "primary" : "default"}
                className=" active:bg-none max-w-full justify-start"
                onClick={() => handleNavigate("/post")}
              >
                <ion-icon name="document-text-outline"></ion-icon>
                <span>Postingan</span>
              </Button>
              <Button
                variant={location.pathname == "/users" ? "flat" : "light"}
                color={location.pathname == "/users" ? "primary" : "default"}
                className=" active:bg-none max-w-full justify-start"
                onClick={() => handleNavigate("/users")}
              >
                <ion-icon name="people-outline"></ion-icon>
                <span>Pengguna</span>
              </Button>
              <Button
                variant={location.pathname == "/bid" ? "flat" : "light"}
                color={location.pathname == "/bid" ? "primary" : "default"}
                className=" active:bg-none max-w-full justify-start"
                onClick={() => handleNavigate("/bid")}
              >
                <ion-icon name="document-lock-outline"></ion-icon>
                <span>Tawaran</span>
              </Button>
              <Button
                variant={location.pathname == "/report-post" ? "flat" : "light"}
                color={
                  location.pathname == "/report-post" ? "primary" : "default"
                }
                className=" active:bg-none max-w-full justify-start"
                onClick={() => handleNavigate("/report-post")}
              >
                <ion-icon name="alert-circle-outline"></ion-icon>
                <span>Laporan Postingan</span>
              </Button>
            </div>
            <div className="flex gap-2 flex-col">
              <span className="text-xs font-normal">Umum</span>
              <Button
                variant={location.pathname == "/categories" ? "flat" : "light"}
                color={
                  location.pathname == "/categories" ? "primary" : "default"
                }
                className=" active:bg-none max-w-full justify-start"
                onClick={() => handleNavigate("/categories")}
              >
                <ion-icon name="pricetags-outline"></ion-icon>
                <span>Kategori</span>
              </Button>
              <Button
                variant={location.pathname == "/city" ? "flat" : "light"}
                color={location.pathname == "/city" ? "primary" : "default"}
                className=" active:bg-none max-w-full justify-start"
                onClick={() => handleNavigate("/city")}
              >
                <ion-icon name="location-outline"></ion-icon>
                <span>Kota</span>
              </Button>
            </div>
            <div className="flex gap-2 flex-col">
              <span className="text-xs font-normal">Perawatan</span>
              <Button
                variant={
                  location.pathname == "/error-report" ? "flat" : "light"
                }
                color={
                  location.pathname == "/error-report" ? "primary" : "default"
                }
                className=" active:bg-none max-w-full justify-start"
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
            variant={"flat"}
            className=" active:bg-none max-w-full justify-start"
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
