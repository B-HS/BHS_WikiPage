import Header from '@/components/header/header'
import ContextProvider from '@/context/context-provider'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: '위키페이지',
    description: '코딩허브 프론트엔드 과제',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='ko'>
            <body className='container max-w-screen-md mx-auto'>
                <ContextProvider>
                    <Header />
                    <section className='p-2 flex flex-col w-full flex-1'>{children}</section>
                </ContextProvider>
            </body>
        </html>
    )
}

export default RootLayout
