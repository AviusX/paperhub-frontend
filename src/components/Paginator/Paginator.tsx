import ReactPaginate from 'react-paginate';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

interface Props {
    pageCount: number;
    onPageChange: (page: { selected: number }) => void;
}

const Paginator: React.FC<Props> = props => (
    <ReactPaginate
        pageCount={props.pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={props.onPageChange}

        containerClassName="mt-16 flex justify-center font-semibold h-12"

        breakClassName="flex-1 flex items-center mx-1 border-2 border-gray-500 rounded"
        breakLinkClassName="flex-1 text-center p-3 lg:p-4"

        pageClassName="flex-1 flex items-center mx-1 border-2 border-gray-500 rounded cursor-pointer"
        pageLinkClassName="flex-1 text-center p-3 lg:p-4"
        activeClassName="ring-1 ring-primary border-primary"

        previousLabel={<ChevronLeftIcon className="w-7" />}
        previousClassName="flex-1 flex justify-center items-center mx-2 border-2 border-gray-500 rounded cursor-pointer"
        previousLinkClassName="flex-1 text-center p-4 lg:p-8"

        nextLabel={<ChevronRightIcon className="w-7" />}
        nextClassName="flex-1 flex justify-center items-center mx-2 border-2 border-gray-500 rounded cursor-pointer"
        nextLinkClassName="flex-1 text-center p-4 lg:p-8"
    />
)

export default Paginator;