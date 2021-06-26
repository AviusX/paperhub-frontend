import { IWallpaper } from '../../api/interfaces';
import DeleteConfirmationModal from '../Modals/DeleteConfirmationModal';
import { PhotographIcon } from '@heroicons/react/solid';
import { TrashIcon } from '@heroicons/react/outline';

import { getUser } from '../../api';
import IStore from '../../store/IStore';
import { PermissionLevel } from '../../enums/PermissionLevel';
import { wallpaperCardVariants } from '../../variants';

import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { Link } from 'react-router-dom';
import { DownloadIcon } from '@heroicons/react/solid';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

interface Owner {
    username: string;
    discriminator: string;
}

interface Props {
    wallpaper: IWallpaper;
    animationDelay: number;
}

const WallpaperCard: React.FC<Props> = props => {
    const [owner, setOwner] = useState<Owner>();
    const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

    const id = useSelector<IStore>(state => state.user.id);
    const permissionLevel = useSelector<IStore>(state => state.user.permissionLevel) as number;

    const isGif = props.wallpaper.mimeType === "image/gif";

    useEffect(() => {
        getUser(props.wallpaper.owner)
            .then(res => {
                let username = res.data.username
                const discriminator = res.data.discriminator;
                if (username.length > 18) {
                    username = username.substring(0, 15) + "..."
                }

                setOwner({ username, discriminator });
            })
            .catch(err => console.error(err));
    }, [props.wallpaper.owner]);

    const closeModalHandler = () => {
        setShowDeleteConfirmationModal(false);
    }

    const downloadButtonClicked = () => {
        ReactGA.event({
            category: "Wallpaper",
            action: `Wallpaper "${props.wallpaper.title}" downloaded.`
        });
    }

    const imgSrc = '/wallpapers/thumbnail/' + props.wallpaper._id;
    const spanClass = props.wallpaper.height > props.wallpaper.width ? "row-span-2" : "row-span-1";

    return (
        <>
            {ReactDOM.createPortal(
                <DeleteConfirmationModal
                    show={showDeleteConfirmationModal}
                    closeModalHandler={closeModalHandler}
                    wallpaperId={props.wallpaper._id}
                />,
                document.getElementById("backdrop-root") as Element
            )}

            <motion.div
                className={`flex flex-col relative rounded-2xl filter drop-shadow-2xl bg-secondary rounded-2xl my-5 mx-4 ${spanClass}`}
                variants={wallpaperCardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, delay: props.animationDelay }}
            >

                {/* Delete Icon (Shown only if the user is the owner or has above admin privileges) */}
                {(id === props.wallpaper.owner || permissionLevel > PermissionLevel.Admin) && (
                    <div className="flex justify-center items-center absolute top-2 lg:top-4 right-2 lg:right-4 p-2 backdrop-filter 
                backdrop-blur-lg rounded-full bg-gray-800 bg-opacity-40 text-red-400 cursor-pointer hover:transform
                hover:scale-110 duration-300"
                        onClick={() => setShowDeleteConfirmationModal(true)}
                    >
                        <TrashIcon className="w-6 sm:w-7 lg:w-8" />
                    </div>
                )}

                {/* Gif icon (Shown if wallpaper is a gif) */}
                {isGif && (
                    <div className="flex justify-between items-center absolute top-2 lg:top-4 left-2 lg:left-4 
                    text-white bg-gray-500 bg-opacity-40 backdrop-filter backdrop-blur-lg rounded-xl px-2 py-1"
                    >
                        <PhotographIcon className="w-5 sm:w-6 lg:w-7" />
                        <span className="font-display tracking-widest ml-1">GIF</span>
                    </div>
                )}

                {/* Wallpaper Image */}
                <img
                    src={imgSrc}
                    alt={`${props.wallpaper.title}`}
                    className="max-w-full rounded-t-2xl"
                />

                <div className="flex justify-center items-center relative py-1 sm:py-2">
                    {/* Title */}
                    <h3 className="text-xl lg:text-2xl font-semibold">
                        {props.wallpaper.title}
                    </h3>
                    {/* Download Icon */}
                    <div className="flex items-center absolute right-0 h-full mx-5 md:mx-8 text-primary">
                        <a className=" hover:text-accent cursor-pointer transition-colors duration-200
                    focus:outline-none"
                            href={`/wallpapers/${props.wallpaper._id}`}
                            onClick={downloadButtonClicked}
                        >
                            <DownloadIcon className="w-6 sm:w-7 lg:w-8" />
                        </a>
                    </div>
                </div>

                {/* Metadata div */}
                <div className="flex justify-between items-center text-md lg:text-xl text-gray-500 px-2 py-1">
                    <Link to={`/user/${props.wallpaper.owner}`} className="hover:underline">
                        <p className="mx-1">{`${owner?.username}#${owner?.discriminator}`}</p>
                    </Link>
                    <p className="mx-1">{`${props.wallpaper.width}x${props.wallpaper.height}`}</p>
                </div>
            </motion.div>
        </>
    );
}

export default WallpaperCard;