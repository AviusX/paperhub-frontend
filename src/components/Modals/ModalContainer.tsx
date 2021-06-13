import { motion } from 'framer-motion';
import { modalVariants } from '../../variants/index';

const ModalContainer: React.FC = props => (

    <motion.div className="flex flex-col justify-center items-center bg-secondary rounded-2xl
                w-11/12 sm:w-3/5 md:w-2/5 2xl:w-4/12 m-4 py-4 sm:py-6 xl:py-10 px-4 sm:px-6 xl:px-8 filter drop-shadow-lg"
        // Stop propagation of click event to prevent backdropClick being triggered
        onClick={e => e.stopPropagation()}
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        {props.children}
    </motion.div>
);

export default ModalContainer;