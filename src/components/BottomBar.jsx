"use client";

import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";

export const BottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { name: "Beranda", path: "/", icon: "home-outline" },
    { name: "Postingan", path: "/posts", icon: "document-text-outline" },
    { name: "Pengguna", path: "/users", icon: "people-outline" },
    { name: "Tawaran", path: "/bids", icon: "document-lock-outline" },
  ];

  return (
    <div className="z-50 fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 lg:hidden">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Button
            key={item.name}
            isIconOnly
            variant={location.pathname === item.path ? "solid" : "light"}
            onPress={() => navigate(item.path)}
            className="flex flex-col items-center justify-center"
          >
            <ion-icon name={item.icon}></ion-icon>
            {/* <span className="text-xs mt-1">{item.name}</span> */}
          </Button>
        ))}
      </div>
    </div>
  );
};
