import { Button } from "@nextui-org/react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

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
			<div className='flex flex-col justify-between h-full'>
				<div className={`flex flex-col gap-6 p-4 mt-16 lg:mt-0`}>
					<img src='https://placehold.co/600x200' alt='logo' className='w-full' />
				</div>
				<div className={`flex flex-col gap-6 px-4`}>
					<Button
						variant={location.pathname == "/admin" ? "flat" : "light"}
						color={location.pathname == "/admin" ? "primary" : "black"}
						className=' active:bg-none max-w-full justify-start'
					>
						<ion-icon name='home-outline'></ion-icon>
						<span>Home</span>
					</Button>
					<div className='flex gap-2 flex-col'>
						<span className='text-xs font-normal'>Main Menu</span>
						<Button
							variant={location.pathname == "/admin/post" ? "flat" : "light"}
							color={location.pathname == "/admin/post" ? "primary" : "default"}
							className=' active:bg-none max-w-full justify-start'
						>
							<ion-icon name='document-text-outline'></ion-icon>
							<span>Post</span>
						</Button>
						<Button variant={location.pathname == "/admin/perjanjian" ? "flat" : "light"} className=' active:bg-none max-w-full justify-start'>
							<ion-icon name='document-lock-outline'></ion-icon>
							<span>Perjanjian</span>
						</Button>
						<Button variant={location.pathname == "/admin/report-post" ? "flat" : "light"} className=' active:bg-none max-w-full justify-start'>
							<ion-icon name='alert-circle-outline'></ion-icon>
							<span>Laporan Pelanggaran Post</span>
						</Button>
					</div>
					<div className='flex gap-2 flex-col'>
						<span className='text-xs font-normal'>General</span>
						<Button variant={location.pathname == "/admin/kategori" ? "flat" : "light"} className=' active:bg-none max-w-full justify-start'>
							<ion-icon name='pricetags-outline'></ion-icon>
							<span>Kategori</span>
						</Button>
						<Button variant={location.pathname == "/admin/kota" ? "flat" : "light"} className=' active:bg-none max-w-full justify-start'>
							<ion-icon name='location-outline'></ion-icon>
							<span>Kota</span>
						</Button>
					</div>
					<div className='flex gap-2 flex-col'>
						<span className='text-xs font-normal'>Maintenance</span>
						<Button variant={location.pathname == "/admin/error-report" ? "flat" : "light"} className=' active:bg-none max-w-full justify-start'>
							<ion-icon name='bug-outline'></ion-icon>
							<span>Error Report</span>
						</Button>
					</div>
				</div>
				<div className='flex flex-col gap-6 p-4'>
					<Button variant={"flat"} className=' active:bg-none max-w-full justify-start' onClick={handleLogout}>
						<ion-icon name='log-out-outline'></ion-icon>
						<span>Logout</span>
					</Button>
				</div>
			</div>
		</aside>
	);
};
