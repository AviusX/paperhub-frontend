interface Props {
    onClick?: () => void;
}

const DropdownItem: React.FC<Props> = props => (
    <li className="py-3 px-5 hover:backdrop-filter hover:backdrop-brightness-200 transition duration 200
    cursor-pointer text-center lg:text-left"
        onClick={props.onClick}>
        {props.children}
    </li>
);

export default DropdownItem;