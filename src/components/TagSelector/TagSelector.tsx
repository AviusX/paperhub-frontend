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
        const searchInput = e.currentTarget.value;
        setSearchString(searchInput);
        const filteredTags = allTags.filter(tag => tag.title.includes(searchInput.toLowerCase()));
        setDisplayedTags(filteredTags);
    }

    const onTagChange = (index: number) => {
        const updatedDisplayTags = createDeepCopy(displayedTags);
        const updatedAllTags = createDeepCopy(allTags);
        const changedTagTitle = updatedDisplayTags[index].title;

        // Toggle the checked property of tag in displayTags
        updatedDisplayTags[index].checked = !updatedDisplayTags[index].checked;
        setDisplayedTags(updatedDisplayTags);

        // Get the index of tag in allTags array
        const tagIndex = getIndex(allTags, changedTagTitle);

        // Toggle the checked property of tag in allTags
        updatedAllTags[tagIndex].checked = !updatedAllTags[tagIndex].checked;
        setAllTags(updatedAllTags);

        // Get the checked tags from allTags
        const checkedTags = updatedAllTags.filter(tag => tag.checked);

        // Set the value of the read only input field to the selected tags
        (props.tagsFieldRef.current as HTMLInputElement).value = checkedTags.flatMap(tag => tag.title).join(', ');
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

/**
 * Takes an array of type Tag[] and a title as arguments,
 * returns the index of the tag that has the given title.
 *
 * @param {Tag[]} tagList
 * @param {string} title
 */
const getIndex = (tagList: Tag[], title: string) => {
    for (let i = 0; i < tagList.length; i++) {
        if (tagList[i].title === title) {
            return i;
        }
    }
    return -1;
}

/**
 * Takes an array of type Tag[] as an argument and
 * returns a deep copy of that array.
 *
 * @param {Tag[]} tagList
 * @return {*} 
 */
const createDeepCopy = (tagList: Tag[]) => {
    const arrToReturn = [];
    for (let tag of tagList) {
        arrToReturn.push({ ...tag })
    }
    return arrToReturn;
}


export default TagSelector;