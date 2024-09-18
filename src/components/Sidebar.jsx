import {
  Accordion,
  AccordionItem,
  Badge,
  Button,
  Divider,
  User,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import store from "../redux/store";

export const SidebarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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
    handleNavigate(0);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform sticky lg:translate-x-0 lg:ml-0 -ml-64 top-0 left-0 z-40 w-64 min-h-screen border-r-divider border-r-1 bg-white dark:bg-gray-950 h-screen overflow-y-auto`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 p-4">
          <User
            name={<p className="text-lg">{user.username}</p>}
            className="h-20 font-bold sm:mt-0 mt-14"
            description={<p className="text-md">{user.email}</p>}
            avatarProps={{
              size: "lg",
              src: user.photoUrl,
            }}
          />
          <Divider />
          <Button
            variant={location.pathname == "/" ? "solid" : "light"}
            color={
              location.pathname == "/"
                ? darkMode
                  ? "secondary"
                  : "primary"
                : "default"
            }
            className="active:bg-none justify-start rounded-md"
            onClick={() => handleNavigate("/")}
            startContent={<ion-icon name="home-outline"></ion-icon>}
          >
            <span>Beranda</span>
          </Button>

          {/* Accordion, kenapa banyak? karena ngebug kalo jadi satu, tutup 1 ketutup semua */}
          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["MainMenu"]}
          >
            <AccordionItem
              key="MainMenu"
              aria-label="Menu Utama"
              title="Menu Utama"
            >
              <div className="flex gap-2 flex-col">
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
                  startContent={
                    <ion-icon name="alert-circle-outline"></ion-icon>
                  }
                  endContent={
                    <Badge
                      content={"!"}
                      color="danger"
                      size="sm"
                      placement="top-left"
                      className="font-bold p-2 ml-2 border-none"
                    ></Badge>
                  }
                >
                  <span>Laporan Postingan</span>
                </Button>
              </div>
              <div className="flex gap-2 flex-col"></div>
            </AccordionItem>
          </Accordion>
          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["Umum"]}
          >
            <AccordionItem key="Umum" aria-label="Umum" title="Umum">
              <div className="flex gap-2 flex-col">
                <Button
                  variant={
                    location.pathname == "/categories" ? "solid" : "light"
                  }
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
            </AccordionItem>
          </Accordion>
          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["Transaksi"]}
          >
            <AccordionItem
              key="Transaksi"
              aria-label="Transaksi"
              title="Transaksi"
            >
              <div className="flex gap-2 flex-col">
                <Button
                  variant={location.pathname == "/payments" ? "solid" : "light"}
                  color={
                    location.pathname == "/payments"
                      ? darkMode
                        ? "secondary"
                        : "primary"
                      : "default"
                  }
                  className=" active:bg-none max-w-full justify-start rounded-md"
                  onClick={() => handleNavigate("/payments")}
                >
                  <ion-icon name="card-outline"></ion-icon>
                  <span>Pembayaran</span>
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["Perawatan"]}
          >
            <AccordionItem
              key="Perawatan"
              aria-label="Perawatan"
              title="Perawatan"
            >
              <div className="flex gap-2 flex-col">
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
            </AccordionItem>
          </Accordion>
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
