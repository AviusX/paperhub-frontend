import { useRef, FormEvent, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import ModalContainer from './ModalContainer';
import ModalHeading from './ModalHeading';
import InputField from '../InputField/InputField';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import Button from '../Buttons/Button';
import { useCreateTag } from '../../hooks/tags';
import { tagSchema } from '../../schema/tag';
import { TagIcon } from '@heroicons/react/outline';

interface Props {
    show?: boolean;
    backdropClicked: () => void;
}

const CreateTagModal: React.FC<Props> = props => {
    const createTag = useCreateTag();
    const tagTitleRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>();

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const tagName = tagTitleRef.current?.value as string;

        const { error } = tagSchema.validate({
            title: tagName
        });

        if (error) {
            setErrorMessage(error.message);
        } else {
            createTag(tagName);
            setErrorMessage(undefined);
            props.backdropClicked();
        }
    }

    return (
        <AnimatePresence>
            {props.show && (
                <Backdrop clicked={props.backdropClicked}>
                    <ModalContainer>
                        <ModalHeading>
                            Create Tag
                        </ModalHeading>
                        <form onSubmit={submitHandler} className="mt-4 mb-2 flex flex-col w-full">
                            <InputField
                                placeholder="Tag Name"
                                inputRef={tagTitleRef}
                                iconPosition="left"
                            >
                                <TagIcon className="w-2/3" />
                            </InputField>
                            <div className="flex justify-end mt-4">
                                <Button type="submit" color="primary">
                                    Create
                                </Button>
                            </div>
                            <FormErrorMessage>
                                {errorMessage}
                            </FormErrorMessage>
                        </form>
                    </ModalContainer>
                </Backdrop>
            )}
        </AnimatePresence>
    )
}

export default CreateTagModal;