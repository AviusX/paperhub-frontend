interface Props {
    label?: string;
    placeholder?: string;
    inputRef?: React.RefObject<HTMLInputElement>
}

const InputField: React.FC<Props> = props => {
    const icon = props.children;
    let iconClass: string | undefined;

    if (icon) {
        iconClass = "has-icons-left";
    }

    return (
        <div className="field w-full">
            <label className="label">{props.label}</label>
            <div className={`control ${iconClass}`}>
                <input
                    type="text"
                    className="input"
                    placeholder={props.placeholder}
                    ref={props.inputRef}
                />
                {icon && (
                    <span className="icon is-small is-left flex justify-center items-center">
                        {props.children}
                    </span>
                )}
            </div>
        </div>
    );
}

export default InputField;