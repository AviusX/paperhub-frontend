import DiscordLoginButton from '../../components/Buttons/DiscordLoginButton';
import RoundedButton from '../../components/Buttons/RoundedButton';
import Illustration from '../../components/Illustration/Illustration';
import WallpaperIllustration from '../../assets/images/wallpaper-illustration.svg';
import classes from './Landing.module.scss';
import { useDiscordLogin } from '../../hooks/auth';
import { Link } from 'react-router-dom';

const Landing: React.FC = props => {
    const discordLogin = useDiscordLogin();

    return (
        <section className={`h-screen w-full flex flex-col items-start box-border 
        ${classes.Landing} ${classes.Wave}`}>
            {/* Landing page navbar */}
            <div className="hidden lg:flex justify-end items-center w-full mt-14 px-8 lg:px-20 h-20">
                <DiscordLoginButton onClick={discordLogin} />
            </div>

            {/* Content div */}
            <div className="h-4/6 w-full flex flex-col-reverse lg:flex-row flex-wrap mt-5 px-8 lg:px-20">
                <div className="flex flex-col justify-center items-center lg:items-center w-full lg:w-1/2 my-10">
                    <h1 className="font-logo text-primary text-5xl text-center lg:text-8xl my-8">
                        Paperhub
                    </h1>
                    <h3 className="text-accent text-3xl lg:text-4xl uppercase my-4 tracking-widest text-center font-display">
                        High quality wallpapers
                    </h3>
                    <Link to="/browse">
                        <RoundedButton color="accent">Browse Wallpapers</RoundedButton>
                    </Link>
                </div>
                <div className="hidden sm:flex justify-center lg:justify-center items-center h-1/4 lg:h-auto w-full lg:w-1/2 my-10">
                    <Illustration src={WallpaperIllustration} />
                </div>
            </div>
        </section>
    );
}

export default Landing;