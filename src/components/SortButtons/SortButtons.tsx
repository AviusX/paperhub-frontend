import { SortBy } from '../../enums/SortBy';
import { SortDirection } from '../../enums/SortDirection';
import { ChangeEvent } from 'react';

interface Props {
    onSortByChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onSortDirectionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SortButtons: React.FC<Props> = props => (
    <div className="flex flex-wrap w-full md:justify-end px-6">
        <label className="mx-2 my-1 w-full md:w-auto">
            <span className="mx-1 text-lg font-semibold">Sort By:</span>
            <select
                name="sortBy"
                className="form-select border-primary focus:ring-primary focus:border-primary rounded-md cursor-pointer w-full md:w-auto"
                onChange={props.onSortByChange}
            >
                <option value={SortBy.MostRecent}>
                    Most Recent
                </option>

                <option value={SortBy.MostDownloaded}>
                    Most Downloaded
                </option>
            </select>
        </label>

        <label className="mx-2 my-1 w-full md:w-auto">
            <span className="mx-1 text-lg font-semibold">Sort Direction:</span>
            <select
                name="sortBy"
                className="form-select border-primary focus:ring-primary focus:border-primary rounded-md cursor-pointer w-full md:w-auto"
                onChange={props.onSortDirectionChange}
            >
                <option value={SortDirection.Ascending}>
                    Ascending
                </option>

                <option value={SortDirection.Descending}>
                    Descending
                </option>
            </select>
        </label>
    </div>
);

export default SortButtons;