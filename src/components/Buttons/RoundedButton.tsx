interface Props {
    color: "primary" | "accent";
}

const RoundedButton: React.FC<Props> = props => (
    <button className={`py-2 px-4 md:py-3 md:px-5 xl:px-7 border-2 border-${props.color} font-semibold focus:outline-none
    text-${props.color} rounded-full hover:bg-${props.color} hover:text-black transition-color duration-300`}
    >
        {props.children}
    </button>
);

export default RoundedButton;