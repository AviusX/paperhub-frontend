import DiscordLogoBlurple from '../../assets/images/discord-logo-blurple.svg';

interface Props {
    onClick?: () => void;
}

const DiscordLoginButton: React.FC<Props> = props => (
    <button className="py-2 px-4 md:py-3 md:px-5 xl:px-7 border-2 border-blurple
    font-semibold text-blurple rounded-lg flex items-center transition duration-200 focus:outline-none"
        onClick={props.onClick}
    >
        <img src={DiscordLogoBlurple} alt="Discord Logo" className="h-5 mr-3" />
        <p>Login with Discord</p>
    </button>
);

export default DiscordLoginButton;