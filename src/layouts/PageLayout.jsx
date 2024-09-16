import { useState } from "react";
import { SidebarComponent } from "../components/Sidebar";
import { NavbarComponent } from "../components/Navbar";
import PropTypes from "prop-types";
import { BreadcrumbItem, Breadcrumbs, Card } from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";

export const PageLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const pathSegments = location.pathname.split("/").filter(Boolean);

  const formatPath = (segment) => {
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ")
    );
  };

  return (
    <section className="flex bg-blue-50 dark:bg-neutral-950">
      <SidebarComponent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <section className="flex-1">
        <NavbarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="p-8 mx-auto">
          <Card className="mb-2 p-4">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link to="/">Dashboard</Link>
              </BreadcrumbItem>
              {pathSegments.map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                return (
                  <BreadcrumbItem key={index}>
                    <Link to={path}>{formatPath(segment)}</Link>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumbs>
          </Card>
          {children}
        </div>
      </section>
    </section>
  );
};

PageLayout.propTypes = {
  children: PropTypes.element,
};
