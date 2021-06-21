import { motion } from 'framer-motion';
import { routeVariants } from '../../variants';

const PageSection: React.FC = props => (
    <motion.section
        className="flex flex-col justify-center items-center my-4 w-full"
        variants={routeVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
    >
        {props.children}
    </motion.section>
)

export default PageSection;