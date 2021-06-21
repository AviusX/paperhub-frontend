import DropdownItem from './DropdownItem';
import { useLogout } from '../../../hooks/auth';
import { useState } from 'react';
import { UserCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import IStore from '../../../store/IStore';
import { useSelector } from 'react-redux';

interface Props {
    username: string;
}

const UserDropdown: React.FC<Props> = props => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const discordId = useSelector<IStore>(state => state.user.discordId);

    const logout = useLogout();

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    }

    return (
        <li className="relative lg:h-full bg-primary-dark">
            <button className="flex justify-center items-center lg:px-4 py-5 lg:py-none lg:mx-1 lg:h-full
            hover:backdrop-filter hover:backdrop-brightness-200 transition duration-200 text-accent text-lg font-display
            font-bold cursor-pointer bg-primary-dark lg:bg-transparent focus:outline-none w-full"
                onClick={toggleDropdown}
            >
                <UserCircleIcon className="w-8 mr-1" />
                {props.username}
                <ChevronDownIcon className="w-8 ml-3" />
            </button>
            {showDropdown ? (
                <ul className="absolute lg:-right-1 z-10 w-full lg:w-48 rounded-b-lg text-white text-lg
                bg-primary-dark border-t-2 border-primary">
                    <Link to={`/user/${discordId}`}>
                        <DropdownItem>
                            Profile
                        </DropdownItem>
                    </Link>

                    <DropdownItem onClick={logout}>
                        Logout
                    </DropdownItem>
                </ul>
            ) : null}
        </li>
    );
}

export default UserDropdown;