import { AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop";
import ModalContainer from './ModalContainer';
import Button from '../Buttons/Button';
import { useDeleteWallpaper } from '../../hooks/wallpapers';

interface Props {
    show: boolean;
    closeModalHandler: () => void;
    wallpaperId: string;
}

const DeleteConfirmationModal: React.FC<Props> = props => {
    const deleteWallpaper = useDeleteWallpaper();

    const deleteHandler = () => {
        deleteWallpaper(props.wallpaperId);
        props.closeModalHandler();
    }

    return (
        <AnimatePresence>
            {
                props.show && (
                    <Backdrop clicked={props.closeModalHandler}>
                        <ModalContainer>
                            <p className="text-center text-xl font-semibold">
                                Are you sure you want to delete this wallpaper?
                            </p>
                            <div className="flex flex-wrap w-full justify-end mt-7">
                                <div className="mx-2 my-1">
                                    <Button color="secondary" onClick={props.closeModalHandler}>
                                        Cancel
                                    </Button>
                                </div>

                                <div className="mx-2 my-1">
                                    <Button color="primary" onClick={deleteHandler}>
                                        Confirm
                                    </Button>
                                </div>
                            </div>
                        </ModalContainer>
                    </Backdrop>
                )
            }
        </AnimatePresence>
    );
}

export default DeleteConfirmationModal;