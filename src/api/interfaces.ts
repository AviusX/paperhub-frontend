export interface IWallpaper {
    _id: string;
    owner: string;
    title: string;
    imagePath: string;
    mimeType: string;
    width: number;
    height: number;
    downloadCount?: number;
    tags?: string[];
}