'use client'
import Link from 'next/link'
import Button from '../button'
import { useSearchParams } from 'next/navigation'

const Navigation = () => {
    const searchParams = useSearchParams()
    return (
        <section className='flex flex-wrap space-x-2'>
            <Link href={`/?page=${searchParams.get('page') || '1'}`}>
                <Button size='md' variant='ghost'>
                    목록
                </Button>
            </Link>
            <Button size='md' variant='ghost'>
                추가
            </Button>
        </section>
    )
}

export default Navigation
