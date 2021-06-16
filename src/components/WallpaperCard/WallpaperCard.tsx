import { IWallpaper } from '../../api/interfaces';
import { DownloadIcon } from '@heroicons/react/solid';
import { getUser } from '../../api';
import { useState, useEffect } from 'react';

interface Owner {
    username: string;
    discriminator: string;
}

interface Props {
    wallpaper: IWallpaper;
}

const WallpaperCard: React.FC<Props> = props => {
    const [owner, setOwner] = useState<Owner>();
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
    // We need to make a request to http://serverHostname/wallpapers/imgName
    // because images are stored in public/wallpapers/ on the server and
    // "public" is set as the static directory and should not be included in the
    // url. Thus, we remove the "public" from the imagePath to get the
    // appropriate url to make a request to.

    // props.wallpaper.imagePath should look something like- 
    // "public/wallpapers/imageName"

    const staticFolder = "public";
    const imgSrc = props.wallpaper.imagePath.substring(staticFolder.length);
    const spanClass = props.wallpaper.height > props.wallpaper.width ? "row-span-2" : "row-span-1"

    return (
        <div className={`flex flex-col rounded-2xl filter drop-shadow-2xl bg-secondary rounded-2xl my-5 mx-4
        ${spanClass}`}>
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
                        href={`/wallpapers/${props.wallpaper._id}`}>
                        <DownloadIcon className="w-6 sm:w-7 lg:w-8" />
                    </a>
                </div>
            </div>

            {/* Metadata div */}
            <div className="flex justify-between items-center text-md lg:text-xl text-gray-500 px-2 py-1">
                <p className="mx-1">{`${owner?.username}#${owner?.discriminator}`}</p>
                <p className="mx-1">{`${props.wallpaper.width}x${props.wallpaper.height}`}</p>
            </div>
        </div>
    );
}

export default WallpaperCard;