'use client'
import { DocProps } from '@/app/doc/[docid]/page'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface DocListContextType {
    list: DocProps[]
    setList: Dispatch<SetStateAction<DocProps[]>>
}

export const DocListContext = createContext<DocListContextType>({ list: [], setList: () => {} })

const DocListContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [list, setList] = useState<DocProps[]>([])
    return <DocListContext.Provider value={{ list, setList }}>{children}</DocListContext.Provider>
}

export default DocListContextProvider
