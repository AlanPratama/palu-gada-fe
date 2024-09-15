import { Button, Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { switchTheme } from "../redux/theme/themeSlice";
import React, { useState } from "react"; 
import { logout } from "../redux/auth/authSlice";

export const NavbarComponent = ({ sidebarOpen, setSidebarOpen }) => {
	const { darkMode } = useSelector((state) => state.theme);
	const {user} = useSelector((state) => state.auth);
	const userName = user.sub ||"Guest"
	
	const [dropdownVisible, setDropdownVisible] = useState(false);
	const handleMouseEnter = () => {
		setDropdownVisible(true);
	};
	const handleMouseLeave = () => {
		setDropdownVisible(false);
	};
	const handleLogout = () => {
		store.dispatch(logout());
		localStorage.clear();
		navigate(0);
	};

	const changeTheme = () => {
		store.dispatch(switchTheme());
	};

	return (
		<Navbar isBordered shouldHideOnScroll isMenuOpen={sidebarOpen} onMenuOpenChange={setSidebarOpen} maxWidth='full'>
			<NavbarContent>
				<NavbarMenuToggle aria-label={sidebarOpen ? "Close menu" : "Open menu"} className='lg:hidden' />
			</NavbarContent>
			<NavbarContent justify='end'>
				<ul className='flex gap-4 h-full flex-row flex-nowrap items-center'>
					<li className='flex items-center'>
						<span>Feedback?</span>
					</li>
					<li>
						<Button isIconOnly color={darkMode ? "primary" : "default"} className='text-xl' aria-label='Switch Theme' onClick={changeTheme}>
							{darkMode ? <ion-icon name='moon-outline'></ion-icon> : <ion-icon name='sunny-outline'></ion-icon>}
						</Button>
					</li>
					<li 
						className='text-medium whitespace-nowrap box-border list-none'
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<button
							className='flex relative justify-center items-center box-border overflow-hidden align-middle outline-none-2 w-10 h-10 text-tiny bg-secondary text-secondary-foreground rounded-full z-10'
							id='react-'
							type='button'
						>
							<img
								src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
								className='flex object-cover w-full h-full transition-opacity !duration-500 opacity-0 data-[loaded=true]:opacity-100'
								alt='avatar'
								data-loaded='true'
							/>
						</button>
						{dropdownVisible && (
						<div 
							className={`absolute right-0 mt-2 w-48 shadow-lg rounded-md z-20 
							${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}
						>
							<ul className="py-1">
								<li
									className="cursor-pointer px-4 py-2 hover:bg-gray-200"
									onClick={handleLogout}
								>
									<ion-icon name="person-outline"></ion-icon>
									<span>Profile</span>
								</li>
							</ul>
							<ul className="py-1">
								<li
									className="cursor-pointer px-4 py-2 hover:bg-gray-200"
									onClick={handleLogout}
								>
									<ion-icon name="settings-outline"></ion-icon>
									<span>Setting</span>
								</li>
							</ul>
							<ul className="py-1">
								<li
									className="cursor-pointer px-4 py-2 hover:bg-gray-200"
									onClick={handleLogout}
								>
									<ion-icon name='log-out-outline'></ion-icon>
									<span>Logout</span>
								</li>
							</ul>
						</div>
						)}
					</li>
					<span>{userName}</span>
				</ul>
			</NavbarContent>
		</Navbar>
	);
};

NavbarComponent.propTypes = {
	sidebarOpen: PropTypes.bool.isRequired,
	setSidebarOpen: PropTypes.func.isRequired,
};
