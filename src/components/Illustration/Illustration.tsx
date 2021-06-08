interface Props {
    src: string;
}

const Illustration: React.FC<Props> = (props) => (
    <div className="max-w-xs md:max-w-1/3 xl:max-w-xl justify-center items-center text-white my-20">
        <img src={props.src} alt="Post Illustration" />
    </div>
);

export default Illustration;