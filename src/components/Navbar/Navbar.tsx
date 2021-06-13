import { PermissionLevel } from '../../enums/PermissionLevel';
import NavLink from './NavLink';
import UserDropdown from './UserDropdown/UserDropdown';
import CreateTagModal from '../Modals/CreateTagModal';
import '../../scss/Navbar.scss';
import DiscordLogoWhite from '../../assets/images/discord-logo-white.svg';
import IStore from '../../store/IStore';
import { useDiscordLogin } from '../../hooks/auth';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar: React.FC = props => {
    const [showCreateTagModal, setShowCreateTagModal] = useState(false);
    const isAuthenticated = useSelector<IStore>(state => state.user.isAuthenticated) as boolean;
    const username = useSelector<IStore>(state => state.user.username) as string;
    const permissionLevel = useSelector<IStore>(state => state.user.permissionLevel) as PermissionLevel;
    const discordLogin = useDiscordLogin();


    let rightNavLinks: JSX.Element;

    // If user is authenticated, show username and stuff, otherwise,
    // show the "Login with Discord" button.
    if (isAuthenticated) {
        rightNavLinks = (
            <>
                <UserDropdown username={username} />
            </>
        );
    } else {
        rightNavLinks = (
            <>
                {/* Login with Discord button */}
                <li className="flex items-center justify-center py-2 lg:px-3 lg:mr-1 lg:ml-3 text-white
                text-lg font-display bg-blurple lg:rounded-lg hover:filter hover:brightness-125
                transition-all duration-200 cursor-pointer" onClick={discordLogin}>
                    <img src={DiscordLogoWhite} alt="Discord Logo" className="w-5 mr-3" />
                    <p>Login with Discord</p>
                </li>
            </>
        );
    }

    const backdropClicked = () => {
        setShowCreateTagModal(false);
    }

    return (
        <>
            {ReactDOM.createPortal((
                <CreateTagModal
                    show={showCreateTagModal}
                    backdropClicked={backdropClicked} />
            ), document.getElementById("backdrop-root") as Element)}

            <nav className="flex flex-1 flex-wrap justify-between items-stretch lg:flex-nowrap sticky top-0 left-0
    w-full bg-primary-dark h-16 z-10" id="navbar">
                {/* Left nav links */}
                <ul className="flex px-6">
                    <Link to="/">
                        <li className="px-3 h-full hover:backdrop-filter hover:backdrop-brightness-200
            transition-all duration-200 font-logo text-primary text-xl flex items-center">
                            Paperhub
                    </li>
                    </Link>
                </ul>

                {/* Hamburger icon */}
                <label htmlFor="hamburger-menu-toggle" className="cursor-pointer lg:hidden border-4 border-transparent py-4 px-6">
                    <svg className="fill-current text-accent" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                    </svg>
                </label>
                <input className="hidden" type="checkbox" id="hamburger-menu-toggle" />

                {/* Right nav links */}
                <ul className="hidden w-full lg:flex lg:items-center lg:justify-end lg:px-6" id="hamburger-menu">
                    <Link to="/browse" className="h-full">
                        <NavLink>
                            Browse
                    </NavLink>
                    </Link>

                    {permissionLevel === PermissionLevel.Developer ? (
                        <NavLink onClick={() => setShowCreateTagModal(true)}>
                            Create Tag
                        </NavLink>
                    ) : null}

                    {rightNavLinks}
                </ul>
            </nav >
        </>
    );
}

export default Navbar;