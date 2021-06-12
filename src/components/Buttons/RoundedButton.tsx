interface Props {
    color: "primary" | "accent";
}

const RoundedButton: React.FC<Props> = props => {
    let colorClasses;

    // It is important that the entire tailwind classname is used instead of string
    // concatenation to stop tailwind production optimization from removing it.
    // More info here-
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

    if (props.color === "primary") {
        colorClasses = "border-primary text-primary hover:bg-primary";
    } else if (props.color === "accent") {
        colorClasses = "border-accent text-accent hover:bg-accent";
    }

    return (
        <button className={`py-2 px-4 md:py-3 md:px-5 xl:px-7 border-2 font-semibold focus:outline-none
        rounded-full hover:text-black transition-color duration-300 ${colorClasses}`}
        >
            {props.children}
        </button>
    );
}

export default RoundedButton;