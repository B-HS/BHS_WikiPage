import { ReactNode } from 'react'
import PageContextProvider from './contexts/page-context'

const ContextProvider = ({ children }: { children: ReactNode }) => {
    return <PageContextProvider>{children}</PageContextProvider>
}

export default ContextProvider
