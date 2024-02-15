import { DocProps } from '@/app/doc/[docid]/page'
import GoBackButton from '../go-back-button'
import DocumentButtons from './doc-btns'

const Doc = async ({ doc }: { doc: DocProps }) => {
    const { title, description } = doc

    return (
        <section className='grid grid-cols-1 divide-y my-7'>
            <section className='flex items-center gap-2 py-7'>
                <GoBackButton />
                <span className='text-3xl font-extrabold'>{title}</span>
            </section>
            <div className='py-7' dangerouslySetInnerHTML={{ __html: description }} />
            <DocumentButtons info={doc} />
        </section>
    )
}

export default Doc
