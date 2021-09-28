import PageSection from '../../components/PageSection/PageSection';
import PageHeader from '../../components/PageHeader/PageHeader';
import WallpaperGrid from '../../components/WallpaperGrid/WallpaperGrid';
import Loading from '../../components/Loading/Loading';

import {SortBy} from '../../enums/SortBy';
import {SortDirection} from '../../enums/SortDirection';
import {IWallpaper} from '../../api/interfaces';
import {getAllWallpapers} from '../../api/index';

import {useState, useEffect, ChangeEvent} from 'react';

const Browse: React.FC = props => {
    const [wallpapers, setWallpapers] = useState<Array<IWallpaper>>([]);
    const [showLoading, setShowLoading] = useState(true);
    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>(SortBy.MostRecent);
    const [sortDirection, setSortDirection] = useState<string>(SortDirection.Ascending);

    useEffect(() => {
        getAllWallpapers(sortBy, sortDirection, page, 10)
            .then(res => {
                setWallpapers(res.data.wallpapers);
                setPageCount(res.data.pageCount);
                setShowLoading(false);
            })
            .catch(err => {
                console.log(err.response.data.message);
                setShowLoading(false);
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
        <>
            {showLoading && <Loading/>}

            <PageSection>
                <PageHeader>
                    Browse
                </PageHeader>


                <WallpaperGrid
                    wallpapers={wallpapers}

                    onSortByChange={onSortByChange}
                    onSortDirectionChange={onSortDirectionChange}

                    pageCount={pageCount}
                    onPageChange={onPageChange}

                />
            </PageSection>
        </>
    );
}

export default Browse;