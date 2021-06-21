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

            {props.wallpapers.length > 0 && (
                <Paginator pageCount={props.pageCount} onPageChange={props.onPageChange} />
            )}
        </>

    );
}

export default WallpaperGrid;