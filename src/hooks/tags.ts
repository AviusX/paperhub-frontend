import { createTag } from '../api';
import { toast } from 'react-toastify';

/**
 * Returns a function that takes a tag name and makes the createTag request.
 * The function also shows either the success or the error message in a toast.
 *
 * @return (tagName: string) => void
 */
export const useCreateTag = () => {
    return function (tagName: string) {
        createTag(tagName)
            .then(res => {
                toast.success(res.data.message);
            })
            .catch(err => {
                toast.error(err.response.data.message);
            });
    }
}