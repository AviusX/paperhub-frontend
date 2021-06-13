import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        discordId: "",
        username: "",
        discriminator: "",
        permissionLevel: 0
    },
    reducers: {
        authenticate: state => {
            state.isAuthenticated = true;
        },
        deauthenticate: state => {
            state.isAuthenticated = false;
        },
        setDiscordId: (state, action) => {
            state.discordId = action.payload;
        },
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setDiscriminator: (state, action) => {
            state.discriminator = action.payload;
        },
        setPermissionLevel: (state, action) => {
            state.permissionLevel = action.payload;
        }
    }
});

export const {
    authenticate,
    deauthenticate,
    setDiscordId,
    setUsername,
    setDiscriminator,
    setPermissionLevel
} = userSlice.actions;

export default userSlice.reducer;