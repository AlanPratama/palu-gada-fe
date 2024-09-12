import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import PropTypes from "prop-types";

export const NavbarComponent = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <Navbar
      isBordered
      shouldHideOnScroll
      isMenuOpen={sidebarOpen}
      onMenuOpenChange={setSidebarOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          className="lg:hidden"
        />
      </NavbarContent>
      <NavbarContent justify="end">
        <ul className="flex gap-4 h-full flex-row flex-nowrap items-center">
          <div className="flex items-center gap-2">
            <span>Feedback?</span>
          </div>
          <ul className="flex gap-4 h-full flex-row flex-nowrap items-center">
            <li className="text-medium whitespace-nowrap box-border list-none">
              <button
                className="flex relative justify-center items-center box-border overflow-hidden align-middle outline-none-2 w-10 h-10 text-tiny bg-secondary text-secondary-foreground rounded-full z-10"
                id="react-"
                type="button"
              >
                <img
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  className="flex object-cover w-full h-full animate-spin transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100"
                  alt="avatar"
                  data-loaded="true"
                />
              </button>
            </li>
          </ul>
        </ul>
      </NavbarContent>
    </Navbar>
  );
};

NavbarComponent.propTypes = {
  sidebarOpen: PropTypes.bool.isRequired,
  setSidebarOpen: PropTypes.func.isRequired,
};
