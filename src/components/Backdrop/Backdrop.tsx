import { motion } from 'framer-motion';
import { backdropVariants } from '../../variants/index';

interface Props {
    clicked: () => void;
}

const Backdrop: React.FC<Props> = (props) => (
    <motion.div
        className="flex justify-center items-center bg-black bg-opacity-50 fixed 
        w-full h-screen z-40 fixed top-0 left-0 backdrop-filter backdrop-blur-lg"
        onClick={props.clicked}
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
    >
        {props.children}
    </motion.div>
);

export default Backdrop;