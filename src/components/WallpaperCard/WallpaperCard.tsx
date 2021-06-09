import { IWallpaper } from '../../api/interfaces';

interface Props {
    wallpaper: IWallpaper;
}

const WallpaperCard: React.FC<Props> = props => {
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
            <img
                src={imgSrc}
                alt={`${props.wallpaper.title}`}
                className="max-w-full rounded-t-2xl"
            />
            <h3 className="text-center text-xl lg:text-2xl font-semibold py-2 sm:py-4">{props.wallpaper.title}</h3>
        </div>
    );
}

export default WallpaperCard;