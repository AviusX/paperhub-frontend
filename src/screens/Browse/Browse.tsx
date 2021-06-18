import PageHeader from '../../components/PageHeader/PageHeader';
import WallpaperGrid from '../../components/WallpaperGrid/WallpaperGrid';
import WallpaperCard from '../../components/WallpaperCard/WallpaperCard';
import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { SortBy } from '../../enums/SortBy';
import { SortDirection } from '../../enums/SortDirection';
import { IWallpaper } from '../../api/interfaces';
import { getAllWallpapers } from '../../api/index';
import { useState, useEffect, ChangeEvent } from 'react';

const Browse: React.FC = props => {
    const [wallpapers, setWallpapers] = useState<Array<IWallpaper>>([]);
    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>(SortBy.MostRecent);
    const [sortDirection, setSortDirection] = useState<string>(SortDirection.Ascending);

    useEffect(() => {
        getAllWallpapers(sortBy, sortDirection, page, 10)
            .then(res => {
                setWallpapers(res.data.wallpapers);
                setPageCount(res.data.pageCount);
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
    }, [sortBy, sortDirection, page]);

    const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.currentTarget.value);
    }

    const onSortDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortDirection(e.currentTarget.value);
    }

    const onPageChange = (page: { selected: number }) => {
        setPage(page.selected)
    }

    return (
        <section className="flex flex-col justify-center items-center my-4 w-full">
            <PageHeader>
                Browse
            </PageHeader>

            <div className="flex flex-wrap w-full md:justify-end px-6">
                <label className="mx-2 my-1 w-full md:w-auto">
                    <span className="mx-1 text-lg font-semibold">Sort By:</span>
                    <select
                        name="sortBy"
                        className="form-select border-primary focus:ring-primary focus:border-primary rounded-md cursor-pointer w-full md:w-auto"
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

                <label className="mx-2 my-1 w-full md:w-auto">
                    <span className="mx-1 text-lg font-semibold">Sort Direction:</span>
                    <select
                        name="sortBy"
                        className="form-select border-primary focus:ring-primary focus:border-primary rounded-md cursor-pointer w-full md:w-auto"
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

            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={3}
                marginPagesDisplayed={1}
                onPageChange={onPageChange}

                containerClassName="mt-16 flex justify-center font-semibold h-12"

                breakClassName="flex-1 flex items-center mx-1 border-2 border-gray-500 rounded"
                breakLinkClassName="flex-1 text-center p-3 lg:p-4"

                pageClassName="flex-1 flex items-center mx-1 border-2 border-gray-500 rounded"
                pageLinkClassName="flex-1 text-center p-3 lg:p-4"
                activeClassName="ring-1 ring-primary border-primary"

                previousLabel={<ChevronLeftIcon className="w-7" />}
                previousClassName="flex-1 flex justify-center items-center border-2 border-gray-500 rounded"
                previousLinkClassName="flex-1 text-center p-4 lg:p-8"

                nextLabel={<ChevronRightIcon className="w-7" />}
                nextClassName="flex-1 flex justify-center items-center border-2 border-gray-500 rounded"
                nextLinkClassName="flex-1 text-center p-4 lg:p-8"
            />
        </section>
    );
}

export default Browse;