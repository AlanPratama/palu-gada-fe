import { Button, Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { switchTheme } from "../redux/theme/themeSlice";

export const NavbarComponent = ({ sidebarOpen, setSidebarOpen }) => {
	const { darkMode } = useSelector((state) => state.theme);

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
					<li className='text-medium whitespace-nowrap box-border list-none'>
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
					</li>
				</ul>
			</NavbarContent>
		</Navbar>
	);
};

NavbarComponent.propTypes = {
	sidebarOpen: PropTypes.bool.isRequired,
	setSidebarOpen: PropTypes.func.isRequired,
};
