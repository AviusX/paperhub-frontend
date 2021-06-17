import PageHeader from '../../components/PageHeader/PageHeader';
import WallpaperGrid from '../../components/WallpaperGrid/WallpaperGrid';
import WallpaperCard from '../../components/WallpaperCard/WallpaperCard';
import { SortBy } from '../../enums/SortBy';
import { SortDirection } from '../../enums/SortDirection';
import { IWallpaper } from '../../api/interfaces';
import { getAllWallpapers } from '../../api/index';
import { useState, useEffect, ChangeEvent } from 'react';

const Browse: React.FC = props => {
    const [wallpapers, setWallpapers] = useState<Array<IWallpaper>>([]);
    const [sortBy, setSortBy] = useState<string>(SortBy.MostRecent);
    const [sortDirection, setSortDirection] = useState<string>(SortDirection.Ascending);

    useEffect(() => {
        getAllWallpapers(sortBy, sortDirection)
            .then(res => {
                setWallpapers(res.data);
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
    }, [sortBy, sortDirection]);

    const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.currentTarget.value);
    }

    const onSortDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortDirection(e.currentTarget.value);
    }

    return (
        <section className="flex flex-col justify-center items-center my-4 w-full">
            <PageHeader>
                Browse
            </PageHeader>

            <div className="flex flex-wrap w-full justify-end px-6">
                <label className="mx-2 my-1">
                    <span className="mx-1 text-lg font-semibold">Sort By:</span>
                    <select
                        name="sortBy"
                        className="form-select border-primary focus:ring-primary focus:border-primary rounded-md"
                        onChange={onSortByChange}
                    >
                        <option value={SortBy.MostRecent}>
                            Most Recent
                        </option>
                        <option value={SortBy.MostDownloaded}>
                            Most Downloaded
                        </option>
                    </select>
                </label>

                <label className="mx-2 my-1">
                    <span className="mx-1 text-lg font-semibold">Sort Direction:</span>
                    <select
                        name="sortBy"
                        className="form-select border-primary focus:ring-primary focus:border-primary rounded-md"
                        onChange={onSortDirectionChange}
                    >
                        <option value={SortDirection.Ascending}>
                            Ascending
                        </option>
                        <option value={SortDirection.Descending}>
                            Descending
                        </option>
                    </select>
                </label>
            </div>

            <WallpaperGrid>
                {
                    wallpapers.map(wallpaper => (
                        <WallpaperCard wallpaper={wallpaper} key={wallpaper._id} />
                    ))
                }
            </WallpaperGrid>
        </section>
    );
}

export default Browse;