import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import ModalHeading from '../../components/Modals/ModalHeading';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Buttons/Button';
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
        <section className="flex flex-col items-center w-full">
            <PageHeader>
                Upload Wallpaper
            </PageHeader>

            <div className="flex flex-col bg-secondary rounded-2xl w-11/12 sm:w-8/12 md:w-6/12 xl:w-5/12 2xl:w-4/12 
            filter drop-shadow-xl mt-24 py-4 sm:py-3 py-6 px-4 sm:px-6 xl:px-8">
                <ModalHeading>
                    Upload
                </ModalHeading>
                <form onSubmit={submitHandler} className="flex flex-col items-center w-full">
                    <label className="flex flex-col relative justify-center items-center h-24">
                        {wallpaperURL ? (
                            <img src={wallpaperURL} alt="Wallpaper" className="max-h-3/4" />
                        ) : (
                            <>
                                <PhotographIcon className="max-h-3/4" />
                                Click or drag an image here to select a wallpaper.
                            </>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="opacity-0 absolute top-0 left-0 w-full h-full"
                            ref={wallpaperRef}
                            onChange={wallpaperChangeHandler}
                        />
                    </label>

                    <InputField placeholder="Wallpaper Title" />

                    <div className="self-end">
                        <Button color="primary" type="submit">
                            Upload
                        </Button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Upload;