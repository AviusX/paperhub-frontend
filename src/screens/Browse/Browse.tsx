import PageHeader from '../../components/PageHeader/PageHeader';
import WallpaperCard from '../../components/WallpaperCard/WallpaperCard';
import { IWallpaper } from '../../api/interfaces';
import { getAllWallpapers } from '../../api/index';
import { useState, useEffect } from 'react';

const Browse: React.FC = props => {
    const [wallpapers, setWallpapers] = useState<Array<IWallpaper>>([]);

    useEffect(() => {
        getAllWallpapers()
            .then(res => {
                setWallpapers(res.data);
            })
            .catch(err => {
                console.log(err.response.data.message);
            });
    }, []);

    return (
        <section className="flex flex-col justify-center items-center my-4 w-full">
            <PageHeader>
                Browse
            </PageHeader>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 grid-flow-row-dense items-center 
            justify-items-center px-4">
                {
                    wallpapers.map(wallpaper => (
                        <WallpaperCard wallpaper={wallpaper} key={wallpaper._id} />
                    ))
                }
            </div>
        </section>
    );
}

export default Browse;