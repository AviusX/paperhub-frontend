interface Props {
    color: "primary" | "accent";
    type?: "button" | "submit" | "reset";
}

const RoundedButton: React.FC<Props> = props => {
    let colorClasses;

    // It is important that the entire tailwind classname is used instead of string
    // concatenation to stop tailwind production optimization from removing it.
    // More info here-
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html

    if (props.color === "primary") {
        colorClasses = "bg-primary text-secondary hover:filter hover:brightness-110";
    } else if (props.color === "accent") {
        colorClasses = "bg-accent text-secondary hover:filter hover:brightness-110";
    }

    return (
        <button className={`py-2 px-4 md:py-3 md:px-5 xl:px-7 font-semibold focus:outline-none
        rounded-lg transition-color duration-300 ${colorClasses} flex justify-center items-center`}
            type={props.type}
        >
            {props.children}
        </button>
    );
}

export default RoundedButton;