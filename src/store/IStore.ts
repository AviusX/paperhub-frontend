import { PermissionLevel } from '../enums/PermissionLevel';

export default interface IStore {
    user: {
        isAuthenticated: boolean,
        discordId: string,
        username: string,
        permissionLevel: PermissionLevel
    }
}