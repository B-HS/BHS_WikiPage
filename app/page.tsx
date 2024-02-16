'use client'

import AddDoc from '@/components/list/add-doc'
import List from '@/components/list/list'
import { PageContext } from '@/context/contexts/page-context'
import { Suspense, useContext, useEffect, useState } from 'react'
import Pagination from '../components/pagination'
import { DocProps } from './doc/[docid]/page'

const Home = () => {
    const [docs, setDocs] = useState<DocProps[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const { page, setPage } = useContext(PageContext)

    useEffect(() => {
        fetch(`/api/list?page=${page}`)
            .then((response) => response.json())
            .then((dataObj) => {
                const { total, data } = dataObj
                setDocs(data)
                setTotalPages(Math.ceil(total / 5))
                if (data.length === 0 && page > 1) {
                    setPage(page - 1)
                }
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
            })
    }, [page, setPage])

    return (
        <section className='flex flex-col flex-1'>
            <List docs={docs} />
            <section className='flex justify-between items-baseline relative flex-wrap py-3'>
                <AddDoc />
                <Suspense>{totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}</Suspense>
            </section>
        </section>
    )
}

export default Home
