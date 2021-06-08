export interface IWallpaper {
    _id: string;
    owner: string;
    title: string;
    imagePath: string;
    width: number;
    height: number;
    tags?: string[]
    likes?: string[]
}