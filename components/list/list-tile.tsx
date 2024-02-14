import { DocProps } from '@/app/doc/[docid]/page'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const ListTile = ({ info }: { info?: DocProps }) => {
    const { docid, title } = info || {}

    return (
        info && (
            <Link href={`/doc/${docid}`}>
                <section className='group p-2 flex-1 border flex justify-start gap-3 hover:bg-secondary transition-all cursor-pointer relative'>
                    <span className='w-1/12'>{docid}</span>
                    <span className='flex-1'>{title}</span>
                    <div className='overflow-hidden absolute right-2'>
                        <ChevronRight className='group-hover:translate-x-0 -translate-x-5 transition-all' />
                    </div>
                </section>
            </Link>
        )
    )
}

export default ListTile
