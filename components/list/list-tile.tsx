'use client'
import { DocProps } from '@/app/doc/[docid]/page'
import { ChevronRight, Paperclip, ScrollTextIcon } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const ListTile = ({ info }: { info?: DocProps }) => {
    const { docid, title } = info || {}
    const searchParams = useSearchParams()
    return (
        info && (
            <Link href={`/doc/${docid}?page=${searchParams.get('page') || '1'}`}>
                <section className='group p-2.5 flex-1 border flex justify-start gap-3 hover:bg-secondary transition-all cursor-pointer relative rounded hover:shadow-md'>
                    <span className='w-1/12 flex justify-center'>
                        <ScrollTextIcon className='p-0.5' />
                    </span>
                    <span className='flex-1 truncate'>{title}</span>
                    <div className='overflow-hidden absolute right-2'>
                        <ChevronRight className='group-hover:translate-x-0 -translate-x-5 transition-all' />
                    </div>
                </section>
            </Link>
        )
    )
}

export default ListTile
