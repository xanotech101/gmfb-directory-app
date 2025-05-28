import ReactPaginate from 'react-paginate'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { ITEMS_PER_PAGE } from '@/constants'

export interface PaginationProps {
  itemsPerPage?: number
  totalItems: number
  handlePageChange: (selectedPage: number) => void
  currentPage: number
}

function Pagination({
  itemsPerPage = ITEMS_PER_PAGE,
  totalItems,
  handlePageChange,
  currentPage,
}: PaginationProps): JSX.Element | null {
  const pageCount = Math.ceil(totalItems / itemsPerPage)

  return totalItems > itemsPerPage ? (
    <ReactPaginate
      breakLabel="..."
      nextLabel={<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />}
      onPageChange={({ selected }) => handlePageChange(selected + 1)}
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

const useFooterText = (currentPage: number, totalItems: number, itemsPerPage = ITEMS_PER_PAGE) => {
  if (totalItems > 0) {
    const start = (currentPage - 1) * itemsPerPage + 1
    const end = Math.min(currentPage * itemsPerPage, totalItems)
    return `Showing ${start}-${end} of ${totalItems} results`
  }
  return null
}

export { Pagination, useFooterText }
