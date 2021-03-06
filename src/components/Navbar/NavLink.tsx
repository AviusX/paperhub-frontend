interface Props {
    onClick?: () => void;
}

const NavLink: React.FC<Props> = props => (
    <li className="flex justify-center items-center lg:px-4 py-5 lg:py-none lg:mx-1 lg:h-full hover:backdrop-filter
    hover:backdrop-brightness-200 transition-all duration-200 text-secondary text-lg font-display cursor-pointer
            bg-primary-dark lg:bg-transparent"
        onClick={props.onClick}
    >
        {props.children}
    </li>
);

export default NavLink;