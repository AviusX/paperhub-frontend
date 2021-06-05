import { authCheck, logout } from '../api/index';
import { authenticate, deauthenticate, setDiscordId, setUsername } from '../store/userSlice';
import { useDispatch } from 'react-redux';

export const useDiscordLogin = () => {
    return function () {
        window.open("http://localhost:4000/auth/discord", "_self");
    }
}

export const useAuthCheck = () => {
    const dispatch = useDispatch();

    return function () {
        authCheck()
            .then(res => {
                dispatch(authenticate());
                dispatch(setDiscordId(res.data.discordId));
                dispatch(setUsername(res.data.username));
            })
            .catch(err => {
                console.log(err.response);
            });
    }
}

export const useLogout = () => {
    const dispatch = useDispatch();

    return function () {
        logout()
            .then(res => {
                dispatch(deauthenticate());
                dispatch(setDiscordId(""));
                dispatch(setUsername(""));
            })
            .catch(err => {
                console.log(err.response);
            });
    }
}