import PageHeader from "../../components/PageHeader/PageHeader";
import PageSection from "../../components/PageSection/PageSection";
import WallpaperGrid from "../../components/WallpaperGrid/WallpaperGrid";

import { SortBy } from '../../enums/SortBy';
import { SortDirection } from '../../enums/SortDirection';

import { getUser, getUserWallpapers } from '../../api/';

import { useState, useEffect, ChangeEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from "react-toastify";

interface User {
    username: string;
    discriminator: string;
}

interface RouteParams {
    userId: string;
}

const UserProfile: React.FC = props => {
    const [userWallpapers, setUserWallpapers] = useState([]);
    const [user, setUser] = useState<User>();

    const [page, setPage] = useState<number>(0);
    const [pageCount, setPageCount] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>(SortBy.MostRecent);
    const [sortDirection, setSortDirection] = useState<string>(SortDirection.Ascending);

    const history = useHistory();
    const params = useParams<RouteParams>();

    const onSortByChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.currentTarget.value);
    }

    const onSortDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortDirection(e.currentTarget.value);
    }

    const onPageChange = (page: { selected: number }) => {
        setPage(page.selected)
    }

    useEffect(() => {
        getUser(params.userId)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                history.push('/browse');
                toast.error(err.response.data.message);
            });
    }, [params.userId, history]);

    useEffect(() => {
        getUserWallpapers(params.userId, sortBy, sortDirection, page, 10)
            .then(res => {
                setUserWallpapers(res.data.wallpapers);
                setPageCount(res.data.pageCount);
            })
            .catch(err => {
                console.error(err.response.data.message);
            });
    }, [params.userId, page, sortBy, sortDirection, history]);

    return (
        <PageSection>
            <PageHeader>
                Wallpapers by {user?.username}<span className="text-gray-400">#{user?.discriminator}</span>
            </PageHeader>

            <WallpaperGrid
                wallpapers={userWallpapers}

                onSortByChange={onSortByChange}
                onSortDirectionChange={onSortDirectionChange}

                pageCount={pageCount}
                onPageChange={onPageChange}
            />
        </PageSection>
    );
}

export default UserProfile;