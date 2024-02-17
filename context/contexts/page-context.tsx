'use client'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

interface PageContextType {
    page: number
    totalPages: number
    keyword: string
    setPage: Dispatch<SetStateAction<number>>
    setTotalPages: Dispatch<SetStateAction<number>>
    setKeyword: Dispatch<SetStateAction<string>>
}

export const PageContext = createContext<PageContextType>({ page: 1, totalPages: 0, keyword: '', setPage: () => {}, setTotalPages: () => {}, setKeyword: () => {} })

export const PageSetter = () => {
    const searchParams = useSearchParams()
    const { setPage, setKeyword } = useContext(PageContext)
    useEffect(() => {
        const page = searchParams.get('page')
        const keyword = searchParams.get('keyword')
        page && setPage(Number(page) || 1)
        keyword && setKeyword(keyword)
    }, [searchParams, setPage, setKeyword])
    return null
}

const PageContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)
    const [keyword, setKeyword] = useState<string>('')

    return <PageContext.Provider value={{ page, totalPages, keyword, setPage, setTotalPages, setKeyword }}>{children}</PageContext.Provider>
}

export default PageContextProvider
