const PageSection: React.FC = props => (
    <section className="flex flex-col justify-center items-center my-4 w-full">
        {props.children}
    </section>
)

export default PageSection;