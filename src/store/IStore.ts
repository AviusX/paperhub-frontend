export default interface IStore {
    user: {
        isAuthenticated: boolean,
        discordId: string,
        username: string,
    }
}