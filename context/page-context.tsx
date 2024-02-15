'use client'
import { useSearchParams } from 'next/navigation'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

interface PageContextType {
    page: number
    setPage: Dispatch<SetStateAction<number>>
}

export const PageContext = createContext<PageContextType>({ page: 1, setPage: () => {} })

export const PageSetter = () => {
    const searchParams = useSearchParams()
    const { setPage } = useContext(PageContext)
    useEffect(() => {
        const page = searchParams.get('page')
        page && setPage(Number(page) || 1)
    }, [searchParams, setPage])
    return null
}

const PageContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [page, setPage] = useState<number>(1)

    return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>
}

export default PageContextProvider
