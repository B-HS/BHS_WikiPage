'use client'
import AddDoc from '@/components/list/add-doc'
import List from '@/components/list/list'
import Search from '@/components/list/search'
import { DocListContext } from '@/context/contexts/doclist-context'
import { PageContext } from '@/context/contexts/page-context'
import { useContext, useEffect, useRef } from 'react'
import Pagination from '../../components/list/pagination'

interface SearchBoxProps {
    search: Function
}

const Doc = () => {
    const { list } = useContext(DocListContext)
    const { page, totalPages, setPage } = useContext(PageContext)
    const searchRef = useRef<SearchBoxProps>(null)

    useEffect(() => {
        searchRef.current?.search()
    }, [page])
    return (
        <section className='flex flex-col flex-1'>
            <List docs={list} />
            <section className='flex items-center justify-between [&>*]:w-3/12 [&>*]:min-w-min py-3 flex-wrap'>
                <AddDoc />
                {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}
                <Search ref={searchRef} />
            </section>
        </section>
    )
}

export default Doc
