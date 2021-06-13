const FormErrorMessage: React.FC = props => (
    <p className="mt-3 text-center text-red-600 text-md">
        {props.children}
    </p>
);

export default FormErrorMessage;