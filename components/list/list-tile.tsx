'use client'
import { DocProps } from '@/app/doc/[docid]/page'
import { PageContext } from '@/context/contexts/page-context'
import { ChevronRight, ScrollTextIcon } from 'lucide-react'
import Link from 'next/link'
import { useContext } from 'react'

const ListTile = ({ info }: { info?: DocProps }) => {
    const { page, keyword } = useContext(PageContext)
    const pageStr = String(page)
    const searchParam = new URLSearchParams({ page: pageStr, keyword }).toString()
    const { docid, title } = info || {}
    return (
        info && (
            <Link href={`/doc/${docid}?${searchParam}`}>
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
