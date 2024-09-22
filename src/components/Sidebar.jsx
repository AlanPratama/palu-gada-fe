"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  User,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../redux/auth/authSlice";
import store from "../redux/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

export const SidebarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { darkMode } = useSelector((state) => state.theme);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsMinimized(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleLogout = () => {
    store.dispatch(logout());
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    navigate(0);
    setSidebarOpen(false);
    handleNavigate(0);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const renderButton = (path, icon, text) => (
    <Button
      variant={location.pathname === path ? "solid" : "light"}
      color={
        location.pathname === path
          ? darkMode
            ? "secondary"
            : "primary"
          : "default"
      }
      className="active:bg-none max-w-full justify-start rounded-md"
      onClick={() => handleNavigate(path)}
      isIconOnly={isMinimized}
    >
      <div className={isMinimized ? "mx-auto my-auto" : ""}>
        <ion-icon name={`${icon}-outline`} />
      </div>
      {!isMinimized && <span>{text}</span>}
    </Button>
  );

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-all duration-300 fixed lg:sticky lg:translate-x-0 top-0 left-0 z-40 ${
        isMinimized ? "w-20" : "w-64"
      } h-screen border-r-divider border-r-1 bg-white dark:bg-gray-950 overflow-y-auto overflow-x-hidden hidden lg:block`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-2 p-4">
          <Button
            isIconOnly
            variant="light"
            className="mb-2 self-end"
            onClick={toggleMinimize}
          >
            <ion-icon
              name={isMinimized ? "menu-outline" : "close-outline"}
              size="large"
            ></ion-icon>
          </Button>
          <Divider />

          {!isMinimized ? (
            <User
              name={<p className="text-lg">{user.username}</p>}
              className="h-20 font-bold sm:mt-0 mt-14"
              description={<p className="text-md">{user.email}</p>}
              avatarProps={{
                size: "lg",
                src: user.photoUrl,
              }}
            />
          ) : (
            <User
              avatarProps={{
                size: "sm",
                src: user.photoUrl,
              }}
              className="w-10 h-10 ml-1.5"
            />
          )}
          <Divider />
          {renderButton("/", "home", "Beranda")}

          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["MainMenu"]}
            hideIndicator={isMinimized}
          >
            <AccordionItem
              key="MainMenu"
              aria-label="Menu Utama"
              title={
                isMinimized ? (
                  <p className="text-center ml-2">•••</p>
                ) : (
                  "Menu Utama"
                )
              }
              className={isMinimized ? "-ml-2" : ""}
            >
              <div className="flex gap-2 flex-col">
                {renderButton("/posts", "document-text", "Postingan")}
                {renderButton("/users", "people", "Pengguna")}
                {renderButton("/bids", "hammer", "Tawaran")}
                {renderButton(
                  "/report-post",
                  "alert-circle",
                  "Laporan Postingan"
                )}
                {renderButton("/reviews", "star", "Ulasan")}
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["Umum"]}
          >
            <AccordionItem
              key="Umum"
              aria-label="Umum"
              title={
                isMinimized ? <p className="text-center ml-2">•••</p> : "Umum"
              }
              className={isMinimized ? "-ml-2" : ""}
              hideIndicator={isMinimized}
            >
              <div className="flex gap-2 flex-col">
                {renderButton("/categories", "pricetags", "Kategori")}
                {renderButton("/cities", "location", "Kota")}
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["Transaksi"]}
            hideIndicator={isMinimized}
          >
            <AccordionItem
              key="Transaksi"
              aria-label="Transaksi"
              title={
                isMinimized ? (
                  <p className="text-center ml-2">•••</p>
                ) : (
                  "Transaksi"
                )
              }
              className={isMinimized ? "-ml-2" : ""}
            >
              <div className="flex gap-2 flex-col">
                {renderButton("/payments", "arrow-redo", "Transaksi Masuk")}
                {renderButton("/payouts", "arrow-undo", "Transaksi Keluar")}
              </div>
            </AccordionItem>
          </Accordion>

          <Accordion
            isCompact
            showDivider={false}
            variant="light"
            defaultExpandedKeys={["Perawatan"]}
            hideIndicator={isMinimized}
          >
            <AccordionItem
              key="Perawatan"
              aria-label="Perawatan"
              title={
                isMinimized ? (
                  <p className="text-center ml-2">•••</p>
                ) : (
                  "Perawatan"
                )
              }
              className={isMinimized ? "-ml-2" : ""}
            >
              <div className="flex gap-2 flex-col">
                <Button
                  variant="light"
                  color="default"
                  className="active:bg-none max-w-full justify-start rounded-md"
                  onClick={() => toast.info("Fitur belum tersedia")}
                  isIconOnly={isMinimized}
                >
                  <div className={isMinimized ? "mx-auto my-auto" : ""}>
                    <ion-icon name="bug-outline" />
                  </div>
                  {!isMinimized && <span>Laporan Error</span>}
                </Button>
              </div>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <Button
            variant="flat"
            className="active:bg-none max-w-full justify-start"
            onClick={handleLogout}
            isIconOnly={isMinimized}
          >
            <div className={isMinimized ? "mx-auto my-auto" : ""}>
              <ion-icon name="log-out-outline" />
            </div>
            {!isMinimized && <span>Keluar</span>}
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
