import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import Button from './button'

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (pageNumber: number) => void }) => {
    const maxPagesToShow = 5

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (totalPages > maxPagesToShow && currentPage <= Math.ceil(maxPagesToShow / 2)) {
        endPage = maxPagesToShow
    } else if (totalPages > maxPagesToShow && currentPage >= totalPages - Math.floor(maxPagesToShow / 2)) {
        startPage = totalPages - maxPagesToShow + 1
    }

    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    return (
        <section>
            <section className='flex-1 flex justify-center'>
                {currentPage !== 1 && (
                    <>
                        <Button
                            variant='outline'
                            onClick={() => onPageChange(1)}
                            className={`${currentPage === 1 ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'} rounded-none`}
                        >
                            <ChevronsLeft className='w-3.5 h-3.5' />
                        </Button>
                        <Button
                            variant='outline'
                            onClick={() => onPageChange(Math.max(1, currentPage - 5))}
                            className={`${currentPage === 1 ? 'cursor-not-allowed opacity-30' : 'cursor-pointer'} rounded-none`}
                        >
                            <ChevronLeft className='w-3.5 h-3.5' />
                        </Button>
                    </>
                )}
                <section>
                    {pageNumbers.map((number) => (
                        <Button
                            variant={currentPage === number ? 'outlineInverted' : 'outline'}
                            key={number}
                            onClick={() => onPageChange(number)}
                            className={`${currentPage === number ? 'hover:bg-foreground hover:border-black hover:text-white' : ''} rounded-none`}
                        >
                            {number}
                        </Button>
                    ))}
                </section>
                {currentPage !== totalPages && (
                    <>
                        <Button
                            variant='outline'
                            onClick={() => onPageChange(Math.min(totalPages, currentPage + 5))}
                            className={`${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-none`}
                        >
                            <ChevronRight className='w-3.5 h-3.5' />
                        </Button>
                        <Button
                            variant='outline'
                            onClick={() => onPageChange(totalPages)}
                            className={`${currentPage === totalPages ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-none`}
                        >
                            <ChevronsRight className='w-3.5 h-3.5' />
                        </Button>
                    </>
                )}
            </section>
        </section>
    )
}

export default Pagination
