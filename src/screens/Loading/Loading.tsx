import AnimatedRings from '../../assets/images/rings.svg';
import { backdropVariants } from '../../variants';
import { AnimatePresence, motion } from 'framer-motion';

const Loading: React.FC = props => (
    <AnimatePresence>
        <motion.div
            className="flex flex-col justify-center items-center w-screen h-screen fixed top-0 left-0 bg-white z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <img src={AnimatedRings} alt="Loading..." className="w-14 md:w-16 xl:w-20" />
            <p className="text-center text-lg lg:text-xl uppercase font-display tracking-widest my-3">
                Loading
            </p>
        </motion.div>
    </AnimatePresence>
)

export default Loading;