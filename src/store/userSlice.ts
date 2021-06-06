import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        discordId: "",
        username: "",
        discriminator: ""
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
        }
    }
});

export const {
    authenticate,
    deauthenticate,
    setDiscordId,
    setUsername,
    setDiscriminator
} = userSlice.actions;

export default userSlice.reducer;