'use client'
import Link from 'next/link'
import Button from '../button'

const Navigation = () => {
    return (
        <section className='flex flex-wrap space-x-2'>
            <Link href={`/`}>
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
