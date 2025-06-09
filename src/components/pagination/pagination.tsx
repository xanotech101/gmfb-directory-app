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
  const getFooterText = useFooterText(currentPage, totalItems)

  return (
    <div className="fixed bottom-0 left-72 w-[calc(100vw-18rem)] bg-white/70 border-t border-gray-200/60 z-10 px-5 shadow-3xl">
      <div className="flex items-center justify-between py-5 rounded-b-lg">
        <div className="text-[14px] text-gray-500">{getFooterText}</div>
        {totalItems > itemsPerPage ? (
          <ReactPaginate
            breakLabel="..."
            onPageChange={({ selected }) => handlePageChange(selected + 1)}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            pageClassName="pagination__item"
            previousClassName="pagination__item-previous"
            nextClassName="pagination__item-next"
            breakClassName="pagination__item"
            activeClassName="active"
            previousLabel={
              <div className="flex items-center">
                <ChevronLeftIcon className="size-5" aria-hidden="true" />
                Previous
              </div>
            }
            nextLabel={
              <div className="flex items-center">
                Next <ChevronRightIcon className="size-5" aria-hidden="true" />
              </div>
            }
          />
        ) : null}
      </div>
    </div>
  )
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
