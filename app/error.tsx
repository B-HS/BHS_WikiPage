'use client'

import Button from '@/components/button'
import Link from 'next/link'

const CustomErrorPage = () => {
    return (
        <section className='container mx-auto max-w-screen-md flex flex-col gap-3 mt-5'>
            <p className='text-3xl font-bold'>오류 !</p>
            <p>페이지를 찾을 수 없거나 알 수 없는 에러가 발생하였습니다.</p>
            <Link href='/'>
                <Button size='md' variant='outline'>
                    홈으로 돌아가기
                </Button>
            </Link>
        </section>
    )
}

export default CustomErrorPage
