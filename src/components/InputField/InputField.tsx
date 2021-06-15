interface Props {
    label?: string;
    placeholder?: string;
    iconPosition?: "left" | "right";
    readOnly?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
    value?: string;
    onClick?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<Props> = props => {
    const icon = props.children;
    let iconClass: string | undefined;
    let readOnlyClasses;

    if (icon && props.iconPosition === "left") {
        iconClass = "has-icons-left";
    } else if (icon && props.iconPosition === "right") {
        iconClass = "has-icons-right";
    }

    if (props.readOnly) {
        readOnlyClasses = "cursor-pointer";
    }

    return (
        <div className="field w-full">
            <label className="label">{props.label}</label>
            <div className={`control ${iconClass}`}>
                <input
                    type="text"
                    className={`input ${readOnlyClasses}`}
                    placeholder={props.placeholder}
                    ref={props.inputRef}
                    value={props.value}
                    readOnly={props.readOnly}
                    onClick={props.onClick}
                    onChange={props.onChange}
                />
                {icon && (
                    <span className={`icon is-small is-${props.iconPosition} flex justify-center items-center`}>
                        {props.children}
                    </span>
                )}
            </div>
        </div>
    );
}

export default InputField;