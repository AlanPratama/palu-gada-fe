import { useState } from "react";
import { SidebarComponent } from "../components/Sidebar";
import { NavbarComponent } from "../components/Navbar";

export const PageLayout = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<section className='flex'>
			<SidebarComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			<section className='flex-1'>
				<NavbarComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				{children}
			</section>
		</section>
	);
};
