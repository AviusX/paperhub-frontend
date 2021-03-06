import ThreeDots from '../../assets/images/three-dots.svg';

interface Props {
    color: "primary" | "accent" | "secondary";
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    onClick?: () => void;
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
    } else if (props.color === "secondary") {
        colorClasses = "bg-secondary filter brightness-90 text-black hover:brightness-75"
    }

    return (
        <button
            className={`py-2 px-4 md:py-3 md:px-5 xl:px-7 font-semibold focus:outline-none
        rounded-lg transition-color duration-300 ${colorClasses} flex justify-center items-center
        disabled:opacity-50 disabled:cursor-not-allowed`}
            type={props.type}
            onClick={props.onClick}
            disabled={props.loading} // If we are currently loading, disable the button
        >
            {
                props.loading ?
                    <img src={ThreeDots} className="h-3" alt="Loading..."/>
                    : props.children
            }
        </button>
    );
}

export default RoundedButton;