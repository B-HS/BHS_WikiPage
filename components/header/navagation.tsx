'use client'
import Link from 'next/link'
import Button from '../button'

const Navigation = () => {
    return (
        <section className='flex flex-wrap space-x-2'>
            <Link href={`/doc`}>
                <Button size='md' variant='ghost'>
                    위키 목록
                </Button>
            </Link>
        </section>
    )
}

export default Navigation
