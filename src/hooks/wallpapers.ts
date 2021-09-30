import { deleteWallpaper } from '../api';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export const useDeleteWallpaper = () => {
    const history = useHistory();
    return function (id: string) {
        deleteWallpaper(id)
            .then(res => {
                toast.success(res.data.message);
                history.replace(history.location);
            })
            .catch(err => {
                toast.error(err.response.data.message);
            });
    }
}