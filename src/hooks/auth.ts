import { authCheck, logout } from '../api/index';
import {
    authenticate,
    deauthenticate,
    setDiscordId,
    setDiscriminator,
    setUsername
} from '../store/userSlice';
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
                if (res.status === 200) {
                    dispatch(authenticate());
                    dispatch(setDiscordId(res.data.discordId));
                    dispatch(setUsername(res.data.username));
                    dispatch(setDiscriminator(res.data.discriminator));
                }
            })
            .catch(err => {
                // Do nothing.
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
                dispatch(setDiscriminator(""));
            })
            .catch(err => {
                console.log(err.response);
            });
    }
}