import ReactPaginate from 'react-paginate'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

interface PaginationProps {
  itemsPerPage?: number
  totalItems: number
  handlePageClick: (selectedPage: number) => void
  currentPage: number
}

const PER_PAGE = 50

export function Pagination({
  itemsPerPage = PER_PAGE,
  totalItems,
  handlePageClick,
  currentPage,
}: PaginationProps): JSX.Element | null {
  const pageCount = Math.ceil(totalItems / itemsPerPage)

  return totalItems > itemsPerPage ? (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      onPageChange={({ selected }) => handlePageClick(selected + 1)}
      pageRangeDisplayed={3}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      previousLabel={<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageClassName="pagination__item"
      previousClassName="pagination__item-previous"
      nextClassName="pagination__item-next"
      breakClassName="pagination__item"
      activeClassName="active"
    />
  ) : null
}
