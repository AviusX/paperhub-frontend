import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Buttons/Button';
import TagSelector from '../../components/TagSelector/TagSelector';
import { PhotographIcon } from '@heroicons/react/outline';

const Upload: React.FC = props => {
    const [wallpaperURL, setWallpaperURL] = useState<string>();
    const wallpaperRef = useRef<HTMLInputElement>(null);

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (wallpaperRef.current?.files) {
            const file = wallpaperRef.current.files[0];
            console.log(file.type);
        }
    }

    const wallpaperChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        // If there is an existing URL, revoke that first to prevent memory leaks.
        if (wallpaperURL) {
            URL.revokeObjectURL(wallpaperURL);
            setWallpaperURL("");
        }

        if (wallpaperRef.current?.files) {
            const file = wallpaperRef.current.files[0];
            const url = URL.createObjectURL(file);
            setWallpaperURL(url);
        }
    }

    return (
        <section className="w-full lg:h-screen lg:overflow-y-hidden">
            <form onSubmit={submitHandler} className="flex flex-wrap w-full lg:h-full">

                {/* The image/wallpaper select div */}
                <div className="w-full lg:w-8/12 px-2 xl:px-6">
                    <label className="flex relative justify-center items-center my-3 h-full">
                        {wallpaperURL ? (
                            <div className="max-w-3/4">
                                <img src={wallpaperURL} alt="Wallpaper" className="max-h-full max-w-full" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center max-w-3/4">
                                <PhotographIcon className="max-w-1/4 opacity-50" />
                                <p className="font-semibold text-xl lg:text-2xl text-center">
                                    Click or drag an image here to select a wallpaper.
                                </p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="opacity-0 absolute top-0 left-0 w-full h-full"
                            ref={wallpaperRef}
                            onChange={wallpaperChangeHandler}
                        />
                    </label>
                </div>

                {/* The title & tag select div */}
                <div className="flex flex-col w-full lg:w-4/12 lg:shadow-2xl px-5 py-7">
                    <InputField placeholder="Wallpaper Title" label="Title" />
                    <TagSelector />

                    <div className="my-5 self-end">
                        <Button color="primary" type="submit">
                            Upload
                        </Button>
                    </div>
                </div>

            </form>
        </section>
    );
}

export default Upload;