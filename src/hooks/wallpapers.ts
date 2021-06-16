import { uploadWallpaper } from '../api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export const useUploadWallpaper = () => {
    const history = useHistory();

    return function (wallpaper: File, title: string, tags: string[]) {
        uploadWallpaper(wallpaper, title, tags)
            .then(res => {
                toast.success(res.data.message);
                history.push('/');
            })
            .catch(err => {
                toast.error(err.response.data.message);
            })
    }
}