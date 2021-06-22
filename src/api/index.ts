import axios from 'axios';

const API = axios.create();

// Wallpaper Routes ===========================================

/**
 * Request a list of all papers from the server.
 * 
 * The promise resolves to an array of wallpapers on success.
 *
 * @returns Promise<AxiosResponse<any>>
 */
export const getAllWallpapers = (sortBy: string, sortDirection: string, page: number, limit: number) => {
    return API.get(`/wallpapers?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&limit=${limit}`);
}

/**
 * Takes a wallpaper file, a title and an array of tag titles
 * and sends a request to the server to create a wallpaper document.
 * 
 * Promise resolves to either a success or an error message.
 *
 * @param {File} wallpaper
 * @param {string} title
 * @param {string[]} tags
 */
export const uploadWallpaper = (wallpaper: File, title: string, tags: string[]) => {
    const formData = new FormData();
    formData.append('wallpaper', wallpaper);
    formData.append('title', title);
    formData.append('tags', JSON.stringify(tags));

    return API.post('/wallpapers', formData);
}

/**
 * Takes a query string and sorting and pagination variables as arguments
 * and sends a request to search for wallpapers using title or tags.
 * 
 * Promise resolves to either an array of found wallpapers and pageCount on 
 * success or an error message on failure.
 *
 * @param {string} query
 * @param {string} sortBy
 * @param {string} sortDirection
 * @param {number} page
 * @param {number} limit
 */
export const searchWallpapers = (query: string, sortBy: string, sortDirection: string, page: number, limit: number) => (
    API.get(`/wallpapers/search?query=${query}&sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&limit=${limit}`)
);

/**
 * Takes a wallpaper id and sends a request to delete that wallpaper.
 * 
 * Promise resolves to either a success or an error message.
 *
 * @param {string} id
 */
export const deleteWallpaper = (id: string) => API.delete(`/wallpapers/${id}`);

// Tag Routes =================================================

/**
 * Request a list of all tags. Gets an array of tag titles or
 * an error message in response.
 *
 * @returns Promise<AxiosResponse<any>>
 */
export const getAllTags = () => API.get('/tags');

/**
 * Takes a tag title and creates a tag in the database with that title.
 * The promise resolves to either a success or an error message.
 *
 * @param {string} title
 * @returns Promise<AxiosResponse<any>>
 */
export const createTag = (title: string) => API.post('/tags', { title });

// Authentication / User Routes ===============================

/**
 * Checks if a user is authenticated by sending a request to the server
 * and using the session cookie to confirm the authentication status.
 * 
 * If the user is logged in, the status code is `200` and the response
 * contains the details of the user. Otherwise, the response code is
 * `204` and the response just clears the session cookie.
 * 
 * @returns Promise<AxiosResponse<any>>
 */
export const authCheck = () => API.get('/auth/check');

/**
 * Takes a userId as an argument and makes a request to the server to
 * get information about that user.
 * 
 * Promise resolves to either the user data
 * (username, discriminator, postedWallpapers) or an error message.
 *
 * @param {string} id
 */
export const getUser = (id: string) => API.get(`/users/${id}`);

export const getUserWallpapers = (id: string, sortBy: string, sortDirection: string, page: number, limit: number) => (
    API.get(`/users/${id}/wallpapers?sortBy=${sortBy}&sortDirection=${sortDirection}&page=${page}&limit=${limit}`)
)

/**
 * Sends a logout request.
 * 
 * The promise resolves to a JSON object with either a success 
 * or an error message.
 *
 * @returns Promise<AxiosResponse<any>>
 */
export const logout = () => API.get('/auth/logout');