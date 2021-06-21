import InputField from '../InputField/InputField';
import { SearchIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useState, useEffect, RefObject, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import { getAllTags } from '../../api';

// StackOverflow answer for getting tagnames from array-
// https://stackoverflow.com/a/46015793/10509081

interface Props {
    tagsFieldRef: RefObject<HTMLInputElement>;
}

interface Tag {
    title: string;
    checked: boolean;
}

const TagSelector: React.FC<Props> = props => {
    const [searchString, setSearchString] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // A list of all tags. This only gets set once on receiving a list of tags
    // in response from the server and never changes.
    const [allTags, setAllTags] = useState<Tag[]>([]);

    // Tags that will actually be displayed in the dropdown. These may change
    // according to the search string provided in search field.
    const [displayedTags, setDisplayedTags] = useState<Tag[]>([]);

    useEffect(() => {
        getAllTags()
            .then(res => {
                // Create an array of objects of type `Tag` using the received data
                const tagsToDisplay = (res.data as string[])?.map(tag => {
                    return { title: tag, checked: false }
                });

                // If the array is non-empty, set the array as state.
                if (tagsToDisplay) {
                    setDisplayedTags(tagsToDisplay);
                    setAllTags(tagsToDisplay);
                }
            })
            .catch(err => {
                // If there is an error while fetching tags, display the error in toast.
                toast.error(err.response.data.message);
            });
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    }

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchString(e.currentTarget.value);
        const filteredTags = allTags.filter(tag => tag.title.includes(e.currentTarget.value));
        setDisplayedTags(filteredTags);
    }

    const onTagChange = (index: number) => {
        const selectedTags = []; // Array of values of checked checkboxes.
        const checkboxes = document.querySelectorAll('input[type=checkbox]:checked'); // Checked checkboxes

        // Spread the current state to create a new array,
        // otherwise the component won't re-render on updating it
        // because it'll still be the same reference.
        const updatedTags = [...displayedTags];

        // Populate the array with values of checked checkboxes.
        for (let i = 0; i < checkboxes.length; i++) {
            selectedTags.push((checkboxes[i] as HTMLInputElement).value);
        }

        // Display the currently selected tags in a comma separated list in the input field.
        if (props.tagsFieldRef.current) {
            props.tagsFieldRef.current.value = selectedTags.join(', ');
        }

        // Toggle the checkbox's checked state and set the new state.
        updatedTags[index].checked = !updatedTags[index].checked;
        setDisplayedTags(updatedTags);
    }

    return (
        <div className="w-full relative cursor-pointer">
            {/* The input field displaying a comma-separated list of selected tags. */}
            <InputField
                label="Tags"
                placeholder="Tags"
                iconPosition="right"
                readOnly
                inputRef={props.tagsFieldRef}
                onClick={toggleDropdown}
            >
                <ChevronDownIcon className="w-3/4" />
            </InputField>

            {/* The dropdown menu */}
            {showDropdown && (
                <ul className="absolute top-full right-0 w-full h-56 overflow-y-scroll rounded-lg bg-white border-2 
                border-primary px-2">
                    {/* The search field */}
                    <InputField placeholder="Search" iconPosition="left" onChange={onSearchChange} value={searchString}>
                        <SearchIcon className="w-1/2" />
                    </InputField>

                    {displayedTags?.map((tag, index) => (
                        <label className="cursor-pointer block px-2 py-3 my-1 text-lg rounded-md"
                            key={tag.title}
                        >
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag.title}
                                checked={tag.checked}
                                className="form-checkbox p-2 text-primary rounded-full focus:ring-primary"
                                onChange={() => onTagChange(index)}
                            />
                            <span className="mx-2">{tag.title}</span>
                        </label>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TagSelector;