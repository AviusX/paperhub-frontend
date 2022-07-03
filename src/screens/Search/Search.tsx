import PageSection from '../../components/PageSection/PageSection';
import PageHeader from '../../components/PageHeader/PageHeader';
import InputField from '../../components/InputField/InputField';
import WallpaperGrid from '../../components/WallpaperGrid/WallpaperGrid';

import { searchWallpapers } from '../../api';
import useDidMount from '../../hooks/useDidMount';
import { SortBy } from '../../enums/SortBy';
import { SortDirection } from '../../enums/SortDirection';

import { SearchIcon } from '@heroicons/react/outline';
import { useState, useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import { toast } from 'react-toastify';

export const Search: React.FC = props => {
    const [searchString, setSearchString] = useState("");
    const [wallpapers, setWallpapers] = useState([]);
    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>(SortBy.MostRecent);
    const [sortDirection, setSortDirection] = useState<string>(SortDirection.Ascending);

    const searchInputRef = useRef<HTMLInputElement>(null);

    const didMount = useDidMount();

    useEffect(() => {
        // If this is not the first render (the component hasn't just been mounted),
        // execute the following code.
        if (!didMount) {
            searchWallpapers(searchString, sortBy, sortDirection, page, 10)
                .then(res => {
                    setWallpapers(res.data.wallpapers);
                    setPageCount(res.data.pageCount);
                })
                .catch(err => {
                    toast.error(err.response.data.message);
                });
        }
        // Disable the linter warning about not having didMount in the
        // list of dependencies because we do not want to have it in the
        // list of dependencies for it to work.
        // eslint-disable-next-line
    }, [searchString, sortBy, sortDirection, page]);

    const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.currentTarget.value);
    }

    const onSortDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortDirection(e.currentTarget.value);
    }

    const onPageChange = (page: { selected: number }) => {
        setPage(page.selected);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const onSearchSubmit = (e: FormEvent) => {
        e.preventDefault();
        const searchInput = searchInputRef.current?.value || "";
        setSearchString(searchInput);
    }

    return (
        <PageSection>
            <PageHeader>Search</PageHeader>

            <form onSubmit={onSearchSubmit} className="w-10/12 md:8/12 xl:w-5/12 mb-6">
                <InputField
                    placeholder="Search using wallpaper title or tags such as anime, dark, minimal, widescreen, etc."
                    iconPosition="left"
                    inputRef={searchInputRef}
                >
                    <SearchIcon className="w-1/2" />
                </InputField>
            </form>

            <WallpaperGrid
                wallpapers={wallpapers}

                onSortByChange={onSortByChange}
                onSortDirectionChange={onSortDirectionChange}

                pageCount={pageCount}
                onPageChange={onPageChange}

                omitEmptyMessage
            />
        </PageSection>
    );
}

export default Search;
