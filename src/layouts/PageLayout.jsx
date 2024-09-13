import { useState } from "react";
import { SidebarComponent } from "../components/Sidebar";
import { NavbarComponent } from "../components/Navbar";
import PropTypes from "prop-types";

export const PageLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="flex">
      <SidebarComponent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <section className="flex-1">
        <NavbarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-8 mx-auto">{children}</div>
      </section>
    </section>
  );
};

PageLayout.propTypes = {
  children: PropTypes.element,
};
