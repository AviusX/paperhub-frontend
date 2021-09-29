import classes from './Footer.module.scss';
import PixelHeart from '../../assets/images/pixel-heart.svg';

const Footer: React.FC = () => (
    <div className={`flex flex-col justify-around items-center bg-primary-dark ${classes.Footer} m-0 p-2 text-white`}>
        {/* Made with <3 */}
        <div className="flex justify-around items-center text-xl mt-3">
            Made with
            <img src={PixelHeart} alt="love" className="w-8 mx-1.5"/>
            by
            <a href="https://github.com/AviusX"
               className="mx-1.5 underline text-accent"
               target="_blank"
               rel="noreferrer"
            >
                AviusX
            </a>
        </div>

        {/* Disclaimer*/}
        <div className="my-4 text-center">
            <strong>Disclaimer:</strong> If you are the copyright owner of any of the posted images and would like
            the image to be taken down, please
            <a
                href="mailto:hrijulbhatnagar@protonmail.com"
                className="text-accent mx-1.5 underline"
            >
                send me an email.
            </a>
        </div>
    </div>
);

export default Footer;

