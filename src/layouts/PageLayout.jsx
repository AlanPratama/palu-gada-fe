import { useState } from "react";
import { SidebarComponent } from "../components/Sidebar";
import { NavbarComponent } from "../components/Navbar";
import { BottomBar } from "../components/BottomBar";
import { BreadcrumbItem, Breadcrumbs, Card } from "@nextui-org/react";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";

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
    <div className="flex h-screen bg-blue-50 dark:bg-neutral-950">
      <SidebarComponent
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <NavbarComponent
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
          <Card className="mb-4 p-4">
            <Breadcrumbs>
              <BreadcrumbItem>
                <Link to="/">Dashboard</Link>
              </BreadcrumbItem>
              {pathSegments.map((segment, index) => {
                const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
                return (
                  <BreadcrumbItem key={index + segment}>
                    <Link to={path}>{formatPath(segment)}</Link>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumbs>
          </Card>
          <div className="space-y-4">{children}</div>
        </div>
        <BottomBar />
      </div>
    </div>
  );
};

PageLayout.propTypes = {
  children: PropTypes.element,
};
