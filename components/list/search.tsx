'use client'
import { DocListContext } from '@/context/contexts/doclist-context'
import { PageContext } from '@/context/contexts/page-context'
import { SearchIcon } from 'lucide-react'
import { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react'
import Button from '../button'
import { DEFAULT_PAGING_CNT } from '@/util/constant'

const Search = forwardRef(({}, search) => {
    const { setList } = useContext(DocListContext)
    const { page, keyword, setPage, setTotalPages, setKeyword } = useContext(PageContext)
    const loadList = () => {
        fetch(`/api/list?page=${page}&keyword=${keyword}`)
            .then((response) => response.json())
            .then((dataObj) => {
                const { total, data } = dataObj
                setList(data || [])
                setTotalPages(Math.ceil(total / DEFAULT_PAGING_CNT))
                if (data.length === 0 && page > 1) {
                    setPage(page - 1)
                }
            })
            .catch((error) => {
                console.error('Error fetching data: ', error)
            })
    }

    useImperativeHandle(search, () => ({
        search: loadList,
    }))

    return (
        <section className='flex flex-nowrap whitespace-nowrap py-1 text-sm'>
            <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                type='text'
                placeholder='검색어를 입력해주세요'
                className='border px-2 w-full placeholder:capitalize'
                onKeyDown={(e) => e.key === 'Enter' && loadList()}
            />
            <Button variant='outline' size='iconMd' className='rounded-none border-l-0' onClick={loadList}>
                <SearchIcon className='w-5' />
            </Button>
        </section>
    )
})

Search.displayName = 'Search'
export default Search
