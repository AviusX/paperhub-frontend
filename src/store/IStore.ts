import { PermissionLevel } from '../enums/PermissionLevel';

export default interface IStore {
    user: {
        isAuthenticated: boolean,
        id: string,
        discordId: string,
        username: string,
        permissionLevel: PermissionLevel
    }
}