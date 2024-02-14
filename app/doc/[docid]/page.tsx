import { findDocByDocid } from '@/dummydocs/service'
import { headers } from 'next/headers'

export interface DocProps {
    docid: number | string
    title: string
    description: string
}

const Document = async ({ params, searchParams }: { params: { docid: string }; searchParams: { [key: string]: string } }) => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}`
    const fetchData = await fetch(`${currentURL}/api/doc/${params.docid}?page=${searchParams['page']}`)
    const { title, docid, description } = await fetchData.json()

    return (
        <section>
            <span>- {docid}</span>
            <hr />
            <p>{title}</p>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: description }}></div>
        </section>
    )
}

export default Document
