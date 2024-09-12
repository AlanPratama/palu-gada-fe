import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export const SidebarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate(0);
    setSidebarOpen(false);
  };

  return (
    <aside
      className={`${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform sticky lg:translate-x-0 lg:ml-0 -ml-64 top-0 left-0 z-40 w-64 min-h-screen border-r-divider border-r-1`}
    >
      <div className="flex flex-col justify-between h-full">
        <div className={`flex flex-col gap-6 p-4 mt-16 lg:mt-0`}>
          <img
            src="https://placehold.co/600x200"
            alt="logo"
            className="w-full"
          />
        </div>
        <div className={`flex flex-col gap-6 px-4`}>
          <Button
            variant={location.pathname == "/admin" ? "flat" : "light"}
            color={location.pathname == "/admin" ? "primary" : "black"}
            className=" active:bg-none max-w-full justify-start"
            onClick={() => handleNavigate("/admin")}
          >
            <ion-icon name="home-outline"></ion-icon>
            <span>Home</span>
          </Button>
          <div className="flex gap-2 flex-col">
            <span className="text-xs font-normal">Main Menu</span>
            <Button
              variant={location.pathname == "/post" ? "flat" : "light"}
              color={location.pathname == "/post" ? "primary" : "black"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/post")}
            >
              <ion-icon name="document-text-outline"></ion-icon>
              <span>Post</span>
            </Button>
            <Button
              variant={location.pathname == "/agreement" ? "flat" : "light"}
              color={location.pathname == "/agreement" ? "primary" : "black"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/agreement")}
            >
              <ion-icon name="document-lock-outline"></ion-icon>
              <span>Agreement</span>
            </Button>
            <Button
              variant={location.pathname == "/report-post" ? "flat" : "light"}
              color={location.pathname == "/report-post" ? "primary" : "black"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/report-post")}
            >
              <ion-icon name="alert-circle-outline"></ion-icon>
              <span>Reported Post</span>
            </Button>
          </div>
          <div className="flex gap-2 flex-col">
            <span className="text-xs font-normal">General</span>
            <Button
              variant={location.pathname == "/categories" ? "flat" : "light"}
              color={location.pathname == "/categories" ? "primary" : "black"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/categories")}
            >
              <ion-icon name="pricetags-outline"></ion-icon>
              <span>Category</span>
            </Button>
            <Button
              variant={location.pathname == "/city" ? "flat" : "light"}
              color={location.pathname == "/city" ? "primary" : "black"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/city")}
            >
              <ion-icon name="location-outline"></ion-icon>
              <span>City</span>
            </Button>
          </div>
          <div className="flex gap-2 flex-col">
            <span className="text-xs font-normal">Maintenance</span>
            <Button
              variant={location.pathname == "/error-report" ? "flat" : "light"}
              color={location.pathname == "/error-report" ? "primary" : "black"}
              className=" active:bg-none max-w-full justify-start"
              onClick={() => handleNavigate("/error-report")}
            >
              <ion-icon name="bug-outline"></ion-icon>
              <span>Error Report</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <Button
            variant={"flat"}
            className=" active:bg-none max-w-full justify-start"
            onClick={handleLogout}
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Logout</span>
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
