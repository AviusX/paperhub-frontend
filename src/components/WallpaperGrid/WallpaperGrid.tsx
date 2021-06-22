import { IWallpaper } from '../../api/interfaces';
import WallpaperCard from '../WallpaperCard/WallpaperCard';
import Paginator from '../Paginator/Paginator';
import SortButtons from '../SortButtons/SortButtons';
import { ChangeEvent } from 'react';

interface Props {
    wallpapers: Array<IWallpaper>

    onSortByChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onSortDirectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;

    pageCount: number;
    onPageChange: (page: { selected: number }) => void;
}

const WallpaperGrid: React.FC<Props> = props => {

    return (
        props.wallpapers.length > 0 ? (
            <>
                <SortButtons
                    onSortByChange={props.onSortByChange}
                    onSortDirectionChange={props.onSortDirectionChange}
                />

                <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense items-center 
                justify-items-center px-4">
                    {
                        props.wallpapers.map((wallpaper, index) => (
                            <WallpaperCard
                                wallpaper={wallpaper}
                                key={wallpaper._id}
                                animationDelay={index * 0.2}
                            />
                        ))
                    }
                </div>

                <Paginator pageCount={props.pageCount} onPageChange={props.onPageChange} />
            </>
        ) : (
            <div className="flex w-full justify-center items-center px-2 py-4">
                <h1 className="text-3xl md:text-4xl xl:text-5xl text-gray-500 text-center">
                    Oops! No wallpapers found. Upload some to see them here.
                </h1>
            </div>
        )
    );
}

export default WallpaperGrid;