import InputField from '../InputField/InputField';
import { SearchIcon, ChevronDownIcon } from '@heroicons/react/outline';
import { useState, useEffect, useRef } from 'react';
import { getAllTags } from '../../api';

// StackOverflow answer for getting tagnames from array-
// https://stackoverflow.com/a/46015793/10509081

const TagSelector: React.FC = props => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [tags, setTags] = useState<string[]>();
    const tagsFieldRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getAllTags()
            .then(res => {
                setTags(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const toggleDropdown = () => {
        setShowDropdown(prevState => !prevState);
    }

    const onTagChange = () => {
        const selectedTags = [];
        const checkboxes = document.querySelectorAll('input[type=checkbox]:checked');
        for (let i = 0; i < checkboxes.length; i++) {
            selectedTags.push((checkboxes[i] as HTMLInputElement).value)
        }
        if (tagsFieldRef.current) {
            tagsFieldRef.current.value = selectedTags.join(', ');
        }
    }

    return (
        <div className="w-full relative cursor-pointer">
            <InputField
                label="Tags"
                placeholder="Tags"
                iconPosition="right"
                readOnly
                inputRef={tagsFieldRef}
                onClick={toggleDropdown}
            >
                <ChevronDownIcon className="w-3/4" />
            </InputField>
            {showDropdown && (
                <ul className="absolute top-full right-0 w-full h-56 overflow-y-scroll rounded-lg bg-white border-2 
                border-primary px-2">
                    <InputField placeholder="Search" iconPosition="left">
                        <SearchIcon className="w-1/2" />
                    </InputField>

                    {tags?.map(tag => (
                        <label className="cursor-pointer block px-2 py-3 my-1 bg-secondary filter brightness-105
                        text-lg rounded-md" key={tag}>
                            <input
                                type="checkbox"
                                name="tags"
                                value={tag}
                                className="form-checkbox p-2 text-primary rounded-full focus:ring-primary"
                                onChange={onTagChange}
                            />
                            <span className="mx-2">{tag}</span>
                        </label>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TagSelector;