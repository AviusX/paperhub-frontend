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
export const getAllWallpapers = () => API.get('/wallpapers/');

// Tag Routes =================================================

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
 * Sends a logout request.
 * 
 * The promise resolves to a JSON object with either a success 
 * or an error message.
 *
 * @returns Promise<AxiosResponse<any>>
 */
export const logout = () => API.get('/auth/logout');