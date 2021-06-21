import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Buttons/Button';
import TagSelector from '../../components/TagSelector/TagSelector';
import ErrorMessage from '../../components/FormErrorMessage/FormErrorMessage';
import { routeVariants } from '../../variants';
import { wallpaperSchema } from '../../schema/wallpaper';
import { PhotographIcon } from '@heroicons/react/outline';
import { useUploadWallpaper } from '../../hooks/wallpapers';
import { motion } from 'framer-motion';

const Upload: React.FC = props => {
    const [wallpaperURL, setWallpaperURL] = useState<string>();
    const [errorMessage, setErrorMessage] = useState<string>();

    const wallpaperRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const tagsFieldRef = useRef<HTMLInputElement>(null);

    const uploadWallpaper = useUploadWallpaper();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = titleRef.current?.value;
        const tags = tagsFieldRef.current?.value.split(',').map(value => value.trim());
        const fileTypeRegex = /^image\/.+/; // Regex for matching mime type image/*
        let wallpaper: File;
        let fileTypeError: string | undefined;
        let fileType = "";

        if (wallpaperRef.current?.files && wallpaperRef.current.files[0]) {
            wallpaper = wallpaperRef.current.files[0];
            fileType = wallpaper.type;
        }

        const { error } = wallpaperSchema.validate({ title, tags });

        if (!fileTypeRegex.test(fileType)) {
            fileTypeError = "An image file is required.";
        }

        if (error) {
            setErrorMessage(error.message);
        } else if (fileTypeError) {
            setErrorMessage(fileTypeError);
        } else {
            // Add ts-expect-error because we want to ignore this error.
            // This is because `wallpaper` or `title` will never be undefined
            // by the time this code executes.

            // @ts-expect-error
            uploadWallpaper(wallpaper, title, tags);
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
        <motion.section
            className="w-full lg:h-nav-screen lg:overflow-y-hidden"
            variants={routeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <form onSubmit={submitHandler} className="flex flex-wrap w-full lg:h-full">

                {/* The image/wallpaper select div */}
                <div className="w-full lg:w-8/12 px-2 xl:px-6">
                    <label className="flex relative justify-center items-center py-3 h-full">
                        {wallpaperURL ? (
                            <div className="max-w-3/4">
                                <img src={wallpaperURL} alt="Wallpaper" className="max-h-nav-screen max-w-full" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center max-w-3/4">
                                <PhotographIcon className="max-w-1/4 opacity-50" />
                                <p className="font-semibold text-xl lg:text-2xl text-center">
                                    Click here or drag an image here to select a wallpaper.
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
                    <InputField placeholder="Wallpaper Title" label="Title" inputRef={titleRef} />
                    <TagSelector tagsFieldRef={tagsFieldRef} />

                    <div className="my-5 self-end">
                        <Button color="primary" type="submit">
                            Upload
                        </Button>
                    </div>
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </div>

            </form>
        </motion.section>
    );
}

export default Upload;