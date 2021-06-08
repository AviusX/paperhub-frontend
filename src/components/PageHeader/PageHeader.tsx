const PageHeader: React.FC = props => (
    <div className="p-4 sm:p-6 lg:p-8 mb-2 sm:mb-5 xl:mb-8 w-full border-b-2">
        <h2 className="text-3xl sm:text-5xl xl:text-6xl font-display">
            {props.children}
        </h2>
    </div>
);

export default PageHeader;