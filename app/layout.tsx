import Header from '@/components/header/header'
import type { Metadata } from 'next'
import PageContextProvider from '../context/page-context'
import './globals.css'

export const metadata: Metadata = {
    title: 'FE개발자_변현석',
    description: '코딩허브 프론트엔드 과제',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='ko'>
            <body className='container max-w-screen-md mx-auto'>
                <PageContextProvider>
                    <Header />
                    <section className='p-2 flex flex-col w-full flex-1'>{children}</section>
                </PageContextProvider>
            </body>
        </html>
    )
}

export default RootLayout
