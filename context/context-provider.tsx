import { ReactNode } from 'react'
import PageContextProvider from './contexts/page-context'
import DocListContextProvider from './contexts/doclist-context'

const ContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <DocListContextProvider>
            <PageContextProvider>{children}</PageContextProvider>
        </DocListContextProvider>
    )
}

export default ContextProvider
