'use client'

import List from '@/components/list/list'
import { PageContext } from '@/context/page-context'
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
                setTotalPages(total / 5)
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
            })
    }, [page])

    return (
        <section className='flex flex-col flex-1'>
            <List docs={docs} />
            <Suspense>{totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />}</Suspense>
        </section>
    )
}

export default Home
