import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuthenticated: false,
        discordId: "",
        username: ""
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
        }
    }
});

export const { authenticate, deauthenticate, setDiscordId, setUsername } = userSlice.actions;
export default userSlice.reducer;