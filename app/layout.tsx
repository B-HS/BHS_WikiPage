import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'FE개발자_변현석',
    description: '코딩허브 프론트엔드 과제',
}

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <html lang='en'>
            <body>{children}</body>
        </html>
    )
}

export default RootLayout
