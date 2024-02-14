'use client'

import List from '@/components/list/list'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import Pagination from '../components/pagination'
import { DocProps } from './doc/[docid]/page'

const Home = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [docs, setDocs] = useState<DocProps[]>([])
    const [totalPages, setTotalPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1)

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber)
        router.push('?' + createQueryString('page', pageNumber.toString()))
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)
            return params.toString()
        },
        [searchParams],
    )

    useEffect(() => {
        fetch(`/api/list?page=${currentPage}`)
            .then((response) => response.json())
            .then((dataObj) => {
                const { total, data } = dataObj
                setDocs(data)
                setTotalPages(total / 5)
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
            })
    }, [currentPage])
    return (
        <section className='flex flex-col flex-1'>
            <List docs={docs} />
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />}
        </section>
    )
}

export default Home
