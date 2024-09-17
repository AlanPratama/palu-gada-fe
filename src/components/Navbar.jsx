import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  Tooltip,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import store from "../redux/store";
import { switchTheme } from "../redux/theme/themeSlice";

export const NavbarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  const { darkMode } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const delay = 1000;

  const changeTheme = () => {
    store.dispatch(switchTheme());
  };

  const handleLogout = () => {
    store.dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("rememberedAccount");
  };

  const messages = [
    {
      id: 1,
      sender: "Ojan The Sigma",
      content: "Mantap",
      time: "5m lalu",
    },
    {
      id: 2,
      sender: "Diat",
      content: "Siap.",
      time: "1j lalu",
    },
    {
      id: 3,
      sender: "Tommy",
      content: "Keren",
      time: "2j lalu",
    },
  ];

  return (
    <Navbar
      shouldHideOnScroll
      isMenuOpen={sidebarOpen}
      onMenuOpenChange={setSidebarOpen}
      maxWidth="full"
      className="bg-blue-50 dark:bg-neutral-950"
    >
      <NavbarBrand>
        <Image src="/kerjain light.png" alt="logo" width={150} />
      </NavbarBrand>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <ul className="flex gap-4 h-full flex-row flex-nowrap items-center">
          <li className="sm:block hidden">
            <p>
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </li>
          <li>
            <Tooltip
              content={darkMode ? "Mode terang" : "Mode gelap"}
              placement="bottom"
              showArrow
              className="dark:text-white"
            >
              <Button
                isIconOnly
                color={darkMode ? "secondary" : "primary"}
                variant="light"
                onPress={changeTheme}
                className="w-10 h-10 flex items-center justify-center rounded-lg text-black dark:text-white"
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </Button>
            </Tooltip>
          </li>
          <li className="flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly variant="light">
                  <Badge content={messages.length} color="danger" size="sm">
                    <ion-icon name="mail" size="small" />
                  </Badge>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Inbox messages" className="w-60">
                {messages.map((message) => (
                  <DropdownItem
                    key={message.id}
                    className="py-2 dark:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        name={message.sender}
                        size="sm"
                        src={`https://i.pravatar.cc/150?u=${message.id}`}
                      />
                      <div className="flex-grow">
                        <p className="text-sm font-semibold">
                          {message.sender}
                        </p>
                        <p className="text-xs dark:text-gray-300 text-gray-500 truncate">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {message.time}
                      </span>
                    </div>
                  </DropdownItem>
                ))}
                <DropdownItem className="py-2">
                  <Button color="primary" variant="light" className="w-full">
                    Lihat semua pesan
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="text-medium whitespace-nowrap box-border list-none">
            <Dropdown placement="bottom-end" isOpen={isOpen}>
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  src={
                    user.photoUrl
                      ? user.photoUrl
                      : "https://avatar.iran.liara.run/public/boy?username=Ash"
                  }
                  onMouseEnter={() => {
                    clearTimeout(timeoutId);
                    setIsOpen(true);
                  }}
                  onMouseLeave={() => {
                    const id = setTimeout(() => setIsOpen(false), delay);
                    setTimeoutId(id);
                  }}
                />
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Profile Actions"
                variant="flat"
                className="dark:text-white"
                onMouseEnter={() => {
                  clearTimeout(timeoutId);
                  setIsOpen(true);
                }}
                onMouseLeave={() => {
                  setIsOpen(false);
                }}
              >
                <DropdownItem key="profile" className="h-14 gap-2 text-center">
                  <p className="font-semibold">
                    Masuk sebagai{" "}
                    <span className="text-blue-400 font-bold">
                      {user.username}
                    </span>
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="configurations"
                  endContent={<ion-icon name="settings-outline" size="small" />}
                >
                  Pengaturan
                </DropdownItem>
                <DropdownItem
                  key="help_and_feedback"
                  endContent={
                    <ion-icon name="help-circle-outline" size="small" />
                  }
                >
                  Bantuan
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  endContent={<ion-icon name="log-out-outline" size="small" />}
                  onPress={handleLogout}
                >
                  Keluar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
        </ul>
      </NavbarContent>
    </Navbar>
  );
};

const MoonIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="2em"
  >
    <path
      d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
      fill="currentColor"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="2em"
  >
    <g fill="currentColor">
      <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
      <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
    </g>
  </svg>
);

NavbarComponent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
